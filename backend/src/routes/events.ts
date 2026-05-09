import { Router } from 'express';
import { getEvents, getEventById, createEvent, updateEvent, deleteEvent } from '../controllers/eventsController';
import { verifyToken, requireRole } from '../middleware/verifyToken';

const router = Router();

// Public routes
router.get('/', getEvents);
router.get('/:id', getEventById);

// Protected routes
router.post('/', verifyToken, requireRole('ADMIN', 'EDITOR'), createEvent);
router.put('/:id', verifyToken, requireRole('ADMIN', 'EDITOR'), updateEvent);
router.delete('/:id', verifyToken, requireRole('ADMIN', 'SUPER_ADMIN'), deleteEvent);

export default router;
