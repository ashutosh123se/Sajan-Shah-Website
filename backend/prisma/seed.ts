import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { execSync } from 'child_process';
import path from 'path';
import { seedInitiatives, seedTestimonials, seedLegalPages } from './seedExtras';
import { seedProducts } from './seedProducts';
import { seedPress } from './seedPress';

const prisma = new PrismaClient();

const eventsPageSections = [
  {
    key: 'hero',
    title: 'Events Hero Section',
    order: 1,
    isActive: true,
    content: {
      heading: 'Sajan Shah',
      subHeading: 'events calendar',
      paragraph: 'Create your own success story through the massive impact of a Sajan Shah event.',
      buttonText: 'View all events',
    },
  },
  {
    key: 'cta',
    title: 'Events Booking CTA Form Section',
    order: 2,
    isActive: true,
    content: {
      heading: 'Invite Sajan Shah for an Event',
      paragraph: 'Transform your organisation, school, or corporate team with a highly customized and impactful session by Sajan Shah.',
      buttonText: 'Book Sajan For Your Event',
    },
  },
];

const contributionsPageSections = [
  {
    key: 'hero',
    title: 'Contributions Hero Banner',
    order: 1,
    isActive: true,
    content: {
      heading: 'IMPACT BEYOND BOUNDARIES',
      subHeading: 'Our Contributions',
      paragraph: "We don't just build careers; we build legacies through education, empowerment, and sustainable social change.",
    },
  },
  {
    key: 'impact',
    title: 'Live Impact Metrics Dashboard',
    order: 2,
    isActive: true,
    content: {
      heading: 'MEASURABLE CONTRIBUTIONS.',
      subHeading: 'Live Analytics',
      stats: [
        { label: 'Students Supported', value: '200K+', trend: '+12% this year' },
        { label: 'Pencils Distributed', value: '500K+', trend: 'Goal: 1M' },
        { label: 'UV Glasses Delivered', value: '50K+', trend: 'Active drive' },
      ],
      timelineTitle: 'Legacy Timeline',
      timeline: [
        { year: '2016', title: 'Foundation', event: 'Launch of United First Initiative with a vision for UN SDGs.' },
        { year: '2024', title: 'Future Ready', event: 'Integration of Neuroscience tools in digital learning apps.' },
      ],
    },
  },
  {
    key: 'donate',
    title: 'Donate Call to Action Section',
    order: 3,
    isActive: true,
    content: {
      heading: 'YOUR CONTRIBUTION SAVES LIVES.',
      paragraph: 'Every rupee donated goes directly towards providing neuroscience-backed education, health drives, and sustainable tools for children who need it most.',
      buttonText: 'Donate Now',
    },
  },
  {
    key: 'stories',
    title: 'Impact Case Stories',
    order: 4,
    isActive: true,
    content: {
      heading: 'CASE STUDIES',
      subHeading: 'Impact Stories',
      stories: [
        { title: 'The Pencils of Hope', excerpt: 'How plantable pencils transformed a rural district approach to green education.', imageUrl: '/Our Core Initiatives/Plantable Pencils Drive cover.jpeg' },
      ],
    },
  },
  {
    key: 'partnerships',
    title: 'Partnership Models',
    order: 5,
    isActive: true,
    content: {
      heading: 'Partnership Models',
      subHeading: 'Collaborations',
      paragraph: 'We work with schools, corporations, and NGOs to scale our social impact globally.',
      models: [
        { title: 'Academic', desc: 'Neuroscience-backed workshops and student development programs.', type: 'School Partners' },
        { title: 'Corporate', desc: 'Employee engagement and dedicated CSR initiatives.', type: 'CSR Partners' },
      ],
    },
  },
  {
    key: 'volunteer',
    title: 'Volunteer Ambassador Program',
    order: 6,
    isActive: true,
    content: {
      heading: 'BECOME AN AMBASSADOR',
      paragraph: 'Join our network of changemakers driving impact in your community.',
      buttonText: 'Join the Movement',
    },
  },
  {
    key: 'philosophy',
    title: 'Leadership Philosophy',
    order: 7,
    isActive: true,
    content: {
      heading: 'CONTRIBUTION PHILOSOPHY',
      quote: 'True leadership is measured by the lives you uplift, not the titles you hold.',
      boxQuote: 'Impact is not an event. It is a daily discipline.',
    },
  },
  {
    key: 'download',
    title: 'Download Centre',
    order: 8,
    isActive: true,
    content: {
      heading: 'IMPACT REPORTS',
      subHeading: 'Verification Centre',
      reports: [
        { title: 'Annual Impact Report 2024', url: '#' },
      ],
    },
  },
  {
    key: 'partners',
    title: 'Partners Wall',
    order: 9,
    isActive: true,
    content: {
      heading: 'TRUSTED PARTNERS',
      logoUrl: '/LOGO.png',
    },
  },
  {
    key: 'gallery',
    title: 'Visual Gallery',
    order: 10,
    isActive: true,
    content: {
      heading: 'IMPACT IN ACTION',
      photos: [
        { cat: 'Education', title: 'Student Workshop', imageUrl: '/Social Work/9.jpeg' },
        { cat: 'Community', title: 'Plantable Pencils Drive', imageUrl: '/Our Core Initiatives/Plantable Pencils Drive1.jpeg' },
      ],
    },
  },
];

