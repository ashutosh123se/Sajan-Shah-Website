/**
 * Align CMS image/link fields to the frontend designer's component defaults.
 * Run on server: node src/scripts/alignCmsToFrontendDefaults.js
 * (from backend folder, with DATABASE_URL set)
 */
const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();
const MENTOR_PORTRAIT =
  'https://webinar.sajanshah.com/assets/mentor-portrait-DVhB0Q8D.jpeg';

function parseContent(content) {
  if (typeof content === 'string') {
    try {
      return JSON.parse(content);
    } catch {
      return {};
    }
  }
  return content || {};
}

async function alignCmsToFrontendDefaults() {
  const updated = [];

  const homeHero = await db.homePageSection.findUnique({ where: { key: 'hero' } });
  if (homeHero) {
    const content = parseContent(homeHero.content);
    content.slides = [
      {
        id: 1,
        headline: "India’s Biggest Memory & Family Transformation Experience",
        subheadline:
          'One stage. Thousands of lives. A system designed to transform how families think, learn, and grow together.',
        ctaText: 'Join Now',
        ctaLink: 'https://sol.sajanshah.com',
        image: '/EVENT.png',
      },
      {
        id: 2,
        headline: 'Transform From Home. No Travel Required.',
        subheadline:
          'Join India’s most powerful student-parent webinar and experience real breakthroughs in focus, confidence, and results.',
        ctaText: 'Reserve Your Seat',
        ctaLink: 'https://webinar.sajanshah.com',
        image: '/webinar.png',
      },
      {
        id: 3,
        headline: 'Upgrade Your Life With Proven Systems',
        subheadline:
          'Access powerful programs designed to improve thinking, performance, and personal growth - step by step.',
        ctaText: 'Explore Programs',
        ctaLink: '/products',
        image: '/You vs You.png',
      },
      {
        id: 4,
        headline: 'Live to Inspire. Lead to Serve.',
        subheadline:
          'Be part of a movement focused on creating real impact through education, awareness, and human transformation.',
        ctaText: 'Join the Initiative',
        ctaLink: 'https://unitedfirst.in',
        image: '/united first.png',
      },
    ];
    await db.homePageSection.update({ where: { id: homeHero.id }, data: { content } });
    updated.push('home:hero');
  }

  const splitHero = await db.homePageSection.findUnique({ where: { key: 'split_hero' } });
  if (splitHero) {
    const content = parseContent(splitHero.content);
    content.mainImage = MENTOR_PORTRAIT;
    content.cards = [
      {
        title: 'Webinar',
        image: '/webinar.png',
        desc: 'Join transformational online sessions focused on focus, confidence, performance, and mindset breakthroughs.',
        ctaText: 'Find Out More',
        ctaLink: 'https://webinar.sajanshah.com',
      },
      {
        title: 'Speaking',
        image: '/IMG_7631.jpg',
        desc: 'High-impact keynote experiences designed to transform thinking, performance, and leadership.',
        ctaText: 'Find Out More',
        ctaLink: '/speaking',
      },
      {
        title: 'Impact',
        image: '/impact.png',
        desc: 'Real transformation initiatives creating meaningful social and educational impact across communities.',
        ctaText: 'Find Out More',
        ctaLink: '/contributions',
      },
    ];
    await db.homePageSection.update({ where: { id: splitHero.id }, data: { content } });
    updated.push('home:split_hero');
  }

  const brand = await db.homePageSection.findUnique({ where: { key: 'brand_writeup' } });
  if (brand) {
    const content = parseContent(brand.content);
    content.backgroundImage = '/sajan sir.png';
    await db.homePageSection.update({ where: { id: brand.id }, data: { content } });
    updated.push('home:brand_writeup');
  }

  const aboutBio = await db.aboutPageSection.findUnique({ where: { key: 'bio' } });
  if (aboutBio) {
    const content = parseContent(aboutBio.content);
    content.image = MENTOR_PORTRAIT;
    await db.aboutPageSection.update({ where: { id: aboutBio.id }, data: { content } });
    updated.push('about:bio');
  }

  const movement = await db.aboutPageSection.findUnique({ where: { key: 'movement' } });
  if (movement) {
    const content = parseContent(movement.content);
    content.row1Image1 = '/about 2.jpeg';
    content.row1Image2 = '/about 3.jpeg';
    content.row2Image3 = '/about 1.jpeg';
    await db.aboutPageSection.update({ where: { id: movement.id }, data: { content } });
    updated.push('about:movement');
  }

  const speakingHero = await db.speakingPageSection.findUnique({ where: { key: 'hero' } });
  if (speakingHero) {
    const content = parseContent(speakingHero.content);
    content.primaryButtonText = content.primaryButtonText || 'Book Sajan to Speak →';
    content.primaryButtonScrollTarget = '/events#book-sajan';
    content.secondaryButtonText = content.secondaryButtonText || 'Virtual Training →';
    content.secondaryButtonUrl = '/products#courses';
    if (!Array.isArray(content.gridImages) || content.gridImages.length === 0) {
      content.gridImages = ['/Speking Hero.jpeg'];
    } else {
      content.gridImages[0] = '/Speking Hero.jpeg';
    }
    await db.speakingPageSection.update({ where: { id: speakingHero.id }, data: { content } });
    updated.push('speaking:hero');
  }

  return {
    message: `Aligned ${updated.length} CMS sections to frontend designer images/links`,
    updated,
  };
}

module.exports = { alignCmsToFrontendDefaults };

if (require.main === module) {
  alignCmsToFrontendDefaults()
    .then((result) => {
      console.log(result.message);
      console.log('Updated:', result.updated.join(', ') || '(none)');
      return db.$disconnect();
    })
    .catch(async (err) => {
      console.error(err);
      await db.$disconnect();
      process.exit(1);
    });
}
