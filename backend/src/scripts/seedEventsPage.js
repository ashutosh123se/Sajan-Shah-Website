const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const sections = [
  {
    key: 'hero',
    title: 'Events Hero Section',
    order: 1,
    isActive: true,
    content: {
      heading: "Sajan Shah",
      subHeading: "events calendar",
      paragraph: "Create your own success story through the massive impact of a Sajan Shah event.",
      buttonText: "View all events"
    }
  },
  {
    key: 'cta',
    title: 'Events Booking CTA Form Section',
    order: 2,
    isActive: true,
    content: {
      heading: "Invite Sajan Shah for an Event",
      paragraph: "Transform your organisation, school, or corporate team with a highly customized and impactful session by Sajan Shah.",
      buttonText: "Book Sajan For Your Event"
    }
  },
  {
    key: 'impactfulEvents',
    title: 'Top Impactful Events (Reels)',
    order: 3,
    isActive: true,
    content: {
      heading: 'Top Impactful Events of This Year',
      reels: [
        {
          id: 1,
          tag: 'National',
          embedUrl: 'https://www.instagram.com/reel/DDenOOnT5tA/embed/?hidecaption=true'
        },
        {
          id: 2,
          tag: 'National',
          embedUrl: 'https://www.instagram.com/reel/DFVYO3aNJGg/embed/?hidecaption=true'
        },
        {
          id: 3,
          tag: 'International',
          embedUrl: 'https://www.instagram.com/reel/DDODYmnIDm1/embed/?hidecaption=true'
        },
        {
          id: 4,
          tag: 'National',
          embedUrl: 'https://www.instagram.com/reel/DFIPJQcTVFI/embed/?hidecaption=true'
        },
        {
          id: 5,
          tag: 'International',
          embedUrl: 'https://www.instagram.com/reel/DC1Uuh3gbGn/embed/?hidecaption=true'
        }
      ]
    }
  }
];

async function main() {
  console.log('🌱 Seeding Events Page sections (create-only, never overwrites)...');

  for (const section of sections) {
    const existing = await db.eventsPageSection.findUnique({ where: { key: section.key } });
    if (existing) {
      console.log(`  ⏭️ Skip existing: ${section.key}`);
      continue;
    }
    await db.eventsPageSection.create({ data: section });
    console.log(`  ✅ Created: ${section.key}`);
  }

  console.log('✨ Events page seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
