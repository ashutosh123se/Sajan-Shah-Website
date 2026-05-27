const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

const sections = [
  {
    key: 'hero',
    title: 'Hero Section',
    order: 1,
    isActive: true,
    content: {
      heading: "This Isn't Motivation.",
      headingItalic: "This Is",
      headingHighlight: "Transformation.",
      gridImages: [
        '/impact.png',
        '/webinar.png',
        '/You vs You.png',
        '/speaking.jpeg',
        '/sajan sir.png',
        '/Studenting & Parenting.png',
        '/Untold Stories of Your Heroes.png',
        '/impact.png',
        '/webinar.png',
        '/speaking.jpeg'
      ],
      primaryButtonText: "Book Sajan to Speak →",
      primaryButtonScrollTarget: "#message",
      secondaryButtonText: "Virtual Training →",
      secondaryButtonUrl: "https://webinar.sajanshah.com"
    }
  },
  {
    key: 'logos',
    title: 'Trusted By / Logos',
    order: 2,
    isActive: true,
    content: {
      label: "Trusted by:",
      logos: [
        { name: "TATA", displayType: "text", color: "#005a9c", fontStyle: "black" },
        { name: "TEDx", displayType: "tedx", primaryColor: "#e62b1e" },
        { name: "ONGC", displayType: "text", color: "#222", borderColor: "#dc2626" },
        { name: "SBI", displayType: "text", color: "#222", fontStyle: "bold" },
        { name: "Zydus", displayType: "text", color: "#004b8d", fontStyle: "black italic" }
      ]
    }
  },
  {
    key: 'message',
    title: 'Personal Message Section',
    order: 3,
    isActive: true,
    content: {
      sectionLabel: "A Personal Message From",
      speakerName: "Sajan Shah",
      speakerImage: "/Sir Speaking.jpeg",
      signatureImage: "/sir sign.png",
      signOffText: "With Purpose,",
      paragraphs: [
        "Firstly, I want to begin by saying <em>thank you.</em>",
        "Being considered to impact your audience is not just an opportunity, it is a responsibility I deeply value.",
        "Every session I deliver is designed with one objective: <highlight>to create a shift that lasts beyond the event.</highlight>",
        "This page is created to help you understand how we can work together, what your audience will experience, and the transformation they can expect.",
        "Whether your event is live, virtual, or hybrid, the focus remains the same:",
        "My commitment is simple, to deliver an experience that engages your audience, challenges their thinking, and drives real change.",
        "Take a moment to explore, and see how we can create something impactful together."
      ],
      pillars: ["Clarity.", "Action.", "Results."]
    }
  },
  {
    key: 'reasons',
    title: '6 Reasons Section',
    order: 4,
    isActive: true,
    content: {
      bigNumber: "6",
      highlightWord1: "BIG",
      reasonsLabel1: "reasons that people",
      highlightWord2: "LOVE",
      reasonsLabel2: "working with Sajan",
      reasons: [
        { number: "1", title: "Customized", description: "Every session is personally crafted by Sajan to suit your unique audience, industry, and desired outcomes." },
        { number: "2", title: "Impactful", description: "Sajan's deep understanding of human psychology ensures your audience experiences a shift that lasts." },
        { number: "3", title: "Experienced", description: "With over a decade of global speaking experience, Sajan has the expertise to handle any audience." },
        { number: "4", title: "Professional", description: "Dedicated to serving your objectives through meticulous pre-event briefings and post-event engagement." },
        { number: "5", title: "Relatable", description: "A unique ability to connect and resonate with everyone from students to high-level CEOs." },
        { number: "6", title: "Results-Driven", description: "Delivers transformations, not just speeches. Focused on driving real action and tangible results." }
      ],
      marqueeSectionLabel: "Live from the Stage",
      marqueeSectionTitle: "Speaker Moments",
      marqueeImages: [
        "https://images.unsplash.com/photo-1475721027785-f74dea327912?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop"
      ],
      marqueeEventName: "World Transformation Summit 2024",
      logoImage: "/LOGO2.png"
    }
  },
  {
    key: 'catalog',
    title: 'Program Catalog',
    order: 5,
    isActive: true,
    content: {
      sectionLabel: "The Program Catalog",
      heading: "IMPACT-DRIVEN",
      headingDim: "EXPERIENCES.",
      subtext: "Select a program to explore transformation details",
      programs: [
        { name: "India's Biggest Memory & Family Event", pitch: "Revolutionizing how families learn and grow together through neuroscience.", badges: ["Students", "Parents"], img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop", isFeatured: true },
        { name: "World's First Educational Experience Summit", pitch: "A global stage for the future of experiential learning.", badges: ["Youth", "Teachers"], img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop", isFeatured: true },
        { name: "The Hero — Self Mastery Program", pitch: "Unlocking peak performance and mental resilience.", badges: ["Youth", "Corporate"], img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop", isFeatured: false },
        { name: "Positive Home Culture — Parenting", pitch: "Scientific parenting strategies for the modern age.", badges: ["Parents"], img: "https://images.unsplash.com/photo-1536640712247-c5753ff74a50?q=80&w=2050&auto=format&fit=crop", isFeatured: false },
        { name: "Train The Trainer Program", pitch: "Elite mentorship for aspiring speakers and coaches.", badges: ["Corporate"], img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop", isFeatured: false },
        { name: "The Business Hero Program", pitch: "Neuroscience-backed leadership for modern entrepreneurs.", badges: ["Corporate"], img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop", isFeatured: false },
        { name: "Boost Your Business Program", pitch: "Exponential growth strategies for small to large enterprises.", badges: ["Corporate"], img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop", isFeatured: false },
        { name: "Catch a Lie — Micro Emotions", pitch: "Master the art of non-verbal communication and behavioral analysis.", badges: ["Corporate", "Youth"], img: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=2070&auto=format&fit=crop", isFeatured: false },
        { name: "Teach The Teachers Program", pitch: "Empowering educators with high-impact pedagogical tools.", badges: ["Teachers"], img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop", isFeatured: false },
        { name: "Life Adventure Experience Program", pitch: "Outdoor experiential learning to push personal boundaries.", badges: ["Youth", "Students"], img: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=2070&auto=format&fit=crop", isFeatured: false },
        { name: "You v/s You — Exclusive", pitch: "A personal deep-dive into overcoming internal limitations.", badges: ["Youth"], img: "https://images.unsplash.com/photo-1434493566906-db97476866ec?q=80&w=2070&auto=format&fit=crop", isFeatured: false },
        { name: "Creative Self — Tailored Motivation", pitch: "Customized programs designed for specific institutional needs.", badges: ["Youth", "Corporate"], img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop", isFeatured: false },
        { name: "1:1 Personal Mentorship", pitch: "Direct, high-impact consulting with Sajan Shah.", badges: ["Corporate", "Youth"], img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop", isFeatured: false }
      ]
    }
  },
  {
    key: 'features',
    title: 'Success Ecosystem / Features',
    order: 6,
    isActive: true,
    content: {
      sectionLabel: "Universal Features",
      heading: "THE SUCCESS",
      headingDim: "ECOSYSTEM.",
      description: "We don't just provide programs; we provide a complete support infrastructure designed to streamline decision-making and ensure institutional alignment.",
      stats: [
        { value: "13+", label: "Programs" },
        { value: "16M+", label: "Lives Impacted" }
      ],
      features: [
        { title: "Program Topic Pages", desc: "Each program features a dedicated landing page with a 30-40 second video snippet, high-level pitch, and key results.", icon: "PlayCircle", linkText: "Explore Topics" },
        { title: "Centralized Brochures", desc: "Access PDF brochures for all 11 programs in one place, or grab the complete ecosystem with a one-click ZIP download.", icon: "Download", linkText: "Download All ZIP" },
        { title: "Impact Stories", desc: "Browse 6–12 detailed case studies featuring real-world transformations, anonymized data, and narrative summaries.", icon: "MessageSquare", linkText: "View Case Studies" },
        { title: "Invite Sajan to Speak", desc: "Direct booking portal for institutions. Connect via form or instant WhatsApp for rapid event scheduling.", icon: "PhoneCall", linkText: "Booking Portal" },
        { title: "Full Speaker Kit", desc: "A comprehensive, media-ready package including high-res headshots, formal profiles, and professional bios.", icon: "FileText", linkText: "Download Speaker Kit" }
      ],
      ctaCardTitle: "Rapid Response",
      ctaCardDesc: "Connect directly for event scheduling and technical requirements.",
      ctaCardButtonText: "WhatsApp Now",
      whatsappNumber: ""
    }
  }
];

async function main() {
  console.log('🌱 Seeding Speaking Page sections...');

  for (const section of sections) {
    await db.speakingPageSection.upsert({
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
