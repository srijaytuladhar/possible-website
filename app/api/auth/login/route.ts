import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { signAdminToken } from '@/lib/auth';
import { jsonResponse, errorResponse, handleOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleOptions();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return errorResponse('Username and password are required', 400);
    }

    // Clean username and password inputs
    const cleanUsername = String(username).trim();
    const cleanPassword = String(password).trim();

    // Query user
    const res = await query(
      'SELECT id, username, password_hash, full_name, email, role, is_active FROM admin_users WHERE username = $1',
      [cleanUsername]
    );

    if (res.rows.length === 0) {
      return errorResponse('Invalid username or password', 401);
    }

    const user = res.rows[0];
    if (!user.is_active) {
      return errorResponse('Account is deactivated. Please contact support.', 403);
    }

    // Support both 'Nepal@123#' and 'Nepal@123#;' as requested by user
    let isMatch = bcrypt.compareSync(cleanPassword, user.password_hash);
    if (!isMatch && cleanPassword.endsWith(';')) {
      isMatch = bcrypt.compareSync(cleanPassword.slice(0, -1), user.password_hash);
    }
    if (!isMatch && !cleanPassword.endsWith(';')) {
      isMatch = bcrypt.compareSync(cleanPassword + ';', user.password_hash);
    }

    if (!isMatch) {
      return errorResponse('Invalid username or password', 401);
    }

    // Update last_login
    await query('UPDATE admin_users SET last_login = CURRENT_TIMESTAMP WHERE id = $1', [user.id]);

    const token = signAdminToken({
      id: user.id,
      username: user.username,
      role: user.role,
      full_name: user.full_name,
    });

    return jsonResponse({
      success: true,
      message: 'Authentication successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return errorResponse(error.message || 'Server error', 500);
  }
}
