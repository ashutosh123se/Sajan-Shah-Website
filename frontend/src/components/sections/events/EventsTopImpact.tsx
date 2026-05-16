import React, { useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Calendar as CalendarIcon, MapPin, Users, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { MOCK_EVENTS } from './eventsData';

export default function EventsTopImpact() {
  const topEvents = useMemo(() => MOCK_EVENTS.filter(e => e.isTop5), []);

  return (
    <section className="py-32 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/5">
      <h2 className="text-4xl md:text-5xl font-black uppercase tracking-normal mb-20 text-center leading-[1.1]">Top <span className="text-brand-orange">Impactful Events</span> of This Year</h2>
      
      <div className="space-y-4">
        {topEvents.map((event, index) => (
          <div key={event.id} className="flex flex-col md:flex-row items-center bg-[#111] border border-white/10 rounded-2xl p-6 hover:border-brand-orange/50 transition-all group">
            <div className="text-6xl font-black text-white/5 mr-8 group-hover:text-brand-orange/20 transition-colors">
              0{index + 1}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center"><Users className="w-4 h-4 mr-2" /> 5,000+ Attendees</span>
                <span className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> {event.city}</span>
                <span className="flex items-center"><CalendarIcon className="w-4 h-4 mr-2" /> {format(event.date, 'MMMM yyyy')}</span>
              </div>
            </div>
            <Button className="mt-6 md:mt-0 md:ml-8 rounded-full border border-white/20 bg-transparent hover:bg-white hover:text-black">
              View Highlights <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
