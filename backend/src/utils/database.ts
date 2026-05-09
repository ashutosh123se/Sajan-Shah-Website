// Temporary mock database implementation
// This will be replaced with Prisma once we resolve the version compatibility

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: string;
  photoUrl?: string;
  phone?: string;
  createdAt: Date;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  images: string[];
  category: string;
  tags: string[];
  stock?: number;
  isActive: boolean;
  isFeatured: boolean;
  cloudinaryPublicId?: string;
  createdAt: Date;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  posterUrl: string;
  cloudinaryPublicId: string;
  webinarUrl: string;
  eventDate: Date;
  city?: string;
  eventType?: string;
  isPast: boolean;
  isFree: boolean;
  price?: number;
  createdAt: Date;
}

export interface Program {
  id: string;
  title: string;
  slug: string;
  description: string;
  pitch: string;
  price: number;
  currency: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  curriculum: string;
  targetAudience: string[];
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
}

// Mock database class
class MockDatabase {
  private users: User[] = [
    {
      id: 'admin_123',
      name: 'Admin User',
      email: 'admin@sajanshah.com',
      // The bcrypt hash for 'admin123'
      passwordHash: '$2b$12$DJ1vPHiXVqGFE9OGbS65semkxaFDfpT39x.HI0VPizdYvZ23XgHu2',
      role: 'SUPER_ADMIN',
      createdAt: new Date(),
    }
  ];
  private products: Product[] = [];
  private events: Event[] = [];
  private programs: Program[] = [];

  async userFindUnique(where: { email: string }) {
    return this.users.find(u => u.email === where.email) || null;
  }

  async userCreate(data: Partial<User>) {
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name || '',
      email: data.email || '',
      passwordHash: data.passwordHash || '',
      role: data.role || 'CUSTOMER',
      photoUrl: data.photoUrl,
      phone: data.phone,
      createdAt: new Date()
    };
    this.users.push(user);
    return user;
  }

  async productFindMany(params?: any) {
    return this.products;
  }

  async eventFindMany(params?: any) {
    return this.events;
  }

  async programFindMany(params?: any) {
    return this.programs;
  }
}

export const db = new MockDatabase();
