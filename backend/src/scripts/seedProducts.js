const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const books = [
  {
    name: 'YOU v/s YOU',
    slug: 'you-vs-you',
    short_description: 'A 100-Day Personal Transformation Challenge',
    description: 'A powerful 100-day system designed to help you break old patterns, build discipline, and transform your thinking through daily action.',
    image_homepage: '/you vs you F.png',
    image_product_page: '/you vs you B.png',
    buy_url_flipkart: '#',
    buy_url_amazon: '#',
    category: 'book',
    is_active: true,
    is_featured: false
  },
  {
    name: 'STUDENTING & PARENTING',
    slug: 'studenting-parenting',
    short_description: 'Build a Positive, Happy Home Culture',
    description: 'A practical guide for students and parents to improve communication, reduce stress, and create a growth-focused environment at home.',
    image_homepage: '/Studenting & Parenting F.png',
    image_product_page: '/Studenting & Parenting B.png',
    buy_url_flipkart: '#',
    buy_url_amazon: '#',
    category: 'book',
    is_active: true,
    is_featured: false
  },
  {
    name: 'UNTOLD STORIES OF YOUR HEROES',
    slug: 'untold-stories-heroes',
    short_description: '100 Transformational Journeys to Inspire',
    description: 'A collection of powerful stories that build courage, mindset, and leadership by learning from real-life struggles and success journeys.',
    image_homepage: '/Untold Stories of Your HEroes F.png',
    image_product_page: '/Untold Stories of Your HEroes B.png',
    buy_url_flipkart: '#',
    buy_url_amazon: '#',
    category: 'book',
    is_active: true,
    is_featured: true,
    featured_order: 1
  },
  {
    name: 'SMART STUDIES',
    slug: 'smart-studies',
    short_description: 'Study Smarter. Perform Better.',
    description: 'A practical system designed to help students improve focus, retention, and study efficiency using smarter learning techniques.',
    image_homepage: 'https://placehold.co/600x800/0a0a0a/f26522?text=SMART+STUDIES',
    image_product_page: '',
    buy_url_flipkart: '#',
    buy_url_amazon: '#',
    category: 'book',
    is_active: true,
    is_featured: false
  },
  {
    name: 'BUSINESS GROWTH',
    slug: 'business-growth',
    short_description: 'Build, Scale, and Lead with Clarity',
    description: 'A results-driven guide for entrepreneurs and professionals to grow their business, improve decision-making, and create sustainable success.',
    image_homepage: 'https://placehold.co/600x800/0a0a0a/f26522?text=BUSINESS+GROWTH',
    image_product_page: '',
    buy_url_flipkart: '#',
    buy_url_amazon: '#',
    category: 'book',
    is_active: true,
    is_featured: false
  },
  {
    name: 'YOUTH',
    slug: 'youth',
    short_description: 'Direction, Discipline, and Drive',
    description: 'A powerful guide for young individuals to gain clarity, build discipline, and take control of their future with confidence.',
    image_homepage: 'https://placehold.co/600x800/0a0a0a/f26522?text=YOUTH',
    image_product_page: '',
    buy_url_flipkart: '#',
    buy_url_amazon: '#',
    category: 'book',
    is_active: true,
    is_featured: false
  },
  {
    name: 'LIFE NOTES',
    slug: 'life-notes',
    short_description: 'Simple Thoughts. Powerful Impact.',
    description: 'A collection of deep reflections and practical insights to help you think clearly, stay grounded, and grow consistently in everyday life.',
    image_homepage: '/Life Notes F.png',
    image_product_page: '/Life Notes B.png',
    buy_url_flipkart: '#',
    buy_url_amazon: '#',
    category: 'book',
    is_active: true,
    is_featured: false
  }
];

const courses = [
  {
    name: 'PARENTING PROGRAM',
    slug: 'parenting-program',
    short_description: 'Build a Strong, Positive Home Environment',
    description: 'A practical system to help parents understand their child better, improve communication, and create a growth-driven, stress-free home culture.',
    image_homepage: 'https://placehold.co/800x600/0a0a0a/3b82f6?text=PARENTING+PROGRAM',
    image_product_page: 'https://placehold.co/800x600/0a0a0a/3b82f6?text=PARENTING+PROGRAM',
    buy_url_internal: '#',
    category: 'course',
    is_active: true,
    is_featured: true,
    featured_order: 2
  },
  {
    name: 'MEMORY PROGRAM',
    slug: 'memory-program',
    short_description: 'Unlock Your Brain’s True Potential',
    description: 'Learn proven techniques to improve memory, focus, and retention—so you can learn faster and perform better in academics and life.',
    image_homepage: 'https://placehold.co/800x600/0a0a0a/3b82f6?text=MEMORY+PROGRAM',
    image_product_page: 'https://placehold.co/800x600/0a0a0a/3b82f6?text=MEMORY+PROGRAM',
    buy_url_internal: '#',
    category: 'course',
    is_active: true,
    is_featured: true,
    featured_order: 3
  },
  {
    name: 'TRAIN THE TRAINER',
    slug: 'train-the-trainer',
    short_description: 'Become a Powerful Speaker & Influencer',
    description: 'A structured program to help you develop communication skills, stage confidence, and the ability to impact and influence others.',
    image_homepage: 'https://placehold.co/800x600/0a0a0a/3b82f6?text=TRAIN+THE+TRAINER',
    image_product_page: 'https://placehold.co/800x600/0a0a0a/3b82f6?text=TRAIN+THE+TRAINER',
    buy_url_internal: '#',
    category: 'course',
    is_active: false,
    is_featured: false
  }
];

