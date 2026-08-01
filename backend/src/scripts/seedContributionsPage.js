const { PrismaClient } = require('@prisma/client');
const { DEFAULT_IMPACT_STORIES, DEFAULT_GALLERY_PHOTOS } = require('../utils/impactStoryDefaults');
const db = new PrismaClient();

const sections = [
  {
    key: 'hero',
    title: '🎤 Contributions Hero Banner',
    order: 1,
    isActive: true,
    content: {
      heading: "IMPACT BEYOND BOUNDARIES",
      subHeading: "Our Contributions",
      paragraph: "We don't just build careers; we build legacies through education, empowerment, and sustainable social change."
    }
  },
  {
    key: 'impact',
    title: '📈 Live Impact Metrics Dashboard',
    order: 2,
    isActive: true,
    content: {
      heading: "MEASURABLE CONTRIBUTIONS.",
      subHeading: "Live Analytics",
      stats: [
        { "label": "Students Supported", "value": "200K+", "trend": "+12% this year" },
        { "label": "Pencils Distributed", "value": "500K+", "trend": "Goal: 1M" },
        { "label": "UV Glasses Delivered", "value": "50K+", "trend": "Active drive" },
        { "label": "Teachers Trained", "value": "10K+", "trend": "Nationwide" },
        { "label": "Regions Impacted", "value": "15+", "trend": "3 Countries" }
      ],
      timelineTitle: "Legacy Timeline",
      timeline: [
        { "year": "2016", "title": "Foundation", "event": "Launch of United First Initiative with a vision for UN SDGs." },
        { "year": "2018", "title": "Milestone", "event": "Successfully impacted 100,000+ students across various regions." },
        { "year": "2020", "title": "Crisis Response", "event": "Nationwide mask and essential drive during the pandemic." },
        { "year": "2022", "title": "Global Reach", "event": "Expansion into international youth leadership programs." },
        { "year": "2024", "title": "Future Ready", "event": "Integration of Neuroscience tools in digital learning apps." }
      ]
    }
  },
  {
    key: 'donate',
    title: '💰 Donate Call to Action Section',
    order: 3,
    isActive: true,
    content: {
      heading: "YOUR CONTRIBUTION SAVES LIVES.",
      paragraph: "Every rupee donated goes directly towards providing neuroscience-backed education, health drives, and sustainable tools for children who need it most.",
      buttonText: "Donate Now"
    }
  },
  {
    key: 'stories',
    title: '📚 Impact Case Stories',
    order: 4,
    isActive: true,
    content: DEFAULT_IMPACT_STORIES
  },
  {
    key: 'partnerships',
    title: '🤝 Partnership & Collaborations Models',
    order: 5,
    isActive: true,
    content: {
      heading: "Partnership Models",
      subHeading: "Collaborations",
      paragraph: "We work with schools, corporations, and NGOs to scale our social impact globally.",
      models: [
        { "title": "Academic", "desc": "Neuroscience-backed workshops and student development programs.", "type": "School Partners" },
        { "title": "Corporate", "desc": "Employee engagement and dedicated CSR initiatives.", "type": "CSR Partners" },
        { "title": "Institutional", "desc": "Collaborations for large-scale social welfare and advocacy.", "type": "NGO Partners" }
      ]
    }
  },
  {
    key: 'volunteer',
    title: '📣 Volunteer Ambassador Program Section',
    order: 6,
    isActive: true,
    content: {
      heading: "BECOME AN AMBASSADOR",
      paragraph: "We are looking for passionate individuals, CSR partners, and ESG advocates to join us in our mission to transform education and social welfare.",
      buttonText: "Apply Now"
    }
  },
  {
    key: 'philosophy',
    title: '💡 Leadership & Contribution Philosophy',
    order: 7,
    isActive: true,
    content: {
      heading: "WHY WE CONTRIBUTE",
      subHeading: "Leadership Philosophy",
      quote: "Social responsibility is not an option; it's a debt we owe to the future. Our contribution model is built on three pillars: Neuroscience, Sustainable Education, and Global Empowerment.",
      boxQuote: "Real education is giving back.",
      pillars: [
        "Pillar 1: Data-Driven Cognitive Empowerment",
        "Pillar 2: Environmental Awareness through Learning",
        "Pillar 3: Grassroots Level Institutional Training"
      ]
    }
  },
  {
    key: 'download',
    title: '📥 Execution Quality Report Download Centre',
    order: 8,
    isActive: true,
    content: {
      heading: "OUR EXECUTION REPORT",
      paragraph: "We maintain absolute transparency in our social operations. Access our audit-ready impact reports and ESG compliance documents below. All data is verified by third-party auditors.",
      reports: [
        { "title": "Annual Impact Report", "size": "4.2 MB" },
        { "title": "ESG Compliance Report", "size": "2.1 MB" }
      ]
    }
  },
  {
    key: 'partners',
    title: '🏢 Institutional Partners Wall logo',
    order: 9,
    isActive: true,
    content: {
      heading: "Institution Partners",
      logoUrl: "/CONTRIBUTIONS LOGO.png"
    }
  },
  {
    key: 'gallery',
    title: '🖼️ Visual Proof Marquee Gallery',
    order: 10,
    isActive: true,
    content: {
      heading: "Impact in Action",
      subHeading: "Gallery Archive",
      paragraph: "Capturing the raw essence of transformation on the field.",
      photos: DEFAULT_GALLERY_PHOTOS
    }
  }
];

async function main() {
  console.log('🌱 Seeding Contributions Page sections (create-only, never overwrites)...');

  for (const section of sections) {
    const existing = await db.contributionsPageSection.findUnique({ where: { key: section.key } });
    if (existing) {
      console.log(`  ⏭️ Skip existing: ${section.key}`);
      continue;
    }
    await db.contributionsPageSection.create({ data: section });
    console.log(`  ✅ Created: ${section.key}`);
  }

  console.log('✨ Contributions page seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
