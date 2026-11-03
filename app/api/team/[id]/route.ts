import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { jsonResponse, errorResponse, handleOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleOptions();
}

// GET single team member
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const res = await query('SELECT * FROM team_members WHERE id = $1', [id]);
    if (res.rows.length === 0) {
      return errorResponse('Team member not found', 404);
    }
    return jsonResponse({
      success: true,
      member: res.rows[0],
    });
  } catch (error: any) {
    return errorResponse(error.message || 'Server error', 500);
  }
}

// PUT update team member
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = getAuthUser(req);
  if (!auth) {
    return errorResponse('Unauthorized', 401);
  }

  const { id } = await params;

  try {
    const body = await req.json();
    const { name, role, category, image, bio, linkedin, sort_order, is_active } = body;

    const res = await query(
      `UPDATE team_members SET
        name = COALESCE($1, name),
        role = COALESCE($2, role),
        category = COALESCE($3, category),
        image = COALESCE($4, image),
        bio = COALESCE($5, bio),
        linkedin = COALESCE($6, linkedin),
        sort_order = COALESCE($7, sort_order),
        is_active = COALESCE($8, is_active),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $9
      RETURNING *`,
      [name, role, category, image, bio, linkedin, sort_order, is_active, id]
    );

    if (res.rows.length === 0) {
      return errorResponse('Team member not found', 404);
    }

    return jsonResponse({
      success: true,
      message: 'Team member updated successfully',
      member: res.rows[0],
    });
  } catch (error: any) {
    return errorResponse(error.message || 'Server error', 500);
  }
}

// DELETE team member
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = getAuthUser(req);
  if (!auth) {
    return errorResponse('Unauthorized', 401);
  }

  const { id } = await params;

  try {
    const res = await query('DELETE FROM team_members WHERE id = $1 RETURNING id', [id]);
    if (res.rows.length === 0) {
      return errorResponse('Team member not found', 404);
    }

    return jsonResponse({
      success: true,
      message: 'Team member deleted successfully',
      id: res.rows[0].id,
    });
  } catch (error: any) {
    return errorResponse(error.message || 'Server error', 500);
  }
}
