import { Router } from 'express';
import { getDashboardStats } from '../controllers/adminController';
import { verifyToken, requireRole } from '../middleware/verifyToken';

const router = Router();

router.get('/stats', verifyToken, requireRole('SUPER_ADMIN', 'ADMIN'), getDashboardStats);

export default router;
