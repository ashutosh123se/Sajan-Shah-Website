import { Router } from 'express';
import {
  getContributionsPageSections,
  getAllContributionsPageSections,
  updateContributionsPageSection,
  createContributionsPageSection,
  deleteContributionsPageSection,
} from '../controllers/contributionsPageController';
import { verifyToken, requireRole } from '../middleware/verifyToken';

const router = Router();

// Public routes
router.get('/', getContributionsPageSections);

// Admin routes
router.get('/all', verifyToken as any, requireRole('SUPER_ADMIN', 'ADMIN', 'EDITOR') as any, getAllContributionsPageSections as any);
router.post('/', verifyToken as any, requireRole('SUPER_ADMIN', 'ADMIN') as any, createContributionsPageSection as any);
router.put('/:id', verifyToken as any, requireRole('SUPER_ADMIN', 'ADMIN', 'EDITOR') as any, updateContributionsPageSection as any);
router.delete('/:id', verifyToken as any, requireRole('SUPER_ADMIN', 'ADMIN') as any, deleteContributionsPageSection as any);

export default router;
