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
  maxAttendees?: number;
  currentAttendees?: number;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    filter: 'upcoming',
    type: '',
    city: '',
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchEvents();
  }, [filters, currentPage]);

  const fetchEvents = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '12',
        ...Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== '')),
      });
      
      const response = await api.get(`/events?${params}`);
      setEvents(response.data.data.events || []);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
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

  const getEventTypeBadge = (eventType?: string) => {
    const colors = {
      workshop: 'bg-blue-100 text-blue-800',
      webinar: 'bg-green-100 text-green-800',
      seminar: 'bg-purple-100 text-purple-800',
      conference: 'bg-orange-100 text-orange-800',
    };

    return (
      <span className={`text-xs px-2 py-1 rounded-full ${colors[eventType as keyof typeof colors] || 'bg-gray-100 text-gray-800'}`}>
        {eventType?.charAt(0).toUpperCase() + eventType?.slice(1)}
      </span>
    );
  };

  const handleRegister = async (event: Event) => {
    if (event.isPast) return;
    
    try {
      if (event.webinarUrl) {
        window.open(event.webinarUrl, '_blank', 'noopener,noreferrer');
      } else {
        // Redirect to registration page for offline events
        window.location.href = `/events/${event.id}/register`;
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Upcoming Events
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Join Sajan Shah for transformative learning experiences
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={filters.filter}
              onChange={(e) => setFilters(prev => ({ ...prev, filter: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="upcoming">Upcoming Events</option>
              <option value="past">Past Events</option>
              <option value="all">All Events</option>
            </select>

            <select
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="workshop">Workshop</option>
              <option value="webinar">Webinar</option>
              <option value="seminar">Seminar</option>
              <option value="conference">Conference</option>
            </select>

            <select
              value={filters.city}
              onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Cities</option>
              <option value="delhi">Delhi</option>
              <option value="mumbai">Mumbai</option>
              <option value="bangalore">Bangalore</option>
              <option value="hyderabad">Hyderabad</option>
              <option value="chennai">Chennai</option>
              <option value="online">Online</option>
            </select>

            <Button
              onClick={() => window.location.href = '/contact'}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Request Custom Event
            </Button>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
                  <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div 
                  key={event.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* Event Poster */}
                  <div className="relative h-64 bg-gray-100">
                    <img
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

                    {/* Attendee Count */}
                    {event.currentAttendees && event.maxAttendees && (
                      <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                        {event.currentAttendees}/{event.maxAttendees} attendees
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    {/* Title and Badges */}
                    <div className="mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {event.title}
                      </h3>
                      <div className="flex gap-2">
                        {event.eventType && getEventTypeBadge(event.eventType)}
                        {event.isFree && (
                          <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                            FREE
                          </span>
                        )}
                      </div>
                    </div>

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
                      
                      {event.city && (
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-1.414 0l-5.586-5.586a1 1 0 01-.293-.707l-3.75-3.75a1 1 0 00-1.414 1.414l2.336 2.336V8a2 2 0 012-2h8a2 2 0 012 2v8.828l2.336-2.336a1 1 0 001.414 1.414l-3.75 3.75a1 1 0 01-.707.293l-5.586 5.586a1 1 0 01-1.414 0l-5.586-5.586a1 1 0 01-.293-.707z"/>
                          </svg>
                          {event.city}
                        </div>
                      )}

                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 .895 3 2-1.343 2-3 2zm0 8c1.11 0 2.08.402 2.599-1M12 8V7l-8 5v3l8-2z"/>
                        </svg>
                        {formatPrice(event.price)}
                      </div>
                    </div>

                    {/* CTA Button */}
                    {!event.isPast && (
                      <Button 
                        className="w-full"
                        onClick={() => handleRegister(event)}
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
              <p className="text-gray-500">No events found matching your criteria.</p>
            </div>
          )}

          {/* Pagination */}
          {events.length > 0 && (
            <div className="flex justify-center mt-12">
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
