import { Router } from 'express';
import { getLegalPages, getLegalPageBySlug, updateLegalPage } from '../controllers/legalController';
import { verifyToken, requireRole } from '../middleware/verifyToken';

const router = Router();

// Public routes
router.get('/', getLegalPages);
router.get('/:slug', getLegalPageBySlug);

// Protected routes
router.put('/:slug', verifyToken, requireRole('SUPER_ADMIN', 'ADMIN'), updateLegalPage);

export default router;
