import { Router } from 'express';
import {
  getHomePageSections,
  getAllHomePageSections,
  updateHomePageSection,
  createHomePageSection,
  deleteHomePageSection
} from '../controllers/homePageController';
import { verifyToken, requireRole } from '../middleware/verifyToken';

const router = Router();

// Public routes
router.get('/', getHomePageSections);

// Admin routes
router.get('/all', verifyToken as any, requireRole('SUPER_ADMIN', 'ADMIN', 'EDITOR') as any, getAllHomePageSections as any);
router.post('/', verifyToken as any, requireRole('SUPER_ADMIN', 'ADMIN') as any, createHomePageSection as any);
router.put('/:id', verifyToken as any, requireRole('SUPER_ADMIN', 'ADMIN', 'EDITOR') as any, updateHomePageSection as any);
router.delete('/:id', verifyToken as any, requireRole('SUPER_ADMIN', 'ADMIN') as any, deleteHomePageSection as any);

export default router;
