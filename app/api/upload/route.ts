import { NextRequest } from 'next/server';
import { getAuthUser, canWriteContent } from '@/lib/auth';
import { jsonResponse, errorResponse, unauthorizedResponse, forbiddenResponse, handleOptions } from '@/lib/cors';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function OPTIONS() {
  return handleOptions();
}

export async function POST(req: NextRequest) {
  try {
    const auth = getAuthUser(req);
    if (!auth) {
      return unauthorizedResponse();
    }
    if (!canWriteContent(auth.role)) {
      return forbiddenResponse('Read-only users cannot upload files');
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return errorResponse('No file provided', 400);
    }

    // Validate mime type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      return errorResponse('Invalid file type. Allowed: JPG, PNG, WEBP, SVG, GIF, PDF', 400);
    }

    // Limit size to 10MB
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return errorResponse('File size exceeds 10MB limit', 400);
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename
    const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const filename = `${Date.now()}-${cleanName}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filePath = path.join(uploadDir, filename);

    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;
    return jsonResponse({
      success: true,
      url: publicUrl,
      filename,
      size: file.size,
      mimeType: file.type
    });
  } catch (error: any) {
    console.error('[Upload Error]', error);
    return errorResponse(error.message || 'File upload failed', 500);
  }
}
