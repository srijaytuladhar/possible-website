import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getAuthUser, canManageUsers } from '@/lib/auth';
import { jsonResponse, errorResponse, unauthorizedResponse, forbiddenResponse, handleOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleOptions();
}

export async function GET(req: NextRequest) {
  const auth = getAuthUser(req);
  if (!auth) {
    return unauthorizedResponse();
  }
  if (!canManageUsers(auth.role)) {
    return forbiddenResponse();
  }

  try {
    const res = await query(
      'SELECT id, user_id, username, action, module, record_id, details, ip_address, created_at FROM audit_logs ORDER BY created_at DESC LIMIT 100'
    );

    return jsonResponse({
      success: true,
      logs: res.rows,
    });
  } catch (error: any) {
    return errorResponse(error.message || 'Server error', 500);
  }
}
