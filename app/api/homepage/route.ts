import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getAuthUser, canWriteContent, logAudit } from '@/lib/auth';
import { jsonResponse, errorResponse, unauthorizedResponse, forbiddenResponse, handleOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleOptions();
}

// GET /api/homepage
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const all = searchParams.get('all') === 'true';

    let sql = 'SELECT * FROM homepage_sections';
    if (!all) {
      sql += ' WHERE is_published = true';
    }
    sql += ' ORDER BY sort_order ASC, id ASC';

    const res = await query(sql);

    // Also build a convenient key-indexed map for easier frontend consumption
    const sectionsMap: Record<string, any> = {};
    for (const row of res.rows) {
      sectionsMap[row.section_key] = row;
    }

    return jsonResponse({
      success: true,
      sections: res.rows,
      sectionsMap,
    });
  } catch (error: any) {
    console.error('[Get Homepage Error]', error);
    return errorResponse(error.message || 'Server error', 500);
  }
}

// PUT /api/homepage - Update single section or multiple sections
export async function PUT(req: NextRequest) {
  const auth = getAuthUser(req);
  if (!auth) {
    return unauthorizedResponse();
  }
  if (!canWriteContent(auth.role)) {
    return forbiddenResponse('Read-only users cannot modify homepage content');
  }

  try {
    const body = await req.json();
    const { section_key, title, subtitle, content, badge, image_url, link_text, link_url, items, is_published, sort_order } = body;

    if (!section_key) {
      return errorResponse('section_key is required', 400);
    }

    const existingRes = await query('SELECT * FROM homepage_sections WHERE section_key = $1', [section_key]);
    if (existingRes.rows.length === 0) {
      // Insert if not exists
      const insertRes = await query(
        `INSERT INTO homepage_sections
         (section_key, title, subtitle, content, badge, image_url, link_text, link_url, items, is_published, sort_order)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         RETURNING *`,
        [
          section_key,
          title || '',
          subtitle || '',
          content || '',
          badge || '',
          image_url || '',
          link_text || '',
          link_url || '',
          items ? JSON.stringify(items) : '[]',
          is_published !== undefined ? Boolean(is_published) : true,
          sort_order !== undefined ? parseInt(sort_order, 10) : 0,
        ]
      );
      await logAudit(auth, 'CREATE_HOMEPAGE_SECTION', 'HOMEPAGE', section_key);
      return jsonResponse({
        success: true,
        message: `Section '${section_key}' created successfully`,
        section: insertRes.rows[0],
      });
    }

    const current = existingRes.rows[0];
    const updatedTitle = title !== undefined ? title : current.title;
    const updatedSubtitle = subtitle !== undefined ? subtitle : current.subtitle;
    const updatedContent = content !== undefined ? content : current.content;
    const updatedBadge = badge !== undefined ? badge : current.badge;
    const updatedImage = image_url !== undefined ? image_url : current.image_url;
    const updatedLinkText = link_text !== undefined ? link_text : current.link_text;
    const updatedLinkUrl = link_url !== undefined ? link_url : current.link_url;
    const updatedItems = items !== undefined ? JSON.stringify(items) : JSON.stringify(current.items);
    const updatedPublished = is_published !== undefined ? Boolean(is_published) : current.is_published;
    const updatedSort = sort_order !== undefined ? parseInt(sort_order, 10) : current.sort_order;

    const res = await query(
      `UPDATE homepage_sections SET
        title = $1,
        subtitle = $2,
        content = $3,
        badge = $4,
        image_url = $5,
        link_text = $6,
        link_url = $7,
        items = $8,
        is_published = $9,
        sort_order = $10,
        updated_at = CURRENT_TIMESTAMP
       WHERE section_key = $11
       RETURNING *`,
      [
        updatedTitle,
        updatedSubtitle,
        updatedContent,
        updatedBadge,
        updatedImage,
        updatedLinkText,
        updatedLinkUrl,
        updatedItems,
        updatedPublished,
        updatedSort,
        section_key,
      ]
    );

    const updated = res.rows[0];

    await logAudit(auth, 'UPDATE_HOMEPAGE_SECTION', 'HOMEPAGE', section_key, {
      title: updated.title,
      is_published: updated.is_published,
    });

    return jsonResponse({
      success: true,
      message: `Homepage section '${section_key}' updated successfully`,
      section: updated,
    });
  } catch (error: any) {
    console.error('[Update Homepage Error]', error);
    return errorResponse(error.message || 'Server error', 500);
  }
}
