import { NextRequest } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { jsonResponse, unauthorizedResponse, handleOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleOptions();
}

export async function GET(req: NextRequest) {
  const auth = getAuthUser(req);
  if (!auth) {
    return unauthorizedResponse();
  }

  const roles = [
    {
      key: 'SUPER_ADMIN',
      name: 'Super Admin',
      description: 'Unrestricted full access across all modules, system configurations, and user administrative operations.',
      permissions: {
        homepage: { view: true, create: true, edit: true, delete: true },
        collaborators: { view: true, create: true, edit: true, delete: true },
        work_with_us: { view: true, create: true, edit: true, delete: true },
        content_modules: { view: true, create: true, edit: true, delete: true },
        user_management: { view: true, create: true, edit: true, delete: true, manage_super_admin: true },
        communications: { view: true, manage: true },
      }
    },
    {
      key: 'ADMIN',
      name: 'Admin',
      description: 'Full management of all content, communications, and standard users. Cannot delete or alter Super Admin accounts.',
      permissions: {
        homepage: { view: true, create: true, edit: true, delete: true },
        collaborators: { view: true, create: true, edit: true, delete: true },
        work_with_us: { view: true, create: true, edit: true, delete: true },
        content_modules: { view: true, create: true, edit: true, delete: true },
        user_management: { view: true, create: true, edit: true, delete: true, manage_super_admin: false },
        communications: { view: true, manage: true },
      }
    },
    {
      key: 'CONTENT_MANAGER',
      name: 'Content Manager',
      description: 'Can view, create, edit, and delete public website content across all content modules. Cannot access user management or donor communications.',
      permissions: {
        homepage: { view: true, create: true, edit: true, delete: true },
        collaborators: { view: true, create: true, edit: true, delete: true },
        work_with_us: { view: true, create: true, edit: true, delete: true },
        content_modules: { view: true, create: true, edit: true, delete: true },
        user_management: { view: false, create: false, edit: false, delete: false, manage_super_admin: false },
        communications: { view: false, manage: false },
      }
    },
    {
      key: 'READ_ONLY',
      name: 'Read Only',
      description: 'Read-only access across portal content modules. Cannot modify, create, publish, or delete any content or users.',
      permissions: {
        homepage: { view: true, create: false, edit: false, delete: false },
        collaborators: { view: true, create: false, edit: false, delete: false },
        work_with_us: { view: true, create: false, edit: false, delete: false },
        content_modules: { view: true, create: false, edit: false, delete: false },
        user_management: { view: false, create: false, edit: false, delete: false, manage_super_admin: false },
        communications: { view: false, manage: false },
      }
    }
  ];

  return jsonResponse({
    success: true,
    roles,
  });
}
