import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { jsonResponse, errorResponse, handleOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleOptions();
}

// GET single article
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const isNum = !isNaN(Number(id));
    const res = await query(
      isNum ? 'SELECT * FROM news_articles WHERE id = $1' : 'SELECT * FROM news_articles WHERE slug = $1',
      [id]
    );

    if (res.rows.length === 0) {
      return errorResponse('Article not found', 404);
    }

    return jsonResponse({
      success: true,
      article: res.rows[0],
    });
  } catch (error: any) {
    return errorResponse(error.message || 'Server error', 500);
  }
}

// PUT update article
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
      category,
      desc_text,
      content,
      image_url,
      author,
      read_time,
      published_date,
      is_published,
    } = body;

    const res = await query(
      `UPDATE news_articles SET
        title = COALESCE($1, title),
        slug = COALESCE($2, slug),
        category = COALESCE($3, category),
        desc_text = COALESCE($4, desc_text),
        content = COALESCE($5, content),
        image_url = COALESCE($6, image_url),
        author = COALESCE($7, author),
        read_time = COALESCE($8, read_time),
        published_date = COALESCE($9, published_date),
        is_published = COALESCE($10, is_published),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $11
      RETURNING *`,
      [
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
        id,
      ]
    );

    if (res.rows.length === 0) {
      return errorResponse('Article not found', 404);
    }

    return jsonResponse({
      success: true,
      message: 'Article updated successfully',
      article: res.rows[0],
    });
  } catch (error: any) {
    return errorResponse(error.message || 'Server error', 500);
  }
}

// DELETE article
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = getAuthUser(req);
  if (!auth) {
    return errorResponse('Unauthorized', 401);
  }

  const { id } = await params;

  try {
    const res = await query('DELETE FROM news_articles WHERE id = $1 RETURNING id', [id]);
    if (res.rows.length === 0) {
      return errorResponse('Article not found', 404);
    }

    return jsonResponse({
      success: true,
      message: 'Article deleted successfully',
      id: res.rows[0].id,
    });
  } catch (error: any) {
    return errorResponse(error.message || 'Server error', 500);
  }
}
