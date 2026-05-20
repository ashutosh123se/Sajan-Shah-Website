import { Router } from 'express';
import {
  getSpeakingSections,
  getAllSpeakingSections,
  updateSpeakingSection,
  createSpeakingSection,
  deleteSpeakingSection,
} from '../controllers/speakingController';
import { verifyToken, requireRole } from '../middleware/verifyToken';

const router = Router();

// Public routes
router.get('/', getSpeakingSections);

// Admin routes
router.get('/all', verifyToken as any, requireRole('SUPER_ADMIN', 'ADMIN', 'EDITOR') as any, getAllSpeakingSections as any);
router.post('/', verifyToken as any, requireRole('SUPER_ADMIN', 'ADMIN') as any, createSpeakingSection as any);
router.put('/:id', verifyToken as any, requireRole('SUPER_ADMIN', 'ADMIN', 'EDITOR') as any, updateSpeakingSection as any);
router.delete('/:id', verifyToken as any, requireRole('SUPER_ADMIN', 'ADMIN') as any, deleteSpeakingSection as any);

export default router;
