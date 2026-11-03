import { NextRequest } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { query } from '@/lib/db';
import { jsonResponse, errorResponse, handleOptions } from '@/lib/cors';

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
