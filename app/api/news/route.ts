import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { jsonResponse, errorResponse, handleOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleOptions();
}

// GET all news articles
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const all = searchParams.get('all') === 'true'; // if admin wants unpublished too

    let sql = 'SELECT * FROM news_articles WHERE 1=1';
    const params: any[] = [];

    if (!all) {
      sql += ' AND is_published = true';
    }

    if (category && category !== 'All') {
      params.push(category);
      sql += ` AND category = $${params.length}`;
    }

    if (search) {
      params.push(`%${search}%`);
      sql += ` AND (title ILIKE $${params.length} OR desc_text ILIKE $${params.length} OR content ILIKE $${params.length})`;
    }

    sql += ' ORDER BY published_date DESC';

    const res = await query(sql, params);
    return jsonResponse({
      success: true,
      articles: res.rows,
    });
  } catch (error: any) {
    console.error('Fetch news error:', error);
    return errorResponse(error.message || 'Server error', 500);
  }
}

// POST create a new article (Admin protected)
export async function POST(req: NextRequest) {
  const auth = getAuthUser(req);
  if (!auth) {
    return errorResponse('Unauthorized: Please log in as admin', 401);
  }

  try {
    const body = await req.json();
    const {
      title,
      slug,
      category,
      desc_text,
      content,
      image_url,
      author,
      read_time,
      published_date,
      is_published,
    } = body;

    if (!title || !content) {
      return errorResponse('Title and content are required', 400);
    }

    // Auto-generate slug if not provided
    const cleanSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now();

    const res = await query(
      `INSERT INTO news_articles 
      (title, slug, category, desc_text, content, image_url, author, read_time, published_date, is_published)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, COALESCE($9, CURRENT_TIMESTAMP), COALESCE($10, true))
      RETURNING *`,
      [
        title,
        cleanSlug,
        category || 'Field Updates',
        desc_text || '',
        content,
        image_url || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&h=500&q=80',
        author || auth.full_name || 'Possible Health',
        read_time || '4 min read',
        published_date || null,
        is_published !== undefined ? is_published : true,
      ]
    );

    return jsonResponse({
      success: true,
      message: 'Article created successfully',
      article: res.rows[0],
    }, 201);
  } catch (error: any) {
    console.error('Create news error:', error);
    return errorResponse(error.message || 'Server error', 500);
  }
}
