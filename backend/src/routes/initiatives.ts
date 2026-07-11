import { Router } from 'express';
import { getInitiatives, getAllInitiatives, createInitiative, updateInitiative, deleteInitiative } from '../controllers/initiativesController';
import { verifyToken, requireRole } from '../middleware/verifyToken';

const router = Router();

// Public routes
router.get('/', getInitiatives);

// Admin routes
router.get('/admin/all', verifyToken, requireRole('SUPER_ADMIN', 'ADMIN', 'EDITOR'), getAllInitiatives);

// Protected routes
router.post('/', verifyToken, requireRole('ADMIN', 'EDITOR'), createInitiative);
router.put('/:id', verifyToken, requireRole('ADMIN', 'EDITOR'), updateInitiative);
router.delete('/:id', verifyToken, requireRole('ADMIN', 'SUPER_ADMIN'), deleteInitiative);

export default router;
