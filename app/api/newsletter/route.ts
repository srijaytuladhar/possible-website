import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { jsonResponse, errorResponse, handleOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleOptions();
}

// GET newsletter subscribers (Admin only)
export async function GET(req: NextRequest) {
  const auth = getAuthUser(req);
  if (!auth) {
    return errorResponse('Unauthorized', 401);
  }

  try {
    const res = await query('SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC');
    return jsonResponse({
      success: true,
      subscribers: res.rows,
    });
  } catch (error: any) {
    return errorResponse(error.message || 'Server error', 500);
  }
}

// POST subscribe to newsletter (Public)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, source } = body;

    if (!email || !email.includes('@')) {
      return errorResponse('A valid email address is required', 400);
    }

    const res = await query(
      `INSERT INTO newsletter_subscribers (email, source)
      VALUES ($1, $2)
      ON CONFLICT (email) DO UPDATE SET is_active = true
      RETURNING *`,
      [email.toLowerCase().trim(), source || 'Website']
    );

    return jsonResponse({
      success: true,
      message: 'Successfully subscribed to Possible Health updates!',
      subscriber: res.rows[0],
    }, 201);
  } catch (error: any) {
    return errorResponse(error.message || 'Server error', 500);
  }
}

// DELETE subscriber (Admin only)
export async function DELETE(req: NextRequest) {
  const auth = getAuthUser(req);
  if (!auth) {
    return errorResponse('Unauthorized', 401);
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return errorResponse('ID is required', 400);

    await query('DELETE FROM newsletter_subscribers WHERE id = $1', [id]);
    return jsonResponse({
      success: true,
      message: 'Subscriber removed successfully',
    });
  } catch (error: any) {
    return errorResponse(error.message || 'Server error', 500);
  }
}
