import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

const isPlaceholder = (value?: string) =>
  !value ||
  value.includes('your-') ||
  value.includes('your_') ||
  value.includes('xxxxxxxxxxxxxxx');

export const isCloudinaryConfigured = () =>
  !isPlaceholder(process.env.CLOUDINARY_CLOUD_NAME) &&
  !isPlaceholder(process.env.CLOUDINARY_API_KEY) &&
  !isPlaceholder(process.env.CLOUDINARY_API_SECRET);

if (isCloudinaryConfigured()) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export const uploadToCloudinary = (
  fileBuffer: Buffer,
  folder: string,
  width?: number,
  height?: number,
  crop: 'fill' | 'limit' = 'fill',
  quality: number = 80
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!isCloudinaryConfigured()) {
      return reject(new Error('Cloudinary is not configured'));
    }

    const transformation: any[] = [];
    if (width && height) {
      transformation.push({ width, height, crop });
    } else if (width) {
      transformation.push({ width, crop });
    }
    transformation.push({ fetch_format: 'webp', quality });

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        transformation,
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error('Cloudinary upload returned empty result'));
        resolve(result.secure_url);
      }
    );

    uploadStream.end(fileBuffer);
  });
};

/** Local disk fallback when Cloudinary env vars are missing/placeholders. */
export const uploadToLocal = async (
  fileBuffer: Buffer,
  folder: string,
  originalName?: string
): Promise<string> => {
  const safeFolder = folder.replace(/[^a-zA-Z0-9/_-]/g, '').replace(/\.\./g, '') || 'uploads';
  const uploadsRoot = path.join(__dirname, '..', '..', 'uploads');
  const targetDir = path.join(uploadsRoot, ...safeFolder.split('/').filter(Boolean));
  fs.mkdirSync(targetDir, { recursive: true });

  const ext = path.extname(originalName || '') || '.png';
  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}${ext}`;
  const fullPath = path.join(targetDir, filename);
  fs.writeFileSync(fullPath, fileBuffer);

  const baseUrl = (process.env.BACKEND_PUBLIC_URL || `http://localhost:${process.env.PORT || 5001}`).replace(/\/$/, '');
  return `${baseUrl}/uploads/${safeFolder}/${filename}`.replace(/([^:]\/)\/+/g, '$1');
};
