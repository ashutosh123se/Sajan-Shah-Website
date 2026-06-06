import { Router } from 'express';
import { createOrder, verifyPayment, getOrders, getOrderById, updateOrderStatus, getMyOrders } from '../controllers/ordersController';
import { verifyToken, requireRole } from '../middleware/verifyToken';

const router = Router();

// Public routes
router.post('/create', createOrder);
router.post('/verify', verifyPayment);

// Protected routes
router.get('/my-orders', verifyToken, getMyOrders);
router.get('/', verifyToken, requireRole('SUPER_ADMIN', 'ADMIN', 'SHOP_MANAGER'), getOrders);
router.get('/:id', verifyToken, requireRole('SUPER_ADMIN', 'ADMIN', 'SHOP_MANAGER'), getOrderById);
router.patch('/:id/status', verifyToken, requireRole('SUPER_ADMIN', 'ADMIN', 'SHOP_MANAGER'), updateOrderStatus);

export default router;
