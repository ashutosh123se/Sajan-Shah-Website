import { PrismaClient } from '@prisma/client';

type SeedProduct = {
  name: string;
  slug: string;
  short_description: string;
  description: string;
  image_homepage: string;
  image_product_page?: string;
  buy_url_flipkart?: string;
  buy_url_amazon?: string;
  buy_url_internal?: string;
  category: string;
  is_active: boolean;
  is_featured?: boolean;
  featured_order?: number | null;
  price?: number | null;
};

const books: SeedProduct[] = [
  {
    name: 'YOU v/s YOU',
    slug: 'you-vs-you',
    short_description: 'A 100-Day Personal Transformation Challenge',
    description:
      'Not just a book, your personal mentor in paperback form. A 100-day transformation journey designed to help you outgrow your old self through powerful, action-driven tasks.\n\n100 Days • 100 Challenges • 100 Quotes • 100 Real-Life Examples\nBuild mental discipline • Discover your purpose\n\nThis is not a book you read. This is a challenge you complete.',
    image_homepage: '/You vs You.png',
    image_product_page: '/you vs you B.png',
    buy_url_amazon: 'https://www.amazon.in/s?k=Sajan+Shah+YOU+v%2Fs+YOU',
    buy_url_flipkart: 'https://www.flipkart.com/search?q=Sajan+Shah+YOU+vs+YOU',
    category: 'book',
    is_active: true,
    is_featured: true,
    featured_order: 1,
  },
  {
    name: 'STUDENTING & PARENTING',
    slug: 'studenting-parenting',
    short_description: 'Build a Positive, Happy Home Culture',
    description:
      'A practical guide to transforming the relationship between students and parents in today’s fast-changing world. Structured with 100 chapters (50 for parents, 50 for students), this book creates a shared growth journey.\n\nUnderstand modern-day student challenges • Improve parent-child communication\nBuild a supportive, stress-free home environment • Navigate digital-age parenting effectively\n\nThis book doesn’t just guide, it aligns families for growth.',
    image_homepage: '/Studenting & Parenting.png',
    image_product_page: '/Studenting & Parenting B.png',
    buy_url_amazon: 'https://www.amazon.in/s?k=Sajan+Shah+STUDENTING+%26+PARENTING',
    buy_url_flipkart: 'https://www.flipkart.com/search?q=Sajan+Shah+Studenting+Parenting',
    category: 'book',
    is_active: true,
    is_featured: true,
    featured_order: 2,
  },
  {
    name: 'UNTOLD STORIES OF YOUR HEROES',
    slug: 'untold-stories-heroes',
    short_description: '100 Transformational Journeys to Inspire',
    description:
      'A powerful collection of 100 transformational stories of individuals who overcame challenges, broke barriers, and created impact. Across multiple fields, each story delivers lessons that drive real change.\n\nLessons from failure, resilience, and growth • Insights for leadership and personal development • Stories that ignite courage and action\n\nCurated and narrated by Sajan Shah, this book reveals one truth: The hero you admire… already exists within you.',
    image_homepage: '/Untold Stories of Your Heroes.png',
    image_product_page: '/Untold Stories of Your HEroes B.png',
    buy_url_amazon: 'https://www.amazon.in/s?k=Sajan+Shah+UNTOLD+STORIES+OF+YOUR+HEROES',
    buy_url_flipkart: 'https://www.flipkart.com/search?q=Sajan+Shah+Untold+Stories',
    category: 'book',
    is_active: true,
    is_featured: true,
    featured_order: 3,
  },
  {
    name: 'SMART STUDIES',
    slug: 'smart-studies',
    short_description: 'Study Smarter. Perform Better.',
    description:
      'A practical system designed to help students improve focus, retention, and study efficiency using smarter learning techniques.',
    image_homepage: '/Smart Studies F.jpeg',
    image_product_page: '/Smart Studies B.jpeg',
    buy_url_amazon: 'https://www.amazon.in/s?k=Sajan+Shah+SMART+STUDIES',
    buy_url_flipkart: 'https://www.flipkart.com/search?q=Sajan+Shah+Smart+Studies',
    category: 'book',
    is_active: true,
    is_featured: false,
  },
  {
    name: 'BUSINESS GROWTH',
    slug: 'business-growth',
    short_description: 'Build, Scale, and Lead with Clarity',
    description:
      'A results-driven guide for entrepreneurs and professionals to grow their business, improve decision-making, and create sustainable success.',
    image_homepage: 'https://placehold.co/600x800/0a0a0a/f26522?text=BUSINESS+GROWTH',
    image_product_page: '',
    buy_url_amazon: 'https://www.amazon.in/s?k=Sajan+Shah+BUSINESS+GROWTH',
    buy_url_flipkart: 'https://www.flipkart.com/search?q=Sajan+Shah+Business+Growth',
    category: 'book',
    is_active: true,
    is_featured: false,
  },
  {
    name: 'YOUTH',
    slug: 'youth',
    short_description: 'Direction, Discipline, and Drive',
    description:
      'A powerful guide for young individuals to gain clarity, build discipline, and take control of their future with confidence.',
    image_homepage: 'https://placehold.co/600x800/0a0a0a/f26522?text=YOUTH',
    image_product_page: '',
    buy_url_amazon: 'https://www.amazon.in/s?k=Sajan+Shah+YOUTH',
    buy_url_flipkart: 'https://www.flipkart.com/search?q=Sajan+Shah+Youth',
    category: 'book',
    is_active: true,
    is_featured: false,
  },
  {
    name: 'LIFE NOTES',
    slug: 'life-notes',
    short_description: 'Simple Thoughts. Powerful Impact.',
    description:
      'A collection of deep reflections and practical insights to help you think clearly, stay grounded, and grow consistently in everyday life.',
    image_homepage: '/Life Notes F.png',
    image_product_page: '/Life Notes B.png',
    buy_url_amazon: 'https://www.amazon.in/s?k=Sajan+Shah+LIFE+NOTES',
    buy_url_flipkart: 'https://www.flipkart.com/search?q=Sajan+Shah+Life+Notes',
    category: 'book',
    is_active: true,
    is_featured: false,
  },
];

