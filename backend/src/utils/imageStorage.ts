import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

/** Save image on the server under backend/uploads and return a public URL. */
export const uploadToLocal = async (
  fileBuffer: Buffer,
  folder: string,
  originalName?: string
): Promise<string> => {
  const safeFolder = folder.replace(/[^a-zA-Z0-9/_-]/g, '').replace(/\.\./g, '') || 'uploads';
  const uploadsRoot = path.join(process.cwd(), 'uploads');
  const targetDir = path.join(uploadsRoot, ...safeFolder.split('/').filter(Boolean));
  fs.mkdirSync(targetDir, { recursive: true });

  const ext = path.extname(originalName || '') || '.png';
  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}${ext}`;
  const fullPath = path.join(targetDir, filename);
  fs.writeFileSync(fullPath, fileBuffer);

  const relativePath = `/uploads/${safeFolder}/${filename}`.replace(/([^:]\/)\/+/g, '$1');
  const publicBase = process.env.BACKEND_PUBLIC_URL?.replace(/\/$/, '');

  if (publicBase) {
    return `${publicBase}${relativePath}`;
  }

  // Relative path — frontend resolves via NEXT_PUBLIC_API_URL at display time
  return relativePath;
};

/** Upload entry point — always stores files locally on the server. */
export const uploadImage = async (
  fileBuffer: Buffer,
  folder: string,
  originalName?: string
): Promise<string> => {
  return uploadToLocal(fileBuffer, folder, originalName);
};
