import { Router } from 'express';
import { 
  getAboutSections, 
  getAllAboutSections, 
  updateAboutSection, 
  createAboutSection, 
  deleteAboutSection 
} from '../controllers/aboutController';
import { verifyToken, requireRole } from '../middleware/verifyToken';

const router = Router();

// Public routes
router.get('/', getAboutSections);

// Admin routes
router.get('/all', verifyToken as any, requireRole('SUPER_ADMIN', 'ADMIN', 'EDITOR') as any, getAllAboutSections as any);
router.post('/', verifyToken as any, requireRole('SUPER_ADMIN', 'ADMIN') as any, createAboutSection as any);
router.put('/:id', verifyToken as any, requireRole('SUPER_ADMIN', 'ADMIN', 'EDITOR') as any, updateAboutSection as any);
router.delete('/:id', verifyToken as any, requireRole('SUPER_ADMIN', 'ADMIN') as any, deleteAboutSection as any);

export default router;
