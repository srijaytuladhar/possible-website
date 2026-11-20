import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getAuthUser, canWriteContent, logAudit } from '@/lib/auth';
import { jsonResponse, errorResponse, unauthorizedResponse, forbiddenResponse, handleOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleOptions();
}

export async function POST(req: NextRequest) {
  const auth = getAuthUser(req);
  if (!auth) {
    return unauthorizedResponse();
  }
  if (!canWriteContent(auth.role)) {
    return forbiddenResponse();
  }

  try {
    const body = await req.json();
    const { items } = body;

    if (!Array.isArray(items)) {
      return errorResponse('Invalid payload: items must be an array', 400);
    }

    for (const item of items) {
      if (item.id !== undefined && item.sort_order !== undefined) {
        await query('UPDATE collaborators SET sort_order = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [
          item.sort_order,
          item.id,
        ]);
      }
    }

    await logAudit(auth, 'REORDER_COLLABORATORS', 'COLLABORATORS', undefined, { count: items.length });

    return jsonResponse({
      success: true,
      message: 'Collaborators reordered successfully',
    });
  } catch (error: any) {
    console.error('[Reorder Collaborators Error]', error);
    return errorResponse(error.message || 'Server error', 500);
  }
}
