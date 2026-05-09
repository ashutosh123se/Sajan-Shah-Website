import { Router } from 'express';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../controllers/testimonialsController';
import { verifyToken, requireRole } from '../middleware/verifyToken';

const router = Router();

// Public routes
router.get('/', getTestimonials);

// Protected routes
router.post('/', verifyToken, requireRole('ADMIN', 'EDITOR'), createTestimonial);
router.put('/:id', verifyToken, requireRole('ADMIN', 'EDITOR'), updateTestimonial);
router.delete('/:id', verifyToken, requireRole('ADMIN', 'SUPER_ADMIN'), deleteTestimonial);

export default router;
