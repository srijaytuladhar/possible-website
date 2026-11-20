import { NextResponse } from 'next/server';

export function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  };
}

export function handleOptions() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(),
  });
}

export function jsonResponse(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: corsHeaders(),
  });
}

export function errorResponse(message: string, status = 400) {
  return NextResponse.json(
    { success: false, error: message },
    {
      status,
      headers: corsHeaders(),
    }
  );
}

export function unauthorizedResponse(message = 'Unauthorized: Authentication required') {
  return errorResponse(message, 401);
}

export function forbiddenResponse(message = 'Forbidden: Insufficient permissions for this operation') {
  return errorResponse(message, 403);
}

