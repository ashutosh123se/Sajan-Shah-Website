const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

const mockEvents = [
  {
    title: 'India’s Biggest Memory and Family Transformation Event',
    eventDate: new Date(currentYear, currentMonth + 1, 15, 10, 0),
    endDate: new Date(currentYear, currentMonth + 1, 17, 18, 0),
    eventType: 'public',
    city: 'Mumbai',
    venue: 'NESCO Center, Goregaon',
    isPast: false,
    isFree: true,
    price: 0,
    capacity: 1000,
    isActive: true,
    posterUrl: 'https://placehold.co/800x600/0a0a0a/f26522?text=Family+Transformation+Event'
  },
  {
    title: 'World’s First Educational Experience Summit',
    eventDate: new Date(currentYear, currentMonth + 2, 20, 9, 30),
    endDate: new Date(currentYear, currentMonth + 2, 22, 17, 0),
    eventType: 'school',
    city: 'Delhi',
    venue: 'Pragati Maidan',
    isPast: false,
    isFree: false,
    price: 999,
    capacity: 500,
    isActive: false,
    posterUrl: 'https://placehold.co/800x600/0a0a0a/f26522?text=Educational+Experience+Summit'
  },
  {
    title: 'The Hero - Self Mastery Program',
    eventDate: new Date(currentYear, currentMonth + 3, 10, 8, 0),
    endDate: new Date(currentYear, currentMonth + 3, 12, 20, 0),
    eventType: 'private',
    city: 'Bangalore',
    venue: 'Taj West End',
    isPast: false,
    isFree: true,
    price: 0,
    capacity: 150,
    isActive: true,
    posterUrl: 'https://placehold.co/800x600/0a0a0a/f26522?text=Self+Mastery+Program'
  },
  {
    title: 'Building a Positive Home Culture - Parenting Program',
    eventDate: new Date(currentYear, currentMonth + 4, 5, 11, 0),
    eventType: 'webinar',
    city: 'Online',
    venue: 'Zoom Virtual Room A',
    isPast: false,
    isFree: true,
    price: 0,
    capacity: 2000,
    isActive: true,
    posterUrl: 'https://placehold.co/800x600/0a0a0a/f26522?text=Parenting+Program+Webinar'
  },
  {
    title: 'Train the Trainer Program',
    eventDate: new Date(currentYear - 1, 2, 10, 10, 0),
    eventType: 'corporate',
    city: 'Pune',
    venue: 'JW Marriott',
    isPast: true,
    isFree: false,
    price: 4999,
    capacity: 200,
    isActive: true,
    posterUrl: 'https://placehold.co/800x600/0a0a0a/f26522?text=Train+The+Trainer'
  },
  {
    title: 'The Business Hero Program',
    eventDate: new Date(currentYear - 1, 3, 15, 9, 0),
    eventType: 'corporate',
    city: 'Ahmedabad',
    venue: 'Hyatt Regency',
    isPast: true,
    isFree: true,
    price: 0,
    capacity: 400,
    isActive: true,
    posterUrl: 'https://placehold.co/800x600/0a0a0a/f26522?text=Business+Hero+Program'
  },
  {
    title: 'Boost Your Business Program',
    eventDate: new Date(currentYear, currentMonth + 1, 25, 14, 0),
    eventType: 'webinar',
    city: 'Online',
    venue: 'Zoom Virtual Room B',
    isPast: false,
    isFree: true,
    price: 0,
    capacity: 1500,
    isActive: true,
    posterUrl: 'https://placehold.co/800x600/0a0a0a/f26522?text=Boost+Your+Business'
  },
  {
    title: 'Catch a lie - Micro Emotions Program',
    eventDate: new Date(currentYear, currentMonth + 2, 15, 18, 0),
    eventType: 'private',
    city: 'Mumbai',
    venue: 'The Leela',
    isPast: false,
    isFree: true,
    price: 0,
    capacity: 100,
    isActive: true,
    posterUrl: 'https://placehold.co/800x600/0a0a0a/f26522?text=Micro+Emotions'
  },
  {
    title: 'Teach the Teachers Program',
    eventDate: new Date(currentYear - 1, 1, 20, 10, 0),
    eventType: 'school',
    city: 'Chennai',
    venue: 'Anna University Hall',
    isPast: true,
    isFree: true,
    price: 0,
    capacity: 600,
    isActive: true,
    posterUrl: 'https://placehold.co/800x600/0a0a0a/f26522?text=Teach+The+Teachers'
  },
  {
    title: 'Life Adventure Experience Program',
    eventDate: new Date(currentYear, currentMonth + 3, 10, 7, 0),
    eventType: 'public',
    city: 'Goa',
    venue: 'Calangute Retreat Center',
    isPast: false,
    isFree: true,
    price: 0,
    capacity: 80,
    isActive: true,
    posterUrl: 'https://placehold.co/800x600/0a0a0a/f26522?text=Life+Adventure+Experience'
  },
  {
    title: 'You vs You – Exclusive Program',
    eventDate: new Date(currentYear - 1, 11, 5, 15, 0),
    eventType: 'private',
    city: 'Mumbai',
    venue: 'St. Regis',
    isPast: true,
    isFree: false,
    price: 15000,
    capacity: 50,
    isActive: true,
    posterUrl: 'https://placehold.co/800x600/0a0a0a/f26522?text=You+vs+You+Exclusive'
  },
  {
    title: 'Creative Self – Tailored Motivational Program',
    eventDate: new Date(currentYear, currentMonth + 2, 28, 16, 0),
    eventType: 'webinar',
    city: 'Online',
    venue: 'Zoom Virtual Room C',
    isPast: false,
    isFree: true,
    price: 0,
    capacity: 1000,
    isActive: true,
    posterUrl: 'https://placehold.co/800x600/0a0a0a/f26522?text=Creative+Self'
  },
  {
    title: '1:1 Personal Mentorship Program',
    eventDate: new Date(currentYear, currentMonth + 5, 1, 10, 0),
    eventType: 'private',
    city: 'Online',
    venue: 'Google Meet Personal',
    isPast: false,
    isFree: false,
    price: 25000,
    capacity: 10,
    isActive: true,
    posterUrl: 'https://placehold.co/800x600/0a0a0a/f26522?text=Personal+Mentorship'
  }
];

async function main() {
  console.log('🌱 Seeding Events collection in Sajan Shah database...');

  for (const event of mockEvents) {
    const slug = event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    await db.event.upsert({
      where: { slug: slug },
      update: {
        title: event.title,
        eventDate: event.eventDate,
        eventType: event.eventType,
        city: event.city,
        venue: event.venue,
        isPast: event.isPast,
        isFree: event.isFree,
        price: event.price,
        capacity: event.capacity,
        isActive: event.isActive,
        posterUrl: event.posterUrl
      },
      create: {
        title: event.title,
        slug: slug,
        description: 'Discover transformation with Sajan Shah. Rewire your limiting beliefs and unlock self-mastery in this exclusive program.',
        posterUrl: event.posterUrl,
        cloudinaryPublicId: 'default',
        webinarUrl: event.eventType === 'webinar' ? 'https://zoom.us' : '',
        eventDate: event.eventDate,
        city: event.city,
        venue: event.venue,
        eventType: event.eventType,
        isPast: event.isPast,
        isFree: event.isFree,
        price: event.price,
        capacity: event.capacity,
        isActive: event.isActive
      }
    });
    console.log(`  ✅ Upserted event: ${event.title} in ${event.city}`);
  }

  console.log('✨ Events seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
