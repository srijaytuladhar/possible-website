import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getAuthUser, canManageUsers, isSuperAdmin, logAudit } from '@/lib/auth';
import { jsonResponse, errorResponse, unauthorizedResponse, forbiddenResponse, handleOptions } from '@/lib/cors';
import bcrypt from 'bcryptjs';

export async function OPTIONS() {
  return handleOptions();
}

// POST /api/users/[id]/reset-password
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
    const new_password = body.new_password || body.newPassword;

    if (!new_password) {
      return errorResponse('New password is required', 400);
    }

    if (new_password.length < 8) {
      return errorResponse('Password must be at least 8 characters long', 400);
    }
    if (!/[a-zA-Z]/.test(new_password) || !/[0-9]/.test(new_password)) {
      return errorResponse('Password must contain both letters and numbers', 400);
    }

    const userRes = await query('SELECT id, username, role FROM admin_users WHERE id = $1', [targetUserId]);
    if (userRes.rows.length === 0) {
      return errorResponse('User not found', 404);
    }
    const targetUser = userRes.rows[0];

    // Only a Super Admin can reset another Super Admin's password
    if (targetUser.role === 'SUPER_ADMIN' && !isSuperAdmin(auth.role)) {
      return forbiddenResponse('Only a Super Admin can reset a Super Admin account password');
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(new_password, salt);

    await query(
      'UPDATE admin_users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [passwordHash, targetUserId]
    );

    await logAudit(auth, 'RESET_PASSWORD', 'USERS', targetUserId, {
      username: targetUser.username,
    });

    return jsonResponse({
      success: true,
      message: `Password reset successfully for user ${targetUser.username}`,
    });
  } catch (error: any) {
    console.error('[Reset Password Error]', error);
    return errorResponse(error.message || 'Server error', 500);
  }
}
