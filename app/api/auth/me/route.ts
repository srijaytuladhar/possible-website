import { NextRequest } from 'next/server';
import { getAuthUser, signAdminToken } from '@/lib/auth';
import { query } from '@/lib/db';
import { jsonResponse, errorResponse, handleOptions } from '@/lib/cors';
import bcrypt from 'bcryptjs';

export async function OPTIONS() {
  return handleOptions();
}

export async function GET(req: NextRequest) {
  const auth = getAuthUser(req);
  if (!auth) {
    return errorResponse('Unauthorized: Please log in', 401);
  }

  try {
    const res = await query(
      'SELECT id, username, full_name, email, role, last_login, created_at FROM admin_users WHERE id = $1',
      [auth.id]
    );

    if (res.rows.length === 0) {
      return errorResponse('User not found', 404);
    }

    return jsonResponse({
      success: true,
      user: res.rows[0],
    });
  } catch (error: any) {
    return errorResponse(error.message || 'Server error', 500);
  }
}

// PUT update user profile and account settings / change password
export async function PUT(req: NextRequest) {
  const auth = getAuthUser(req);
  if (!auth) {
    return errorResponse('Unauthorized: Please log in', 401);
  }

  try {
    const body = await req.json();
    const { full_name, email, username, current_password, new_password } = body;

    // Fetch existing user record
    const userRes = await query('SELECT * FROM admin_users WHERE id = $1', [auth.id]);
    if (userRes.rows.length === 0) {
      return errorResponse('User not found', 404);
    }
    const currentUser = userRes.rows[0];

    // If changing password, verify current password
    let passwordHash = currentUser.password_hash;
    if (new_password) {
      if (!current_password) {
        return errorResponse('Current password is required to set a new password', 400);
      }
      const isMatch = bcrypt.compareSync(current_password, currentUser.password_hash);
      if (!isMatch) {
        return errorResponse('Current password does not match', 400);
      }
      if (new_password.length < 6) {
        return errorResponse('New password must be at least 6 characters long', 400);
      }
      const salt = bcrypt.genSaltSync(10);
      passwordHash = bcrypt.hashSync(new_password, salt);
    }

    // Check username uniqueness if changed
    const targetUsername = username ? username.trim() : currentUser.username;
    if (targetUsername !== currentUser.username) {
      const checkUser = await query('SELECT id FROM admin_users WHERE username = $1 AND id != $2', [targetUsername, auth.id]);
      if (checkUser.rows.length > 0) {
        return errorResponse('Username is already taken by another account', 400);
      }
    }

    const updatedFullName = full_name ? full_name.trim() : currentUser.full_name;
    const updatedEmail = email ? email.trim() : currentUser.email;

    const updateRes = await query(
      `UPDATE admin_users SET
        full_name = $1,
        email = $2,
        username = $3,
        password_hash = $4,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
      RETURNING id, username, full_name, email, role, last_login, created_at, updated_at`,
      [updatedFullName, updatedEmail, targetUsername, passwordHash, auth.id]
    );

    const updatedUser = updateRes.rows[0];

    // Generate fresh token
    const token = signAdminToken({
      id: updatedUser.id,
      username: updatedUser.username,
      role: updatedUser.role,
      full_name: updatedUser.full_name,
    });

    return jsonResponse({
      success: true,
      message: new_password ? 'Profile and password updated successfully' : 'Profile details updated successfully',
      user: updatedUser,
      token,
    });
  } catch (error: any) {
    console.error('Update profile error:', error);
    return errorResponse(error.message || 'Server error', 500);
  }
}
