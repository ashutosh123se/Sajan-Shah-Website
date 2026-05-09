import { Router } from 'express';
import { createOrder, verifyPayment, getOrders, getOrderById, updateOrderStatus } from '../controllers/ordersController';
import { verifyToken, requireRole } from '../middleware/verifyToken';

const router = Router();

// Public routes
router.post('/create', createOrder);
router.post('/verify', verifyPayment);

// Protected routes
router.get('/', verifyToken, requireRole('ADMIN', 'SHOP_MANAGER', 'SUPER_ADMIN'), getOrders);
router.get('/:id', verifyToken, requireRole('ADMIN', 'SHOP_MANAGER', 'SUPER_ADMIN'), getOrderById);
router.put('/:id/status', verifyToken, requireRole('ADMIN', 'SHOP_MANAGER', 'SUPER_ADMIN'), updateOrderStatus);

export default router;
