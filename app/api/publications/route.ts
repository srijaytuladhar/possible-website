import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { jsonResponse, errorResponse, handleOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleOptions();
}

// GET publications
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let sql = 'SELECT * FROM publications WHERE 1=1';
    const params: any[] = [];

    if (category && category !== 'All') {
      params.push(category);
      sql += ` AND category = $${params.length}`;
    }

    if (search) {
      params.push(`%${search}%`);
      sql += ` AND (title ILIKE $${params.length} OR description ILIKE $${params.length} OR sub_type ILIKE $${params.length})`;
    }

    sql += ' ORDER BY sort_order ASC, created_at DESC';

    const res = await query(sql, params);
    return jsonResponse({
      success: true,
      publications: res.rows,
    });
  } catch (error: any) {
    return errorResponse(error.message || 'Server error', 500);
  }
}

// POST create publication
export async function POST(req: NextRequest) {
  const auth = getAuthUser(req);
  if (!auth) {
    return errorResponse('Unauthorized', 401);
  }

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

    if (!title || !category) {
      return errorResponse('Title and category are required', 400);
    }

    const res = await query(
      `INSERT INTO publications (title, category, sub_type, description, date_display, link_url, pdf_filename, cover_image, featured, sort_order)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, COALESCE($9, false), COALESCE($10, 0))
      RETURNING *`,
      [
        title,
        category,
        sub_type || 'PDF Report',
        description || '',
        date_display || '',
        link_url || '',
        pdf_filename || '',
        cover_image || '/annual-impact-report/thumbnails/Possible_AIR-2025.webp',
        featured,
        sort_order,
      ]
    );

    return jsonResponse({
      success: true,
      message: 'Publication added successfully',
      publication: res.rows[0],
    }, 201);
  } catch (error: any) {
    return errorResponse(error.message || 'Server error', 500);
  }
}
