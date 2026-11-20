import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getAuthUser, canManageUsers, isSuperAdmin, logAudit } from '@/lib/auth';
import { jsonResponse, errorResponse, unauthorizedResponse, forbiddenResponse, handleOptions } from '@/lib/cors';
import bcrypt from 'bcryptjs';

export async function OPTIONS() {
  return handleOptions();
}

// GET /api/users - List all portal users
export async function GET(req: NextRequest) {
  const auth = getAuthUser(req);
  if (!auth) {
    return unauthorizedResponse();
  }
  if (!canManageUsers(auth.role)) {
    return forbiddenResponse('User management requires Administrator permissions');
  }

  try {
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get('search');
    const role = searchParams.get('role');
    const status = searchParams.get('status');

    let sql = `
      SELECT id, username, full_name, email, phone, avatar_url, role, is_active, last_login, created_at, updated_at
      FROM admin_users
      WHERE 1=1
    `;
    const params: any[] = [];

    if (search) {
      params.push(`%${search.trim()}%`);
      sql += ` AND (username ILIKE $${params.length} OR full_name ILIKE $${params.length} OR email ILIKE $${params.length})`;
    }

    if (role && role !== 'ALL') {
      params.push(role);
      sql += ` AND role = $${params.length}`;
    }

    if (status && status !== 'ALL') {
      const isActive = status === 'ACTIVE';
      params.push(isActive);
      sql += ` AND is_active = $${params.length}`;
    }

    sql += ' ORDER BY id ASC';

    const res = await query(sql, params);
    return jsonResponse({
      success: true,
      users: res.rows,
      total: res.rowCount,
    });
  } catch (error: any) {
    console.error('[Get Users Error]', error);
    return errorResponse(error.message || 'Server error', 500);
  }
}

// POST /api/users - Create new portal user
export async function POST(req: NextRequest) {
  const auth = getAuthUser(req);
  if (!auth) {
    return unauthorizedResponse();
  }
  if (!canManageUsers(auth.role)) {
    return forbiddenResponse('User management requires Administrator permissions');
  }

  try {
    const body = await req.json();
    const { username, full_name, email, phone, role, password, is_active = true } = body;

    // Validation
    if (!username || !password || !full_name || !email || !role) {
      return errorResponse('Username, full name, email, role, and password are required', 400);
    }

    const cleanUsername = String(username).trim().toLowerCase();
    const cleanEmail = String(email).trim().toLowerCase();
    const cleanFullName = String(full_name).trim();
    const targetRole = String(role).toUpperCase();

    // Valid roles
    const validRoles = ['SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER', 'READ_ONLY'];
    if (!validRoles.includes(targetRole)) {
      return errorResponse(`Invalid role. Allowed roles: ${validRoles.join(', ')}`, 400);
    }

    // Privilege escalation check: only SUPER_ADMIN can assign SUPER_ADMIN role
    if (targetRole === 'SUPER_ADMIN' && !isSuperAdmin(auth.role)) {
      return forbiddenResponse('Only a Super Admin can create another Super Admin account');
    }

    // Password validation: at least 8 chars, letters and numbers
    if (password.length < 8) {
      return errorResponse('Password must be at least 8 characters long', 400);
    }
    if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      return errorResponse('Password must contain both letters and numbers', 400);
    }

    // Check duplicate username
    const dupCheck = await query('SELECT id FROM admin_users WHERE username = $1', [cleanUsername]);
    if (dupCheck.rows.length > 0) {
      return errorResponse('Username is already taken', 400);
    }

    // Check duplicate email
    const emailCheck = await query('SELECT id FROM admin_users WHERE email = $1', [cleanEmail]);
    if (emailCheck.rows.length > 0) {
      return errorResponse('Email address is already in use by another user', 400);
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const insertRes = await query(
      `INSERT INTO admin_users (username, password_hash, full_name, email, phone, role, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, username, full_name, email, phone, avatar_url, role, is_active, last_login, created_at, updated_at`,
      [cleanUsername, passwordHash, cleanFullName, cleanEmail, phone ? String(phone).trim() : null, targetRole, !!is_active]
    );

    const newUser = insertRes.rows[0];

    // Log audit
    await logAudit(auth, 'CREATE_USER', 'USERS', newUser.id, {
      username: newUser.username,
      role: newUser.role,
      full_name: newUser.full_name,
    });

    return jsonResponse({
      success: true,
      message: 'User created successfully',
      user: newUser,
    }, 201);
  } catch (error: any) {
    console.error('[Create User Error]', error);
    return errorResponse(error.message || 'Server error', 500);
  }
}
