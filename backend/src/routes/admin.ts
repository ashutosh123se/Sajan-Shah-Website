import { Router } from 'express';
import { getDashboardStats, reseedCmsContent } from '../controllers/adminController';
import { verifyToken, requireRole } from '../middleware/verifyToken';

const router = Router();

router.get('/stats', verifyToken, requireRole('SUPER_ADMIN', 'ADMIN'), getDashboardStats);
router.post('/reseed-content', verifyToken, requireRole('SUPER_ADMIN', 'ADMIN'), reseedCmsContent);

export default router;