const merchandise = [
  { name: 'T-SHIRTS', slug: 't-shirts', short_description: 'Wear Your Mindset', description: 'Apparel designed to reflect discipline, focus, and growth—because what you wear influences how you think.', image_homepage: 'https://placehold.co/600x600/0a0a0a/f26522?text=T-SHIRTS', buy_url_internal: '#', category: 'merchandise', is_active: true },
  { name: 'BOTTLES', slug: 'bottles', short_description: 'Stay Fueled, Stay Focused', description: 'Hydration meets discipline, carry your mindset wherever you go.', image_homepage: 'https://placehold.co/600x600/0a0a0a/f26522?text=BOTTLES', buy_url_internal: '#', category: 'merchandise', is_active: true },
  { name: 'BANDS', slug: 'bands', short_description: 'Wear Your Commitment', description: 'Simple yet powerful reminders on your wrist to stay consistent and focused.', image_homepage: 'https://placehold.co/600x600/0a0a0a/f26522?text=BANDS', buy_url_internal: '#', category: 'merchandise', is_active: true },
  { name: 'EXAM PADS', slug: 'exam-pads', short_description: 'Write Your Success Story', description: 'Designed for students to stay organized, focused, and ready to perform.', image_homepage: 'https://placehold.co/600x600/0a0a0a/f26522?text=EXAM+PADS', buy_url_internal: '#', category: 'merchandise', is_active: true },
  { name: 'KEY CHAINS (I-G Series)', slug: 'key-chains', short_description: 'Carry Your Identity', description: 'Keep your mindset close, small reminders that create big shifts.', image_homepage: 'https://placehold.co/600x600/0a0a0a/f26522?text=KEY+CHAINS', buy_url_internal: '#', category: 'merchandise', is_active: true },
  { name: '12-IN-1 PRODUCTIVITY KIT', slug: 'productivity-kit', short_description: 'Structure Your Day, Upgrade Your Life', description: 'A complete system to improve focus, planning, and execution, built for daily performance.', image_homepage: 'https://placehold.co/600x600/0a0a0a/f26522?text=PRODUCTIVITY+KIT', buy_url_internal: '#', category: 'merchandise', is_active: true },
  { name: 'PLANTABLE PENCILS', slug: 'plantable-pencils', short_description: 'Grow While You Write', description: 'Eco-friendly tools that symbolize growth, write today, plant tomorrow.', image_homepage: 'https://placehold.co/600x600/0a0a0a/f26522?text=PLANTABLE+PENCILS', buy_url_internal: '#', category: 'merchandise', is_active: true },
  { name: 'CAP', slug: 'cap', short_description: 'Think Different. Stand Different.', description: 'A bold expression of identity and confidence in everyday life.', image_homepage: 'https://placehold.co/600x600/0a0a0a/f26522?text=CAP', buy_url_internal: '#', category: 'merchandise', is_active: true },
  { name: 'PENS', slug: 'pens', short_description: 'Write with Purpose', description: 'More than writing tools, designed to remind you of clarity, focus, and action.', image_homepage: 'https://placehold.co/600x600/0a0a0a/f26522?text=PENS', buy_url_internal: '#', category: 'merchandise', is_active: true },
  { name: 'MUGS', slug: 'mugs', short_description: 'Start Your Day with Intent', description: 'Every sip becomes a reminder of your goals, discipline, and mindset.', image_homepage: 'https://placehold.co/600x600/0a0a0a/f26522?text=MUGS', buy_url_internal: '#', category: 'merchandise', is_active: true },
  { name: 'CANDLES', slug: 'candles', short_description: 'Create Your Focus Space', description: 'Set the environment for clarity, calmness, and deep thinking.', image_homepage: 'https://placehold.co/600x600/0a0a0a/f26522?text=CANDLES', buy_url_internal: '#', category: 'merchandise', is_active: true }
];

async function main() {
  console.log('🌱 Seeding Products Catalog in database...');

  const allProducts = [...books, ...courses, ...merchandise];

  for (const prod of allProducts) {
    await db.product.upsert({
      where: { slug: prod.slug },
      update: {
        name: prod.name,
        short_description: prod.short_description,
        description: prod.description,
        image_homepage: prod.image_homepage,
        image_product_page: prod.image_product_page || '',
        buy_url_flipkart: prod.buy_url_flipkart || '',
        buy_url_amazon: prod.buy_url_amazon || '',
        buy_url_internal: prod.buy_url_internal || '',
        category: prod.category,
        is_active: prod.is_active,
        is_featured: prod.is_featured,
        featured_order: prod.featured_order || null
      },
      create: {
        name: prod.name,
        slug: prod.slug,
        short_description: prod.short_description,
        description: prod.description,
        image_homepage: prod.image_homepage,
        image_product_page: prod.image_product_page || '',
        buy_url_flipkart: prod.buy_url_flipkart || '',
        buy_url_amazon: prod.buy_url_amazon || '',
        buy_url_internal: prod.buy_url_internal || '',
        category: prod.category,
        is_active: prod.is_active,
        is_featured: prod.is_featured,
        featured_order: prod.featured_order || null
      }
    });
    console.log(`  ✅ Upserted ${prod.category}: ${prod.name}`);
  }

  console.log('✨ Products Catalog seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
