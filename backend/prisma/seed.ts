import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'ashutoshshekhar37@gmail.com' }, update: {},
    create: { name: 'Super Admin', email: 'ashutoshshekhar37@gmail.com', passwordHash: await bcrypt.hash('ashutosh@1234sa', 12), role: 'SUPER_ADMIN' }
  });

  const programs = [
    { title: 'SOL – Memory & Family Transformation', slug: 'sol-memory-family', pitch: 'Transform how your family learns through memory science', price: 4999, targetAudience: ['students', 'parents'] },
    { title: 'Boost Your Business Program', slug: 'boost-your-business', pitch: 'Neuroscience-backed strategies to scale your business', price: 9999, targetAudience: ['corporate'] },
    { title: 'Life Adventure Program – The Hero Program', slug: 'life-adventure-hero', pitch: 'Become the hero of your own story', price: 5999, targetAudience: ['youth', 'students'] },
    { title: 'Business Adventure Program', slug: 'business-adventure', pitch: 'Adventure-based learning for entrepreneurs', price: 7999, targetAudience: ['corporate'] },
    { title: 'You vs You – Exclusive Program', slug: 'you-vs-you', pitch: 'Compete only with your best self', price: 12999, targetAudience: ['youth', 'students', 'corporate'] },
    { title: 'Business & Life Consultancy', slug: 'business-life-consultancy', pitch: 'Personalized 1:1 strategic guidance', price: 24999, targetAudience: ['corporate'] },
    { title: 'Building a Positive Home Culture', slug: 'positive-home-culture', pitch: 'Create a thriving growth-oriented home environment', price: 3999, targetAudience: ['parents'] },
    { title: 'Catch a Lie – Exclusive Program', slug: 'catch-a-lie', pitch: 'Master body language and deception detection', price: 8999, targetAudience: ['corporate', 'youth'] },
    { title: 'Creative Self – Tailored Motivational Program', slug: 'creative-self', pitch: 'Unlock and express your creative potential', price: 4999, targetAudience: ['students', 'youth'] },
    { title: 'Jainism in 21st Century', slug: 'jainism-21st-century', pitch: 'Ancient wisdom for modern challenges', price: 2999, targetAudience: ['students', 'parents'] },
    { title: '1:1 Coaching / Mentorship Program', slug: 'one-on-one-coaching', pitch: 'Direct mentorship from Sajan Shah', price: 49999, targetAudience: ['students', 'corporate', 'youth'] },
  ];
  for (const p of programs) {
    await prisma.program.upsert({ where: { slug: p.slug }, update: {},
      create: { ...p, description: `Full description for ${p.title}. Update via admin panel.`, curriculum: JSON.stringify([{ module: 'Module 1', topics: ['Introduction', 'Foundation', 'Practice'] }]), isActive: true }
    });
  }

  const initiatives = [
    { title: 'United First Festival', slug: 'united-first-festival', description: 'Uniting youth from across communities' },
    { title: 'YMF – Youth Motivation Forum', slug: 'ymf', description: 'Annual forum empowering thousands of youth' },
    { title: 'Season of Learning', slug: 'season-of-learning', description: 'Year-round initiative for underprivileged students' },
    { title: 'Plantable Pencils Drive', slug: 'plantable-pencils-drive', description: 'Eco-friendly pencils for schools across India' },
    { title: 'UV Glasses Drive', slug: 'uv-glasses-drive', description: 'Protecting students from harmful UV radiation' },
    { title: 'Sajan Shah App', slug: 'sajan-shah-app', description: 'Free learning app for students and parents' },
    { title: 'Teachers Training Program', slug: 'teachers-training', description: 'Modern teaching methodologies for educators' },
    { title: 'Live to Inspire', slug: 'live-to-inspire', description: 'Community platform for inspiring stories' },
    { title: 'Ethos Global Advisory', slug: 'ethos-global-advisory', description: 'Advisory network for global youth leaders' },
  ];
  for (const i of initiatives) {
    await prisma.initiative.upsert({ where: { slug: i.slug }, update: {}, create: { ...i, isActive: true } });
  }

  const legalPages = [
    { slug: 'privacy-policy', title: 'Privacy Policy' },
    { slug: 'terms-and-conditions', title: 'Terms & Conditions' },
    { slug: 'refund-policy', title: 'Cancellation & Refund Policy' },
    { slug: 'shipping-policy', title: 'Shipping & Delivery Policy' },
  ];
  for (const lp of legalPages) {
    await prisma.legalPage.upsert({ where: { slug: lp.slug }, update: {},
      create: { ...lp, content: `<h1>${lp.title}</h1><p>Content to be updated by admin via the admin panel.</p>` }
    });
  }
  console.log('✅ Database seeded successfully');
}
main().catch(console.error).finally(() => prisma.$disconnect());
