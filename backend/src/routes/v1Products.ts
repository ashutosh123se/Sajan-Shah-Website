import { Router } from 'express';
import multer from 'multer';
import {
  getProducts,
  getAllProductsAdmin,
  getFeaturedProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  featureProduct,
  getFeaturedSlots,
  uploadHomepageImage,
  uploadProductImage,
} from '../controllers/v1ProductsController';
import { verifyToken, requireRole } from '../middleware/verifyToken';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Auth check: allow SUPER_ADMIN, ADMIN, and EDITOR roles
const adminAuth = [verifyToken, requireRole('SUPER_ADMIN', 'ADMIN', 'EDITOR')];

// ── Public Endpoints ────────────────────────────────────────────────────────
router.get('/products', getProducts);
router.get('/products/featured', getFeaturedProducts);
router.get('/products/:slug', getProductBySlug);

// ── Admin Endpoints ─────────────────────────────────────────────────────────
router.get('/admin/products', ...adminAuth, getAllProductsAdmin);
router.post('/admin/products', ...adminAuth, createProduct);
router.put('/admin/products/:id', ...adminAuth, updateProduct);
router.delete('/admin/products/:id', ...adminAuth, deleteProduct);
router.patch('/admin/products/:id/feature', ...adminAuth, featureProduct);
router.get('/admin/products/featured-slots', ...adminAuth, getFeaturedSlots);

router.post('/admin/products/:id/upload-homepage-image', ...adminAuth, upload.single('image'), uploadHomepageImage);
router.post('/admin/products/:id/upload-product-image', ...adminAuth, upload.single('image'), uploadProductImage);

export default router;
