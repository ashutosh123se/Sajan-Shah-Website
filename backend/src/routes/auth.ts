import { Router } from 'express';
import { register, login, logout, refresh, getMe } from '../controllers/authController';
import { verifyToken } from '../middleware/verifyToken';
import rateLimit from 'express-rate-limit';

const router = Router();

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: { success: false, error: 'Too many authentication attempts, please try again later' }
});

// Public routes
router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.post('/refresh', refresh);

// Protected routes
router.post('/logout', verifyToken, logout);
router.get('/me', verifyToken, getMe);

export default router;
