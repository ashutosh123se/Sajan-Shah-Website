import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUserRole, updateUserStatus, deleteUser } from '../controllers/usersController';
import { verifyToken, requireRole } from '../middleware/verifyToken';

const router = Router();

// All routes are SUPER_ADMIN only
router.get('/', verifyToken, requireRole('SUPER_ADMIN'), getUsers);
router.post('/', verifyToken, requireRole('SUPER_ADMIN'), createUser);
router.get('/:id', verifyToken, requireRole('SUPER_ADMIN'), getUserById);
router.patch('/:id/role', verifyToken, requireRole('SUPER_ADMIN'), updateUserRole);
router.patch('/:id/status', verifyToken, requireRole('SUPER_ADMIN'), updateUserStatus);
router.delete('/:id', verifyToken, requireRole('SUPER_ADMIN'), deleteUser);

export default router;
