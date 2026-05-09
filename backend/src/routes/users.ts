import { Router } from 'express';
import { getUsers, getUserById, updateUserRole, deleteUser } from '../controllers/usersController';
import { verifyToken, requireRole } from '../middleware/verifyToken';

const router = Router();

// All routes are SUPER_ADMIN only
router.get('/', verifyToken, requireRole('SUPER_ADMIN'), getUsers);
router.get('/:id', verifyToken, requireRole('SUPER_ADMIN'), getUserById);
router.put('/:id/role', verifyToken, requireRole('SUPER_ADMIN'), updateUserRole);
router.delete('/:id', verifyToken, requireRole('SUPER_ADMIN'), deleteUser);

export default router;
