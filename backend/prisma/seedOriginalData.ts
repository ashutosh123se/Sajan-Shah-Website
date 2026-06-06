import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();

const events = [
  { id: '1', title: 'India’s Biggest Memory and Family Transformation Event', date: new Date(currentYear, currentMonth + 1, 15), endDate: new Date(currentYear, currentMonth + 1, 17), category: 'Public', format: 'Offline', city: 'Mumbai', availability: 'Open for Registration', colorCode: 'bg-brand-orange text-white' },
  { id: '2', title: 'World’s First Educational Experience Summit', date: new Date(currentYear, currentMonth + 2, 20), endDate: new Date(currentYear, currentMonth + 2, 22), category: 'School', format: 'Offline', city: 'Delhi', availability: 'Closed', colorCode: 'bg-yellow-400 text-black' },
  { id: '3', title: 'The Hero - Self Mastery Program', date: new Date(currentYear, currentMonth + 3, 10), endDate: new Date(currentYear, currentMonth + 3, 12), category: 'Private', format: 'Offline', city: 'Bangalore', availability: 'Open for Registration', colorCode: 'bg-blue-500 text-white' },
  { id: '4', title: 'Building a Positive Home Culture - Parenting Program', date: new Date(currentYear, currentMonth + 4, 5), category: 'Public', format: 'Online', city: 'Online', availability: 'Open for Registration', colorCode: 'bg-green-500 text-white', eventType: 'webinar', topic: 'Parenting', thumbnail: '/images/placeholder.jpg' },
  { id: '5', title: 'Train the Trainer Program', date: new Date(currentYear - 1, 2, 10), category: 'Corporate', format: 'Offline', city: 'Pune', availability: 'Closed', colorCode: 'bg-purple-500 text-white', eventType: 'past', thumbnail: '/images/placeholder.jpg', tag: 'Teachers' },
  { id: '6', title: 'The Business Hero Program', date: new Date(currentYear - 1, 3, 15), category: 'Corporate', format: 'Offline', city: 'Ahmedabad', availability: 'Closed', colorCode: 'bg-brand-orange text-white', eventType: 'past', thumbnail: '/images/placeholder.jpg', tag: 'Corporates', isTop5: true },
  { id: '7', title: 'Boost Your Business Program', date: new Date(currentYear, currentMonth + 1, 25), category: 'Corporate', format: 'Online', city: 'Online', availability: 'Open for Registration', colorCode: 'bg-blue-500 text-white', eventType: 'webinar', topic: 'Business Growth', thumbnail: '/images/placeholder.jpg' },
  { id: '8', title: 'Catch a lie - Micro Emotions Program', date: new Date(currentYear, currentMonth + 2, 15), category: 'Private', format: 'Offline', city: 'Mumbai', availability: 'Open for Registration', colorCode: 'bg-purple-500 text-white' },
  { id: '9', title: 'Teach the Teachers Program', date: new Date(currentYear - 1, 1, 20), category: 'School', format: 'Offline', city: 'Chennai', availability: 'Closed', colorCode: 'bg-green-500 text-white', eventType: 'past', thumbnail: '/images/placeholder.jpg', tag: 'Teachers', isTop5: true },
  { id: '10', title: 'Life Adventure Experience Program', date: new Date(currentYear, currentMonth + 3, 10), category: 'Public', format: 'Offline', city: 'Goa', availability: 'Open for Registration', colorCode: 'bg-purple-500 text-white' },
  { id: '11', title: 'You vs You – Exclusive Program', date: new Date(currentYear - 1, 11, 5), category: 'Private', format: 'Offline', city: 'Mumbai', availability: 'Closed', colorCode: 'bg-yellow-400 text-black', eventType: 'past', thumbnail: '/images/placeholder.jpg', tag: 'International', isTop5: true },
  { id: '12', title: 'Creative Self – Tailored Motivational Program', date: new Date(currentYear, currentMonth + 2, 28), category: 'School', format: 'Online', city: 'Online', availability: 'Open for Registration', colorCode: 'bg-brand-orange text-white', eventType: 'webinar', topic: 'Motivation', thumbnail: '/images/placeholder.jpg' },
  { id: '13', title: '1:1 Personal Mentorship Program', date: new Date(currentYear, currentMonth + 5, 1), category: 'Private', format: 'Online', city: 'Online', availability: 'Open for Registration', colorCode: 'bg-blue-500 text-white' },
];

