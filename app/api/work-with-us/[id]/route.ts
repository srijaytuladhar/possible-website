import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getAuthUser, canWriteContent, logAudit } from '@/lib/auth';
import { jsonResponse, errorResponse, unauthorizedResponse, forbiddenResponse, handleOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleOptions();
}

// GET /api/work-with-us/[id]
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const res = await query('SELECT * FROM work_with_us_items WHERE id = $1', [id]);
    if (res.rows.length === 0) {
      return errorResponse('Item not found', 404);
    }
    return jsonResponse({
      success: true,
      item: res.rows[0],
    });
  } catch (error: any) {
    return errorResponse(error.message || 'Server error', 500);
  }
}

// PUT /api/work-with-us/[id]
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = getAuthUser(req);
  if (!auth) {
    return unauthorizedResponse();
  }
  if (!canWriteContent(auth.role)) {
    return forbiddenResponse('Read-only users cannot modify Work With Us items');
  }

  try {
    const { id } = await params;
    const body = await req.json();

    const existingRes = await query('SELECT * FROM work_with_us_items WHERE id = $1', [id]);
    if (existingRes.rows.length === 0) {
      return errorResponse('Item not found', 404);
    }
    const current = existingRes.rows[0];

    const section_type = body.section_type !== undefined ? body.section_type : current.section_type;
    const title = body.title !== undefined ? body.title.trim() : current.title;
    const subtitle = body.subtitle !== undefined ? body.subtitle : current.subtitle;
    const department = body.department !== undefined ? body.department : current.department;
    const location = body.location !== undefined ? body.location : current.location;
    const employment_type = body.employment_type !== undefined ? body.employment_type : current.employment_type;
    const description = body.description !== undefined ? body.description : current.description;
    const requirements = body.requirements !== undefined ? body.requirements : current.requirements;
    const link_url = body.link_url !== undefined ? body.link_url : current.link_url;
    const image_url = body.image_url !== undefined ? body.image_url : current.image_url;
    const deadline = body.deadline !== undefined ? body.deadline : current.deadline;
    const sort_order = body.sort_order !== undefined ? parseInt(body.sort_order, 10) : current.sort_order;
    const is_published = body.is_published !== undefined ? Boolean(body.is_published) : current.is_published;

    const res = await query(
      `UPDATE work_with_us_items SET
        section_type = $1,
        title = $2,
        subtitle = $3,
        department = $4,
        location = $5,
        employment_type = $6,
        description = $7,
        requirements = $8,
        link_url = $9,
        image_url = $10,
        deadline = $11,
        sort_order = $12,
        is_published = $13,
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $14
       RETURNING *`,
      [
        section_type,
        title,
        subtitle,
        department,
        location,
        employment_type,
        description,
        requirements,
        link_url,
        image_url,
        deadline,
        sort_order,
        is_published,
        id,
      ]
    );

    const updated = res.rows[0];

    await logAudit(auth, 'UPDATE_WWU_ITEM', 'WORK_WITH_US', updated.id, {
      title: updated.title,
      is_published: updated.is_published,
    });

    return jsonResponse({
      success: true,
      message: 'Work With Us item updated successfully',
      item: updated,
    });
  } catch (error: any) {
    console.error('[Update WWU Item Error]', error);
    return errorResponse(error.message || 'Server error', 500);
  }
}

// DELETE /api/work-with-us/[id]
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = getAuthUser(req);
  if (!auth) {
    return unauthorizedResponse();
  }
  if (!canWriteContent(auth.role)) {
    return forbiddenResponse('Read-only users cannot delete Work With Us items');
  }

  try {
    const { id } = await params;
    const existing = await query('SELECT id, title FROM work_with_us_items WHERE id = $1', [id]);
    if (existing.rows.length === 0) {
      return errorResponse('Item not found', 404);
    }

    await query('DELETE FROM work_with_us_items WHERE id = $1', [id]);

    await logAudit(auth, 'DELETE_WWU_ITEM', 'WORK_WITH_US', id, {
      title: existing.rows[0].title,
    });

    return jsonResponse({
      success: true,
      message: 'Item removed successfully',
      id: parseInt(id, 10),
    });
  } catch (error: any) {
    console.error('[Delete WWU Item Error]', error);
    return errorResponse(error.message || 'Server error', 500);
  }
}
