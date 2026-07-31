/**
 * Align CMS image/link fields to the frontend designer's local assets + CTAs.
 * All images are local `/public` paths — no Unsplash / external CDNs.
 */
import { db } from '../utils/database';

const LIVE_STAGE = [
  '/Live from the Stage/1.jpeg',
  '/Live from the Stage/2.jpeg',
  '/Live from the Stage/3.jpeg',
  '/Live from the Stage/4.png',
  '/Live from the Stage/5.png',
  '/Live from the Stage/6.jpeg',
  '/Live from the Stage/7.jpeg',
  '/Live from the Stage/8.jpeg',
  '/Live from the Stage/9.jpeg',
  '/Live from the Stage/10.png',
  '/Live from the Stage/11.png',
  '/Live from the Stage/12.jpeg',
  '/Live from the Stage/13.jpeg',
  '/Live from the Stage/14.jpeg',
  '/Live from the Stage/15.png',
];

const SPEAKING_PROGRAMS = [
  {
    name: "India's Biggest Memory & Family Event",
    pitch: 'Revolutionizing how families learn and grow together through neuroscience.',
    badges: ['Students', 'Parents'],
    img: '/webinar.png',
    isFeatured: true,
    link: 'https://webinar.sajanshah.com/',
  },
  {
    name: "World's First Educational Experience Summit",
    pitch: 'A global stage for the future of experiential learning.',
    badges: ['Youth', 'Teachers'],
    img: '/Untold Stories of Your Heroes.png',
    isFeatured: true,
    link: 'https://education.sajanshah.com',
  },
  {
    name: 'The Hero - Self Mastery Program',
    pitch: 'Unlocking peak performance and mental resilience.',
    badges: ['Youth', 'Corporate'],
    img: '/Speking Hero.jpeg',
    isFeatured: true,
    link: 'https://hero.sajanshah.com',
  },
  {
    name: 'Building a Positive Home Culture — Parenting Program',
    pitch: 'Empowering parents to create a supportive and thriving home environment.',
    badges: ['Parents', 'Families'],
    img: '/Studenting & Parenting.png',
    link: 'https://parenting.sajanshah.com',
  },
  {
    name: 'Train The Trainer Program',
    pitch: 'Equipping professionals with the tools to inspire and educate effectively.',
    badges: ['Professionals', 'Trainers'],
    img: '/Sir Speaking.jpeg',
    link: 'https://t3p.sajanshah.com',
  },
  {
    name: 'Boost Your Business Program',
    pitch: 'Strategies to accelerate growth, optimize performance, and scale success.',
    badges: ['Corporate', 'Entrepreneurs'],
    img: '/impact.png',
    link: 'https://business.sajanshah.com',
  },
  {
    name: 'Catch a Lie — Micro Emotions Program',
    pitch: 'Mastering the art of reading micro-expressions and understanding human behavior.',
    badges: ['Corporate', 'Psychology'],
    img: '/Live from the Stage/3.jpeg',
    link: 'https://catchalie.sajanshah.com',
  },
  {
    name: 'Teach The Teachers Program',
    pitch: 'Empowering educators with modern methodologies to engage and inspire students.',
    badges: ['Teachers', 'Educators'],
    img: '/Live from the Stage/1.jpeg',
    link: 'https://teachers.sajanshah.com',
  },
  {
    name: 'Life Adventure Experience Program',
    pitch: "An immersive journey to discover your true potential and embrace life's challenges.",
    badges: ['Youth', 'Adventure'],
    img: '/Live from the Stage/6.jpeg',
    link: 'https://adventure.sajanshah.com',
  },
  {
    name: 'You v/s You — Exclusive Program',
    pitch: 'A deep dive into personal mastery and overcoming internal barriers.',
    badges: ['Exclusive', 'Mentorship'],
    img: '/You vs You.png',
  },
  {
    name: 'Customise Program By Sajan Shah',
    pitch: 'Unleashing your inner creativity and driving innovation in your personal and professional life.',
    badges: ['Creatives', 'Professionals'],
    img: '/Live from the Stage/8.jpeg',
    link: 'https://customise.sajanshah.com',
  },
  {
    name: '1:1 Personal Mentorship Program',
    pitch: 'Direct, personalized guidance from Sajan to accelerate your path to success.',
    badges: ['Mentorship', 'Personal'],
    img: '/Live from the Stage/10.png',
    link: 'https://personalgrowth.sajanshah.com',
  },
];

