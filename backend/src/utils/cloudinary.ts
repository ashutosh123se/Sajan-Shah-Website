import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = (
  fileBuffer: Buffer,
  folder: string,
  width?: number,
  height?: number,
  crop: 'fill' | 'limit' = 'fill',
  quality: number = 80
): Promise<string> => {
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
