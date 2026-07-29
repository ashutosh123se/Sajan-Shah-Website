import { Router } from 'express';
import * as leadsController from '../controllers/leadsController';
import { verifyToken, requireRole } from '../middleware/verifyToken';

const router = Router();

// Public route to capture leads
router.post('/', leadsController.createLead);

// Admin routes
router.get('/', verifyToken, requireRole('SUPER_ADMIN', 'ADMIN'), leadsController.getAllLeads);
router.get('/:id', verifyToken, requireRole('SUPER_ADMIN', 'ADMIN'), leadsController.getLeadById);
router.patch('/:id/status', verifyToken, requireRole('SUPER_ADMIN', 'ADMIN'), leadsController.updateLeadStatus);
router.delete('/:id', verifyToken, requireRole('SUPER_ADMIN', 'ADMIN'), leadsController.deleteLead);

export default router;
