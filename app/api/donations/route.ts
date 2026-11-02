import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { jsonResponse, errorResponse, handleOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleOptions();
}

// GET all donations (Admin only)
export async function GET(req: NextRequest) {
  const auth = getAuthUser(req);
  if (!auth) {
    return errorResponse('Unauthorized: Admin access required', 401);
  }

  try {
    const res = await query('SELECT * FROM donations ORDER BY created_at DESC');
    return jsonResponse({
      success: true,
      donations: res.rows,
    });
  } catch (error: any) {
    return errorResponse(error.message || 'Server error', 500);
  }
}

// POST record new donation / pledge (Public or Admin)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { donor_name, donor_email, amount, currency, donation_type, campaign, message } = body;

    if (!donor_name || !donor_email || !amount) {
      return errorResponse('Donor name, email, and amount are required', 400);
    }

    const txnId = `TXN-${Date.now().toString().slice(-6)}`;

    const res = await query(
      `INSERT INTO donations (donor_name, donor_email, amount, currency, donation_type, campaign, message, transaction_id, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'COMPLETED')
      RETURNING *`,
      [
        donor_name,
        donor_email,
        amount,
        currency || 'USD',
        donation_type || 'ONE_TIME',
        campaign || 'General Healthcare Support',
        message || null,
        txnId,
      ]
    );

    return jsonResponse({
      success: true,
      message: 'Thank you for your generous donation!',
      donation: res.rows[0],
    }, 201);
  } catch (error: any) {
    return errorResponse(error.message || 'Server error', 500);
  }
}
