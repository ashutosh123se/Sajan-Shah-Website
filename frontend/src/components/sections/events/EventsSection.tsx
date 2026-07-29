'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EventsHero from './EventsHero';
import EventsCalendar from './EventsCalendar';
import EventsWebinars from './EventsWebinars';
import EventsPast from './EventsPast';
import EventsCTA from './EventsCTA';
import { ProductsTransformation } from '@/components/sections/products/ProductsTransformation';
import api from '@/lib/api';
import { SajanEvent, EventFormat, EventCategory } from './eventsData';

const mapDbEventToSajanEvent = (e: any): SajanEvent => {
  const isWebinar = e.eventType === 'webinar';
  const formatVal: EventFormat = isWebinar || e.city?.toLowerCase() === 'online' ? 'Online' : 'Offline';
  
  let catVal: EventCategory = 'Public';
  const dbType = (e.eventType || '').toLowerCase();
  if (dbType.includes('school')) catVal = 'School';
  else if (dbType.includes('corporate')) catVal = 'Corporate';
  else if (dbType.includes('private')) catVal = 'Private';
  else if (dbType.includes('retreat')) catVal = 'Private';
  else if (dbType.includes('workshop')) catVal = 'Public';
  
  let color = 'bg-brand-orange text-white';
  if (catVal === 'School') color = 'bg-yellow-400 text-black';
  else if (catVal === 'Private') color = 'bg-blue-500 text-white';
  else if (catVal === 'Corporate') color = 'bg-purple-500 text-white';
  
  return {
    id: e.id,
    title: e.title,
    date: new Date(e.eventDate),
    endDate: e.endDate ? new Date(e.endDate) : undefined,
    city: e.city || 'Mumbai',
    category: catVal,
    format: formatVal,
    availability: e.isActive ? 'Open for Registration' : 'Closed',
    colorCode: color,
    thumbnail: e.posterUrl || '/images/placeholder.jpg',
    isWebinar: isWebinar,
    topic: e.description || '',
    isPast: e.isPast || new Date(e.eventDate).getTime() < new Date().setHours(0,0,0,0),
    isTop5: e.isTop5 || false,
    tag: e.venue || 'Corporate',
    buttonUrl: e.buttonUrl,
    isFree: e.isFree ?? true,
    price: e.price ?? undefined,
  };
};

export default function EventsSection() {
  const [eventsList, setEventsList] = useState<SajanEvent[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, sectionsRes] = await Promise.all([
          api.get('/events'),
          api.get('/events-page')
        ]);
        
        // Public page must only show active DB events.
        // Do NOT merge MOCK_EVENTS here — that kept inactive/hidden events visible.
        const dbEvents = (eventsRes.data.data.events || [])
          .filter((e: any) => e.isActive === true || e.isActive === undefined)
          .map(mapDbEventToSajanEvent);

        setEventsList(dbEvents);

        if (sectionsRes.data.success) {
          setSections(sectionsRes.data.data.sections || []);
        }
      } catch (error) {
        console.error('Failed to fetch events page data:', error);
        setEventsList([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getSection = (key: string) => {
    return sections.find(s => s.key === key)?.content;
  };

  const activeEvents = eventsList;

  // Filter lists for children (upcoming sorted soonest-first)
  const upcomingEvents = activeEvents
    .filter(e => !e.isPast && !e.isWebinar)
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  const webinars = activeEvents
    .filter(e => e.isWebinar)
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  const pastEvents = activeEvents
    .filter(e => e.isPast)
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <img src="/loding.png" alt="Loading" className="animate-spin object-contain h-32 w-32" />
        <div className="font-mono text-xs uppercase tracking-[0.3em]">Loading....</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark text-white pb-24">
      <EventsHero content={getSection('hero')} />
      <EventsCalendar events={upcomingEvents} allEvents={activeEvents} />
      <EventsWebinars events={webinars} />
      <EventsPast events={pastEvents} />
      <EventsCTA content={getSection('cta')} />
      <ProductsTransformation />

      {/* Final Quote Section */}
      <section className="pt-10 pb-6 bg-black text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-4"
        >
          <h3 className="text-3xl md:text-5xl font-light text-white italic mb-10 leading-tight">
            "Change your mental patterns.<br className="hidden md:block" /> Your results will follow."
          </h3>
          <div className="w-20 h-1 bg-[#f26522] mx-auto mb-12"></div>
          <a
            href="/contact"
            className="inline-block bg-[#f26522] hover:bg-white hover:text-black text-white font-bold uppercase tracking-[0.3em] text-xs px-12 py-5 transition-all duration-300 shadow-[0_25px_50px_-12px_rgba(242,101,34,0.4)] hover:shadow-none"
          >
            Get In Touch
          </a>
        </motion.div>
      </section>
    </div>
  );
}
