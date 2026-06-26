import { Router } from 'express';
import { getEvents, getAllEventsAdmin, getEventById, createEvent, updateEvent, deleteEvent } from '../controllers/eventsController';
import { verifyToken, requireRole } from '../middleware/verifyToken';

const router = Router();

// Public routes
router.get('/', getEvents);
router.get('/admin/all', verifyToken, requireRole('SUPER_ADMIN', 'ADMIN', 'EDITOR'), getAllEventsAdmin);
router.get('/:id', getEventById);

// Protected routes
router.post('/', verifyToken, requireRole('SUPER_ADMIN', 'ADMIN', 'EDITOR'), createEvent);
router.put('/:id', verifyToken, requireRole('SUPER_ADMIN', 'ADMIN', 'EDITOR'), updateEvent);
router.delete('/:id', verifyToken, requireRole('SUPER_ADMIN', 'ADMIN'), deleteEvent);

export default router;
