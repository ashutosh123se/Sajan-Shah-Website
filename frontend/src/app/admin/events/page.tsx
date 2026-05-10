'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';
import api from '@/lib/api';

interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  eventDate: string;
  eventType: string;
  city?: string;
  venue?: string;
  ticketPrice?: number;
  currency: string;
  isFree: boolean;
  capacity?: number;
  thumbnailUrl?: string;
  isActive: boolean;
}

export default function AdminEventsPage() {
  const { isSuperAdmin, isAdmin, isEditor } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    eventDate: '',
    eventType: 'workshop',
    city: '',
    venue: '',
    ticketPrice: '',
    currency: 'INR',
    isFree: false,
    capacity: '',
    thumbnailUrl: '',
    isActive: true,
  });

  const hasAccess = isSuperAdmin || isAdmin || isEditor;

  useEffect(() => {
    if (!hasAccess) return;
    fetchEvents();
  }, [hasAccess]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/events');
      setEvents(response.data.data.events || []);
    } catch (error) {
      toast.error('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      await api.delete(`/events/${id}`);
      toast.success('Event deleted successfully');
      fetchEvents();
    } catch (error) {
      toast.error('Failed to delete event');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        description: formData.description,
        eventDate: new Date(formData.eventDate).toISOString(),
        eventType: formData.eventType,
        city: formData.city,
        venue: formData.venue,
        price: formData.isFree ? 0 : Number(formData.ticketPrice),
        isFree: formData.isFree,
        capacity: formData.capacity ? Number(formData.capacity) : null,
        posterUrl: formData.thumbnailUrl || 'https://via.placeholder.com/800x600',
        cloudinaryPublicId: 'default',
        webinarUrl: 'https://zoom.us',
        isActive: formData.isActive,
      };

      if (editingEvent) {
        await api.put(`/events/${editingEvent.id}`, payload);
        toast.success('Event updated');
      } else {
        await api.post('/events', payload);
        toast.success('Event created');
      }
      setIsModalOpen(false);
      fetchEvents();
    } catch (error) {
      toast.error('Failed to save event');
    }
  };

  const openModal = (event?: Event) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        slug: event.slug,
        description: event.description || '',
        eventDate: new Date(event.eventDate).toISOString().slice(0, 16),
        eventType: event.eventType || 'workshop',
        city: event.city || '',
        venue: event.venue || '',
        ticketPrice: event.ticketPrice?.toString() || '',
        currency: event.currency || 'INR',
        isFree: event.isFree,
        capacity: event.capacity?.toString() || '',
        thumbnailUrl: event.thumbnailUrl || '',
        isActive: event.isActive,
      });
    } else {
      setEditingEvent(null);
      setFormData({
        title: '',
        slug: '',
        description: '',
        eventDate: new Date().toISOString().slice(0, 16),
        eventType: 'workshop',
        city: '',
        venue: '',
        ticketPrice: '',
        currency: 'INR',
        isFree: false,
        capacity: '',
        thumbnailUrl: '',
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  if (!hasAccess) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Event Management</h1>
          <p className="text-gray-400 text-sm mt-1">Manage live events, workshops, and speaking engagements.</p>
        </div>
        <Button onClick={() => openModal()} className="bg-white text-black hover:bg-gray-200 rounded-none font-medium">
          Create Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-gray-400">Loading events...</div>
        ) : events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="bg-[#1a1a1a] border border-white/10 p-6 flex flex-col hover:border-white/20 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{event.title}</h3>
                  <p className="text-sm text-gray-400">{new Date(event.eventDate).toLocaleDateString()} at {new Date(event.eventDate).toLocaleTimeString()}</p>
                </div>
                {event.isFree ? (
                  <span className="bg-green-500/10 text-green-400 px-3 py-1 text-xs font-bold uppercase tracking-wider">Free</span>
                ) : (
                  <span className="bg-white/10 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">₹{event.ticketPrice}</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-white/5">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Location</p>
                  <p className="font-medium text-white">{event.city || 'Online'}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Capacity</p>
                  <p className="font-medium text-white">{event.capacity || 'Unlimited'}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Type</p>
                  <p className="font-medium text-white capitalize">{event.eventType}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Status</p>
                  <p className={`font-medium ${event.isActive ? 'text-green-400' : 'text-red-400'}`}>
                    {event.isActive ? 'Active' : 'Draft'}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/5 mt-auto">
                <Button variant="outline" className="flex-1 rounded-none border-white/10 hover:bg-white/5" onClick={() => openModal(event)}>
                  Edit
                </Button>
                <Button variant="outline" className="flex-1 rounded-none border-white/10 text-red-400 hover:text-red-300 hover:bg-red-950/30" onClick={() => handleDelete(event.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center border border-white/10 bg-[#1a1a1a]">
            <p className="text-gray-400 text-lg mb-2">No events found</p>
            <Button onClick={() => openModal()} className="bg-white text-black hover:bg-gray-200 rounded-none">Create Event</Button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#141414] border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#141414] p-6 border-b border-white/10 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-white tracking-tight">{editingEvent ? 'Edit Event' : 'Create New Event'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Event Title</label>
                  <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')})} className="w-full bg-[#222] border border-white/10 text-white px-4 py-3" />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Date & Time</label>
                  <input type="datetime-local" required value={formData.eventDate} onChange={(e) => setFormData({...formData, eventDate: e.target.value})} className="w-full bg-[#222] border border-white/10 text-white px-4 py-3" />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">City</label>
                  <input type="text" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full bg-[#222] border border-white/10 text-white px-4 py-3" placeholder="e.g. Mumbai" />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Venue</label>
                  <input type="text" value={formData.venue} onChange={(e) => setFormData({...formData, venue: e.target.value})} className="w-full bg-[#222] border border-white/10 text-white px-4 py-3" placeholder="e.g. Grand Hotel" />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Event Type</label>
                  <select value={formData.eventType} onChange={(e) => setFormData({...formData, eventType: e.target.value})} className="w-full bg-[#222] border border-white/10 text-white px-4 py-3">
                    <option value="workshop">Workshop</option>
                    <option value="seminar">Seminar</option>
                    <option value="webinar">Webinar</option>
                    <option value="retreat">Retreat</option>
                  </select>
                </div>

                <div className="col-span-2 flex items-center space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={formData.isFree} onChange={(e) => setFormData({...formData, isFree: e.target.checked})} className="w-5 h-5 bg-[#222] text-brand-orange focus:ring-0" />
                    <span className="text-sm text-gray-300">Is Free Event</span>
                  </label>
                  
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({...formData, isActive: e.target.checked})} className="w-5 h-5 bg-[#222] text-brand-orange focus:ring-0" />
                    <span className="text-sm text-gray-300">Active (Public)</span>
                  </label>
                </div>

                {!formData.isFree && (
                  <div>
                    <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Ticket Price (INR)</label>
                    <input type="number" required={!formData.isFree} value={formData.ticketPrice} onChange={(e) => setFormData({...formData, ticketPrice: e.target.value})} className="w-full bg-[#222] border border-white/10 text-white px-4 py-3" />
                  </div>
                )}
                
                <div className={formData.isFree ? "col-span-2" : ""}>
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Capacity</label>
                  <input type="number" value={formData.capacity} onChange={(e) => setFormData({...formData, capacity: e.target.value})} className="w-full bg-[#222] border border-white/10 text-white px-4 py-3" placeholder="Leave blank for unlimited" />
                </div>
              </div>

              <div className="pt-8 flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="rounded-none border-white/10 text-white hover:bg-white/5">Cancel</Button>
                <Button type="submit" className="rounded-none bg-white text-black hover:bg-gray-200">Save Event</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
