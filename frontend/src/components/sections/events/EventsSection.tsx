'use client';

import React from 'react';
import EventsHero from './EventsHero';
import EventsCalendar from './EventsCalendar';
import EventsWebinars from './EventsWebinars';
import EventsPast from './EventsPast';
import EventsTopImpact from './EventsTopImpact';
import EventsCTA from './EventsCTA';

export default function EventsSection() {
  return (
    <div className="min-h-screen bg-brand-dark text-white pb-24">
      <EventsHero />
      <EventsCalendar />
      <EventsWebinars />
      <EventsPast />
      <EventsTopImpact />
      <EventsCTA />
    </div>
  );
}
