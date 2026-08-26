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

export default function EventsPast({ events, content }: { events?: any[], content?: any }) {
  const [pastTagFilter, setPastTagFilter] = useState('All');

  const headingText = content?.heading || 'Top Impactful Events of This Year';
  
  // Format the heading similarly to the hardcoded version:
  // "Top Impactful Events of This Year" -> Top <span className="text-brand-orange">Impactful Events</span> of This Year
  const renderHeading = () => {
    // A simple heuristic to split the text to style it nicely, 
    // or just render it plainly if we can't reliably guess the structure.
    // If it strictly matches the default, apply the orange span:
    if (headingText.toLowerCase().includes('impactful events')) {
      const parts = headingText.split(new RegExp('(impactful events)', 'i'));
      return (
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-normal mb-20 text-center leading-[1.1]">
          {parts.map((p: string, i: number) => 
            p.toLowerCase() === 'impactful events' 
              ? <span key={i} className="text-brand-orange">{p}</span>
              : <span key={i}>{p}</span>
          )}
        </h2>
      );
    }
    return (
      <h2 className="text-4xl md:text-5xl font-black uppercase tracking-normal mb-20 text-center leading-[1.1]">
        {headingText}
      </h2>
    );
  };

  const reelsToDisplay = Array.isArray(content?.reels) && content.reels.length > 0
    ? content.reels
    : REEL_EVENTS;

  return (
    <section className="py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-20">
          {renderHeading()}
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
          {reelsToDisplay.map((event: any, idx: number) => {
            const isFaded = pastTagFilter !== 'All' && event.tag !== pastTagFilter;
            const embedUrl = typeof event === 'object' ? event.embedUrl : event;
            return (
              <div 
                key={event.id || idx} 
                className={`group relative aspect-[9/16] rounded-2xl overflow-hidden bg-[#111] border border-white/10 transition-all duration-500 ease-in-out ${
                  isFaded ? 'opacity-30 scale-95 pointer-events-none' : 'opacity-100 scale-100'
                }`}
              >
                <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]"></div>
                {embedUrl && (
                  <iframe
                    src={embedUrl}
                    className="absolute inset-0 w-full h-full border-0 scale-[1.4] origin-center pointer-events-auto"
                    scrolling="no"
                    allowTransparency={true}
                    allow="encrypted-media"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
