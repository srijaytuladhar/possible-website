import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getAuthUser, canWriteContent, logAudit } from '@/lib/auth';
import { jsonResponse, errorResponse, unauthorizedResponse, forbiddenResponse, handleOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleOptions();
}

// GET /api/collaborators
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const all = searchParams.get('all') === 'true';
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let sql = 'SELECT * FROM collaborators WHERE 1=1';
    const params: any[] = [];

    if (!all) {
      sql += ' AND is_active = true';
    }

    if (category && category !== 'All') {
      params.push(category);
      sql += ` AND category = $${params.length}`;
    }

    if (search) {
      params.push(`%${search.trim()}%`);
      sql += ` AND (name ILIKE $${params.length} OR organization ILIKE $${params.length} OR description ILIKE $${params.length})`;
    }

    sql += ' ORDER BY category ASC, sort_order ASC, id ASC';

    const res = await query(sql, params);

    return jsonResponse({
      success: true,
      collaborators: res.rows,
      total: res.rowCount,
    });
  } catch (error: any) {
    console.error('[Get Collaborators Error]', error);
    return errorResponse(error.message || 'Server error', 500);
  }
}

// POST /api/collaborators
export async function POST(req: NextRequest) {
  const auth = getAuthUser(req);
  if (!auth) {
    return unauthorizedResponse();
  }
  if (!canWriteContent(auth.role)) {
    return forbiddenResponse('Read-only users cannot create collaborators');
  }

  try {
    const body = await req.json();
    const {
      name,
      organization,
      category = 'Government and Multilateral',
      description,
      logo_url,
      website_url,
      sort_order = 0,
      is_active = true
    } = body;

    if (!name || !name.trim()) {
      return errorResponse('Collaborator name is required', 400);
    }

    const cleanName = name.trim();
    const cleanOrg = organization ? organization.trim() : cleanName;
    const cleanCategory = category ? category.trim() : 'Government and Multilateral';

    const res = await query(
      `INSERT INTO collaborators (name, organization, category, description, logo_url, website_url, sort_order, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [cleanName, cleanOrg, cleanCategory, description || null, logo_url || null, website_url || null, sort_order, !!is_active]
    );

    const newCollaborator = res.rows[0];

    await logAudit(auth, 'CREATE_COLLABORATOR', 'COLLABORATORS', newCollaborator.id, {
      name: newCollaborator.name,
      category: newCollaborator.category
    });

    return jsonResponse({
      success: true,
      message: 'Collaborator added successfully',
      collaborator: newCollaborator,
    }, 201);
  } catch (error: any) {
    console.error('[Create Collaborator Error]', error);
    return errorResponse(error.message || 'Server error', 500);
  }
}