const books = [
  { slug: 'you-vs-you', name: 'YOU v/s YOU', short_description: 'A 100-Day Personal Transformation Challenge', description: 'A powerful 100-day system designed to help you break old patterns, build discipline, and transform your thinking through daily action.', image_homepage: '/you vs you F.png', image_product_page: '/you vs you B.png', buy_url_flipkart: '#', buy_url_amazon: '#', is_featured: false, price: 499, category: 'book', is_active: true },
  { slug: 'studenting-parenting', name: 'STUDENTING & PARENTING', short_description: 'Build a Positive, Happy Home Culture', description: 'A practical guide for students and parents to improve communication, reduce stress, and create a growth-focused environment at home.', image_homepage: '/Studenting & Parenting F.png', image_product_page: '/Studenting & Parenting B.png', buy_url_flipkart: '#', buy_url_amazon: '#', is_featured: false, price: 499, category: 'book', is_active: true },
  { slug: 'untold-stories', name: 'UNTOLD STORIES OF YOUR HEROES', short_description: '100 Transformational Journeys to Inspire', description: 'A collection of powerful stories that build courage, mindset, and leadership by learning from real-life struggles and success journeys.', image_homepage: '/Untold Stories of Your HEroes F.png', image_product_page: '/Untold Stories of Your HEroes B.png', buy_url_flipkart: '#', buy_url_amazon: '#', is_featured: true, price: 499, category: 'book', is_active: true },
  { slug: 'smart-studies', name: 'SMART STUDIES', short_description: 'Study Smarter. Perform Better.', description: 'A practical system designed to help students improve focus, retention, and study efficiency using smarter learning techniques.', image_homepage: '/Smart Studies F.jpeg', image_product_page: '/Smart Studies B.jpeg', buy_url_flipkart: '#', buy_url_amazon: '#', is_featured: false, price: 499, category: 'book', is_active: false },
  { slug: 'business-growth', name: 'BUSINESS GROWTH', short_description: 'Build, Scale, and Lead with Clarity', description: 'A results-driven guide for entrepreneurs and professionals to grow their business, improve decision-making, and create sustainable success.', image_homepage: 'https://placehold.co/600x800/0a0a0a/f26522?text=BUSINESS+GROWTH', image_product_page: '', buy_url_flipkart: '#', buy_url_amazon: '#', is_featured: false, price: 499, category: 'book', is_active: true },
  { slug: 'youth', name: 'YOUTH', short_description: 'Direction, Discipline, and Drive', description: 'A powerful guide for young individuals to gain clarity, build discipline, and take control of their future with confidence.', image_homepage: 'https://placehold.co/600x800/0a0a0a/f26522?text=YOUTH', image_product_page: '', buy_url_flipkart: '#', buy_url_amazon: '#', is_featured: false, price: 499, category: 'book', is_active: true },
  { slug: 'life-notes', name: 'LIFE NOTES', short_description: 'Simple Thoughts. Powerful Impact.', description: 'A collection of deep reflections and practical insights to help you think clearly, stay grounded, and grow consistently in everyday life.', image_homepage: '/Life Notes F.png', image_product_page: '/Life Notes B.png', buy_url_flipkart: '#', buy_url_amazon: '#', is_featured: false, price: 499, category: 'book', is_active: true },
];

const courses = [
  { slug: 'parenting-program', name: 'PARENTING PROGRAM', short_description: 'Build a Strong, Positive Home Environment', description: 'A practical system to help parents understand their child better, improve communication, and create a growth-driven, stress-free home culture.', image_homepage: 'https://placehold.co/800x600/0a0a0a/3b82f6?text=PARENTING+PROGRAM', buy_url_internal: '#', is_active: true, price: 2999, category: 'course' },
  { slug: 'memory-program', name: 'MEMORY PROGRAM', short_description: 'Unlock Your Brain’s True Potential', description: 'Learn proven techniques to improve memory, focus, and retention—so you can learn faster and perform better in academics and life.', image_homepage: 'https://placehold.co/800x600/0a0a0a/3b82f6?text=MEMORY+PROGRAM', buy_url_internal: '#', is_active: true, price: 3499, category: 'course' },
  { slug: 'train-the-trainer-course', name: 'TRAIN THE TRAINER', short_description: 'Become a Powerful Speaker & Influencer', description: 'A structured program to help you develop communication skills, stage confidence, and the ability to impact and influence others.', image_homepage: 'https://placehold.co/800x600/0a0a0a/3b82f6?text=TRAIN+THE+TRAINER', buy_url_internal: '#', is_active: false, price: 4999, category: 'course' },
];

