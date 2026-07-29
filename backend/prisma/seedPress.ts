import { PrismaClient } from '@prisma/client';

const FEATURED_OUTLETS = [
  'ANI',
  'Business Standard',
  'The Tribune',
  'LatestLY',
  'Google News',
  'Daily Hunt',
  'Indian News Network',
  'Indian Economic Observer',
  'National Insight',
  'Rising Entrepreneurs',
  'London Channel News',
  'Washington DC Dispatch',
  'Dubai City Reporter',
  'British Columbia Times',
  'England News Portal',
  'France Network Times',
  'Richmond Evening News',
  'Buffalo Dispatch',
  'Maldives Star Plus',
  'Lanka Express',
  'Lokmat Times Today',
  'Mumbai Live',
  'Gujarat Taraf',
  'Hyderabad News',
  'Bangalore Buzz',
  'Rajasthan Express',
  'Madhya Pradesh Chronicle',
  'Telangana Journal',
  'Punjab Live',
  'Calcutta Courier',
];

const FEATURED_ARTICLES = [
  {
    title: 'Sajan Shah Revolutionizes Memory Training in Indian Schools',
    source: 'Times of India',
    imageUrl: 'https://placehold.co/800x450/111111/f26522?text=Times+of+India',
    url: 'https://www.google.com/search?q=Sajan+Shah+Times+of+India+Memory+Training',
    date: new Date('2024-01-15'),
    order: 1,
  },
  {
    title: 'Memory Man of India Launches New Online Learning Platform',
    source: 'Economic Times',
    imageUrl: 'https://placehold.co/800x450/111111/f26522?text=Economic+Times',
    url: 'https://www.google.com/search?q=Sajan+Shah+Economic+Times',
    date: new Date('2024-01-10'),
    order: 2,
  },
  {
    title: 'Neuroscience-Based Education Gets Global Recognition',
    source: 'Forbes India',
    imageUrl: 'https://placehold.co/800x450/111111/f26522?text=Forbes+India',
    url: 'https://www.google.com/search?q=Sajan+Shah+Forbes+India',
    date: new Date('2024-01-05'),
    order: 3,
  },
  {
    title: 'Youth Speaker Sajan Shah Inspires Millions',
    source: 'Hindustan Times',
    imageUrl: 'https://placehold.co/800x450/111111/f26522?text=Hindustan+Times',
    url: 'https://www.google.com/search?q=Sajan+Shah+Hindustan+Times',
    date: new Date('2023-12-20'),
    order: 4,
  },
];

function placeholderImage(label: string) {
  return `https://placehold.co/800x450/111111/f26522?text=${encodeURIComponent(label)}`;
}

export async function seedPress(prisma: PrismaClient) {
  console.log('🌱 Seeding media & press articles...');

  // Featured article cards (homepage Media & Press grid)
  for (const article of FEATURED_ARTICLES) {
    const existing = await prisma.pressArticle.findFirst({
      where: { title: article.title, source: article.source },
    });

    if (existing) {
      await prisma.pressArticle.update({
        where: { id: existing.id },
        data: {
          url: article.url,
          imageUrl: article.imageUrl,
          date: article.date,
          isActive: true,
          order: article.order,
        },
      });
    } else {
      await prisma.pressArticle.create({
        data: {
          title: article.title,
          source: article.source,
          url: article.url,
          imageUrl: article.imageUrl,
          date: article.date,
          isActive: true,
          order: article.order,
        },
      });
    }
    console.log(`  ✅ Article: ${article.source} — ${article.title}`);
  }

  // Outlet names used by the homepage logo strip ("As Featured In")
  let order = 100;
  for (const outlet of FEATURED_OUTLETS) {
    const title = `As featured in ${outlet}`;
    const existing = await prisma.pressArticle.findFirst({
      where: { source: outlet, title },
    });

    if (existing) {
      await prisma.pressArticle.update({
        where: { id: existing.id },
        data: {
          isActive: true,
          order,
          imageUrl: existing.imageUrl || placeholderImage(outlet),
          url: existing.url || `https://www.google.com/search?q=${encodeURIComponent(outlet + ' Sajan Shah')}`,
        },
      });
    } else {
      await prisma.pressArticle.create({
        data: {
          title,
          source: outlet,
          url: `https://www.google.com/search?q=${encodeURIComponent(outlet + ' Sajan Shah')}`,
          imageUrl: placeholderImage(outlet),
          date: new Date('2024-01-01'),
          isActive: true,
          order,
        },
      });
    }
    order += 1;
  }

  console.log(`✨ Press seeding complete (${FEATURED_ARTICLES.length} stories + ${FEATURED_OUTLETS.length} outlets)`);
}
