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
    const res = await query('SELECT * FROM publications WHERE id = $1', [id]);
    if (res.rows.length === 0) {
      return errorResponse('Publication not found', 404);
    }
    return jsonResponse({
      success: true,
      publication: res.rows[0],
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
      category,
      sub_type,
      description,
      date_display,
      link_url,
      pdf_filename,
      cover_image,
      featured,
      sort_order,
    } = body;

    const res = await query(
      `UPDATE publications SET
        title = COALESCE($1, title),
        category = COALESCE($2, category),
        sub_type = COALESCE($3, sub_type),
        description = COALESCE($4, description),
        date_display = COALESCE($5, date_display),
        link_url = COALESCE($6, link_url),
        pdf_filename = COALESCE($7, pdf_filename),
        cover_image = COALESCE($8, cover_image),
        featured = COALESCE($9, featured),
        sort_order = COALESCE($10, sort_order),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $11
      RETURNING *`,
      [
        title,
        category,
        sub_type,
        description,
        date_display,
        link_url,
        pdf_filename,
        cover_image,
        featured,
        sort_order,
        id,
      ]
    );

    if (res.rows.length === 0) {
      return errorResponse('Publication not found', 404);
    }

    return jsonResponse({
      success: true,
      message: 'Publication updated successfully',
      publication: res.rows[0],
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
    const res = await query('DELETE FROM publications WHERE id = $1 RETURNING id', [id]);
    if (res.rows.length === 0) {
      return errorResponse('Publication not found', 404);
    }

    return jsonResponse({
      success: true,
      message: 'Publication deleted successfully',
      id: res.rows[0].id,
    });
  } catch (error: any) {
    return errorResponse(error.message || 'Server error', 500);
  }
}
