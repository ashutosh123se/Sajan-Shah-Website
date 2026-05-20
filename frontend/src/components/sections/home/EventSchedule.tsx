'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/api';

export const EventSchedule: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackEvents = [
    { 
      id: "fallback-1",
      title: "Create a Life Aligned with Your Potential", 
      brief: "Explore the patterns that have been holding you back, reignite your inner motivation, and build steady momentum toward creating a life that truly aligns with who you want to become.", 
      date: "1st - 3rd May 2026", 
      time: "10:00 AM - 4:00 PM", 
      venue: "Mumbai, India", 
      type: "PHYSICAL",
      image: "/hero-1.jpg"
    },
    { 
      id: "fallback-2",
      title: "Neuroscience Leadership Masterclass", 
      brief: "Rewiring the minds of top executives. Learn how to lead with a brain-centric approach that drives unprecedented results.", 
      date: "15 Oct 2026", 
      time: "10:00 AM - 4:00 PM", 
      venue: "Delhi, India", 
      type: "PHYSICAL",
      image: "/hero-2.jpg"
    },
    { 
      id: "fallback-3",
      title: "Focus & Discipline Intensive", 
      brief: "Distraction is the enemy of greatness. An intensive online session to hack your focus and build unbreakable discipline from anywhere in the world.", 
      date: "05 Nov 2026", 
      time: "7:00 PM - 8:30 PM", 
      venue: "Online", 
      type: "WEBINAR",
      image: "/hero-3.jpg"
    }
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get('/events?filter=upcoming');
        if (res.data.success) {
          const activeEvents = (res.data.data.events || []).filter((e: any) => e.isActive);
          setEvents(activeEvents);
        }
      } catch (err) {
        console.error('Failed to fetch home page events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const displayedEvents = events.length > 0 ? events.map((e: any) => {
    const d = new Date(e.eventDate);
    const formattedDate = d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    return {
      id: e.id,
      title: e.title,
      brief: e.description || '',
      date: formattedDate,
      time: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      venue: e.venue ? `${e.venue}, ${e.city || ''}` : (e.city || 'Online'),
      type: (e.eventType || 'PHYSICAL').toUpperCase(),
      image: e.homepageImageUrl || e.posterUrl || '/hero-1.jpg'
    };
  }) : fallbackEvents;

  useEffect(() => {
    if (displayedEvents.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % displayedEvents.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [displayedEvents.length]);

  if (loading) {
    return (
      <div className="relative w-full h-[600px] md:h-[700px] bg-black flex items-center justify-center">
        <div className="text-zinc-500 text-sm animate-pulse tracking-[0.2em] uppercase">Loading Events...</div>
      </div>
    );
  }

  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-black">
      {/* Slides */}
      {displayedEvents.map((evt, idx) => (
        <div 
          key={evt.id || idx} 
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-gray-900"
            style={{ 
              backgroundImage: `url(${evt.image})`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center right' 
            }} 
          />
          
          {/* Gradient Overlay to ensure text readability on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent md:w-2/3" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden" />

          {/* Content */}
          <div className="relative z-20 h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col justify-center">
            <div className="max-w-2xl mt-12 md:mt-24">
              
              {/* Event Type / Badge */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <p className="text-white text-xs font-bold tracking-[0.2em] uppercase">{evt.type}</p>
              </div>

              {/* Title */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                {evt.title}
              </h2>

              {/* Brief */}
              <p className="text-lg md:text-xl text-gray-200 font-light leading-relaxed mb-10 max-w-xl line-clamp-3">
                {evt.brief}
              </p>

              {/* Action & Date Row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
                <Link 
                  href={evt.id.startsWith('fallback-') ? '/events' : `/events#event-card-${evt.id}`}
                  className="bg-white text-black hover:bg-gray-200 px-8 py-3.5 rounded-full font-bold text-sm transition-colors duration-300 text-center inline-block"
                >
                  Learn More
                </Link>
                <div className="text-white border-l-2 border-white/30 pl-6">
                  <p className="text-xs text-gray-300 font-light mb-1 uppercase tracking-widest">Date</p>
                  <p className="font-semibold">{evt.date}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      {displayedEvents.length > 1 && (
        <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center space-x-3">
          {displayedEvents.map((_, idx) => (
            <button 
              key={idx} 
              onClick={() => setCurrentSlide(idx)} 
              className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/80'} border-none cursor-pointer`}
              aria-label={`Go to event slide ${idx + 1}`} 
            />
          ))}
        </div>
      )}
    </section>
  );
};
