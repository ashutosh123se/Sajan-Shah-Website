import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Import routes
import authRoutes from './routes/auth';
import productsRoutes from './routes/products';
import eventsRoutes from './routes/events';
import programsRoutes from './routes/programs';
import contactRoutes from './routes/contact';
import membersRoutes from './routes/members';
import newsletterRoutes from './routes/newsletter';
import ordersRoutes from './routes/orders';
import contributorsRoutes from './routes/contributors';
import initiativesRoutes from './routes/initiatives';
import testimonialsRoutes from './routes/testimonials';
import usersRoutes from './routes/users';
import legalRoutes from './routes/legal';
import bannersRoutes from './routes/bannersRoutes';
import adminRoutes from './routes/admin';
import settingsRoutes from './routes/settingsRoutes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/programs', programsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/members', membersRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/contributors', contributorsRoutes);
app.use('/api/initiatives', initiativesRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/legal', legalRoutes);
app.use('/api/banners', bannersRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/settings', settingsRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// 404 handler
app.use('*splat', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
