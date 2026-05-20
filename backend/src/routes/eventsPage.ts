import { Router } from 'express';
import {
  getEventsPageSections,
  getAllEventsPageSections,
  updateEventsPageSection,
  createEventsPageSection,
  deleteEventsPageSection,
} from '../controllers/eventsPageController';
import { verifyToken, requireRole } from '../middleware/verifyToken';

const router = Router();

// Public routes
router.get('/', getEventsPageSections);

// Admin routes
router.get('/all', verifyToken as any, requireRole('SUPER_ADMIN', 'ADMIN', 'EDITOR') as any, getAllEventsPageSections as any);
router.post('/', verifyToken as any, requireRole('SUPER_ADMIN', 'ADMIN') as any, createEventsPageSection as any);
router.put('/:id', verifyToken as any, requireRole('SUPER_ADMIN', 'ADMIN', 'EDITOR') as any, updateEventsPageSection as any);
router.delete('/:id', verifyToken as any, requireRole('SUPER_ADMIN', 'ADMIN') as any, deleteEventsPageSection as any);

export default router;
