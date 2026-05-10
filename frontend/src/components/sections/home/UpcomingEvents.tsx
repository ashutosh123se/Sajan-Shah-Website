'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import api from '@/lib/api';

interface Event {
  id: string;
  title: string;
  description?: string;
  posterUrl: string;
  webinarUrl: string;
  eventDate: string;
  city?: string;
  eventType?: string;
  isPast: boolean;
  isFree: boolean;
  price?: number;
}

export const UpcomingEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events?filter=upcoming&limit=3');
        setEvents(response.data.data.events || []);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handlePosterClick = (event: Event) => {
    if (!event.isPast && event.webinarUrl) {
      window.open(event.webinarUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatPrice = (price?: number) => {
    if (!price) return 'FREE';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  return (
    <section className="py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight italic">
            Upcoming <span className="text-brand-orange">Events</span>
          </h2>
          <div className="w-24 h-1 bg-brand-orange mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-medium">
            Join Sajan Shah for transformative learning experiences
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-gray-200 p-6 animate-pulse">
                <div className="h-64 bg-gray-200 mb-4"></div>
                <div className="h-4 bg-gray-200 mb-2"></div>
                <div className="h-4 bg-gray-200 w-3/4"></div>
              </div>
            ))}
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div 
                key={event.id}
                className="bg-[#111] border border-white/5 overflow-hidden hover:border-brand-orange/50 transition-all duration-300 group shadow-sm hover:shadow-xl flex flex-col"
              >
                {/* Event Poster */}
                <div className="relative h-64 bg-[#080808] overflow-hidden">
                  <img
                    src={event.posterUrl}
                    alt={event.title}
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  
                  {/* Past Event Badge */}
                  {event.isPast && (
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                      <span className="border-2 border-white/20 text-white/40 px-6 py-2 uppercase tracking-widest font-black italic">
                        Ended
                      </span>
                    </div>
                  )}

                  {/* Click Overlay for Live Events */}
                  {!event.isPast && (
                    <button
                      onClick={() => handlePosterClick(event)}
                      className="absolute inset-0 bg-brand-orange/0 hover:bg-brand-orange/20 transition-all flex items-center justify-center"
                    >
                    </button>
                  )}
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  {/* Title */}
                  <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-wide italic group-hover:text-brand-orange transition-colors">
                    {event.title}
                  </h3>

                  {/* Description */}
                  {event.description && (
                    <p className="text-gray-600 mb-6 line-clamp-2 text-lg">
                      {event.description}
                    </p>
                  )}

                  {/* Event Details */}
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-sm text-gray-500 font-bold uppercase tracking-wider">
                      <svg className="w-5 h-5 mr-3 text-brand-orange" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      {formatDate(event.eventDate)}
                    </div>
                    
                    {event.city && (
                      <div className="flex items-center text-sm text-gray-500 font-bold uppercase tracking-wider">
                        <svg className="w-5 h-5 mr-3 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-1.414 0l-5.586-5.586a1 1 0 01-.293-.707l-3.75-3.75a1 1 0 00-1.414 1.414l2.336 2.336V8a2 2 0 012-2h8a2 2 0 012 2v8.828l2.336-2.336a1 1 0 001.414 1.414l-3.75 3.75a1 1 0 01-.707.293l-5.586 5.586a1 1 0 01-1.414 0l-5.586-5.586a1 1 0 01-.293-.707z"/>
                        </svg>
                        {event.city}
                      </div>
                    )}

                    <div className="flex items-center text-sm text-gray-500 font-bold uppercase tracking-wider">
                      <svg className="w-5 h-5 mr-3 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2zm0 8c1.11 0 2.08.402 2.599-1M12 8V7l-8 5v3l8-2z"/>
                      </svg>
                      {formatPrice(event.price)}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto pt-6 border-t border-white/5">
                    {!event.isPast && (
                      <Button 
                        size="lg"
                        className="w-full font-black uppercase tracking-widest rounded-none bg-white text-black hover:bg-brand-orange hover:text-white transition-all"
                        onClick={() => handlePosterClick(event)}
                      >
                        {event.isFree ? 'Register Free' : 'Book Now'}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-white/5 bg-black/20">
            <p className="text-gray-500 text-lg font-bold uppercase tracking-widest italic">No upcoming events at the moment.</p>
          </div>
        )}

        {/* View All CTA */}
        <div className="text-center mt-16">
          <Button 
            variant="outline"
            size="lg"
            className="font-black uppercase tracking-[0.2em] px-8 py-4 rounded-none border-white/10 text-white hover:bg-white hover:text-black transition-all"
            onClick={() => window.location.href = '/events'}
          >
            View All Events →
          </Button>
        </div>
      </div>
    </section>
  );
};
