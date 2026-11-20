import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getAuthUser, canWriteContent } from '@/lib/auth';
import { jsonResponse, errorResponse, unauthorizedResponse, forbiddenResponse, handleOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleOptions();
}

// POST / PUT reorder team members
export async function POST(req: NextRequest) {
  const auth = getAuthUser(req);
  if (!auth) {
    return unauthorizedResponse();
  }
  if (!canWriteContent(auth.role)) {
    return forbiddenResponse('Read-only users cannot reorder team members');
  }


  try {
    const body = await req.json();
    const { items } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return errorResponse('Items array is required for reordering', 400);
    }

    // Update each member's sort_order
    for (const item of items) {
      if (item.id && typeof item.sort_order === 'number') {
        await query(
          'UPDATE team_members SET sort_order = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
          [item.sort_order, item.id]
        );
      }
    }

    return jsonResponse({
      success: true,
      message: 'Team positions reordered successfully',
    });
  } catch (error: any) {
    console.error('Reorder team members error:', error);
    return errorResponse(error.message || 'Server error', 500);
  }
}

