const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const homeSections = [
  {
    key: 'hero',
    title: 'Hero Slider Section',
    order: 1,
    content: {
      slides: [
        {
          id: 1,
          headline: "India’s Biggest Memory & Family Transformation Experience",
          subheadline: "One stage. Thousands of lives. A system designed to transform how families think, learn, and grow together.",
          ctaText: "Join Now",
          ctaLink: "https://sol.sajanshah.com",
          video: "https://cdn.pixabay.com/video/2020/05/25/40149-425251644_large.mp4",
          image: "/hero-1.jpg"
        },
        {
          id: 2,
          headline: "Transform From Home. No Travel Required.",
          subheadline: "Join India’s most powerful student-parent webinar and experience real breakthroughs in focus, confidence, and results.",
          ctaText: "Reserve Your Seat",
          ctaLink: "https://webinar.sajanshah.com",
          video: "https://cdn.pixabay.com/video/2019/04/17/22818-330691515_large.mp4",
          image: "/hero-2.jpg"
        },
        {
          id: 3,
          headline: "Upgrade Your Life With Proven Systems",
          subheadline: "Access powerful programs designed to improve thinking, performance, and personal growth - step by step.",
          ctaText: "Explore Programs",
          ctaLink: "/programs",
          video: "https://cdn.pixabay.com/video/2019/11/14/29038-372951939_large.mp4",
          image: "/hero-3.jpg"
        },
        {
          id: 4,
          headline: "Live to Inspire. Lead to Serve.",
          subheadline: "Be part of a movement focused on creating real impact through education, awareness, and human transformation.",
          ctaText: "Join the Initiative",
          ctaLink: "https://unitedfirst.in",
          video: "https://cdn.pixabay.com/video/2020/03/10/33481-396593414_large.mp4",
          image: "/hero-4.jpg"
        }
      ]
    }
  },
  {
    key: 'split_hero',
    title: 'Split Hero & Cards Section',
    order: 2,
    content: {
      bannerText: "This Is Not an Event.<br />It’s a Transformation",
      bannerWords: ['Experience.', 'Movement.', 'Journey.'],
      mainImage: "https://webinar.sajanshah.com/assets/mentor-portrait-DVhB0Q8D.jpeg",
      mainHeading: "In today’s ever-changing world, most people are trying harder… but <span class=\"font-bold\">thinking the same.</span>",
      paragraphs: [
        "From the way you think, react, decide, and act, everything is controlled by how your brain is wired.",
        "Yet, no one teaches you how to train it. You are told to stay motivated, work harder, and push more.",
        "But real transformation doesn’t come from effort alone, it comes from rewiring how you think and perform."
      ],
      comparisonHeading: "A small shift in how your brain processes information can be the difference between:",
      comparisonList: [
        "confusion and clarity",
        "stress and control",
        "average and extraordinary results"
      ],
      footerQuote: "The question is: Are you training your brain… or repeating old patterns?",
      footerHighlight: "Start your transformation today.",
      cards: [
        {
          title: "Webinar",
          image: "/webinar.png",
          desc: "Join transformational online sessions focused on focus, confidence, performance, and mindset breakthroughs.",
          ctaText: "Find Out More",
          ctaLink: "https://webinar.sajanshah.com"
        },
        {
          title: "Speaking",
          image: "/IMG_7631.jpg",
          desc: "High-impact keynote experiences designed to transform thinking, performance, and leadership.",
          ctaText: "Find Out More",
          ctaLink: "/speaking"
        },
        {
          title: "Impact",
          image: "/impact.png",
          desc: "Real transformation initiatives creating meaningful social and educational impact across communities.",
          ctaText: "Find Out More",
          ctaLink: "/contributions"
        }
      ]
    }
  },
  {
    key: 'brand_writeup',
    title: 'Brand Writeup Section',
    order: 3,
    content: {
      backgroundImage: "/sajan sir.png",
      title: "SAJAN",
      heading: "Sajan Shah has made it his life's work to demystify the human potential process, reframe what it is to \"win\" and help people embrace new skills that empower confidence, overcome fears and instantaneous impact bottom line results.",
      paragraphs: [
        "Every person in every business has something to achieve.",
        "Helping people to truly understand how they can positively impact on the decision-making process, drive results AND maintain integrity, empowers people to realize more of their untapped potential.",
        "He is by no means your typical motivational speaker.",
        "Sajan's famous for not just \"talking\" about the strategies, but showing your audience \"Exactly\" how to use them.",
        "By teaching the exact word choices to increase influence and persuasion, audiences walk away with a new perception of their own capability.",
        "Just imagine the increased confidence from knowing \"Exactly What To Do\" and with an insatiable hunger to put the new learnings into action.",
        "Having delivered over 2,500 presentations, in over 800 different industries, spanning over 50 countries and five continents, you have the confidence of working with a seasoned professional with an enviable track record and a genuine human that is committed to adding massive value to your event."
      ],
      highlight: "He is by no means your typical motivational speaker.",
      ctaText: "Learn more about Sajan Shah",
      ctaLink: "/about"
    }
  },
  {
    key: 'transformation_form',
    title: 'Transformation Form Header Section',
    order: 4,
    content: {
      tagline: "Booking & Inquiries",
      title: "Start Your <br /><span class=\"font-bold\">Transformation Conversation.</span>",
      description: "Tell us about your event, audience, or requirement. Let’s design an experience that drives real impact, not just motivation.",
      email: "info@sajanshah.com",
      phone: "+91 8511363376"
    }
  },
  {
    key: 'intro_video',
    title: 'Intro Video & Quote Section',
    order: 5,
    content: {
      tagline: "Experience The Energy",
      title: "Witness the <span class=\"font-bold\">Transformation.</span>",
      videoUrl: "https://www.youtube.com/embed/eoXffsNnsMU",
      quote: "Sajan was phenomenal! He delivered a message that allowed our audience to view their power to influence in an entirely new light. He has the rare ability to connect to any crowd instantly.",
      quoteAuthor: "Executive Director, Global Leadership Summit"
    }
  },
  {
    key: 'logo_strip',
    title: 'Logo Strip & Subscribe Section',
    order: 6,
    content: {
      logosHeading: "Recognized Globally & Trusted by Millions",
      logos: ["Forbes", "TEDx", "Times of India", "BBC", "CNN", "Economic Times", "Fortune", "Hindustan Times"],
      subscribeQuote: "Master your mind. Master your performance.",
      subscribeDesc: "Get weekly neuroscience-backed insights and strategies directly from Sajan Shah. No fluff, just pure transformation.",
      subscribeSubtext: "Join 100k+ subscribers on the journey."
    }
  },
  {
    key: 'impact_statistics',
    title: 'Impact Statistics Section',
    order: 7,
    content: {
      tagline: "Global Footprint",
      title: "Impact That <br /><span class=\"font-bold\">Endures.</span>",
      description: "Beyond the numbers lies a deeper story of human potential. For over two decades, Sajan Shah has been a catalyst for change, bridging the gap between average performance and extraordinary results.",
      ctaText: "View Impact Report",
      ctaLink: "/impact",
      stats: [
        { value: 16, suffix: "M+", label: "Lives Transformed", desc: "Across 50+ countries globally", isIndianFormat: false },
        { value: 968000, suffix: "+", label: "Social Impact", desc: "Dedicated humanitarian initiatives", isIndianFormat: true },
        { value: 193000, suffix: "+", label: "Knowledge Spread", desc: "Readers of 8 life-changing books", isIndianFormat: true },
        { value: 6800, suffix: "+", label: "Global Keynotes", desc: "High-impact stage experiences", isIndianFormat: true },
        { value: 5000, suffix: "+", label: "Institutions", desc: "Schools & corporate partners", isIndianFormat: true },
        { value: 138, suffix: "+", label: "Major Drives", desc: "Leading social change movements", isIndianFormat: false }
      ],
      bottomBannerText1: "Ready to join the <span class=\"text-white font-medium\">16 Million+</span> transformation journey?",
      bottomBannerText2: "Every number is a <span class=\"text-white font-medium\">Story</span> of change",
      bottomBannerText3: "Every effort is a <span class=\"text-white font-medium\">step towards</span> a better future.",
      bottomCtaText: "join the Community",
      bottomCtaLink: "/contact"
    }
  }
];

async function main() {
  console.log('Seeding Home Page sections (create-only, never overwrites)...');
  for (const section of homeSections) {
    const existing = await prisma.homePageSection.findUnique({ where: { key: section.key } });
    if (existing) {
      console.log(`  ⏭️ Skip existing: ${section.key}`);
      continue;
    }
    await prisma.homePageSection.create({ data: section });
    console.log(`  ✅ Created: ${section.key}`);
  }
  console.log('Home Page sections seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
