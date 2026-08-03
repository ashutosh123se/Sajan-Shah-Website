const { PrismaClient } = require('@prisma/client');
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
    content: {
      heading: "CASE STUDIES",
      subHeading: "Impact Stories",
      stories: [
        { "title": "The Pencils of Hope", "excerpt": "How 50,000 plantable pencils transformed a rural district's approach to green education.", "imageUrl": "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=2070&auto=format&fit=crop" },
        { "title": "Empowering Educators", "excerpt": "A journey of training 500 teachers in Ahmedabad with cognitive science techniques.", "imageUrl": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop" },
        { "title": "Vision for the Future", "excerpt": "The UV glasses drive that provided vision correction for thousands of students.", "imageUrl": "https://images.unsplash.com/photo-1511499767390-a73355326627?q=80&w=2070&auto=format&fit=crop" }
      ]
    }
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
      heading: "VISUAL PROOF",
      subHeading: "Gallery Archive",
      paragraph: "Capturing the raw essence of transformation on the field.",
      photos: [
        { "cat": "Social Impact", "title": "United First Initiative", "imageUrl": "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop" },
        { "cat": "Education", "title": "Neuroscience Workshops", "imageUrl": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop" },
        { "cat": "Field Work", "title": "Sustainable Tools Drive", "imageUrl": "https://images.unsplash.com/photo-1526367790999-0150786486a2?q=80&w=2071&auto=format&fit=crop" },
        { "cat": "Youth Forum", "title": "Motivation & Growth", "imageUrl": "https://images.unsplash.com/photo-1523580494863-6f30312248f5?q=80&w=2070&auto=format&fit=crop" },
        { "cat": "Eco-Drive", "title": "Plantable Pencils", "imageUrl": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" },
        { "cat": "Community", "title": "Legacy of Giving", "imageUrl": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2040&auto=format&fit=crop" }
      ]
    }
  }
];

async function main() {
  console.log('🌱 Seeding Contributions Page sections...');

  for (const section of sections) {
    await db.contributionsPageSection.upsert({
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
