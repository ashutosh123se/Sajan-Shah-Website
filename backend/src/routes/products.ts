import { Router } from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productsController';
import { verifyToken, requireRole } from '../middleware/verifyToken';

const router = Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Protected routes
router.post('/', verifyToken, requireRole('SUPER_ADMIN', 'ADMIN', 'SHOP_MANAGER'), createProduct);
router.put('/:id', verifyToken, requireRole('SUPER_ADMIN', 'ADMIN', 'SHOP_MANAGER'), updateProduct);
router.delete('/:id', verifyToken, requireRole('SUPER_ADMIN', 'ADMIN'), deleteProduct);

export default router;
