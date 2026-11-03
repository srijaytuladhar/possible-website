import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { jsonResponse, errorResponse, handleOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleOptions();
}

// GET team members
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const all = searchParams.get('all') === 'true';

    let sql = 'SELECT * FROM team_members WHERE 1=1';
    const params: any[] = [];

    if (!all) {
      sql += ' AND is_active = true';
    }

    if (category && category !== 'All') {
      params.push(category);
      sql += ` AND category = $${params.length}`;
    }

    if (search) {
      params.push(`%${search}%`);
      sql += ` AND (name ILIKE $${params.length} OR role ILIKE $${params.length} OR bio ILIKE $${params.length})`;
    }

    sql += ' ORDER BY sort_order ASC, created_at ASC';

    const res = await query(sql, params);
    return jsonResponse({
      success: true,
      team: res.rows,
    });
  } catch (error: any) {
    console.error('Fetch team error:', error);
    return errorResponse(error.message || 'Server error', 500);
  }
}

// POST create team member
export async function POST(req: NextRequest) {
  const auth = getAuthUser(req);
  if (!auth) {
    return errorResponse('Unauthorized', 401);
  }

  try {
    const body = await req.json();
    const { name, role, category, image, bio, linkedin, sort_order, is_active } = body;

    if (!name || !role || !category) {
      return errorResponse('Name, role, and category are required', 400);
    }

    // Auto-generate unique ID e.g. tm-custom-1234
    const id = body.id || `tm-${Date.now()}`;

    const res = await query(
      `INSERT INTO team_members (id, name, role, category, image, bio, linkedin, sort_order, is_active)
      VALUES ($1, $2, $3, $4, $5, $6, $7, COALESCE($8, 0), COALESCE($9, true))
      RETURNING *`,
      [id, name, role, category, image || '/team/default.jpg', bio || '', linkedin || null, sort_order, is_active]
    );

    return jsonResponse({
      success: true,
      message: 'Team member added successfully',
      member: res.rows[0],
    }, 201);
  } catch (error: any) {
    return errorResponse(error.message || 'Server error', 500);
  }
}
