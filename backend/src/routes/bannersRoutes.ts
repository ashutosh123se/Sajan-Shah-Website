import { Router } from 'express';
import { getActiveBanner, getAllBanners, createBanner, updateBanner, deleteBanner } from '../controllers/bannersController';
import { verifyToken, requireRole } from '../middleware/verifyToken';

const router = Router();

// Public route to get the active banner
router.get('/active', getActiveBanner);

// Protected routes for admin
router.use(verifyToken);
router.use(requireRole('SuperAdmin', 'Admin', 'SUPER_ADMIN', 'ADMIN'));

router.get('/', getAllBanners);
router.post('/', createBanner);
router.put('/:id', updateBanner);
router.delete('/:id', deleteBanner);

export default router;
