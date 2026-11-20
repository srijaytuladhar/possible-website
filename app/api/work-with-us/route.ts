import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getAuthUser, canWriteContent, logAudit } from '@/lib/auth';
import { jsonResponse, errorResponse, unauthorizedResponse, forbiddenResponse, handleOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleOptions();
}

// GET /api/work-with-us
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const all = searchParams.get('all') === 'true';
    const sectionType = searchParams.get('section_type');
    const search = searchParams.get('search');

    let sql = 'SELECT * FROM work_with_us_items WHERE 1=1';
    const params: any[] = [];

    if (!all) {
      sql += ' AND is_published = true';
    }

    if (sectionType && sectionType !== 'all') {
      params.push(sectionType);
      sql += ` AND section_type = $${params.length}`;
    }

    if (search) {
      params.push(`%${search.trim()}%`);
      sql += ` AND (title ILIKE $${params.length} OR department ILIKE $${params.length} OR description ILIKE $${params.length})`;
    }

    sql += ' ORDER BY section_type ASC, sort_order ASC, id ASC';

    const res = await query(sql, params);

    return jsonResponse({
      success: true,
      items: res.rows,
      total: res.rowCount,
    });
  } catch (error: any) {
    console.error('[Get Work With Us Error]', error);
    return errorResponse(error.message || 'Server error', 500);
  }
}

// POST /api/work-with-us
export async function POST(req: NextRequest) {
  const auth = getAuthUser(req);
  if (!auth) {
    return unauthorizedResponse();
  }
  if (!canWriteContent(auth.role)) {
    return forbiddenResponse('Read-only users cannot create Work With Us items');
  }

  try {
    const body = await req.json();
    const {
      section_type = 'job_posting',
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
      sort_order = 0,
      is_published = true,
    } = body;

    if (!title || !description) {
      return errorResponse('Title and description are required', 400);
    }

    const res = await query(
      `INSERT INTO work_with_us_items
       (section_type, title, subtitle, department, location, employment_type, description, requirements, link_url, image_url, deadline, sort_order, is_published)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING *`,
      [
        section_type,
        title.trim(),
        subtitle || null,
        department || null,
        location || null,
        employment_type || null,
        description,
        requirements || null,
        link_url || null,
        image_url || null,
        deadline || null,
        parseInt(sort_order, 10) || 0,
        !!is_published,
      ]
    );

    const newItem = res.rows[0];

    await logAudit(auth, 'CREATE_WWU_ITEM', 'WORK_WITH_US', newItem.id, {
      title: newItem.title,
      section_type: newItem.section_type,
    });

    return jsonResponse({
      success: true,
      message: 'Work With Us item created successfully',
      item: newItem,
    }, 201);
  } catch (error: any) {
    console.error('[Create WWU Item Error]', error);
    return errorResponse(error.message || 'Server error', 500);
  }
}
