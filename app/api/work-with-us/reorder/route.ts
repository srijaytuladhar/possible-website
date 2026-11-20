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
        await query('UPDATE work_with_us_items SET sort_order = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [
          item.sort_order,
          item.id,
        ]);
      }
    }

    await logAudit(auth, 'REORDER_WWU_ITEMS', 'WORK_WITH_US', undefined, { count: items.length });

    return jsonResponse({
      success: true,
      message: 'Work With Us items reordered successfully',
    });
  } catch (error: any) {
    console.error('[Reorder WWU Error]', error);
    return errorResponse(error.message || 'Server error', 500);
  }
}