const REASONS = [
  {
    number: '1',
    title: 'Think Differently',
    description:
      'Transforming outcomes begins by transforming thought patterns. Sajan helps audiences identify and rewire the mental habits that influence performance and success.',
  },
  {
    number: '2',
    title: 'Easy Action Steps',
    description:
      'Complex human behavior is translated into simple, practical actions that can be implemented immediately and consistently.',
  },
  {
    number: '3',
    title: 'Neuroscience-Backed',
    description:
      'Every strategy is grounded in neuroscience, psychology, and proven behavioral research rather than theory or motivation alone.',
  },
  {
    number: '4',
    title: 'Lasting Transformation',
    description:
      'The goal is not temporary inspiration but sustainable shifts in mindset, habits, decision-making, and daily performance.',
  },
  {
    number: '5',
    title: 'Universal Connection',
    description:
      'Whether speaking to students, parents, educators, professionals, or CEOs, Sajan creates messages that resonate deeply and personally.',
  },
  {
    number: '6',
    title: 'Action Creates Results',
    description:
      "Audiences don't leave with notes. They leave with clear actions, measurable next steps, and the confidence to execute them.",
  },
];

function parseContent(content: unknown): Record<string, any> {
  if (typeof content === 'string') {
    try {
      return JSON.parse(content);
    } catch {
      return {};
    }
  }
  return (content as Record<string, any>) || {};
}

export async function alignCmsToFrontendDefaults(): Promise<{
  message: string;
  updated: string[];
}> {
  const updated: string[] = [];

  // HOME — hero slides (local images + designer CTA links)
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

  // HOME — SplitHero (local portrait + local card images)
  const splitHero = await db.homePageSection.findUnique({ where: { key: 'split_hero' } });
  if (splitHero) {
    const content = parseContent(splitHero.content);
    content.mainImage = '/IMG_7631.jpg';
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
    content.image = '/Sir Speaking.jpeg';
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

  // SPEAKING — hero
  const speakingHero = await db.speakingPageSection.findUnique({ where: { key: 'hero' } });
  if (speakingHero) {
    const content = parseContent(speakingHero.content);
    content.primaryButtonText = 'Book Sajan to Speak →';
    content.primaryButtonScrollTarget = '/events#book-sajan';
    content.secondaryButtonText = 'Virtual Training →';
    content.secondaryButtonUrl = '/products#courses';
    content.gridImages = ['/Speking Hero.jpeg'];
    await db.speakingPageSection.update({ where: { id: speakingHero.id }, data: { content } });
    updated.push('speaking:hero');
  }

  // SPEAKING — logos empty so frontend shows /SPEAKINGlogo.png
  const speakingLogos = await db.speakingPageSection.findUnique({ where: { key: 'logos' } });
  if (speakingLogos) {
    const content = parseContent(speakingLogos.content);
    content.label = 'Trusted by:';
    content.logos = [];
    await db.speakingPageSection.update({ where: { id: speakingLogos.id }, data: { content } });
    updated.push('speaking:logos');
  }

  // SPEAKING — reasons + local stage marquee
  const speakingReasons = await db.speakingPageSection.findUnique({ where: { key: 'reasons' } });
  if (speakingReasons) {
    const content = parseContent(speakingReasons.content);
    content.reasons = REASONS;
    content.marqueeImages = LIVE_STAGE;
    content.marqueeSectionLabel = 'Live from the Stage';
    content.marqueeSectionTitle = 'Speaker Moments';
    content.marqueeEventName = '';
    content.logoImage = '/LOGO2.png';
    await db.speakingPageSection.update({ where: { id: speakingReasons.id }, data: { content } });
    updated.push('speaking:reasons');
  }

  // SPEAKING — catalog local images + program links
  const speakingCatalog = await db.speakingPageSection.findUnique({ where: { key: 'catalog' } });
  if (speakingCatalog) {
    const content = parseContent(speakingCatalog.content);
    content.sectionLabel = 'The Program Catalog';
    content.heading = 'IMPACT-DRIVEN';
    content.headingDim = 'EXPERIENCES.';
    content.subtext = 'Select a program to explore transformation details';
    content.programs = SPEAKING_PROGRAMS;
    await db.speakingPageSection.update({ where: { id: speakingCatalog.id }, data: { content } });
    updated.push('speaking:catalog');
  }

  // SPEAKING — message local photos
  const speakingMessage = await db.speakingPageSection.findUnique({ where: { key: 'message' } });
  if (speakingMessage) {
    const content = parseContent(speakingMessage.content);
    content.speakerImage = '/Sir Speaking.jpeg';
    content.signatureImage = '/sir sign.png';
    await db.speakingPageSection.update({ where: { id: speakingMessage.id }, data: { content } });
    updated.push('speaking:message');
  }

  return {
    message: `Aligned ${updated.length} CMS sections to local designer images/links`,
    updated,
  };
}
