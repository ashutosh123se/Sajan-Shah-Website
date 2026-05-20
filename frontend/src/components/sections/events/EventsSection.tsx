'use client';

import React, { useState, useEffect } from 'react';
import EventsHero from './EventsHero';
import EventsCalendar from './EventsCalendar';
import EventsWebinars from './EventsWebinars';
import EventsPast from './EventsPast';
import EventsTopImpact from './EventsTopImpact';
import EventsCTA from './EventsCTA';
import api from '@/lib/api';
import { SajanEvent, EventFormat, EventCategory, MOCK_EVENTS } from './eventsData';

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
    isPast: e.isPast || new Date(e.eventDate) < new Date(),
    isTop5: e.isTop5 || false,
    tag: e.venue || 'Corporate'
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
        
        const dbEvents = eventsRes.data.data.events || [];
        if (dbEvents.length > 0) {
          setEventsList(dbEvents.map(mapDbEventToSajanEvent));
        } else {
          setEventsList(MOCK_EVENTS);
        }

        if (sectionsRes.data.success) {
          setSections(sectionsRes.data.data.sections || []);
        }
      } catch (error) {
        console.error('Failed to fetch events page data:', error);
        setEventsList(MOCK_EVENTS);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getSection = (key: string) => {
    return sections.find(s => s.key === key)?.content;
  };

  const activeEvents = eventsList.length > 0 ? eventsList : MOCK_EVENTS;

  // Filter lists for children
  const upcomingEvents = activeEvents.filter(e => !e.isPast && !e.isWebinar);
  const webinars = activeEvents.filter(e => e.isWebinar);
  const pastEvents = activeEvents.filter(e => e.isPast);
  const topEvents = pastEvents.filter(e => e.isTop5).length > 0 
    ? pastEvents.filter(e => e.isTop5) 
    : pastEvents.slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark text-white flex items-center justify-center font-mono text-xs uppercase tracking-[0.3em]">
        Loading Events Calendar...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark text-white pb-24">
      <EventsHero content={getSection('hero')} />
      <EventsCalendar events={upcomingEvents} allEvents={activeEvents} />
      <EventsWebinars events={webinars} />
      <EventsPast events={pastEvents} />
      <EventsTopImpact events={topEvents} />
      <EventsCTA content={getSection('cta')} />
    </div>
  );
}