const courses: SeedProduct[] = [
  {
    name: 'PARENTING PROGRAM',
    slug: 'parenting-program',
    short_description: 'Build a Strong, Positive Home Environment',
    description:
      'A practical system to help parents understand their child better, improve communication, and create a growth-driven, stress-free home culture.',
    image_homepage: 'https://placehold.co/800x600/0a0a0a/3b82f6?text=PARENTING+PROGRAM',
    image_product_page: 'https://placehold.co/800x600/0a0a0a/3b82f6?text=PARENTING+PROGRAM',
    buy_url_internal: '/products/parenting-program',
    category: 'course',
    is_active: true,
    is_featured: false,
    price: 0,
  },
  {
    name: 'MEMORY PROGRAM',
    slug: 'memory-program',
    short_description: 'Unlock Your Brain’s True Potential',
    description:
      'Learn proven techniques to improve memory, focus, and retention—so you can learn faster and perform better in academics and life.',
    image_homepage: 'https://placehold.co/800x600/0a0a0a/3b82f6?text=MEMORY+PROGRAM',
    image_product_page: 'https://placehold.co/800x600/0a0a0a/3b82f6?text=MEMORY+PROGRAM',
    buy_url_internal: '/products/memory-program',
    category: 'course',
    is_active: true,
    is_featured: false,
    price: 0,
  },
  {
    name: 'TRAIN THE TRAINER',
    slug: 'train-the-trainer',
    short_description: 'Become a Powerful Speaker & Influencer',
    description:
      'A structured program to help you develop communication skills, stage confidence, and the ability to impact and influence others.',
    image_homepage: 'https://placehold.co/800x600/0a0a0a/3b82f6?text=TRAIN+THE+TRAINER',
    image_product_page: 'https://placehold.co/800x600/0a0a0a/3b82f6?text=TRAIN+THE+TRAINER',
    buy_url_internal: '/products/train-the-trainer',
    category: 'course',
    is_active: false,
    is_featured: false,
    price: 0,
  },
];

