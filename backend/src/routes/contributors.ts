import { Router } from 'express';
import { getContributors, createContributor, updateContributor, deleteContributor } from '../controllers/contributorsController';
import { verifyToken, requireRole } from '../middleware/verifyToken';

const router = Router();

// Public routes
router.get('/', getContributors);

// Protected routes
router.post('/', verifyToken, requireRole('ADMIN', 'EDITOR'), createContributor);
router.put('/:id', verifyToken, requireRole('ADMIN', 'EDITOR'), updateContributor);
router.delete('/:id', verifyToken, requireRole('ADMIN', 'SUPER_ADMIN'), deleteContributor);

export default router;
