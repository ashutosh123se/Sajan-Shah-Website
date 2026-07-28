import path from 'path';
import dotenv from 'dotenv';

// Load environment variables before other imports that may read process.env
dotenv.config({ path: path.join(__dirname, '..', '.env') });

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

// Import routes
import authRoutes from './routes/auth';
import productsRoutes from './routes/products';
import eventsRoutes from './routes/events';
import contactRoutes from './routes/contact';
import homePageRoutes from './routes/homePage';
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
import leadsRoutes from './routes/leads';
import aboutRoutes from './routes/aboutRoutes';
import eventsPageRoutes from './routes/eventsPage';
import contributionsPageRoutes from './routes/contributionsPage';
import v1ProductsRoutes from './routes/v1Products';
import speakingRoutes from './routes/speaking';
import pressRoutes from './routes/press';
import uploadRoutes from './routes/upload';


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));
app.use(cors({
  origin: [
    'https://www.sajanshah.com', 
    'https://sajanshah.com', 
    'https://qa.sajanshah.com',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    process.env.FRONTEND_URL || 'http://localhost:3000'
  ],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(morgan('dev'));

// Local uploaded images (saved under backend/uploads)
app.use(
  '/uploads',
  express.static(path.join(process.cwd(), 'uploads'), {
    setHeaders: (res) => {
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    },
  })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/home-page', homePageRoutes);
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
app.use('/api/leads', leadsRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/events-page', eventsPageRoutes);
app.use('/api/contributions-page', contributionsPageRoutes);
app.use('/api/v1', v1ProductsRoutes);
app.use('/api/speaking', speakingRoutes);
app.use('/api/press', pressRoutes);
app.use('/api/upload', uploadRoutes);


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
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