const merchandise: SeedProduct[] = [
  {
    name: 'T-SHIRTS',
    slug: 't-shirts',
    short_description: 'Wear Your Mindset',
    description: 'Apparel designed to reflect discipline, focus, and growth—because what you wear influences how you think.',
    image_homepage: '/MERCHANDISE/T-Shirt.jpeg',
    image_product_page: '/MERCHANDISE/T-Shirt mini  (1).png',
    buy_url_internal: '/products/t-shirts',
    category: 'merchandise',
    is_active: true,
    price: 0,
  },
  {
    name: 'BOTTLES',
    slug: 'bottles',
    short_description: 'Stay Fueled, Stay Focused',
    description: 'Hydration meets discipline, carry your mindset wherever you go.',
    image_homepage: '/MERCHANDISE/Bottle.png',
    image_product_page: '/MERCHANDISE/Bottle mini (1).png',
    buy_url_internal: '/products/bottles',
    category: 'merchandise',
    is_active: true,
    price: 0,
  },
  {
    name: 'BANDS',
    slug: 'bands',
    short_description: 'Wear Your Commitment',
    description: 'Simple yet powerful reminders on your wrist to stay consistent and focused.',
    image_homepage: '/MERCHANDISE/Bands.png',
    buy_url_internal: '/products/bands',
    category: 'merchandise',
    is_active: true,
    price: 0,
  },
  {
    name: 'EXAM PADS',
    slug: 'exam-pads',
    short_description: 'Write Your Success Story',
    description: 'Designed for students to stay organized, focused, and ready to perform.',
    image_homepage: 'https://placehold.co/600x600/0a0a0a/f26522?text=EXAM+PADS',
    buy_url_internal: '/products/exam-pads',
    category: 'merchandise',
    is_active: true,
    price: 0,
  },
  {
    name: 'KEY CHAINS (I-G Series)',
    slug: 'key-chains',
    short_description: 'Carry Your Identity',
    description: 'Keep your mindset close, small reminders that create big shifts.',
    image_homepage: '/MERCHANDISE/Key-chains.png',
    image_product_page: '/MERCHANDISE/Key-chains (1).png',
    buy_url_internal: '/products/key-chains',
    category: 'merchandise',
    is_active: true,
    price: 0,
  },
  {
    name: '12-IN-1 PRODUCTIVITY KIT',
    slug: 'productivity-kit',
    short_description: 'Structure Your Day, Upgrade Your Life',
    description: 'A complete system to improve focus, planning, and execution, built for daily performance.',
    image_homepage: 'https://placehold.co/600x600/0a0a0a/f26522?text=PRODUCTIVITY+KIT',
    buy_url_internal: '/products/productivity-kit',
    category: 'merchandise',
    is_active: true,
    price: 0,
  },
  {
    name: 'PLANTABLE PENCILS',
    slug: 'plantable-pencils',
    short_description: 'Grow While You Write',
    description: 'Eco-friendly tools that symbolize growth, write today, plant tomorrow.',
    image_homepage: 'https://placehold.co/600x600/0a0a0a/f26522?text=PLANTABLE+PENCILS',
    buy_url_internal: '/products/plantable-pencils',
    category: 'merchandise',
    is_active: true,
    price: 0,
  },
  {
    name: 'CAP',
    slug: 'cap',
    short_description: 'Think Different. Stand Different.',
    description: 'A bold expression of identity and confidence in everyday life.',
    image_homepage: '/MERCHANDISE/cap.png',
    image_product_page: '/MERCHANDISE/cap mini (1).png',
    buy_url_internal: '/products/cap',
    category: 'merchandise',
    is_active: true,
    price: 0,
  },
  {
    name: 'PENS',
    slug: 'pens',
    short_description: 'Write with Purpose',
    description: 'More than writing tools, designed to remind you of clarity, focus, and action.',
    image_homepage: 'https://placehold.co/600x600/0a0a0a/f26522?text=PENS',
    buy_url_internal: '/products/pens',
    category: 'merchandise',
    is_active: true,
    price: 0,
  },
  {
    name: 'MUGS',
    slug: 'mugs',
    short_description: 'Start Your Day with Intent',
    description: 'Every sip becomes a reminder of your goals, discipline, and mindset.',
    image_homepage: '/MERCHANDISE/Mugs.jpeg',
    buy_url_internal: '/products/mugs',
    category: 'merchandise',
    is_active: true,
    price: 0,
  },
  {
    name: 'CANDLES',
    slug: 'candles',
    short_description: 'Create Your Focus Space',
    description: 'Set the environment for clarity, calmness, and deep thinking.',
    image_homepage: '/MERCHANDISE/Candels.jpeg',
    image_product_page: '/MERCHANDISE/Candels mini (1).png',
    buy_url_internal: '/products/candles',
    category: 'merchandise',
    is_active: true,
    price: 0,
  },
];

export async function seedProducts(prisma: PrismaClient) {
  console.log('🌱 Seeding products catalog...');

  // Clear previous featured slots so the three homepage books own slots 1–3
  await prisma.product.updateMany({
    where: { is_featured: true },
    data: { is_featured: false, featured_order: null },
  });

  const allProducts = [...books, ...courses, ...merchandise];

  for (const prod of allProducts) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {
        name: prod.name,
        short_description: prod.short_description,
        description: prod.description,
        image_homepage: prod.image_homepage,
        image_product_page: prod.image_product_page || null,
        buy_url_flipkart: prod.buy_url_flipkart || null,
        buy_url_amazon: prod.buy_url_amazon || null,
        buy_url_internal: prod.buy_url_internal || null,
        category: prod.category,
        is_active: prod.is_active,
        is_featured: prod.is_featured || false,
        featured_order: prod.featured_order ?? null,
        price: prod.price ?? null,
      },
      create: {
        name: prod.name,
        slug: prod.slug,
        short_description: prod.short_description,
        description: prod.description,
        image_homepage: prod.image_homepage,
        image_product_page: prod.image_product_page || null,
        buy_url_flipkart: prod.buy_url_flipkart || null,
        buy_url_amazon: prod.buy_url_amazon || null,
        buy_url_internal: prod.buy_url_internal || null,
        category: prod.category,
        is_active: prod.is_active,
        is_featured: prod.is_featured || false,
        featured_order: prod.featured_order ?? null,
        price: prod.price ?? null,
      },
    });
    console.log(`  ✅ Upserted ${prod.category}: ${prod.name}`);
  }

  console.log('✨ Products catalog seeding complete!');
}
