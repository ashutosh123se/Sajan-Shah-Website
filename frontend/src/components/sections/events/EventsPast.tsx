import React, { useState } from 'react';
import { Calendar as CalendarIcon, MapPin, Play } from 'lucide-react';

const REEL_EVENTS = [
  {
    id: 1,
    tag: 'National',
    embedUrl: 'https://www.instagram.com/reel/DDenOOnT5tA/embed/?hidecaption=true'
  },
  {
    id: 2,
    tag: 'National',
    embedUrl: 'https://www.instagram.com/reel/DFVYO3aNJGg/embed/?hidecaption=true'
  },
  {
    id: 3,
    tag: 'International',
    embedUrl: 'https://www.instagram.com/reel/DDODYmnIDm1/embed/?hidecaption=true'
  },
  {
    id: 4,
    tag: 'National',
    embedUrl: 'https://www.instagram.com/reel/DFIPJQcTVFI/embed/?hidecaption=true'
  },
  {
    id: 5,
    tag: 'International',
    embedUrl: 'https://www.instagram.com/reel/DC1Uuh3gbGn/embed/?hidecaption=true'
  }
];

export default function EventsPast({ events }: { events?: any[] }) {
  const [pastTagFilter, setPastTagFilter] = useState('All');

  return (
    <section className="py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-normal mb-20 text-center leading-[1.1]">
            Top <span className="text-brand-orange">Impactful Events</span> of This Year
          </h2>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['All', 'National', 'International'].map(tag => (
              <button
                key={tag}
                onClick={() => setPastTagFilter(tag)}
                className={`px-5 py-2 rounded-full text-sm font-bold border transition-all ${
                  pastTagFilter === tag 
                    ? 'bg-white text-black border-white' 
                    : 'bg-transparent text-gray-400 border-white/20 hover:border-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {REEL_EVENTS.map(event => {
            const isFaded = pastTagFilter !== 'All' && event.tag !== pastTagFilter;
            return (
              <div 
                key={event.id} 
                className={`group relative aspect-[9/16] rounded-2xl overflow-hidden bg-[#111] border border-white/10 transition-all duration-500 ease-in-out ${
                  isFaded ? 'opacity-30 scale-95 pointer-events-none' : 'opacity-100 scale-100'
                }`}
              >
                <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]"></div>
                <iframe
                  src={event.embedUrl}
                  className="absolute inset-0 w-full h-full border-0 scale-[1.4] origin-center pointer-events-auto"
                  scrolling="no"
                  allowtransparency="true"
                  allow="encrypted-media"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
