export type EventCategory = 'School' | 'Corporate' | 'Public' | 'Private';
export type EventFormat = 'Offline' | 'Online';
export type EventAvailability = 'Open for Registration' | 'Closed';

export interface SajanEvent {
  id: string;
  title: string;
  date: Date;
  endDate?: Date;
  city: string;
  category: EventCategory;
  format: EventFormat;
  availability: EventAvailability;
  colorCode: string;
  thumbnail?: string;
  isWebinar?: boolean;
  topic?: string;
  isPast?: boolean;
  isTop5?: boolean;
  tag?: string;
  buttonUrl?: string;
  isFree?: boolean;
  price?: number;
}

export const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

export const MOCK_EVENTS: SajanEvent[] = [
  { id: '1', title: 'India’s Biggest Memory and Family Transformation Event', date: new Date(currentYear, currentMonth + 1, 15), endDate: new Date(currentYear, currentMonth + 1, 17), category: 'Public', format: 'Offline', city: 'Mumbai', availability: 'Open for Registration', colorCode: 'bg-brand-orange text-white' },
  { id: '2', title: 'World’s First Educational Experience Summit', date: new Date(currentYear, currentMonth + 2, 20), endDate: new Date(currentYear, currentMonth + 2, 22), category: 'School', format: 'Offline', city: 'Delhi', availability: 'Closed', colorCode: 'bg-yellow-400 text-black' },
  { id: '3', title: 'The Hero - Self Mastery Program', date: new Date(currentYear, currentMonth + 3, 10), endDate: new Date(currentYear, currentMonth + 3, 12), category: 'Private', format: 'Offline', city: 'Bangalore', availability: 'Open for Registration', colorCode: 'bg-blue-500 text-white' },
  { id: '4', title: 'Building a Positive Home Culture - Parenting Program', date: new Date(currentYear, currentMonth + 4, 5), category: 'Public', format: 'Online', city: 'Online', availability: 'Open for Registration', colorCode: 'bg-green-500 text-white', isWebinar: true, topic: 'Parenting', thumbnail: '/images/placeholder.jpg' },
  { id: '5', title: 'Train the Trainer Program', date: new Date(currentYear - 1, 2, 10), category: 'Corporate', format: 'Offline', city: 'Pune', availability: 'Closed', colorCode: 'bg-purple-500 text-white', isPast: true, thumbnail: '/images/placeholder.jpg', tag: 'Teachers' },
  { id: '6', title: 'The Business Hero Program', date: new Date(currentYear - 1, 3, 15), category: 'Corporate', format: 'Offline', city: 'Ahmedabad', availability: 'Closed', colorCode: 'bg-brand-orange text-white', isPast: true, thumbnail: '/images/placeholder.jpg', tag: 'Corporates', isTop5: true },
  { id: '7', title: 'Boost Your Business Program', date: new Date(currentYear, currentMonth + 1, 25), category: 'Corporate', format: 'Online', city: 'Online', availability: 'Open for Registration', colorCode: 'bg-blue-500 text-white', isWebinar: true, topic: 'Business Growth', thumbnail: '/images/placeholder.jpg' },
  { id: '8', title: 'Catch a lie - Micro Emotions Program', date: new Date(currentYear, currentMonth + 2, 15), category: 'Private', format: 'Offline', city: 'Mumbai', availability: 'Open for Registration', colorCode: 'bg-purple-500 text-white' },
  { id: '9', title: 'Teach the Teachers Program', date: new Date(currentYear - 1, 1, 20), category: 'School', format: 'Offline', city: 'Chennai', availability: 'Closed', colorCode: 'bg-green-500 text-white', isPast: true, thumbnail: '/images/placeholder.jpg', tag: 'Teachers', isTop5: true },
  { id: '10', title: 'Life Adventure Experience Program', date: new Date(currentYear, currentMonth + 3, 10), category: 'Public', format: 'Offline', city: 'Goa', availability: 'Open for Registration', colorCode: 'bg-purple-500 text-white' },
  { id: '11', title: 'You vs You – Exclusive Program', date: new Date(currentYear - 1, 11, 5), category: 'Private', format: 'Offline', city: 'Mumbai', availability: 'Closed', colorCode: 'bg-yellow-400 text-black', isPast: true, thumbnail: '/images/placeholder.jpg', tag: 'International', isTop5: true },
  { id: '12', title: 'Creative Self – Tailored Motivational Program', date: new Date(currentYear, currentMonth + 2, 28), category: 'School', format: 'Online', city: 'Online', availability: 'Open for Registration', colorCode: 'bg-brand-orange text-white', isWebinar: true, topic: 'Motivation', thumbnail: '/images/placeholder.jpg' },
  { id: '13', title: '1:1 Personal Mentorship Program', date: new Date(currentYear, currentMonth + 5, 1), category: 'Private', format: 'Online', city: 'Online', availability: 'Open for Registration', colorCode: 'bg-blue-500 text-white' },
];
