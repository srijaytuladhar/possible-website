import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getAuthUser, canWriteContent, logAudit } from '@/lib/auth';
import { jsonResponse, errorResponse, unauthorizedResponse, forbiddenResponse, handleOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleOptions();
}

// GET /api/collaborators/[id]
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const res = await query('SELECT * FROM collaborators WHERE id = $1', [id]);
    if (res.rows.length === 0) {
      return errorResponse('Collaborator not found', 404);
    }
    return jsonResponse({
      success: true,
      collaborator: res.rows[0],
    });
  } catch (error: any) {
    return errorResponse(error.message || 'Server error', 500);
  }
}

// PUT /api/collaborators/[id]
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = getAuthUser(req);
  if (!auth) {
    return unauthorizedResponse();
  }
  if (!canWriteContent(auth.role)) {
    return forbiddenResponse('Read-only users cannot modify collaborators');
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const {
      name,
      organization,
      category,
      description,
      logo_url,
      website_url,
      sort_order,
      is_active
    } = body;

    const existingRes = await query('SELECT * FROM collaborators WHERE id = $1', [id]);
    if (existingRes.rows.length === 0) {
      return errorResponse('Collaborator not found', 404);
    }
    const current = existingRes.rows[0];

    const updatedName = name !== undefined ? name.trim() : current.name;
    const updatedOrg = organization !== undefined ? organization.trim() : current.organization;
    const updatedCategory = category !== undefined ? category.trim() : current.category;
    const updatedDesc = description !== undefined ? description : current.description;
    const updatedLogo = logo_url !== undefined ? logo_url : current.logo_url;
    const updatedWeb = website_url !== undefined ? website_url : current.website_url;
    const updatedSort = sort_order !== undefined ? parseInt(sort_order, 10) : current.sort_order;
    const updatedActive = is_active !== undefined ? Boolean(is_active) : current.is_active;

    const res = await query(
      `UPDATE collaborators SET
        name = $1,
        organization = $2,
        category = $3,
        description = $4,
        logo_url = $5,
        website_url = $6,
        sort_order = $7,
        is_active = $8,
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $9
       RETURNING *`,
      [updatedName, updatedOrg, updatedCategory, updatedDesc, updatedLogo, updatedWeb, updatedSort, updatedActive, id]
    );

    const updated = res.rows[0];

    await logAudit(auth, 'UPDATE_COLLABORATOR', 'COLLABORATORS', updated.id, {
      name: updated.name,
      is_active: updated.is_active,
    });

    return jsonResponse({
      success: true,
      message: 'Collaborator updated successfully',
      collaborator: updated,
    });
  } catch (error: any) {
    console.error('[Update Collaborator Error]', error);
    return errorResponse(error.message || 'Server error', 500);
  }
}

// DELETE /api/collaborators/[id]
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = getAuthUser(req);
  if (!auth) {
    return unauthorizedResponse();
  }
  if (!canWriteContent(auth.role)) {
    return forbiddenResponse('Read-only users cannot delete collaborators');
  }

  try {
    const { id } = await params;
    const existing = await query('SELECT id, name FROM collaborators WHERE id = $1', [id]);
    if (existing.rows.length === 0) {
      return errorResponse('Collaborator not found', 404);
    }

    await query('DELETE FROM collaborators WHERE id = $1', [id]);

    await logAudit(auth, 'DELETE_COLLABORATOR', 'COLLABORATORS', id, {
      name: existing.rows[0].name
    });

    return jsonResponse({
      success: true,
      message: 'Collaborator deleted successfully',
      id: parseInt(id, 10),
    });
  } catch (error: any) {
    console.error('[Delete Collaborator Error]', error);
    return errorResponse(error.message || 'Server error', 500);
  }
}
