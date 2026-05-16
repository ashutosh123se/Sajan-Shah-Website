import { Router } from 'express';
import { register, login, logout, refresh, getMe, verifyPasswordSetupToken, setPassword } from '../controllers/authController';
import { verifyToken } from '../middleware/verifyToken';
import rateLimit from 'express-rate-limit';

const router = Router();

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Increased for development/testing
  message: { success: false, error: 'Too many authentication attempts, please try again later' }
});

// Public routes
router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.post('/refresh', refresh);

// Protected routes
router.post('/logout', verifyToken, logout);
router.get('/me', verifyToken, getMe);

// Password setup routes
router.get('/verify-password-token', authLimiter, verifyPasswordSetupToken as any);
router.post('/set-password', authLimiter, setPassword as any);

export default router;
