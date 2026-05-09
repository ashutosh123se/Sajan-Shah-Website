# Sajan Shah Website

A production-ready website for Sajan Shah - Memory Man of India, Global Youth Speaker, and Neuroscience-Backed Educator.

## 🚀 Project Overview

This project is a full-stack web application built with Next.js 14, Express, TypeScript, and modern web technologies. It includes a complete backend API, frontend with 9 public pages, admin panel with role-based access, payment integration, and more.

## 📁 Project Structure

```
sajan-shah-website/
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── controllers/     # API route controllers
│   │   ├── middleware/      # Authentication & authorization
│   │   ├── routes/         # API route definitions
│   │   ├── services/       # Email service
│   │   ├── utils/          # Utility functions
│   │   └── server.ts       # Main server file
│   ├── prisma/
│   │   ├── schema.prisma  # Database schema
│   │   └── seed.ts        # Seed data
│   ├── package.json
│   └── tsconfig.json
└── frontend/               # Next.js 14 frontend
    ├── src/
    │   ├── app/              # App Router pages
    │   │   ├── (pages)/     # 9 public-facing pages
    │   │   ├── admin/        # Admin panel pages
    │   │   └── api/          # API routes (if needed)
    │   ├── components/
    │   │   ├── layout/      # Navbar, Footer
    │   │   ├── ui/          # Reusable UI components
    │   │   ├── sections/    # Page sections
    │   │   └── payment/     # Payment components
    │   ├── lib/               # Utilities & services
    │   ├── store/             # Zustand stores
    │   ├── hooks/             # Custom React hooks
    │   └── types/             # TypeScript type definitions
    ├── public/                # Static assets
    ├── package.json
    └── tsconfig.json
```

## 🛠 Tech Stack

### Backend
- **Node.js** with Express.js 4.18
- **TypeScript** for type safety
- **Prisma ORM** with PostgreSQL database
- **JWT Authentication** with refresh tokens
- **Nodemailer** for email services
- **Helmet, CORS, Morgan** for security and logging

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Zustand** for state management
- **React Hot Toast** for notifications
- **Framer Motion** for animations
- **Razorpay** for payment processing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### Environment Setup

1. **Backend Setup:**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Update .env with your credentials
   ```

2. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   cp .env.example .env.local
   # Update .env.local with your API URL
   ```

### Database Setup

1. **Install PostgreSQL** and create database
2. **Run Prisma migrations:**
   ```bash
   cd backend
   npx prisma migrate dev
   ```

3. **Seed database:**
   ```bash
   cd backend
   npx prisma db seed
   ```

## 🚀 Development

### Start Development Servers

1. **Start Backend:**
   ```bash
   cd backend
   npm run dev
   # Backend runs on http://localhost:5000
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm run dev
   # Frontend runs on http://localhost:3000
   ```

## 🚀 Production Deployment

### Backend Deployment (Railway)

1. **Prepare for Deployment:**
   ```bash
   cd backend
   npm run build
   ```

2. **Deploy to Railway:**
   - Push code to GitHub repository
   - Connect Railway to GitHub
   - Set environment variables in Railway dashboard
   - Deploy automatically from main branch

### Frontend Deployment (Vercel)

1. **Prepare for Deployment:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Vercel:**
   - Push code to GitHub repository
   - Connect Vercel to GitHub
   - Set environment variables in Vercel dashboard
   - Deploy automatically from main branch

## 🔐 Environment Variables

### Backend (.env)
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/sajanshah_db"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_REFRESH_SECRET="your-super-secret-refresh-key"

