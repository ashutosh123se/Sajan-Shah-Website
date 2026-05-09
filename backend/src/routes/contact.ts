import { Router } from 'express';
import { submitContact, getContactMessages, markAsRead, replyToMessage } from '../controllers/contactController';
import { verifyToken, requireRole } from '../middleware/verifyToken';

const router = Router();

// Public routes
router.post('/', submitContact);

// Protected routes
router.get('/', verifyToken, requireRole('ADMIN', 'SUPER_ADMIN'), getContactMessages);
router.put('/:id/read', verifyToken, requireRole('ADMIN', 'SUPER_ADMIN'), markAsRead);
router.post('/:id/reply', verifyToken, requireRole('ADMIN', 'SUPER_ADMIN'), replyToMessage);

export default router;
