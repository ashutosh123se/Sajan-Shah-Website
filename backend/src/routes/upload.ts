import { Router, Request, Response } from 'express';
import multer from 'multer';
import { verifyToken, requireRole } from '../middleware/verifyToken';
import { uploadToCloudinary } from '../utils/cloudinary';
import { sendSuccess, sendError } from '../utils/apiResponse';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

router.post(
  '/',
  verifyToken,
  requireRole('SUPER_ADMIN', 'ADMIN', 'EDITOR'),
  upload.single('image'),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return sendError(res, 'No image file uploaded.', 400);
      }

      const folder = typeof req.body.folder === 'string' ? req.body.folder : 'uploads';
      const imageUrl = await uploadToCloudinary(req.file.buffer, folder, undefined, undefined, 'limit', 85);

      return sendSuccess(res, { imageUrl }, 'Image uploaded successfully');
    } catch (error) {
      console.error('Image upload error:', error);
      return sendError(res, 'Image upload failed. Check Cloudinary configuration.', 500);
    }
  }
);

export default router;
