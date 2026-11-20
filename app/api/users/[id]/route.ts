import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getAuthUser, canManageUsers, isSuperAdmin, logAudit } from '@/lib/auth';
import { jsonResponse, errorResponse, unauthorizedResponse, forbiddenResponse, handleOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleOptions();
}

// GET /api/users/[id]
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = getAuthUser(req);
  if (!auth) {
    return unauthorizedResponse();
  }
  if (!canManageUsers(auth.role)) {
    return forbiddenResponse();
  }

  try {
    const { id } = await params;
    const res = await query(
      'SELECT id, username, full_name, email, phone, avatar_url, role, is_active, last_login, created_at, updated_at FROM admin_users WHERE id = $1',
      [id]
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

// PUT /api/users/[id] - Update user details, role, status
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = getAuthUser(req);
  if (!auth) {
    return unauthorizedResponse();
  }
  if (!canManageUsers(auth.role)) {
    return forbiddenResponse('User management requires Administrator permissions');
  }

  try {
    const { id } = await params;
    const targetUserId = parseInt(id, 10);
    const body = await req.json();
    const { full_name, email, phone, avatar_url, role, is_active } = body;

    // Fetch target user
    const userRes = await query('SELECT * FROM admin_users WHERE id = $1', [targetUserId]);
    if (userRes.rows.length === 0) {
      return errorResponse('User not found', 404);
    }
    const targetUser = userRes.rows[0];

    // Privilege Escalation Safeguards:
    // 1. If target user is SUPER_ADMIN, only a SUPER_ADMIN can modify them
    if (targetUser.role === 'SUPER_ADMIN' && !isSuperAdmin(auth.role)) {
      return forbiddenResponse('Only a Super Admin can modify a Super Admin user');
    }

    // 2. Only a SUPER_ADMIN can assign the SUPER_ADMIN role
    if (role && role === 'SUPER_ADMIN' && targetUser.role !== 'SUPER_ADMIN' && !isSuperAdmin(auth.role)) {
      return forbiddenResponse('Only a Super Admin can promote a user to Super Admin');
    }

    // 3. Protect Super Admin accounts: Prevent removing the last active SUPER_ADMIN
    if (targetUser.role === 'SUPER_ADMIN' && (is_active === false || (role && role !== 'SUPER_ADMIN'))) {
      const superAdminCountRes = await query(
        'SELECT count(*) FROM admin_users WHERE role = $1 AND is_active = true',
        ['SUPER_ADMIN']
      );
      const count = parseInt(superAdminCountRes.rows[0].count, 10);
      if (count <= 1) {
        return errorResponse('Cannot demote or deactivate the last active Super Admin account', 400);
      }
    }

    // 4. Prevent self-deactivation
    if (auth.id === targetUserId && is_active === false) {
      return errorResponse('You cannot deactivate your own account', 400);
    }

    const updatedFullName = full_name !== undefined ? String(full_name).trim() : targetUser.full_name;
    const updatedEmail = email !== undefined ? String(email).trim().toLowerCase() : targetUser.email;
    const updatedPhone = phone !== undefined ? String(phone).trim() : targetUser.phone;
    const updatedAvatar = avatar_url !== undefined ? String(avatar_url).trim() : targetUser.avatar_url;
    const updatedRole = role !== undefined ? String(role).toUpperCase() : targetUser.role;
    const updatedStatus = is_active !== undefined ? Boolean(is_active) : targetUser.is_active;

    // Check email conflict
    if (updatedEmail !== targetUser.email) {
      const emailCheck = await query('SELECT id FROM admin_users WHERE email = $1 AND id != $2', [updatedEmail, targetUserId]);
      if (emailCheck.rows.length > 0) {
        return errorResponse('Email address is already used by another account', 400);
      }
    }

    const updateRes = await query(
      `UPDATE admin_users SET
        full_name = $1,
        email = $2,
        phone = $3,
        avatar_url = $4,
        role = $5,
        is_active = $6,
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $7
       RETURNING id, username, full_name, email, phone, avatar_url, role, is_active, last_login, created_at, updated_at`,
      [updatedFullName, updatedEmail, updatedPhone, updatedAvatar, updatedRole, updatedStatus, targetUserId]
    );

    const updatedUser = updateRes.rows[0];

    // Audit log
    await logAudit(auth, 'UPDATE_USER', 'USERS', targetUserId, {
      changes: {
        role: updatedRole !== targetUser.role ? { old: targetUser.role, new: updatedRole } : undefined,
        status: updatedStatus !== targetUser.is_active ? { old: targetUser.is_active, new: updatedStatus } : undefined,
        email: updatedEmail !== targetUser.email ? { old: targetUser.email, new: updatedEmail } : undefined,
      }
    });

    return jsonResponse({
      success: true,
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error: any) {
    console.error('[Update User Error]', error);
    return errorResponse(error.message || 'Server error', 500);
  }
}

// DELETE /api/users/[id] - Delete user
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = getAuthUser(req);
  if (!auth) {
    return unauthorizedResponse();
  }
  if (!canManageUsers(auth.role)) {
    return forbiddenResponse('User management requires Administrator permissions');
  }

  try {
    const { id } = await params;
    const targetUserId = parseInt(id, 10);

    // Safeguards:
    // 1. Cannot delete self
    if (auth.id === targetUserId) {
      return errorResponse('You cannot delete your own account', 400);
    }

    const userRes = await query('SELECT * FROM admin_users WHERE id = $1', [targetUserId]);
    if (userRes.rows.length === 0) {
      return errorResponse('User not found', 404);
    }
    const targetUser = userRes.rows[0];

    // 2. Protect Super Admin accounts: Cannot delete any Super Admin if not Super Admin
    if (targetUser.role === 'SUPER_ADMIN' && !isSuperAdmin(auth.role)) {
      return forbiddenResponse('Only a Super Admin can delete a Super Admin account');
    }

    // 3. Cannot delete the last Super Admin account
    if (targetUser.role === 'SUPER_ADMIN') {
      const superAdminCountRes = await query(
        'SELECT count(*) FROM admin_users WHERE role = $1',
        ['SUPER_ADMIN']
      );
      const count = parseInt(superAdminCountRes.rows[0].count, 10);
      if (count <= 1) {
        return errorResponse('Cannot delete the last Super Admin account', 400);
      }
    }

    await query('DELETE FROM admin_users WHERE id = $1', [targetUserId]);

    // Audit log
    await logAudit(auth, 'DELETE_USER', 'USERS', targetUserId, {
      deleted_username: targetUser.username,
      deleted_role: targetUser.role,
    });

    return jsonResponse({
      success: true,
      message: `User ${targetUser.username} removed successfully`,
      id: targetUserId,
    });
  } catch (error: any) {
    console.error('[Delete User Error]', error);
    return errorResponse(error.message || 'Server error', 500);
  }
}
