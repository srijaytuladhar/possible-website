import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { query } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'possible-health-admin-portal-super-secret-2026';

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'CONTENT_MANAGER' | 'READ_ONLY';

export interface AdminPayload {
  id: number;
  username: string;
  role: UserRole | string;
  full_name: string;
  permissions?: string[];
}

export function signAdminToken(payload: AdminPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyAdminToken(token: string): AdminPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminPayload;
  } catch {
    return null;
  }
}

export function getAuthUser(req: NextRequest): AdminPayload | null {
  const authHeader = req.headers.get('Authorization') || req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.substring(7);
  return verifyAdminToken(token);
}

// RBAC Permission Helpers
export function isSuperAdmin(role: string): boolean {
  return role === 'SUPER_ADMIN';
}

export function canManageUsers(role: string): boolean {
  return role === 'SUPER_ADMIN' || role === 'ADMIN';
}

export function canWriteContent(role: string): boolean {
  if (role === 'READ_ONLY') return false;
  return role === 'SUPER_ADMIN' || role === 'ADMIN' || role === 'CONTENT_MANAGER';
}

export function canAccessCommunication(role: string): boolean {
  return role === 'SUPER_ADMIN' || role === 'ADMIN';
}

export async function logAudit(
  user: AdminPayload | null,
  action: string,
  module: string,
  recordId?: string | number,
  details?: unknown,
  ipAddress?: string
) {
  try {
    await query(
      `INSERT INTO audit_logs (user_id, username, action, module, record_id, details, ip_address)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        user ? user.id : null,
        user ? user.username : 'SYSTEM',
        action,
        module,
        recordId ? String(recordId) : null,
        details ? JSON.stringify(details) : null,
        ipAddress || 'internal',
      ]
    );
  } catch (err) {
    console.error('[Audit Log Error]', err);
  }
}

