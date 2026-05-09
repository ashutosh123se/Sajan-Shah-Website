import { Router } from 'express';
import { subscribe, getSubscribers, exportSubscribers, unsubscribe } from '../controllers/newsletterController';
import { verifyToken, requireRole } from '../middleware/verifyToken';

const router = Router();

// Public routes
router.post('/', subscribe);

// Protected routes
router.get('/', verifyToken, requireRole('ADMIN', 'SUPER_ADMIN'), getSubscribers);
router.get('/export', verifyToken, requireRole('ADMIN', 'SUPER_ADMIN'), exportSubscribers);
router.delete('/:id', verifyToken, requireRole('ADMIN', 'SUPER_ADMIN'), unsubscribe);

export default router;
