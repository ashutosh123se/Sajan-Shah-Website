'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import api from '@/lib/api';
import { MediaImage } from '@/components/common/MediaImage';

interface Event {
  id: string;
  title: string;
  description?: string;
  posterUrl: string;
  webinarUrl: string;
  eventDate: string;
  city?: string;
  eventType?: string;
  venue?: string;
  venueAddress?: string;
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

  const formatPrice = (event: Event) => {
    if (event.isFree) return 'FREE';
    if (!event.price) return 'FREE';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(event.price);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join Sajan Shah for transformative learning experiences
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
                <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div 
                key={event.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow relative group"
              >
                {/* Event Poster */}
                <div className="relative h-64 bg-gray-100">
                  <MediaImage
                    src={event.posterUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Past Event Badge */}
                  {event.isPast && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                      <span className="bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold">
                        Event Ended
                      </span>
                    </div>
                  )}

                  {/* Click Overlay for Live Events */}
                  {!event.isPast && (
                    <button
                      onClick={() => handlePosterClick(event)}
                      className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all flex items-center justify-center"
                    >
                      <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                        <p className="text-sm font-semibold">Click to Join Event</p>
                      </div>
                    </button>
                  )}
                </div>

                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {event.title}
                  </h3>

                  {/* Description */}
                  {event.description && (
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {event.description}
                    </p>
                  )}

                  {/* Event Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      {formatDate(event.eventDate)}
                    </div>
                    
                    {(event.city || event.venue) && (
                      <div className="flex items-start text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        <div>
                          <div className="font-medium text-gray-800">
                            {event.city}{event.venue ? ` · ${event.venue}` : ''}
                          </div>
                          {event.venueAddress && (
                            <div className="text-xs text-gray-500 mt-0.5 leading-snug">
                              {event.venueAddress}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2zm0 8c1.11 0 2.08.402 2.599-1M12 8V7l-8 5v3l8-2z"/>
                      </svg>
                      {formatPrice(event)}
                    </div>
                  </div>

                  {/* CTA Button */}
                  {!event.isPast && (
                    <Button 
                      className="w-full"
                      onClick={() => handlePosterClick(event)}
                    >
                      {event.isFree ? 'Register Free' : 'Register Now'}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No upcoming events at the moment.</p>
          </div>
        )}

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Button 
            variant="outline"
            size="lg"
            onClick={() => window.location.href = '/events'}
          >
            View All Events →
          </Button>
        </div>
      </div>
    </section>
  );
};
