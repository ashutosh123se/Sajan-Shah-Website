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

  // HOME — hero: keep admin slides; only fill missing structure / media defaults
  const homeHero = await db.homePageSection.findUnique({ where: { key: 'hero' } });
  if (homeHero) {
    const content = parseContent(homeHero.content);
    const defaultSlides = [
      {
        id: 1,
        order: 1,
        isActive: true,
        headline: "India’s Biggest Memory & Family Transformation Experience",
        subheadline:
          'One stage. Thousands of lives. A system designed to transform how families think, learn, and grow together.',
        ctaText: 'Join Now',
        ctaLink: 'https://sol.sajanshah.com',
        image: '/EVENT.png',
      },
      {
        id: 2,
        order: 2,
        isActive: true,
        headline: 'Transform From Home. No Travel Required.',
        subheadline:
          'Join India’s most powerful student-parent webinar and experience real breakthroughs in focus, confidence, and results.',
        ctaText: 'Reserve Your Seat',
        ctaLink: 'https://webinar.sajanshah.com',
        image: '/webinar.png',
      },
      {
        id: 3,
        order: 3,
        isActive: true,
        headline: 'Upgrade Your Life With Proven Systems',
        subheadline:
          'Access powerful programs designed to improve thinking, performance, and personal growth - step by step.',
        ctaText: 'Explore Programs',
        ctaLink: '/products',
        image: '/You vs You.png',
      },
      {
        id: 4,
        order: 4,
        isActive: true,
        headline: 'Live to Inspire. Lead to Serve.',
        subheadline:
          'Be part of a movement focused on creating real impact through education, awareness, and human transformation.',
        ctaText: 'Join the Initiative',
        ctaLink: 'https://unitedfirst.in',
        image: '/united first.png',
      },
    ];

    if (!Array.isArray(content.slides) || content.slides.length === 0) {
      content.slides = defaultSlides;
    } else {
      content.slides = content.slides.map((slide: any, i: number) => ({
        id: slide.id ?? i + 1,
        order: typeof slide.order === 'number' ? slide.order : i + 1,
        isActive: slide.isActive !== false,
        headline: slide.headline || '',
        subheadline: slide.subheadline || '',
        ctaText: slide.ctaText || '',
        ctaLink: slide.ctaLink || '',
        image: slide.image || '',
        video: slide.video || '',
      }));
    }

    if (!content.backgroundVideo) content.backgroundVideo = '/sajan_hero.mp4';
    if (!content.posterImage) content.posterImage = '/EVENT.png';
    if (!content.intervalMs) content.intervalMs = 6000;

    await db.homePageSection.update({ where: { id: homeHero.id }, data: { content } });
    updated.push('home:hero');
  }

  // HOME — SplitHero (designer mentor portrait + local card images)
  const splitHero = await db.homePageSection.findUnique({ where: { key: 'split_hero' } });
  if (splitHero) {
    const content = parseContent(splitHero.content);
    content.mainImage = '/mentor-portrait.jpeg';
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
    content.secondaryButtonUrl = 'https://webinar.sajanshah.com';
    content.gridImages = ['/Speking Hero.jpeg'];
    await db.speakingPageSection.update({ where: { id: speakingHero.id }, data: { content } });
    updated.push('speaking:hero');
  }

  // SPEAKING — logos: empty / text-only so frontend shows /SPEAKINGlogo.png strip
  const speakingLogos = await db.speakingPageSection.findUnique({ where: { key: 'logos' } });
  if (speakingLogos) {
    const content = parseContent(speakingLogos.content);
    content.label = content.label || 'Trusted by:';
    content.stripImage = content.stripImage || '/SPEAKINGlogo.png';
    // Clear text-name logos that force the wrong server UI (TATA/TEDX/ONGC…)
    const logos = Array.isArray(content.logos) ? content.logos : [];
    const hasImageLogos = logos.some(
      (logo: any) => logo && typeof logo === 'object' && logo.imageUrl
    );
    if (!hasImageLogos) {
      content.logos = [];
    }
    await db.speakingPageSection.update({ where: { id: speakingLogos.id }, data: { content } });
    updated.push('speaking:logos');
  }

  // SPEAKING — reasons + local stage marquee
  const speakingReasons = await db.speakingPageSection.findUnique({ where: { key: 'reasons' } });
  if (speakingReasons) {
    const content = parseContent(speakingReasons.content);
    content.reasons = content.reasons?.length ? content.reasons : REASONS;
    // Always use local stage photos so production matches designer frontend
    content.marqueeImages = LIVE_STAGE;
    content.marqueeSectionLabel = content.marqueeSectionLabel || 'Live from the Stage';
    content.marqueeSectionTitle = content.marqueeSectionTitle || 'Speaker Moments';
    content.marqueeEventName = content.marqueeEventName ?? '';
    content.marqueeLink =
      content.marqueeLink || 'https://www.instagram.com/sajan_shahh/';
    content.logoImage = '/LOGO2.png';
    await db.speakingPageSection.update({ where: { id: speakingReasons.id }, data: { content } });
    updated.push('speaking:reasons');
  }

  // SPEAKING — catalog: keep CMS programs, always ensure designer links/images when missing
  const speakingCatalog = await db.speakingPageSection.findUnique({ where: { key: 'catalog' } });
  if (speakingCatalog) {
    const content = parseContent(speakingCatalog.content);
    content.sectionLabel = content.sectionLabel || 'The Program Catalog';
    content.heading = content.heading || 'IMPACT-DRIVEN';
    content.headingDim = content.headingDim || 'EXPERIENCES.';
    content.subtext = content.subtext || 'Select a program to explore transformation details';

    const normalizeName = (name?: string) =>
      (name || '')
        .toLowerCase()
        .replace(/[–—−]/g, '-')
        .replace(/[^a-z0-9]+/g, '')
        .trim();

    if (!Array.isArray(content.programs) || content.programs.length === 0) {
      content.programs = SPEAKING_PROGRAMS;
    } else {
      content.programs = content.programs.map((program: any) => {
        const fallback = SPEAKING_PROGRAMS.find(
          (d) => normalizeName(d.name) === normalizeName(program?.name)
        );
        const cmsImg = (program?.img || '').trim();
        const keepCmsImg =
          (cmsImg.startsWith('/') && !cmsImg.startsWith('//')) || cmsImg.includes('/uploads/');
        return {
          ...fallback,
          ...program,
          img: keepCmsImg ? cmsImg : fallback?.img || cmsImg || '',
          link: (program?.link && String(program.link).trim()) || fallback?.link || '',
          badges:
            Array.isArray(program?.badges) && program.badges.length
              ? program.badges
              : fallback?.badges || [],
        };
      });
    }

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
