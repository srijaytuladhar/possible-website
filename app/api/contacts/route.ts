import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { jsonResponse, errorResponse, handleOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleOptions();
}

// GET all contact inquiries (Admin only)
export async function GET(req: NextRequest) {
  const auth = getAuthUser(req);
  if (!auth) {
    return errorResponse('Unauthorized: Admin access required', 401);
  }

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    let sql = 'SELECT * FROM contact_inquiries WHERE 1=1';
    const params: any[] = [];

    if (status && status !== 'ALL') {
      params.push(status);
      sql += ` AND status = $${params.length}`;
    }

    sql += ' ORDER BY created_at DESC';

    const res = await query(sql, params);
    return jsonResponse({
      success: true,
      inquiries: res.rows,
    });
  } catch (error: any) {
    return errorResponse(error.message || 'Server error', 500);
  }
}

// POST submit contact inquiry (Public)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message, office_entity } = body;

    if (!name || !email || !message) {
      return errorResponse('Name, email, and message are required', 400);
    }

    const res = await query(
      `INSERT INTO contact_inquiries (name, email, subject, message, office_entity, status)
      VALUES ($1, $2, $3, $4, $5, 'NEW')
      RETURNING *`,
      [name, email, subject || 'General Inquiry', message, office_entity || 'Sambhav (Possible), Nepal']
    );

    return jsonResponse({
      success: true,
      message: 'Your inquiry has been received. Our team will contact you shortly.',
      inquiry: res.rows[0],
    }, 201);
  } catch (error: any) {
    return errorResponse(error.message || 'Server error', 500);
  }
}
