import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { jsonResponse, errorResponse, handleOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleOptions();
}

export async function GET() {
  try {
    const res = await query('SELECT * FROM site_settings');
    const settingsMap: Record<string, any> = {};
    for (const row of res.rows) {
      settingsMap[row.setting_key] = row.setting_value;
    }
    return jsonResponse({
      success: true,
      settings: settingsMap,
    });
  } catch (error: any) {
    return errorResponse(error.message || 'Server error', 500);
  }
}

export async function PUT(req: NextRequest) {
  const auth = getAuthUser(req);
  if (!auth) {
    return errorResponse('Unauthorized', 401);
  }

  try {
    const body = await req.json();
    const { key, value } = body;

    if (!key || value === undefined) {
      return errorResponse('Setting key and value are required', 400);
    }

    const res = await query(
      `INSERT INTO site_settings (setting_key, setting_value)
      VALUES ($1, $2)
      ON CONFLICT (setting_key) DO UPDATE SET
        setting_value = EXCLUDED.setting_value,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *`,
      [key, JSON.stringify(value)]
    );

    return jsonResponse({
      success: true,
      message: 'Setting updated successfully',
      setting: res.rows[0],
    });
  } catch (error: any) {
    return errorResponse(error.message || 'Server error', 500);
  }
}
