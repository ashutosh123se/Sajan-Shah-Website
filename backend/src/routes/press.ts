import { Router } from 'express';
import { getArticles, getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle } from '../controllers/pressController';
import { verifyToken, requireRole } from '../middleware/verifyToken';

const router = Router();

// Public routes
router.get('/', getArticles);
router.get('/:id', getArticleById);

// Protected admin routes
router.get('/admin/all', verifyToken, requireRole('SUPER_ADMIN', 'ADMIN', 'EDITOR'), getAllArticles);
router.post('/', verifyToken, requireRole('SUPER_ADMIN', 'ADMIN', 'EDITOR'), createArticle);
router.put('/:id', verifyToken, requireRole('SUPER_ADMIN', 'ADMIN', 'EDITOR'), updateArticle);
router.delete('/:id', verifyToken, requireRole('SUPER_ADMIN', 'ADMIN'), deleteArticle);

export default router;
