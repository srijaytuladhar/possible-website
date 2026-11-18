import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { jsonResponse, errorResponse, handleOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleOptions();
}

async function ensureTableAndSeed() {
  await query(`
    CREATE TABLE IF NOT EXISTS article_categories (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) UNIQUE NOT NULL,
      slug VARCHAR(100) UNIQUE,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ALTER TABLE article_categories ADD COLUMN IF NOT EXISTS slug VARCHAR(100);
  `);

  // Backfill slugs if null
  await query(`
    UPDATE article_categories 
    SET slug = LOWER(REGEXP_REPLACE(name, '[^a-zA-Z0-9]+', '-', 'g'))
    WHERE slug IS NULL OR slug = '';
  `);

  // Seed standard categories if table is empty
  const countRes = await query('SELECT count(*) FROM article_categories');
  if (parseInt(countRes.rows[0].count, 10) === 0) {
    await query(`
      INSERT INTO article_categories (name, slug, description) VALUES
        ('Field Updates', 'field-updates', 'Dispatches, operational deployments, and community healthcare updates'),
        ('Announcements', 'announcements', 'Organization news, partnerships, awards, and major milestones'),
        ('Research', 'research', 'Scientific publications, clinical studies, and policy evaluations')
      ON CONFLICT (name) DO NOTHING;
    `);
  }
}

// GET all article categories
export async function GET(req: NextRequest) {
  try {
    await ensureTableAndSeed();

    // Query categories from table and union any distinct categories existing in news_articles
    const dbCats = await query('SELECT * FROM article_categories ORDER BY id ASC');
    const existingArticleCats = await query('SELECT DISTINCT category FROM news_articles WHERE category IS NOT NULL');

    const knownNames = new Set(dbCats.rows.map((r: any) => r.name.toLowerCase()));
    const finalCategories = [...dbCats.rows];

    for (const row of existingArticleCats.rows) {
      if (row.category && !knownNames.has(row.category.toLowerCase())) {
        // Auto-register legacy category
        try {
          const insertRes = await query(
            'INSERT INTO article_categories (name, description) VALUES ($1, $2) RETURNING *',
            [row.category, 'Imported from existing news articles']
          );
          finalCategories.push(insertRes.rows[0]);
          knownNames.add(row.category.toLowerCase());
        } catch {
          // Ignore unique race condition
        }
      }
    }

    return jsonResponse({
      success: true,
      categories: finalCategories,
    });
  } catch (error: any) {
    console.error('Fetch article categories error:', error);
    return errorResponse(error.message || 'Server error', 500);
  }
}

// POST create a new article category
export async function POST(req: NextRequest) {
  const auth = getAuthUser(req);
  if (!auth) {
    return errorResponse('Unauthorized: Please log in as admin', 401);
  }

  try {
    await ensureTableAndSeed();
    const body = await req.json();
    const { name, slug, description } = body;

    if (!name || !name.trim()) {
      return errorResponse('Category name is required', 400);
    }

    const trimmedName = name.trim();
    const generatedSlug = (slug && slug.trim() ? slug.trim() : trimmedName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));

    // Check duplicate name
    const checkRes = await query('SELECT id FROM article_categories WHERE LOWER(name) = LOWER($1)', [trimmedName]);
    if (checkRes.rows.length > 0) {
      return errorResponse(`Category "${trimmedName}" already exists`, 400);
    }

    // Check duplicate slug
    const checkSlug = await query('SELECT id FROM article_categories WHERE LOWER(slug) = LOWER($1)', [generatedSlug]);
    if (checkSlug.rows.length > 0) {
      return errorResponse(`Category slug "${generatedSlug}" already exists`, 400);
    }

    const res = await query(
      'INSERT INTO article_categories (name, slug, description) VALUES ($1, $2, $3) RETURNING *',
      [trimmedName, generatedSlug, description ? description.trim() : '']
    );

    return jsonResponse({
      success: true,
      message: 'Category created successfully',
      category: res.rows[0],
    }, 201);
  } catch (error: any) {
    console.error('Create article category error:', error);
    return errorResponse(error.message || 'Server error', 500);
  }
}

// PUT update / rename an article category
export async function PUT(req: NextRequest) {
  const auth = getAuthUser(req);
  if (!auth) {
    return errorResponse('Unauthorized: Please log in as admin', 401);
  }

  try {
    await ensureTableAndSeed();
    const body = await req.json();
    const { id, name, slug, description } = body;

    if (!id || !name || !name.trim()) {
      return errorResponse('Category ID and name are required', 400);
    }

    const trimmedName = name.trim();
    const targetSlug = (slug && slug.trim() ? slug.trim().toLowerCase() : trimmedName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));

    // Fetch existing category
    const catRes = await query('SELECT * FROM article_categories WHERE id = $1', [id]);
    if (catRes.rows.length === 0) {
      return errorResponse('Category not found', 404);
    }
    const oldName = catRes.rows[0].name;

    // Check duplicate name
    const checkRes = await query('SELECT id FROM article_categories WHERE LOWER(name) = LOWER($1) AND id != $2', [trimmedName, id]);
    if (checkRes.rows.length > 0) {
      return errorResponse(`Category name "${trimmedName}" is already in use`, 400);
    }

    // Check duplicate slug
    const checkSlug = await query('SELECT id FROM article_categories WHERE LOWER(slug) = LOWER($1) AND id != $2', [targetSlug, id]);
    if (checkSlug.rows.length > 0) {
      return errorResponse(`Category slug "${targetSlug}" is already in use`, 400);
    }

    // Update category
    const updateRes = await query(
      'UPDATE article_categories SET name = $1, slug = $2, description = $3 WHERE id = $4 RETURNING *',
      [trimmedName, targetSlug, description !== undefined ? description.trim() : catRes.rows[0].description, id]
    );

    // Update all news articles using old category name
    if (oldName !== trimmedName) {
      await query('UPDATE news_articles SET category = $1 WHERE category = $2', [trimmedName, oldName]);
    }

    return jsonResponse({
      success: true,
      message: 'Category updated successfully',
      category: updateRes.rows[0],
    });
  } catch (error: any) {
    console.error('Update article category error:', error);
    return errorResponse(error.message || 'Server error', 500);
  }
}

// DELETE an article category
export async function DELETE(req: NextRequest) {
  const auth = getAuthUser(req);
  if (!auth) {
    return errorResponse('Unauthorized: Please log in as admin', 401);
  }

  try {
    await ensureTableAndSeed();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return errorResponse('Category ID is required', 400);
    }

    const catRes = await query('SELECT * FROM article_categories WHERE id = $1', [id]);
    if (catRes.rows.length === 0) {
      return errorResponse('Category not found', 404);
    }

    const catName = catRes.rows[0].name;

    // Check if category is currently in use by any articles
    const articleCount = await query('SELECT count(*) FROM news_articles WHERE category = $1', [catName]);
    const inUseCount = parseInt(articleCount.rows[0].count, 10);
    if (inUseCount > 0) {
      return errorResponse(`Cannot delete category "${catName}" because it is currently used by ${inUseCount} article(s). Please reassign them first.`, 400);
    }

    await query('DELETE FROM article_categories WHERE id = $1', [id]);

    return jsonResponse({
      success: true,
      message: `Category "${catName}" deleted successfully`,
      id: parseInt(id, 10),
    });
  } catch (error: any) {
    console.error('Delete article category error:', error);
    return errorResponse(error.message || 'Server error', 500);
  }
}

