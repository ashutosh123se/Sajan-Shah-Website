import { db } from './database';

export const defaultInitiatives = [
  { slug: 'ethos-global-advisory', title: 'Ethos Global Advisory', description: 'Strategic consultancy for social impact.', imageUrl: '/Our Core Initiatives/Ethos Global Advisory cover.png', order: 1 },
  { slug: 'live-to-inspire', title: 'Live to Inspire', description: 'Our core foundation for large-scale impact.', imageUrl: '/live to bg.jpeg', order: 2 },
  { slug: 'plantable-pencils-drive', title: 'Plantable Pencils Drive', description: 'Green education through sustainable tools.', imageUrl: '/Our Core Initiatives/Plantable Pencils Drive cover.jpeg', order: 3 },
  { slug: 'sajan-shah-app', title: 'Sajan Shah App', description: 'Digital neuroscience tools in your pocket.', imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop', order: 4 },
  { slug: 'season-of-learning', title: 'Season of Learning', description: 'Continuous education programs for all ages.', imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2069&auto=format&fit=crop', order: 5 },
  { slug: 'teachers-training-program', title: 'Teachers Training Program', description: 'Upskilling educators with neuroscience.', imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop', order: 6 },
  { slug: 'uv-glasses-drive', title: 'UV Glasses Drive', description: 'Vision health for underprivileged communities.', imageUrl: '/Our Core Initiatives/UV Glasses Drive cover.jpeg', order: 7 },
  { slug: 'united-first-initiative', title: 'United First Initiative', description: 'Aligning with UN SDGs to drive global change.', imageUrl: '/united first.png', order: 8 },
  { slug: 'ymf-youth-motivation-forum', title: 'YMF (Youth Motivation Forum)', description: 'Empowering the next generation of leaders.', imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop', order: 9 },
];

export const defaultTestimonials = [
  { name: 'Muhammad Faisal', designation: 'Four Times Guinness World Record Holder for Strongest Memory', organization: null, quote: 'Sajan is a passionate motivator and speaker. He just need a mic and stage to improve your productivity.', photoUrl: '/Hero T/Muhammad Faisal.jpeg', order: 1 },
  { name: 'His Holiness Dalai Lama', designation: 'Spiritual Leader', organization: null, quote: 'Sajan is doing commendable work for the development of the country. I really appreciate his efforts and dedication towards building the next generation. Keep up the good work.', photoUrl: '/Hero T/His Holiness Dalai Lama.png', order: 2 },
  { name: 'Acharya Dr. Lokesh Muni', designation: 'World Peace Ambassador, Founder of Ahimsa Vishwa Bharti', organization: null, quote: 'Sajan is very young, dynamic and a smart strategic speaker with amazing practical knowledge and examples. My best wishes are always with him.', photoUrl: '/Hero T/Acharya Dr. Lokesh Muni.png', order: 3 },
  { name: 'Hon. Dr. Jitendra Singh', designation: "Minister of State for Prime Minister's Office", organization: null, quote: 'It was really motivating to hear Sajan in Jammu Kashmir. His vision and mission towards the nation is really inspiring. His passion and energy is amazing. Keep it up Sajan.', photoUrl: '/Hero T/Hon. Dr. Jitendra Singh.jpeg', order: 4 },
  { name: 'Hon. Piyush Goyal', designation: 'Minister of Commerce and Industry', organization: null, quote: "Sajan, not only do you motivate the youth & empower them; but you are serving the nation in a much bigger way. Never stop what you're doing.", photoUrl: '/Hero T/Hon. Piyush Goyal.jpeg', order: 5 },
  { name: 'Sammeer Sata', designation: 'Senior Vice President, Reliance Industries Limited', organization: null, quote: 'Well, first of all, I love watching him LIVE. His energy to enlighten and encourage the people, to achieve their potential to optimum level, is unmatchable! The highly thoughtful programs that he has done have potential which can help anyone to achieve real world class results.', photoUrl: '/Hero T/Sammeer Sata.jpeg', order: 6 },
  { name: 'Dr. A Velumani', designation: 'Promoter & MD, Thyrocare Tech. Ltd.', organization: null, quote: 'Sajan Shah has a clutter less thinking that helps 1000s to get Uncluttered. Met him just for an hour and found him having all that a leader needs.', photoUrl: '/Hero T/Dr. A Velumani.webp', order: 7 },
];

export const defaultLegalPages = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    content: '<p>Privacy Policy content. Edit this page from Admin → Legal Pages.</p>',
  },
  {
    slug: 'terms-of-service',
    title: 'Terms of Service',
    content: '<p>Terms of Service content. Edit this page from Admin → Legal Pages.</p>',
  },
  {
    slug: 'terms-and-conditions',
    title: 'Terms and Conditions',
    content: '<p>Terms and Conditions content. Edit this page from Admin → Legal Pages.</p>',
  },
];

export async function seedInitiatives() {
  for (const initiative of defaultInitiatives) {
    await db.initiative.upsert({
      where: { slug: initiative.slug },
      update: {
        title: initiative.title,
        description: initiative.description,
        imageUrl: initiative.imageUrl,
        order: initiative.order,
        isActive: true,
      },
      create: { ...initiative, isActive: true },
    });
  }
  console.log('✅ Initiatives seeded');
}

export async function seedTestimonials() {
  const existing = await db.testimonial.count();
  if (existing > 0) {
    console.log('⏭️ Testimonials already exist, skipping bulk seed');
    return;
  }

  for (const testimonial of defaultTestimonials) {
    await db.testimonial.create({
      data: { ...testimonial, isActive: true },
    });
  }
  console.log('✅ Testimonials seeded');
}

export async function seedLegalPages() {
  for (const page of defaultLegalPages) {
    await db.legalPage.upsert({
      where: { slug: page.slug },
      update: { title: page.title, content: page.content },
      create: page,
    });
  }
  console.log('✅ Legal pages seeded');
}
