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
      setLoading(true);
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
    if (!price || price === 0) return 'FREE';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const getEventTypeBadge = (eventType?: string) => {
    const colors = {
      workshop: 'border-blue-500 text-blue-500',
      webinar: 'border-green-500 text-green-500',
      seminar: 'border-purple-500 text-purple-500',
      retreat: 'border-brand-orange text-brand-orange',
    };

    return (
      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 border ${colors[eventType as keyof typeof colors] || 'border-gray-500 text-gray-500'}`}>
        {eventType || 'Event'}
      </span>
    );
  };

  const handleRegister = (event: Event) => {
    if (event.isPast) return;
    if (event.webinarUrl) {
      window.open(event.webinarUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.05)_0%,transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tighter italic">
              Upcoming <span className="text-brand-orange">Events</span>
            </h1>
            <div className="w-24 h-1 bg-brand-orange mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-medium">
              Join Sajan Shah for transformative learning experiences that push boundaries.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-12 bg-black/40 backdrop-blur-sm sticky top-0 z-50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Status</label>
              <select
                value={filters.filter}
                onChange={(e) => setFilters(prev => ({ ...prev, filter: e.target.value }))}
                className="w-full bg-[#111] border border-white/10 text-white px-4 py-3 focus:border-brand-orange outline-none appearance-none cursor-pointer transition-all hover:border-white/20 font-bold text-sm"
              >
                <option value="upcoming">Upcoming Events</option>
                <option value="past">Past Events</option>
                <option value="all">All Events</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Category</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                className="w-full bg-[#111] border border-white/10 text-white px-4 py-3 focus:border-brand-orange outline-none appearance-none cursor-pointer transition-all hover:border-white/20 font-bold text-sm"
              >
                <option value="">All Types</option>
                <option value="workshop">Workshop</option>
                <option value="webinar">Webinar</option>
                <option value="seminar">Seminar</option>
                <option value="retreat">Retreat</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Location</label>
              <select
                value={filters.city}
                onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                className="w-full bg-[#111] border border-white/10 text-white px-4 py-3 focus:border-brand-orange outline-none appearance-none cursor-pointer transition-all hover:border-white/20 font-bold text-sm"
              >
                <option value="">All Locations</option>
                <option value="mumbai">Mumbai</option>
                <option value="delhi">Delhi</option>
                <option value="bangalore">Bangalore</option>
                <option value="ahmedabad">Ahmedabad</option>
                <option value="online">Online</option>
              </select>
            </div>

            <div className="flex items-end">
              <Button
                onClick={() => window.location.href = '/contact'}
                className="w-full h-[46px] rounded-none bg-white text-black hover:bg-brand-orange hover:text-white transition-all font-black uppercase tracking-widest text-xs"
              >
                Request Custom Event
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-[#111] border border-white/5 p-6 animate-pulse aspect-[4/5]">
                  <div className="h-2/3 bg-white/5 mb-6"></div>
                  <div className="h-6 bg-white/5 mb-4"></div>
                  <div className="h-6 bg-white/5 w-1/2"></div>
                </div>
              ))}
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {events.map((event) => (
                <div 
                  key={event.id}
                  className="group relative flex flex-col bg-[#111] border border-white/5 hover:border-brand-orange/50 transition-all duration-500 shadow-2xl overflow-hidden"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#080808]">
                    <img
                      src={event.posterUrl}
                      alt={event.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-60 group-hover:opacity-100"
                    />
                    
                    {/* Badge Overlay */}
                    <div className="absolute top-6 left-6">
                      {getEventTypeBadge(event.eventType)}
                    </div>

                    {/* Price Overlay */}
                    <div className="absolute bottom-6 right-6">
                       <span className="text-xl font-black bg-brand-orange text-white px-4 py-2 italic tracking-tighter">
                         {formatPrice(event.price)}
                       </span>
                    </div>

                    {/* Past Overlay */}
                    {event.isPast && (
                      <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="border-2 border-white/20 text-white/40 px-8 py-3 font-black uppercase tracking-[0.3em] italic text-lg">
                          Closed
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-10 flex flex-col flex-grow">
                    <h3 className="text-3xl font-black uppercase tracking-tight leading-none mb-6 group-hover:text-brand-orange transition-colors italic">
                      {event.title}
                    </h3>

                    <div className="flex items-center text-gray-500 font-bold uppercase tracking-widest text-[10px] mb-8 space-x-6">
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-brand-orange rounded-full mr-2"></span>
                        {formatDate(event.eventDate)}
                      </div>
                      {event.city && (
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-white/20 rounded-full mr-2"></span>
                          {event.city}
                        </div>
                      )}
                    </div>

                    {!event.isPast && (
                      <Button 
                        className="mt-auto w-full rounded-none py-6 font-black uppercase tracking-[0.2em] text-xs bg-white text-black hover:bg-brand-orange hover:text-white transition-all transform group-hover:translate-y-[-4px]"
                        onClick={() => handleRegister(event)}
                      >
                        {event.isFree ? 'Get Access' : 'Book Ticket'}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-40 border border-white/5 bg-[#080808]">
              <div className="w-20 h-20 border-2 border-white/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-4xl text-white/10">!</span>
              </div>
              <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-sm italic">
                No events found matching your criteria.
              </p>
            </div>
          )}

          {/* Pagination */}
          {events.length > 0 && (
            <div className="flex justify-center mt-24 space-x-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-8 py-3 border border-white/10 font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all disabled:opacity-20"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="px-8 py-3 border border-white/10 font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
