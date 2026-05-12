import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController';
import { verifyToken, requireRole } from '../middleware/verifyToken';

const router = Router();

// Only Super Admin can manage system settings
router.use(verifyToken);
router.use(requireRole('SuperAdmin', 'SUPER_ADMIN'));

router.get('/', getSettings);
router.patch('/', updateSettings);

export default router;
