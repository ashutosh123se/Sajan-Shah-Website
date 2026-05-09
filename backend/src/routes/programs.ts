import { Router } from 'express';
import { getPrograms, getProgramById, createProgram, updateProgram, deleteProgram, enrollInProgram } from '../controllers/programsController';
import { verifyToken, requireRole } from '../middleware/verifyToken';

const router = Router();

// Public routes
router.get('/', getPrograms);
router.get('/:id', getProgramById);

// Protected routes
router.post('/', verifyToken, requireRole('ADMIN', 'EDITOR'), createProgram);
router.put('/:id', verifyToken, requireRole('ADMIN', 'EDITOR'), updateProgram);
router.delete('/:id', verifyToken, requireRole('ADMIN', 'SUPER_ADMIN'), deleteProgram);
router.post('/:id/enroll', verifyToken, requireRole('CUSTOMER'), enrollInProgram);

export default router;
