import React, { useState, useMemo } from 'react';
import { Calendar as CalendarIcon, MapPin, Play } from 'lucide-react';
import { format } from 'date-fns';
import { MOCK_EVENTS } from './eventsData';

export default function EventsPast() {
  const [pastTagFilter, setPastTagFilter] = useState('All');
  const pastEvents = useMemo(() => MOCK_EVENTS.filter(e => e.isPast), []);

  const filteredPast = useMemo(() => {
    if (pastTagFilter === 'All') return pastEvents;
    return pastEvents.filter(e => e.tag === pastTagFilter);
  }, [pastEvents, pastTagFilter]);

  return (
    <section className="py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-normal mb-8 leading-[1.1]">Past Events <span className="text-brand-orange">& Gallery</span></h2>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['All', 'Students', 'Parents', 'Teachers', 'Corporates', 'International'].map(tag => (
              <button 
                key={tag}
                onClick={() => setPastTagFilter(tag)}
                className={`px-5 py-2 rounded-full text-sm font-bold border transition-all ${pastTagFilter === tag ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-white/20 hover:border-white'}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPast.map(event => (
            <div key={event.id} className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#111] border border-white/10">
               <div className="absolute inset-0 bg-[#222] group-hover:scale-105 transition-transform duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
               
               <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-brand-orange hover:text-white">
                 <Play className="w-5 h-5" />
               </div>

               <div className="absolute bottom-0 left-0 w-full p-6">
                 <div className="flex items-center space-x-3 mb-2">
                   <span className="text-xs font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">{event.tag}</span>
                   <span className="text-xs text-gray-300"><CalendarIcon className="w-3 h-3 inline mr-1" /> {format(event.date, 'MMM yyyy')}</span>
                 </div>
                 <h3 className="text-lg font-bold leading-tight">{event.title}</h3>
                 <div className="text-sm text-gray-400 mt-1 flex items-center"><MapPin className="w-3 h-3 mr-1" /> {event.city}</div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
