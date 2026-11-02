import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { jsonResponse, errorResponse, handleOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleOptions();
}

// PATCH/PUT update inquiry status & admin notes
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = getAuthUser(req);
  if (!auth) {
    return errorResponse('Unauthorized', 401);
  }

  const { id } = await params;

  try {
    const body = await req.json();
    const { status, admin_notes } = body;

    const res = await query(
      `UPDATE contact_inquiries SET
        status = COALESCE($1, status),
        admin_notes = COALESCE($2, admin_notes),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *`,
      [status, admin_notes, id]
    );

    if (res.rows.length === 0) {
      return errorResponse('Inquiry not found', 404);
    }

    return jsonResponse({
      success: true,
      message: 'Inquiry updated successfully',
      inquiry: res.rows[0],
    });
  } catch (error: any) {
    return errorResponse(error.message || 'Server error', 500);
  }
}

// DELETE inquiry
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = getAuthUser(req);
  if (!auth) {
    return errorResponse('Unauthorized', 401);
  }

  const { id } = await params;

  try {
    const res = await query('DELETE FROM contact_inquiries WHERE id = $1 RETURNING id', [id]);
    if (res.rows.length === 0) {
      return errorResponse('Inquiry not found', 404);
    }

    return jsonResponse({
      success: true,
      message: 'Inquiry deleted successfully',
      id: res.rows[0].id,
    });
  } catch (error: any) {
    return errorResponse(error.message || 'Server error', 500);
  }
}
