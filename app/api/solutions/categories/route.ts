import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { jsonResponse, errorResponse, handleOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleOptions();
}

async function ensureTableAndSeed() {
  await query(`
    CREATE TABLE IF NOT EXISTS solutions_categories (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(100) UNIQUE NOT NULL,
      name VARCHAR(150) NOT NULL,
      description TEXT,
      sort_order INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const countRes = await query('SELECT count(*) FROM solutions_categories');
  if (parseInt(countRes.rows[0].count, 10) === 0) {
    await query(`
      INSERT INTO solutions_categories (slug, name, description, sort_order) VALUES
        ('scale', 'Scale', 'National expansion and public healthcare integration models', 1),
        ('test', 'Test', 'Clinical trials, cluster randomized evaluations, and pilots', 2),
        ('innovate', 'Innovate', 'Human-centered design and prototype healthcare technologies', 3),
        ('pipeline', 'Pipeline', 'Upcoming initiatives and research proposals in development', 4)
      ON CONFLICT (slug) DO NOTHING;
    `);
  }
}

// GET all solutions categories
export async function GET(req: NextRequest) {
  try {
    await ensureTableAndSeed();

    const dbCats = await query('SELECT * FROM solutions_categories ORDER BY sort_order ASC, id ASC');
    const existingStages = await query('SELECT DISTINCT stage_id FROM solutions_projects WHERE stage_id IS NOT NULL');

    const knownSlugs = new Set(dbCats.rows.map((r: any) => r.slug.toLowerCase()));
    const finalCategories = [...dbCats.rows];

    for (const row of existingStages.rows) {
      const stageSlug = row.stage_id ? row.stage_id.trim().toLowerCase() : '';
      if (stageSlug && !knownSlugs.has(stageSlug)) {
        const stageName = row.stage_id.charAt(0).toUpperCase() + row.stage_id.slice(1);
        try {
          const insertRes = await query(
            'INSERT INTO solutions_categories (slug, name, description, sort_order) VALUES ($1, $2, $3, $4) RETURNING *',
            [stageSlug, stageName, 'Imported from existing projects', finalCategories.length + 1]
          );
          finalCategories.push(insertRes.rows[0]);
          knownSlugs.add(stageSlug);
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
    console.error('Fetch solutions categories error:', error);
    return errorResponse(error.message || 'Server error', 500);
  }
}

// POST create solution category
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

    // Check slug uniqueness
    const checkRes = await query('SELECT id FROM solutions_categories WHERE LOWER(slug) = LOWER($1)', [generatedSlug]);
    if (checkRes.rows.length > 0) {
      return errorResponse(`Category slug "${generatedSlug}" already exists`, 400);
    }

    const maxSort = await query('SELECT COALESCE(MAX(sort_order), 0) as max_sort FROM solutions_categories');
    const nextSort = parseInt(maxSort.rows[0].max_sort, 10) + 1;

    const res = await query(
      'INSERT INTO solutions_categories (slug, name, description, sort_order) VALUES ($1, $2, $3, $4) RETURNING *',
      [generatedSlug, trimmedName, description ? description.trim() : '', nextSort]
    );

    return jsonResponse({
      success: true,
      message: 'Category created successfully',
      category: res.rows[0],
    }, 201);
  } catch (error: any) {
    console.error('Create solution category error:', error);
    return errorResponse(error.message || 'Server error', 500);
  }
}

// PUT update / rename solution category
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
    const catRes = await query('SELECT * FROM solutions_categories WHERE id = $1', [id]);
    if (catRes.rows.length === 0) {
      return errorResponse('Category not found', 404);
    }
    const oldSlug = catRes.rows[0].slug;
    const newSlug = slug && slug.trim() ? slug.trim().toLowerCase() : oldSlug;

    // Check duplicate slug
    if (newSlug !== oldSlug) {
      const checkRes = await query('SELECT id FROM solutions_categories WHERE LOWER(slug) = LOWER($1) AND id != $2', [newSlug, id]);
      if (checkRes.rows.length > 0) {
        return errorResponse(`Category slug "${newSlug}" is already in use`, 400);
      }
    }

    const updateRes = await query(
      'UPDATE solutions_categories SET name = $1, slug = $2, description = $3 WHERE id = $4 RETURNING *',
      [trimmedName, newSlug, description !== undefined ? description.trim() : catRes.rows[0].description, id]
    );

    // Update associated solution projects if slug changed
    if (oldSlug !== newSlug) {
      await query('UPDATE solutions_projects SET stage_id = $1 WHERE LOWER(stage_id) = LOWER($2)', [newSlug, oldSlug]);
    }

    return jsonResponse({
      success: true,
      message: 'Category updated successfully',
      category: updateRes.rows[0],
    });
  } catch (error: any) {
    console.error('Update solution category error:', error);
    return errorResponse(error.message || 'Server error', 500);
  }
}

// DELETE solution category
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

    const catRes = await query('SELECT * FROM solutions_categories WHERE id = $1', [id]);
    if (catRes.rows.length === 0) {
      return errorResponse('Category not found', 404);
    }

    const catSlug = catRes.rows[0].slug;

    // Check if category is currently used by any projects
    const countRes = await query('SELECT count(*) FROM solutions_projects WHERE LOWER(stage_id) = LOWER($1)', [catSlug]);
    const inUseCount = parseInt(countRes.rows[0].count, 10);
    if (inUseCount > 0) {
      return errorResponse(`Cannot delete category "${catRes.rows[0].name}" because it is currently used by ${inUseCount} project(s). Please reassign them first.`, 400);
    }

    await query('DELETE FROM solutions_categories WHERE id = $1', [id]);

    return jsonResponse({
      success: true,
      message: `Category "${catRes.rows[0].name}" deleted successfully`,
      id: parseInt(id, 10),
    });
  } catch (error: any) {
    console.error('Delete solution category error:', error);
    return errorResponse(error.message || 'Server error', 500);
  }
}

