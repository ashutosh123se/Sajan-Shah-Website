const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const aboutSections = [
  {
    key: 'hero',
    title: 'Hero Section',
    order: 1,
    content: {
      backgroundImage: '/impact.png',
      tagline: 'Legacy of Transformation',
      titlePart1: 'Sajan',
      titlePart2: 'Shah'
    }
  },
  {
    key: 'mission_vision',
    title: 'Mission & Vision',
    order: 2,
    content: {
      missionTitle: 'Mission',
      missionHeading: 'Igniting a global movement to inspire 1.2 billion young minds.',
      missionDescription: 'To think differently, act consciously, and create extraordinary impact in the world.',
      visionTitle: 'Vision',
      visionHeading: 'A world powered by clarity and awareness.',
      visionDescription: 'To build a world where individuals are not driven by pressure, but powered by a rewired mind.'
    }
  },
  {
    key: 'bio',
    title: 'Biography Section',
    order: 3,
    content: {
      image: 'https://webinar.sajanshah.com/assets/mentor-portrait-DVhB0Q8D.jpeg',
      heading1: 'Exactly Like...',
      heading2: 'Nobody Else',
      introBold: 'Most people try to change their life by pushing harder.',
      introItalic: 'Sajan Shah teaches something radically different.',
      mainDescription: 'Change how you think… and your life changes automatically. Because the problem is not your effort. The problem is your wiring. And once that changes, everything changes.',
      quote: 'Sajan Shah is one of India’s youngest motivational speakers and is widely known as the Memory Man of India.',
      statsParagraph: 'A Speaker at the World Parliament of Religions, 3-Time TEDx Speaker, and Author of 8 Transformational Books, he has impacted over 16+ million lives across the globe.',
      recognitionParagraph: 'Recognized and appreciated by global icons including HH Dalai Lama, Tennis Champion Roger Federer, and World Peace Ambassador Acharya Lokesh.',
      truthHeading: 'The Core Truth',
      truthQuote: "He doesn't just inspire people. He rewires them."
    }
  },
  {
    key: 'system',
    title: 'Transformation System',
    order: 4,
    content: {
      tagline: 'Transformation System',
      heading: 'Motivation is a push. A System is a solution.',
      focusAreas: [
        {
          title: 'Reprogramming Thinking Patterns',
          desc: 'Identifying and breaking the mental loops that hold you back from your potential.'
        },
        {
          title: 'Unstoppable Mental Discipline',
          desc: 'Building the internal strength to stay committed when motivation fades.'
        },
        {
          title: 'Enhancing Memory & Focus',
          desc: 'Mastering the cognitive tools to process and retain information at world-class levels.'
        },
        {
          title: 'Clarity in Decision-Making',
          desc: 'Eliminating mental fog to make high-stakes choices with absolute certainty.'
        },
        {
          title: 'Designing Habits of Success',
          desc: 'Creating automated systems of behavior that sustain long-term peak performance.'
        }
      ],
      outcomeTagline: 'The Ultimate Outcome',
      outcomeQuote: 'Not temporary excitement. A PERMANENT SHIFT.'
    }
  },
  {
    key: 'movement',
    title: 'Movement Builder Section',
    order: 5,
    content: {
      mainTitle: 'And then what?',
      row1Image1: 'https://webinar.sajanshah.com/assets/mentor-portrait-DVhB0Q8D.jpeg',
      row1Tagline: 'From Speaker to',
      row1Heading: 'Movement Builder',
      row1Description: 'Sajan Shah is not just a speaker — he is a catalyst for global change, driving transformation at the individual, institutional, and societal level.',
      row1SubTagline: 'United First Initiative',
      row1SubDescription: 'Driving global impact aligned with UN Sustainable Development Goals (SDG 2030).',
      row1Image2: 'https://webinar.sajanshah.com/assets/mentor-portrait-DVhB0Q8D.jpeg',
      row2Text1Heading: 'From Learning to Execution',
      row2Text1Description: 'Most people know what to do. Very few actually do it. Sajan bridges that gap through action-driven frameworks and daily execution systems. Knowledge without execution is useless.',
      row2Text1SubTagline: 'Live to Inspire Trust',
      row2Text1SubDescription: 'Transforming communities through education, awareness, and massive youth empowerment.',
      row2Image3: 'https://webinar.sajanshah.com/assets/mentor-portrait-DVhB0Q8D.jpeg',
      row2Image3Tagline: 'Global Stage',
      row2Image3Heading: '16+ Million Lives Impacted',
      row2Text2Heading: 'Global Impact at Scale',
      row2Text2Description: 'Whether speaking to students, parents, institutions, or world leaders, the mission remains absolute: Break patterns. Build clarity. Create extraordinary results.',
      row2Text2SubTagline: 'The Mission',
      row2Text2SubDescription: 'Every talk, every workshop, every book — one singular aim: permanently shift the way people think, decide, and act.'
    }
  },
  {
    key: 'accolades',
    title: 'Accolades Section',
    order: 6,
    content: {
      heading1: 'A few noteworthy',
      heading2: 'accolades include:',
      awardImage: '/image.png',
      list: [
        "India's Youngest Motivational Speaker with global impact",
        "Known as the Memory Man of India for brain mastery",
        "Speaker at the World Parliament of Religions",
        "3-Time TEDx Speaker delivering high-impact ideas",
        "Suryadatta National Awardee for Best Motivational Speaker",
        "Honored with 30 Under 30 Nationwide Award by BusinessMint",
        "Author of 8 Transformational Books",
        "Impacted over 16+ Million Lives globally",
        "Founder of United First Initiative (UN SDG 2030)",
        "Founder of Live to Inspire Charitable Trust",
        "Delivered sessions across 5000+ educational institutions",
        "Conducted 6800+ high-impact transformational sessions"
      ]
    }
  },
  {
    key: 'clients',
    title: 'Clients Section',
    order: 7,
    content: {
      tagline: 'Partnerships',
      headingPart1: 'Previous Delighted',
      headingPart2: 'Clients',
      clientsLogoImage: '/LOGO.png'
    }
  },
  {
    key: 'final_positioning',
    title: 'Final Positioning',
    order: 8,
    content: {
      quote: "You don't need more motivation. You need a rewired mind.",
      ctaText: 'Start Your Transformation',
      ctaLink: '/contact'
    }
  }
];

async function main() {
  console.log('Seeding About Page sections...');
  for (const section of aboutSections) {
    await prisma.aboutPageSection.upsert({
      where: { key: section.key },
      update: section,
      create: section,
    });
  }
  console.log('About Page sections seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