# Email (Gmail SMTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="true"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Razorpay
RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxxxxxxx"
RAZORPAY_KEY_SECRET="your-razorpay-secret"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
CLOUDINARY_UPLOAD_PRESET="your-upload-preset"
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL="https://your-backend-url.com/api"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxxxxxxx"
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
```

## 🔐 Security Features

- **JWT Authentication** with access and refresh tokens
- **Role-Based Access Control** with 6 user roles
- **Rate Limiting** on sensitive endpoints
- **CORS Configuration** with restricted origins
- **Helmet.js** for security headers
- **Input Validation** with express-validator
- **Honeypot Fields** for bot protection
- **Password Hashing** with bcrypt
- **SQL Injection Prevention** with Prisma ORM

## 📱 Features

### Public Pages
1. **Home** - Hero slider, intro video, brand write-up, stats, featured programs, events, testimonials, speaker showreel, media press, products, community join, masterclass funnel
2. **About** - Journey, achievements, philosophy, mission
3. **Programs** - Filterable program listings with enrollment
4. **Products** - E-commerce with cart functionality
5. **Events** - Event registration and management
6. **Members** - Member directory and application
7. **Contact** - Contact form with honeypot protection
8. **Contributions** - Initiatives and impact showcase
9. **Blog & Resources** - Educational content and downloads

### Admin Panel
- **Role-based sidebar** filtered by user permissions
- **User Management** - CRUD operations for users
- **Program Management** - Create and manage programs
- **Event Management** - Create and manage events
- **Product Management** - E-commerce functionality
- **Order Management** - Order processing and tracking
- **Member Management** - Member applications and management
- **Newsletter Management** - Subscription management
- **Contact Management** - Message handling
- **Contributor Management** - Content management
- **Initiative Management** - Social impact tracking
- **Testimonial Management** - Customer feedback
- **Legal Page Management** - Privacy policy, terms, etc.
- **Settings Management** - Site configuration

### Payment Integration
- **Razorpay Integration** with secure payment processing
- **Order Creation** and verification
- **Multiple Payment Methods** support
- **Secure Callback Handling** with signature verification

### Email System
- **Nodemailer Integration** with Gmail SMTP
- **Email Templates** for various notifications
- **Transactional Emails** for orders, programs, events
- **Newsletter Management** with subscription handling
- **Contact Notifications** for admin alerts

## 🎨 UI/UX Features

- **Responsive Design** - Mobile-first approach
- **Dark Mode Support** - Ready for implementation
- **Loading States** - Skeleton screens and spinners
- **Toast Notifications** - User feedback system
- **Smooth Animations** - Framer Motion integration
- **Accessible Forms** - ARIA labels and keyboard navigation
- **Progressive Enhancement** - Works without JavaScript

## 🔍 SEO Features

- **Meta Tags** - Dynamic and static metadata
- **Open Graph** - Social media sharing
- **Twitter Cards** - Enhanced Twitter previews
- **Structured Data** - JSON-LD for search engines
- **Sitemap Generation** - Automatic sitemap.xml
- **Robots.txt** - Search engine crawling instructions
- **Canonical URLs** - Duplicate content prevention
- **Image Optimization** - Alt tags and lazy loading

## 📊 Analytics & Monitoring

- **Google Analytics** ready (add tracking ID)
- **Performance Monitoring** - Web Vitals integration
- **Error Tracking** - Custom error boundaries
- **User Behavior Analytics** - Page visit tracking
- **Conversion Tracking** - Goal completion monitoring

## 🧪 Testing

### Backend Tests
- Unit tests for API endpoints
- Integration tests for database operations
- Authentication flow testing
- Payment gateway testing

### Frontend Tests
- Component unit tests
- Page rendering tests
- User interaction testing
- Form validation testing
- Payment flow testing

## 📚 Documentation

- **API Documentation** - Complete endpoint documentation
- **Component Documentation** - Storybook integration ready
- **Database Schema** - Prisma schema documentation
- **Deployment Guide** - Step-by-step instructions
- **Contributing Guidelines** - Development setup guide
- **Code Comments** - Well-documented codebase

## 🔄 CI/CD Pipeline

### GitHub Actions
- **Automated Testing** - Run tests on push
- **Code Quality** - ESLint and Prettier checks
- **Security Scanning** - Dependency vulnerability checks
- **Build Optimization** - Minification and bundling
- **Deployment Automation** - Zero-downtime deployments

## 🌐 Performance

- **Code Splitting** - Optimized bundle sizes
- **Image Optimization** - WebP format and lazy loading
- **Caching Strategy** - Browser and CDN caching
- **Database Optimization** - Indexed queries and connections
- **CDN Integration** - Static asset delivery
- **Performance Monitoring** - Real user metrics

## 📱 Mobile Features

- **Progressive Web App** - PWA ready
- **Touch-Friendly** - Optimized for mobile devices
- **Offline Support** - Service worker implementation
- **Push Notifications** - Web Push API ready
- **Responsive Images** - Adaptive image serving
- **Mobile Navigation** - Hamburger menu and touch gestures

## 🔒 Security Checklist

- [x] HTTPS enforcement in production
- [x] Secure cookie configuration
- [x] Input sanitization and validation
- [x] SQL injection prevention
- [x] XSS protection
- [x] CSRF protection
- [x] Rate limiting implementation
- [x] Security headers configuration
- [x] Environment variable protection
- [x] Dependency vulnerability scanning
- [x] Regular security audits
- [x] Error handling without information leakage

## 🚀 Future Enhancements

### Phase 2 Features
- **Mobile App** - React Native application
- **Video Streaming** - Live session recordings
- **AI Integration** - Chatbot for customer support
- **Advanced Analytics** - Custom dashboard and insights
- **Multi-language Support** - Internationalization
- **Advanced Search** - Full-text search with filters
- **Social Features** - Community forums and discussions
- **Learning Platform** - Interactive courses and quizzes
- **Certification System** - Digital certificates and badges

### Technical Improvements
- **Microservices Architecture** - Scalable backend design
- **GraphQL API** - Alternative to REST
- **Real-time Features** - WebSocket integration
- **Advanced Caching** - Redis implementation
- **Load Balancing** - Multiple server support
- **Database Optimization** - Read replicas and sharding

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Guidelines
- Follow the existing code style and patterns
- Write tests for new features
- Update documentation as needed
- Use conventional commit messages
- Ensure all tests pass before submitting

## 📞 Support

For support and questions:
- **Email**: info@sajanshah.com
- **Documentation**: Check this README and code comments
- **Issues**: Report bugs via GitHub Issues
- **Community**: Join our Discord server (link coming soon)

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

---

**Built with ❤️ for Sajan Shah - Transforming lives through memory science and education.**
