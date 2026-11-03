import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { jsonResponse, errorResponse, handleOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleOptions();
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const isNum = !isNaN(Number(id));
    const res = await query(
      isNum ? 'SELECT * FROM solutions_projects WHERE id = $1' : 'SELECT * FROM solutions_projects WHERE slug = $1',
      [id]
    );

    if (res.rows.length === 0) {
      return errorResponse('Project not found', 404);
    }

    return jsonResponse({
      success: true,
      solution: res.rows[0],
    });
  } catch (error: any) {
    return errorResponse(error.message || 'Server error', 500);
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = getAuthUser(req);
  if (!auth) {
    return errorResponse('Unauthorized', 401);
  }

  const { id } = await params;

  try {
    const body = await req.json();
    const {
      title,
      slug,
      stage_id,
      subtitle,
      badge,
      description,
      image_url,
      link_text,
      link_url,
      publications,
      sort_order,
      is_active,
    } = body;

    const res = await query(
      `UPDATE solutions_projects SET
        title = COALESCE($1, title),
        slug = COALESCE($2, slug),
        stage_id = COALESCE($3, stage_id),
        subtitle = COALESCE($4, subtitle),
        badge = COALESCE($5, badge),
        description = COALESCE($6, description),
        image_url = COALESCE($7, image_url),
        link_text = COALESCE($8, link_text),
        link_url = COALESCE($9, link_url),
        publications_json = COALESCE($10, publications_json),
        sort_order = COALESCE($11, sort_order),
        is_active = COALESCE($12, is_active),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $13
      RETURNING *`,
      [
        title,
        slug,
        stage_id,
        subtitle,
        badge,
        description,
        image_url,
        link_text,
        link_url,
        publications ? JSON.stringify(publications) : null,
        sort_order,
        is_active,
        id,
      ]
    );

    if (res.rows.length === 0) {
      return errorResponse('Project not found', 404);
    }

    return jsonResponse({
      success: true,
      message: 'Project updated successfully',
      solution: res.rows[0],
    });
  } catch (error: any) {
    return errorResponse(error.message || 'Server error', 500);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = getAuthUser(req);
  if (!auth) {
    return errorResponse('Unauthorized', 401);
  }

  const { id } = await params;

  try {
    const res = await query('DELETE FROM solutions_projects WHERE id = $1 RETURNING id', [id]);
    if (res.rows.length === 0) {
      return errorResponse('Project not found', 404);
    }

    return jsonResponse({
      success: true,
      message: 'Project deleted successfully',
      id: res.rows[0].id,
    });
  } catch (error: any) {
    return errorResponse(error.message || 'Server error', 500);
  }
}
