import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

import fs from 'fs';
import path from 'path';

export const uploadToCloudinary = (
  fileBuffer: Buffer,
  folder: string,
  width?: number,
  height?: number,
  crop: 'fill' | 'limit' = 'fill',
  quality: number = 80
): Promise<string> => {
  // Fallback to local upload if cloudinary is not properly configured
  if (!process.env.CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY === 'your_api_key') {
    return new Promise((resolve, reject) => {
      try {
        const uploadDir = path.join(__dirname, '../../../frontend/public/uploads', folder);
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
        const filePath = path.join(uploadDir, fileName);
        fs.writeFileSync(filePath, fileBuffer);
        // Ensure forward slashes for the URL
        resolve(`/uploads/${folder}/${fileName}`.replace(/\\/g, '/'));
      } catch (err) {
        reject(err);
      }
    });
  }

  return new Promise((resolve, reject) => {
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