const merchandise = [
  { slug: 'merch-tshirt', name: 'T-SHIRTS', short_description: 'Wear Your Mindset', description: 'Apparel designed to reflect discipline, focus, and growth.', image_homepage: '/MERCHANDISE/T-Shirt.jpeg', is_active: true, price: 699, category: 'merchandise' },
  { slug: 'merch-bottle', name: 'BOTTLES', short_description: 'Stay Fueled, Stay Focused', description: 'Hydration meets discipline.', image_homepage: '/MERCHANDISE/Bottle.jpeg', is_active: true, price: 899, category: 'merchandise' },
  { slug: 'merch-bands', name: 'BANDS', short_description: 'Wear Your Commitment', description: 'Simple yet powerful reminders.', image_homepage: '/MERCHANDISE/Bands.jpeg', is_active: true, price: 199, category: 'merchandise' },
  { slug: 'merch-exam-pads', name: 'EXAM PADS', short_description: 'Write Your Success Story', description: 'Designed for students.', image_homepage: '', is_active: true, price: 399, category: 'merchandise' },
  { slug: 'merch-key-chains', name: 'KEY CHAINS (I-G Series)', short_description: 'Carry Your Identity', description: 'Keep your mindset close.', image_homepage: '/MERCHANDISE/Key-chains.jpeg', is_active: true, price: 249, category: 'merchandise' },
  { slug: 'merch-productivity-kit', name: '12-IN-1 PRODUCTIVITY KIT', short_description: 'Structure Your Day', description: 'A complete system to improve focus.', image_homepage: '', is_active: true, price: 1499, category: 'merchandise' },
  { slug: 'merch-pencils', name: 'PLANTABLE PENCILS', short_description: 'Grow While You Write', description: 'Eco-friendly tools.', image_homepage: '', is_active: true, price: 149, category: 'merchandise' },
  { slug: 'merch-cap', name: 'CAP', short_description: 'Think Different. Stand Different.', description: 'A bold expression of identity.', image_homepage: '/MERCHANDISE/Cap.jpeg', is_active: true, price: 599, category: 'merchandise' },
  { slug: 'merch-pens', name: 'PENS', short_description: 'Write with Purpose', description: 'More than writing tools.', image_homepage: '', is_active: true, price: 99, category: 'merchandise' },
  { slug: 'merch-mugs', name: 'MUGS', short_description: 'Start Your Day with Intent', description: 'Every sip becomes a reminder.', image_homepage: '/MERCHANDISE/Mugs.jpeg', is_active: true, price: 399, category: 'merchandise' },
  { slug: 'merch-candles', name: 'CANDLES', short_description: 'Create Your Focus Space', description: 'Set the environment for clarity.', image_homepage: '/MERCHANDISE/Candels.jpeg', is_active: true, price: 799, category: 'merchandise' },
];

const pressArticles = [
  { title: 'Sajan Shah Revolutionizes Memory Training in Indian Schools', source: 'Times of India', thumbnail: '/press-1.jpg', url: 'https://example.com/article1', date: new Date('2024-01-15') },
  { title: 'Memory Man of India Launches New Online Learning Platform', source: 'Economic Times', thumbnail: '/press-2.jpg', url: 'https://example.com/article2', date: new Date('2024-01-10') },
  { title: 'Neuroscience-Based Education Gets Global Recognition', source: 'Forbes India', thumbnail: '/press-3.jpg', url: 'https://example.com/article3', date: new Date('2024-01-05') },
  { title: 'Youth Speaker Sajan Shah Inspires Millions', source: 'Hindustan Times', thumbnail: '/press-4.jpg', url: 'https://example.com/article4', date: new Date('2023-12-20') },
];

async function main() {
  console.log('Seeding original frontend data into backend DB...');

  // Seed Events
  for (const e of events) {
    await prisma.event.create({
      data: {
        title: e.title,
        eventDate: e.date,
        endDate: e.endDate,
        city: e.city,
        category: e.category,
        webinarUrl: '#',
        format: e.format,
        availability: e.availability,
        colorCode: e.colorCode,
        eventType: e.eventType || 'upcoming',
        cloudinaryPublicId: 'seed',
        posterUrl: e.thumbnail || '/images/placeholder.jpg',
        topic: e.topic,
        isTop5: e.isTop5 || false,
        tag: e.tag,
      }
    });
  }

  // Seed Products (Books, Courses, Merch)
  const allProducts = [...books, ...courses, ...merchandise];
  for (const p of allProducts) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: p
    });
  }

  // Seed Press Articles
  for (const article of pressArticles) {
    await prisma.pressArticle.create({
      data: {
        title: article.title,
        source: article.source,
        thumbnail: article.thumbnail,
        url: article.url,
        date: article.date,
        isActive: true
      }
    });
  }

  console.log('Successfully seeded original data!');
}

main()
  .catch((e) => {
    console.error(e);
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
