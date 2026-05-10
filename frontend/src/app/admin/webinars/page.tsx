'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

interface Webinar {
  id: string;
  title: string;
  date: string;
  time: string;
  status: 'Upcoming' | 'Live' | 'Completed';
  registrationLink: string;
  posterUrl?: string;
}

export default function AdminWebinarsPage() {
  const { isSuperAdmin, isAdmin, isEditor } = useAuth();
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWebinar, setEditingWebinar] = useState<Webinar | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    status: 'Upcoming' as Webinar['status'],
    registrationLink: '',
    posterUrl: '',
  });

  const hasAccess = isSuperAdmin || isAdmin || isEditor;

  useEffect(() => {
    if (!hasAccess) return;
    fetchWebinars();
  }, [hasAccess]);

  const fetchWebinars = async () => {
    try {
      const mockWebinars: Webinar[] = [
        { id: '1', title: 'Mastering Next.js 14', date: '2026-05-15', time: '14:00', status: 'Upcoming', registrationLink: 'https://zoom.us/j/1234' },
        { id: '2', title: 'Advanced React Patterns', date: '2026-05-01', time: '10:00', status: 'Completed', registrationLink: 'https://zoom.us/j/5678' },
      ];
      setWebinars(mockWebinars);
    } catch (error) {
      toast.error('Failed to fetch webinars');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this webinar?')) return;
    setWebinars(webinars.filter(w => w.id !== id));
    toast.success('Webinar deleted successfully');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingWebinar) {
      setWebinars(webinars.map(w => w.id === editingWebinar.id ? { ...w, ...formData } : w));
      toast.success('Webinar updated');
    } else {
      const newWebinar = { id: Math.random().toString(), ...formData };
      setWebinars([...webinars, newWebinar]);
      toast.success('Webinar created');
    }
    setIsModalOpen(false);
  };

  const openModal = (webinar?: Webinar) => {
    if (webinar) {
      setEditingWebinar(webinar);
      setFormData({
        title: webinar.title,
        date: webinar.date,
        time: webinar.time,
        status: webinar.status,
        registrationLink: webinar.registrationLink,
        posterUrl: webinar.posterUrl || '',
      });
    } else {
      setEditingWebinar(null);
      setFormData({
        title: '',
        date: '',
        time: '',
        status: 'Upcoming',
        registrationLink: '',
        posterUrl: '',
      });
    }
    setIsModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Upcoming': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Live': return 'bg-green-500/10 text-green-400 border-green-500/20 animate-pulse';
      case 'Completed': return 'bg-white/5 text-gray-400 border-white/10';
      default: return 'bg-white/5 text-gray-400 border-white/10';
    }
  };

  if (!hasAccess) return <div className="p-8 text-red-600">Access Denied</div>;

  return (
    <div className="bg-[#141414] border border-white/10 shadow-2xl min-h-[80vh]">
      <div className="p-6 border-b border-white/10 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white tracking-tight">Webinar Management</h1>
        <Button onClick={() => openModal()} className="bg-white text-black hover:bg-gray-200 rounded-none border border-white transition-all duration-300">
          Add Webinar
        </Button>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webinars.map(webinar => (
              <div key={webinar.id} className="bg-white/5 border border-white/10 overflow-hidden hover:border-white/30 transition-all duration-300">
                <div className="h-40 bg-black/40 relative border-b border-white/10">
                  {webinar.posterUrl ? (
                    <img src={webinar.posterUrl} alt={webinar.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm tracking-wider uppercase">No Poster</div>
                  )}
                  <div className={`absolute top-3 right-3 px-3 py-1 font-medium tracking-wide text-xs uppercase border ${getStatusColor(webinar.status)}`}>
                    {webinar.status}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-2 truncate">{webinar.title}</h3>
                  <div className="text-sm text-gray-400 mb-4 space-y-1">
                    <p><span className="text-gray-500 uppercase tracking-wider text-xs mr-2">Date:</span> {webinar.date}</p>
                    <p><span className="text-gray-500 uppercase tracking-wider text-xs mr-2">Time:</span> {webinar.time}</p>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
                    <a href={webinar.registrationLink} target="_blank" rel="noreferrer" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                      Join Link
                    </a>
                    <div className="space-x-4">
                      <button onClick={() => openModal(webinar)} className="text-sm text-gray-400 hover:text-white transition-colors font-medium tracking-wide">Edit</button>
                      <button onClick={() => handleDelete(webinar.id)} className="text-sm text-red-400 hover:text-red-300 transition-colors font-medium tracking-wide">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#141414] border border-white/10 p-8 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
            <h2 className="text-xl font-bold mb-6 text-white tracking-tight">{editingWebinar ? 'Edit Webinar' : 'Add Webinar'}</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-gray-400 mb-2">Webinar Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white transition-all rounded-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-gray-400 mb-2">Date</label>
                  <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white transition-all rounded-none [color-scheme:dark]" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-gray-400 mb-2">Time</label>
                  <input required type="time" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white transition-all rounded-none [color-scheme:dark]" />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-gray-400 mb-2">Status</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as Webinar['status']})} className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white transition-all rounded-none appearance-none">
                  <option value="Upcoming" className="bg-[#141414]">Upcoming</option>
                  <option value="Live" className="bg-[#141414]">Live</option>
                  <option value="Completed" className="bg-[#141414]">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-gray-400 mb-2">Registration/Join Link</label>
                <input required type="url" value={formData.registrationLink} onChange={e => setFormData({...formData, registrationLink: e.target.value})} className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white transition-all rounded-none" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-gray-400 mb-2">Poster URL</label>
                <input type="url" value={formData.posterUrl} onChange={e => setFormData({...formData, posterUrl: e.target.value})} placeholder="https://..." className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white transition-all rounded-none" />
              </div>
              
              <div className="flex justify-end space-x-4 mt-8 pt-4 border-t border-white/10">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="bg-transparent text-white border-white/20 hover:bg-white/10 rounded-none">Cancel</Button>
                <Button type="submit" className="bg-white text-black hover:bg-gray-200 rounded-none border border-white transition-all">Save Webinar</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
