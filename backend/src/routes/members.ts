import { Router } from 'express';
import { getMembers, getMemberById, createMember, updateMember, deleteMember, applyForMember } from '../controllers/membersController';
import { verifyToken, requireRole } from '../middleware/verifyToken';

const router = Router();

// Public routes
router.get('/', getMembers);
router.get('/:id', getMemberById);
router.post('/apply', applyForMember);

// Protected routes
router.post('/', verifyToken, requireRole('ADMIN', 'EDITOR'), createMember);
router.put('/:id', verifyToken, requireRole('ADMIN', 'EDITOR'), updateMember);
router.delete('/:id', verifyToken, requireRole('ADMIN', 'SUPER_ADMIN'), deleteMember);

export default router;