function runPageSeedScript(scriptName: string) {
  const scriptPath = path.join(__dirname, '../src/scripts', scriptName);
  execSync(`node "${scriptPath}"`, { stdio: 'inherit', cwd: path.join(__dirname, '..') });
}

async function seedPageSections() {
  for (const section of eventsPageSections) {
    await prisma.eventsPageSection.upsert({
      where: { key: section.key },
      update: {
        title: section.title,
        content: section.content,
        order: section.order,
        isActive: section.isActive,
      },
      create: section,
    });
  }

  for (const section of contributionsPageSections) {
    await prisma.contributionsPageSection.upsert({
      where: { key: section.key },
      update: {
        title: section.title,
        content: section.content,
        order: section.order,
        isActive: section.isActive,
      },
      create: section,
    });
  }

  const scripts = [
    'seedHomePage.js',
    'seedAboutPage.js',
    'seedSpeakingPage.js',
    'seedEventsPage.js',
    'seedContributionsPage.js',
  ];

  for (const script of scripts) {
    console.log(`Running ${script}...`);
    runPageSeedScript(script);
  }

  console.log('✅ Page sections seeded');
}

async function seedSettings() {
  const paymentKeyId = process.env.RAZORPAY_KEY_ID;
  const paymentSecret = process.env.RAZORPAY_KEY_SECRET;
  const smtpUser = process.env.EMAIL_USER || process.env.SMTP_USER;
  const smtpPass = process.env.EMAIL_PASS || process.env.SMTP_PASS;

  if (paymentKeyId && paymentSecret) {
    await prisma.setting.upsert({
      where: { key: 'apiKey' },
      update: { value: paymentKeyId, group: 'payment' },
      create: { key: 'apiKey', value: paymentKeyId, group: 'payment' },
    });
    await prisma.setting.upsert({
      where: { key: 'apiSecret' },
      update: { value: paymentSecret, group: 'payment' },
      create: { key: 'apiSecret', value: paymentSecret, group: 'payment' },
    });
    await prisma.setting.upsert({
      where: { key: 'currency' },
      update: { value: 'INR', group: 'payment' },
      create: { key: 'currency', value: 'INR', group: 'payment' },
    });
  }

  if (smtpUser && smtpPass) {
    const smtpSettings = [
      { key: 'host', value: process.env.EMAIL_HOST || process.env.SMTP_HOST || 'smtp.gmail.com' },
      { key: 'port', value: process.env.EMAIL_PORT || process.env.SMTP_PORT || '587' },
      { key: 'secure', value: process.env.EMAIL_SECURE || process.env.SMTP_SECURE || 'false' },
      { key: 'username', value: smtpUser },
      { key: 'password', value: smtpPass },
      { key: 'from', value: process.env.EMAIL_FROM || `"Sajan Shah" <${smtpUser}>` },
    ];
    for (const s of smtpSettings) {
      await prisma.setting.upsert({
        where: { key: s.key },
        update: { value: s.value, group: 'smtp' },
        create: { key: s.key, value: s.value, group: 'smtp' },
      });
    }
  }

  console.log('✅ Settings seeded (when env vars present)');
}

async function main() {
  await prisma.user.upsert({
    where: { email: 'ashutoshshekhar37@gmail.com' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'ashutoshshekhar37@gmail.com',
      passwordHash: await bcrypt.hash('ashutosh@1234sa', 12),
      role: 'ADMIN',
    },
  });

  await prisma.user.upsert({
    where: { email: 'bhavik142490@gmail.com' },
    update: {},
    create: {
      name: 'Bhavik Admin',
      email: 'bhavik142490@gmail.com',
      passwordHash: await bcrypt.hash('bhavik@123', 12),
      role: 'ADMIN',
    },
  });

  await seedPageSections();
  await seedInitiatives();
  await seedTestimonials();
  await seedLegalPages();
  await seedSettings();
  await seedProducts(prisma);
  await seedPress(prisma);

  console.log('✅ Database seeded successfully (admins, page sections, initiatives, testimonials, legal pages, settings, products, press)');
}

main().catch(console.error).finally(() => prisma.$disconnect());
