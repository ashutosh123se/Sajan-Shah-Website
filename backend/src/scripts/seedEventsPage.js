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
  }
];

async function main() {
  console.log('🌱 Seeding Events Page sections...');

  for (const section of sections) {
    await db.eventsPageSection.upsert({
      where: { key: section.key },
      update: {
        title: section.title,
        content: section.content,
        order: section.order,
        isActive: section.isActive,
      },
      create: section,
    });
    console.log(`  ✅ Seeded: ${section.key}`);
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
