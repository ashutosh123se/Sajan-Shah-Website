'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { Save, ChevronDown, ChevronUp, RefreshCw, AlertCircle, Plus, Trash2, Calendar, Layout } from 'lucide-react';

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
  homepageImageUrl?: string;
  buttonUrl?: string;
  isActive: boolean;
}

interface PageSection {
  id: string;
  key: string;
  title: string;
  content: any;
  order: number;
  isActive: boolean;
  updatedAt: string;
}

const SECTION_LABELS: Record<string, string> = {
  hero: '🎤 Events Page Hero Banner',
  cta: '✉️ Event Booking Form CTA',
};

const FIELD_LABELS: Record<string, string> = {
  heading: 'Main Heading Text',
  subHeading: 'Header Subtitle Text (e.g. events calendar)',
  paragraph: 'Body Paragraph Description',
  buttonText: 'Action Button Label',
};

const getFieldLabel = (key: string) => {
  return FIELD_LABELS[key] || key.replace(/([A-Z])/g, ' $1').replace(/^\w/, c => c.toUpperCase());
};

export default function AdminEventsPage() {
  const { isSuperAdmin, isAdmin, isEditor } = useAuth();
  const [activeTab, setActiveTab] = useState<'calendar' | 'sections'>('calendar');

  // Calendar Events State
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
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
    homepageImageUrl: '',
    buttonUrl: '',
    isActive: true,
  });

  // Page Sections State
  const [sections, setSections] = useState<PageSection[]>([]);
  const [loadingSections, setLoadingSections] = useState(true);
  const [savingSectionId, setSavingSectionId] = useState<string | null>(null);
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>(null);
  const [errorSections, setErrorSections] = useState<string | null>(null);

  const hasAccess = isSuperAdmin || isAdmin || isEditor;

  useEffect(() => {
    if (!hasAccess) return;
    if (activeTab === 'calendar') {
      fetchEvents();
    } else {
      fetchSections();
    }
  }, [hasAccess, activeTab]);

  const [uploadingPoster, setUploadingPoster] = useState(false);
  const [uploadingHomepage, setUploadingHomepage] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'thumbnailUrl' | 'homepageImageUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isPoster = field === 'thumbnailUrl';
    if (isPoster) setUploadingPoster(true);
    else setUploadingHomepage(true);

    try {
      const data = new FormData();
      data.append('image', file);
      data.append('folder', isPoster ? 'events/posters' : 'events/homepage');
      const res = await api.post('/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const imageUrl = res.data.data.imageUrl;
      setFormData(prev => ({ ...prev, [field]: imageUrl }));
      toast.success('Image uploaded successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Image upload failed');
    } finally {
      if (isPoster) setUploadingPoster(false);
      else setUploadingHomepage(false);
    }
  };

  // --- Calendar Events Operations ---
  const fetchEvents = async () => {
    try {
      setLoadingEvents(true);
      const response = await api.get('/events/admin/all');
      setEvents(response.data.data.events || []);
    } catch (error) {
      toast.error('Failed to fetch events');
    } finally {
      setLoadingEvents(false);
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
        slug: formData.slug || `${formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}-${Date.now()}`,
        description: formData.description,
        eventDate: new Date(formData.eventDate).toISOString(),
        eventType: formData.eventType,
        city: formData.city,
        venue: formData.venue,
        price: formData.isFree ? 0 : Number(formData.ticketPrice),
        isFree: formData.isFree,
        capacity: formData.capacity ? Number(formData.capacity) : null,
        posterUrl: formData.thumbnailUrl || 'https://via.placeholder.com/800x600',
        homepageImageUrl: formData.homepageImageUrl || '',
        buttonUrl: formData.buttonUrl || null,
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
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to save event');
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
        thumbnailUrl: (event as any).posterUrl || event.thumbnailUrl || '',
        homepageImageUrl: event.homepageImageUrl || '',
        buttonUrl: event.buttonUrl || '',
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
        homepageImageUrl: '',
        buttonUrl: '',
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  // --- Page Sections Operations ---
  const fetchSections = async () => {
    try {
      setLoadingSections(true);
      setErrorSections(null);
      const response = await api.get('/events-page/all');
      if (response.data.success) {
        const rawSections = response.data.data.sections ?? [];
        setSections(rawSections.sort((a: PageSection, b: PageSection) => a.order - b.order));
      } else {
        setErrorSections('Failed to load events page sections');
      }
    } catch (e: any) {
      setErrorSections(`Failed to connect: ${e.message}`);
    } finally {
      setLoadingSections(false);
    }
  };

  const handleSectionContentChange = (sectionId: string, field: string, value: any) => {
    setSections(prev => prev.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          content: { ...s.content, [field]: value }
        };
      }
      return s;
    }));
  };

  const saveSection = async (id: string) => {
    setSavingSectionId(id);
    const section = sections.find(s => s.id === id);
    if (!section) return;

    try {
      const response = await api.put(`/events-page/${id}`, {
        title: section.title,
        content: section.content,
        order: section.order,
        isActive: section.isActive,
      });

      if (response.data.success) {
        toast.success(`"${SECTION_LABELS[section.key] || section.key}" section saved!`);
        fetchSections();
      } else {
        toast.error(`Save failed: ${response.data.error || 'Unknown error'}`);
      }
    } catch (e: any) {
      toast.error('Network error - is backend running?');
    } finally {
      setSavingSectionId(null);
    }
  };

  if (!hasAccess) return null;

  return (
    <div className="space-y-8 min-h-screen bg-black text-white pb-20">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Event Hub Management</h1>
          <p className="text-zinc-400 text-sm mt-1">Configure live speaking events calendar and style landing page details.</p>
        </div>

        {/* Tab Toggle Switch */}
        <div className="flex bg-zinc-900 p-1 rounded-xl border border-zinc-800">
          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${activeTab === 'calendar' ? 'bg-[#f26522] text-white shadow-md' : 'text-zinc-400 hover:text-white'}`}
          >
            <Calendar size={14} /> Events Calendar
          </button>
          <button
            onClick={() => setActiveTab('sections')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${activeTab === 'sections' ? 'bg-[#f26522] text-white shadow-md' : 'text-zinc-400 hover:text-white'}`}
          >
            <Layout size={14} /> Page Sections Layout
          </button>
        </div>
      </div>

      {/* --- TAB 1: CALENDAR EVENTS TAB --- */}
      {activeTab === 'calendar' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-zinc-950 p-4 border border-zinc-900 rounded-xl">
            <span className="text-zinc-400 text-sm">Create and schedule individual live events on the events page timeline.</span>
            <Button onClick={() => openModal()} className="bg-white text-black hover:bg-gray-200 rounded-lg px-5 py-2 font-semibold">
              Create Event
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {loadingEvents ? (
              <div className="col-span-full py-16 text-center text-zinc-500 flex items-center justify-center gap-2">
                <img src="/loding.png" alt="Loading" className="animate-spin object-contain h-8 w-8 inline-block mr-3" /> Loading events list...
              </div>
            ) : events.length > 0 ? (
              events.map((event) => (
                <div key={event.id} className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl flex flex-col hover:border-zinc-800 transition-all shadow-md">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{event.title}</h3>
                      <p className="text-sm text-zinc-400">{new Date(event.eventDate).toLocaleDateString()} at {new Date(event.eventDate).toLocaleTimeString()}</p>
                    </div>
                    {event.isFree ? (
                      <span className="bg-green-950/80 text-green-400 border border-green-800/60 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full">Free</span>
                    ) : (
                      <span className="bg-[#f26522]/10 text-[#f26522] border border-[#f26522]/30 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full">₹{event.ticketPrice}</span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-zinc-900">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Location</p>
                      <p className="font-medium text-white">{event.city || 'Online'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Capacity</p>
                      <p className="font-medium text-white">{event.capacity || 'Unlimited'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Type</p>
                      <p className="font-medium text-white capitalize">{event.eventType}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Status</p>
                      <p className={`font-medium ${event.isActive ? 'text-green-400' : 'text-red-400'}`}>
                        {event.isActive ? 'Active' : 'Draft'}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-zinc-900 mt-auto">
                    <Button variant="outline" className="flex-1 rounded-lg border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white" onClick={() => openModal(event)}>
                      Edit Event Info
                    </Button>
                    <Button variant="outline" className="flex-1 rounded-lg border-zinc-800 text-red-400 hover:text-red-300 hover:bg-red-950/20" onClick={() => handleDelete(event.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center border border-zinc-900 bg-zinc-950 rounded-2xl">
                <p className="text-zinc-400 text-lg mb-4">No events found in the calendar database</p>
                <Button onClick={() => openModal()} className="bg-white text-black hover:bg-gray-200 rounded-lg">Create Event</Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- TAB 2: PAGE SECTIONS TAB --- */}
      {activeTab === 'sections' && (
        <div className="space-y-6">
          {errorSections && (
            <div className="p-5 bg-red-950/30 border border-red-900 rounded-2xl flex items-start gap-4">
              <AlertCircle className="text-red-400 mt-0.5 shrink-0" size={20} />
              <div>
                <p className="font-semibold text-red-300 text-sm mb-1">Could not load sections</p>
                <p className="text-red-400 text-sm">{errorSections}</p>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {loadingSections ? (
              <div className="py-16 text-center text-zinc-500 flex items-center justify-center gap-2">
                <img src="/loding.png" alt="Loading" className="animate-spin object-contain h-8 w-8 inline-block mr-3" /> Loading sections editor...
              </div>
            ) : sections.map((section) => (
              <div
                key={section.id}
                className={`border rounded-2xl overflow-hidden transition-all bg-zinc-950 shadow-lg ${section.isActive ? 'border-zinc-800' : 'border-zinc-900 opacity-60'}`}
              >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-zinc-900/40 border-b border-zinc-900">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setExpandedSectionId(expandedSectionId === section.id ? null : section.id)}
                      className="text-zinc-400 hover:text-white p-1 transition-colors"
                    >
                      {expandedSectionId === section.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                    <div>
                      <span className="font-bold text-white text-base">{SECTION_LABELS[section.key] || section.key}</span>
                    </div>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${section.isActive ? 'bg-green-950/80 text-green-400 border-green-800' : 'bg-zinc-800 text-zinc-500 border-zinc-700'}`}>
                      {section.isActive ? 'Active' : 'Hidden'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <label className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">Visible</label>
                      <input
                        type="checkbox"
                        checked={section.isActive}
                        onChange={(e) => {
                          const active = e.target.checked;
                          setSections(prev => prev.map(s => s.id === section.id ? { ...s, isActive: active } : s));
                        }}
                        className="w-4 h-4 rounded border-zinc-700 bg-zinc-950 text-[#f26522] focus:ring-[#f26522] focus:ring-offset-black"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">Order</label>
                      <input
                        type="number"
                        value={section.order}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          setSections(prev => prev.map(s => s.id === section.id ? { ...s, order: val } : s));
                        }}
                        className="w-14 bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-sm text-center font-semibold text-white focus:border-[#f26522] focus:outline-none"
                      />
                    </div>
                    <button
                      onClick={() => saveSection(section.id)}
                      disabled={savingSectionId === section.id}
                      className="flex items-center gap-2 bg-[#f26522] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#d95a1e] transition-colors disabled:opacity-60 shadow-md"
                    >
                      <Save size={13} /> {savingSectionId === section.id ? 'Saving...' : 'Save Section'}
                    </button>
                  </div>
                </div>

                {/* Form fields */}
                {expandedSectionId === section.id && (
                  <div className="p-6 bg-zinc-950 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(section.content || {}).map(([key, value]: [string, any]) => {
                        const isLongText = value?.toString().length > 60;
                        const isImage = key.toLowerCase().includes('image') || key.toLowerCase().includes('url') || value?.toString().startsWith('/') || value?.toString().startsWith('http');

                        return (
                          <div key={key} className={isLongText ? 'col-span-2 space-y-1' : 'space-y-1'}>
                            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">
                              {getFieldLabel(key)}
                            </label>
                            {isLongText ? (
                              <textarea
                                value={value}
                                onChange={(e) => handleSectionContentChange(section.id, key, e.target.value)}
                                className="w-full border border-zinc-800 bg-zinc-950 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#f26522]/30 text-white placeholder-zinc-700"
                                rows={3}
                              />
                            ) : (
                              <div className="flex gap-4 items-center">
                                <input
                                  type="text"
                                  value={value}
                                  onChange={(e) => handleSectionContentChange(section.id, key, e.target.value)}
                                  className="flex-1 border border-zinc-800 bg-zinc-950 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f26522]/30 text-white"
                                />
                                {isImage && value && (
                                  <div className="w-12 h-12 border border-zinc-800 rounded-lg overflow-hidden shrink-0 bg-zinc-900 shadow-md">
                                    <img src={value} alt="Preview" className="w-full h-full object-cover" />
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- Create/Edit Event Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-[#121212] border border-zinc-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
            <div className="sticky top-0 bg-[#121212] p-6 border-b border-zinc-800 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-white tracking-tight">{editingEvent ? 'Edit Event Details' : 'Create New Live Event'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white transition-colors">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">Event Title</label>
                  <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')})} className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f26522]/30" />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">Date & Time</label>
                  <input type="datetime-local" required value={formData.eventDate} onChange={(e) => setFormData({...formData, eventDate: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f26522]/30" />
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">City</label>
                  <input type="text" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f26522]/30" placeholder="e.g. Mumbai" />
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">Venue (Tagline)</label>
                  <input type="text" value={formData.venue} onChange={(e) => setFormData({...formData, venue: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f26522]/30" placeholder="e.g. Grand Ballroom" />
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">Event Type</label>
                  <select value={formData.eventType} onChange={(e) => setFormData({...formData, eventType: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f26522]/30">
                    <option value="workshop">Workshop</option>
                    <option value="seminar">Seminar</option>
                    <option value="webinar">Webinar</option>
                    <option value="retreat">Retreat</option>
                    <option value="school">School Talk</option>
                    <option value="corporate">Corporate Seminar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">Event Page Image</label>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'thumbnailUrl')} className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-lg" />
                  {uploadingPoster && <p className="text-xs text-zinc-500 mt-1">Uploading...</p>}
                  {formData.thumbnailUrl && <img src={formData.thumbnailUrl} alt="Poster preview" className="mt-2 h-20 object-cover rounded border border-zinc-800" />}
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">Home Page Carousel Image</label>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'homepageImageUrl')} className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-lg" />
                  {uploadingHomepage && <p className="text-xs text-zinc-500 mt-1">Uploading...</p>}
                  {formData.homepageImageUrl && <img src={formData.homepageImageUrl} alt="Homepage preview" className="mt-2 h-20 object-cover rounded border border-zinc-800" />}
                </div>

                <div className="col-span-2">
                  <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">Registration URL (SOL / Razorpay link)</label>
                  <input type="text" value={formData.buttonUrl} onChange={(e) => setFormData({...formData, buttonUrl: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f26522]/30" placeholder="e.g. https://sol.sajanshah.com" />
                </div>

                <div className="col-span-2 flex items-center space-x-6 pt-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={formData.isFree} onChange={(e) => setFormData({...formData, isFree: e.target.checked})} className="w-4 h-4 rounded border-zinc-700 bg-zinc-950 text-[#f26522] focus:ring-[#f26522]" />
                    <span className="text-sm text-zinc-300">Free Event</span>
                  </label>
                  
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({...formData, isActive: e.target.checked})} className="w-4 h-4 rounded border-zinc-700 bg-zinc-950 text-[#f26522] focus:ring-[#f26522]" />
                    <span className="text-sm text-zinc-300">Active (Visible)</span>
                  </label>
                </div>

                {!formData.isFree && (
                  <div>
                    <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">Ticket Price (INR)</label>
                    <input type="number" required={!formData.isFree} value={formData.ticketPrice} onChange={(e) => setFormData({...formData, ticketPrice: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f26522]/30" />
                  </div>
                )}
                
                <div className={formData.isFree ? "col-span-2" : ""}>
                  <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">Capacity Limit</label>
                  <input type="number" value={formData.capacity} onChange={(e) => setFormData({...formData, capacity: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f26522]/30" placeholder="Leave blank for unlimited" />
                </div>
              </div>

              <div className="pt-8 flex justify-end gap-4 border-t border-zinc-900">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="rounded-lg border-zinc-850 text-white hover:bg-zinc-900">Cancel</Button>
                <Button type="submit" className="rounded-lg bg-[#f26522] text-white hover:bg-[#d95a1e]">Save Event</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
