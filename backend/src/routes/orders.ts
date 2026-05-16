import { Router } from 'express';
import { createOrder, verifyPayment, getOrders, getOrderById, updateOrderStatus, getMyOrders } from '../controllers/ordersController';
import { verifyToken, requireRole } from '../middleware/verifyToken';

const router = Router();

// Public routes
router.post('/create', createOrder);
router.post('/verify', verifyPayment);

// Protected routes
router.get('/my-orders', verifyToken, getMyOrders);
router.get('/', verifyToken, requireRole('ADMIN', 'SHOP_MANAGER', 'SUPER_ADMIN', 'EDITOR'), getOrders);
router.get('/:id', verifyToken, requireRole('ADMIN', 'SHOP_MANAGER', 'SUPER_ADMIN', 'EDITOR'), getOrderById);
router.patch('/:id/status', verifyToken, requireRole('ADMIN', 'SHOP_MANAGER', 'SUPER_ADMIN', 'EDITOR'), updateOrderStatus);

export default router;
