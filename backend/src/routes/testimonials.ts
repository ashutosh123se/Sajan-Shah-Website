import { Router } from 'express';
import { getTestimonials, getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../controllers/testimonialsController';
import { verifyToken, requireRole } from '../middleware/verifyToken';

const router = Router();

// Public routes
router.get('/', getTestimonials);

// Admin routes
router.get('/admin/all', verifyToken, requireRole('SUPER_ADMIN', 'ADMIN', 'EDITOR'), getAllTestimonials);

// Protected routes
router.post('/', verifyToken, requireRole('ADMIN', 'EDITOR'), createTestimonial);
router.put('/:id', verifyToken, requireRole('ADMIN', 'EDITOR'), updateTestimonial);
router.delete('/:id', verifyToken, requireRole('ADMIN', 'SUPER_ADMIN'), deleteTestimonial);

export default router;
