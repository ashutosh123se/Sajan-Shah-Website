const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

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

/** Same programs/links as frontend ProgramCatalog defaults — local images only (no Unsplash). */
const PROGRAMS = [
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

const sections = [
  {
    key: 'hero',
    title: 'Hero Section',
    order: 1,
    isActive: true,
    content: {
      heading: "This Isn't Motivation.",
      headingItalic: 'This Is',
      headingHighlight: 'Transformation.',
      gridImages: ['/Speking Hero.jpeg'],
      primaryButtonText: 'Book Sajan to Speak →',
      primaryButtonScrollTarget: '/events#book-sajan',
      secondaryButtonText: 'Virtual Training →',
      secondaryButtonUrl: 'https://webinar.sajanshah.com',
    },
  },
  {
    key: 'logos',
    title: 'Trusted By / Logos',
    order: 2,
    isActive: true,
    content: {
      label: 'Trusted by:',
      // Empty → frontend shows designer /SPEAKINGlogo.png
      logos: [],
    },
  },
  {
    key: 'message',
    title: 'Personal Message Section',
    order: 3,
    isActive: true,
    content: {
      sectionLabel: 'A Personal Message From',
      speakerName: 'Sajan Shah',
      speakerImage: '/Sir Speaking.jpeg',
      signatureImage: '/sir sign.png',
      signOffText: 'With Purpose,',
      paragraphs: [
        'Firstly, I want to begin by saying <em>thank you.</em>',
        'Being considered to impact your audience is not just an opportunity, it is a responsibility I deeply value.',
        'Every session I deliver is designed with one objective: <highlight>to create a shift that lasts beyond the event.</highlight>',
        'This page is created to help you understand how we can work together, what your audience will experience, and the transformation they can expect.',
        'Whether your event is live, virtual, or hybrid, the focus remains the same:',
        'My commitment is simple, to deliver an experience that engages your audience, challenges their thinking, and drives real change.',
        'Take a moment to explore, and see how we can create something impactful together.',
      ],
      pillars: ['Clarity.', 'Action.', 'Results.'],
    },
  },
  {
    key: 'reasons',
    title: '6 Reasons Section',
    order: 4,
    isActive: true,
    content: {
      bigNumber: '6',
      highlightWord1: 'BIG',
      reasonsLabel1: 'reasons that people',
      highlightWord2: 'LOVE',
      reasonsLabel2: 'working with Sajan',
      reasons: REASONS,
      marqueeSectionLabel: 'Live from the Stage',
      marqueeSectionTitle: 'Speaker Moments',
      marqueeImages: LIVE_STAGE,
      marqueeEventName: '',
      logoImage: '/LOGO2.png',
    },
  },
  {
    key: 'catalog',
    title: 'Program Catalog',
    order: 5,
    isActive: true,
    content: {
      sectionLabel: 'The Program Catalog',
      heading: 'IMPACT-DRIVEN',
      headingDim: 'EXPERIENCES.',
      subtext: 'Select a program to explore transformation details',
      programs: PROGRAMS,
    },
  },
  {
    key: 'features',
    title: 'Success Ecosystem / Features',
    order: 6,
    isActive: true,
    content: {
      sectionLabel: 'Universal Features',
      heading: 'THE SUCCESS',
      headingDim: 'ECOSYSTEM.',
      description:
        "We don't just provide programs; we provide a complete support infrastructure designed to streamline decision-making and ensure institutional alignment.",
      stats: [
        { value: '12+', label: 'Programs' },
        { value: '16M+', label: 'Lives Impacted' },
      ],
      features: [
        {
          title: 'Rapid Response',
          desc: 'Connect directly for event scheduling and technical requirements.',
          icon: 'PhoneCall',
          linkText: 'Booking Portal',
        },
        {
          title: 'Full Speaker Kit',
          desc: 'A comprehensive, media-ready package including high-res headshots, formal profiles, and professional bios.',
          icon: 'FileText',
          linkText: 'Download Speaker Kit',
        },
      ],
      ctaCardTitle: 'Rapid Response',
      ctaCardDesc: 'Connect directly for event scheduling and technical requirements.',
      ctaCardButtonText: 'Book Sajan For Your Event',
      whatsappNumber: '',
    },
  },
];

async function main() {
  console.log('🌱 Seeding Speaking Page sections (create-only, never overwrites)...');

  for (const section of sections) {
    const existing = await db.speakingPageSection.findUnique({ where: { key: section.key } });
    if (existing) {
      console.log(`  ⏭️ Skip existing: ${section.key}`);
      continue;
    }
    await db.speakingPageSection.create({ data: section });
    console.log(`  ✅ Created: ${section.key}`);
  }

  console.log('✨ Speaking page seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
