import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { jsonResponse, errorResponse, handleOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleOptions();
}

// GET solutions
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const stage = searchParams.get('stage');

    let sql = 'SELECT * FROM solutions_projects WHERE is_active = true';
    const params: any[] = [];

    if (stage && stage !== 'all') {
      params.push(stage);
      sql += ` AND stage_id = $${params.length}`;
    }

    sql += ' ORDER BY sort_order ASC, created_at ASC';

    const res = await query(sql, params);
    return jsonResponse({
      success: true,
      solutions: res.rows,
    });
  } catch (error: any) {
    return errorResponse(error.message || 'Server error', 500);
  }
}

// POST create solution
export async function POST(req: NextRequest) {
  const auth = getAuthUser(req);
  if (!auth) {
    return errorResponse('Unauthorized', 401);
  }

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
    } = body;

    if (!title || !stage_id || !description) {
      return errorResponse('Title, stage, and description are required', 400);
    }

    const cleanSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now();

    const res = await query(
      `INSERT INTO solutions_projects 
      (title, slug, stage_id, subtitle, badge, description, image_url, link_text, link_url, publications_json, sort_order)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, COALESCE($11, 0))
      RETURNING *`,
      [
        title,
        cleanSlug,
        stage_id,
        subtitle || '',
        badge || '',
        description,
        image_url || '/baby.jpg',
        link_text || '',
        link_url || '',
        JSON.stringify(publications || []),
        sort_order,
      ]
    );

    return jsonResponse({
      success: true,
      message: 'Solution project created successfully',
      solution: res.rows[0],
    }, 201);
  } catch (error: any) {
    return errorResponse(error.message || 'Server error', 500);
  }
}
