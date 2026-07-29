'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { ImageUploadField } from '@/components/admin/ImageUploadField';

interface Testimonial {
  id: string;
  name: string;
  designation: string;
  organization?: string | null;
  quote: string;
  photoUrl?: string | null;
  videoUrl?: string | null;
  isActive: boolean;
  order: number;
}

export default function AdminTestimonialsPage() {
  const { isSuperAdmin, isAdmin, isEditor } = useAuth();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: '',
    designation: '',
    organization: '',
    quote: '',
    photoUrl: '',
    isActive: true,
    order: 0,
  });

  useEffect(() => {
    if (isSuperAdmin || isAdmin || isEditor) {
      fetchTestimonials();
    }
  }, [isSuperAdmin, isAdmin, isEditor]);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await api.get('/testimonials/admin/all');
      setTestimonials(response.data.data.testimonials || []);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setFormData(testimonial);
    setIsEditing(true);
  };

  const handleCreate = () => {
    setFormData({
      name: '',
      designation: '',
      organization: '',
      quote: '',
      photoUrl: '',
      isActive: true,
      order: testimonials.length + 1,
    });
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await api.put(`/testimonials/${formData.id}`, formData);
        toast.success('Testimonial updated successfully');
      } else {
        await api.post('/testimonials', formData);
        toast.success('Testimonial created successfully');
      }
      setIsEditing(false);
      fetchTestimonials();
    } catch (error) {
      console.error('Failed to save testimonial:', error);
      toast.error('Failed to save testimonial');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      await api.delete(`/testimonials/${id}`);
      toast.success('Testimonial deleted');
      fetchTestimonials();
    } catch (error) {
      toast.error('Failed to delete testimonial');
    }
  };

  if (!isSuperAdmin && !isAdmin && !isEditor) {
    return (
      <div className="p-8 text-center text-red-600">
        <h1 className="text-2xl font-bold">Access Denied</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Testimonials</h1>
          <p className="text-zinc-400 text-sm mt-1">Manage home page testimonials shown in the carousel.</p>
        </div>
        <Button onClick={handleCreate} className="bg-[#f26522] hover:bg-[#d9551a] text-white">
          Add Testimonial
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-zinc-400">Loading testimonials...</div>
      ) : (
        <div className="space-y-4">
          {testimonials.map((item) => (
            <div key={item.id} className="bg-[#141414] border border-white/10 p-6 flex flex-col md:flex-row md:items-center gap-4 justify-between">
              <div className="flex gap-4 items-start">
                {item.photoUrl && (
                  <img src={item.photoUrl} alt={item.name} className="w-16 h-16 rounded-full object-cover border border-[#f26522]/40" />
                )}
                <div>
                  <h3 className="text-white font-semibold">{item.name}</h3>
                  <p className="text-zinc-400 text-sm">{item.designation}</p>
                  <p className="text-zinc-500 text-sm mt-2 line-clamp-2 italic">&ldquo;{item.quote}&rdquo;</p>
                  <span className={`inline-block mt-2 text-xs px-2 py-1 rounded ${item.isActive ? 'bg-green-900/40 text-green-400' : 'bg-zinc-800 text-zinc-400'}`}>
                    {item.isActive ? 'Active' : 'Hidden'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleEdit(item)}>Edit</Button>
                <Button variant="outline" onClick={() => handleDelete(item.id)} className="text-red-400 border-red-400/30">Delete</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isEditing && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <form onSubmit={handleSubmit} className="bg-[#141414] border border-white/10 p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-6">{formData.id ? 'Edit' : 'Add'} Testimonial</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Name" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-lg" required />
              <input type="text" placeholder="Designation / Title" value={formData.designation || ''} onChange={(e) => setFormData({ ...formData, designation: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-lg" required />
              <ImageUploadField
                label="Photo"
                value={formData.photoUrl || ''}
                folder="testimonials"
                previewClassName="h-16 w-16 rounded-full"
                onChange={(photoUrl) => setFormData({ ...formData, photoUrl })}
              />
              <textarea placeholder="Quote" value={formData.quote || ''} onChange={(e) => setFormData({ ...formData, quote: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-lg min-h-[120px]" required />
              <div className="flex gap-4 items-center">
                <input type="number" placeholder="Order" value={formData.order ?? 0} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })} className="w-24 bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-lg" />
                <label className="flex items-center gap-2 text-zinc-300 text-sm">
                  <input type="checkbox" checked={formData.isActive ?? true} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} />
                  Active on website
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button type="submit" className="bg-[#f26522] text-white">Save</Button>
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
