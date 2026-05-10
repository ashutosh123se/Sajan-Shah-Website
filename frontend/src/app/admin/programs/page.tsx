'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';
import api from '@/lib/api';

interface Program {
  id: string;
  title: string;
  slug: string;
  description: string;
  pitch: string;
  price: number;
  currency: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  curriculum: string;
  targetAudience: string[];
  isActive: boolean;
  isFeatured: boolean;
}

export default function AdminProgramsPage() {
  const { isSuperAdmin, isAdmin, isEditor } = useAuth();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    pitch: '',
    description: '',
    price: '',
    currency: 'INR',
    thumbnailUrl: '',
    targetAudience: 'students',
    isActive: true,
    isFeatured: false,
  });

  const hasAccess = isSuperAdmin || isAdmin || isEditor;

  useEffect(() => {
    if (!hasAccess) return;
    fetchPrograms();
  }, [hasAccess]);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const response = await api.get('/programs');
      setPrograms(response.data.data.programs || []);
    } catch (error) {
      toast.error('Failed to fetch programs');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this program?')) return;
    try {
      await api.delete(`/programs/${id}`);
      toast.success('Program deleted successfully');
      fetchPrograms();
    } catch (error) {
      toast.error('Failed to delete program');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        targetAudience: formData.targetAudience.split(',').map(s => s.trim()),
        curriculum: '[]' // Simplified for this example
      };

      if (editingProgram) {
        await api.put(`/programs/${editingProgram.id}`, payload);
        toast.success('Program updated');
      } else {
        await api.post('/programs', payload);
        toast.success('Program created');
      }
      setIsModalOpen(false);
      fetchPrograms();
    } catch (error) {
      toast.error('Failed to save program');
      console.error(error);
    }
  };

  const openModal = (program?: Program) => {
    if (program) {
      setEditingProgram(program);
      setFormData({
        title: program.title,
        slug: program.slug,
        pitch: program.pitch || '',
        description: program.description || '',
        price: program.price.toString(),
        currency: program.currency || 'INR',
        thumbnailUrl: program.thumbnailUrl || '',
        targetAudience: (program.targetAudience || []).join(', '),
        isActive: program.isActive,
        isFeatured: program.isFeatured,
      });
    } else {
      setEditingProgram(null);
      setFormData({
        title: '',
        slug: '',
        pitch: '',
        description: '',
        price: '',
        currency: 'INR',
        thumbnailUrl: '',
        targetAudience: 'students',
        isActive: true,
        isFeatured: false,
      });
    }
    setIsModalOpen(true);
  };

  if (!hasAccess) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Program Management</h1>
          <p className="text-gray-400 text-sm mt-1">Manage all public programs and webclasses.</p>
        </div>
        <Button onClick={() => openModal()} className="bg-white text-black hover:bg-gray-200 rounded-none font-medium">
          Create Program
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-gray-400">Loading programs...</div>
        ) : programs.length > 0 ? (
          programs.map((program) => (
            <div key={program.id} className="bg-[#1a1a1a] border border-white/10 rounded-none overflow-hidden hover:border-white/20 transition-all flex flex-col">
              {program.thumbnailUrl ? (
                <div className="h-40 bg-[#222] overflow-hidden">
                  <img src={program.thumbnailUrl} alt={program.title} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                </div>
              ) : (
                <div className="h-40 bg-[#222] flex items-center justify-center border-b border-white/5">
                  <span className="text-gray-600 font-medium">No Image</span>
                </div>
              )}
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-white line-clamp-2 leading-tight">{program.title}</h3>
                  {program.isFeatured && (
                    <span className="bg-brand-orange/20 text-brand-orange text-[10px] px-2 py-1 uppercase tracking-wider font-bold ml-2 shrink-0">Featured</span>
                  )}
                </div>
                
                <p className="text-sm text-gray-400 mb-6 line-clamp-2 flex-grow">{program.pitch}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-white/5">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Pricing</p>
                    <p className="font-medium text-white">₹{program.price}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Status</p>
                    <p className={`font-medium ${program.isActive ? 'text-green-400' : 'text-red-400'}`}>
                      {program.isActive ? 'Active' : 'Draft'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-white/5 mt-auto">
                  <Button variant="outline" className="flex-1 rounded-none border-white/10 hover:bg-white/5" onClick={() => openModal(program)}>
                    Edit
                  </Button>
                  <Button variant="outline" className="flex-1 rounded-none border-white/10 text-red-400 hover:text-red-300 hover:bg-red-950/30" onClick={() => handleDelete(program.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 flex flex-col items-center justify-center bg-[#1a1a1a] border border-white/10">
            <svg className="w-12 h-12 text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4 20.777 5.168 21 6.751 21h8.5C16.832 21 17.5 21s2.168-.223 2.5-1.247V6.253C19 5.477 17.832 5 16.25 5s-2.168.477-2.5 1.253z" />
            </svg>
            <p className="text-gray-400 font-medium text-lg">No programs found</p>
            <p className="text-gray-500 text-sm mt-1 mb-6">Create your first program to display it on the website.</p>
            <Button onClick={() => openModal()} className="bg-white text-black hover:bg-gray-200 rounded-none">
              Create Program
            </Button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#141414] border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#141414] p-6 border-b border-white/10 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-white tracking-tight">
                {editingProgram ? 'Edit Program' : 'Create New Program'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Program Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')})}
                    className="w-full bg-[#222] border border-white/10 text-white px-4 py-3 focus:border-brand-orange focus:outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">URL Slug</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    className="w-full bg-[#222] border border-white/10 text-gray-400 px-4 py-3 focus:border-brand-orange focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Price (INR)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full bg-[#222] border border-white/10 text-white px-4 py-3 focus:border-brand-orange focus:outline-none transition-colors"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Short Pitch (Summary)</label>
                  <input
                    type="text"
                    required
                    value={formData.pitch}
                    onChange={(e) => setFormData({...formData, pitch: e.target.value})}
                    className="w-full bg-[#222] border border-white/10 text-white px-4 py-3 focus:border-brand-orange focus:outline-none transition-colors"
                    placeholder="e.g. Transform your learning journey..."
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Target Audience (comma separated)</label>
                  <input
                    type="text"
                    required
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                    className="w-full bg-[#222] border border-white/10 text-white px-4 py-3 focus:border-brand-orange focus:outline-none transition-colors"
                    placeholder="students, corporate, parents"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Thumbnail URL</label>
                  <input
                    type="url"
                    value={formData.thumbnailUrl}
                    onChange={(e) => setFormData({...formData, thumbnailUrl: e.target.value})}
                    className="w-full bg-[#222] border border-white/10 text-white px-4 py-3 focus:border-brand-orange focus:outline-none transition-colors"
                    placeholder="https://..."
                  />
                </div>

                <div className="col-span-2 flex gap-6 mt-2">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                      className="w-5 h-5 bg-[#222] border-white/20 rounded-none text-brand-orange focus:ring-brand-orange focus:ring-offset-[#141414]"
                    />
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">Active (Public)</span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                      className="w-5 h-5 bg-[#222] border-white/20 rounded-none text-brand-orange focus:ring-brand-orange focus:ring-offset-[#141414]"
                    />
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">Featured on Homepage</span>
                  </label>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10 flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="rounded-none border-white/10 hover:bg-white/5">
                  Cancel
                </Button>
                <Button type="submit" className="rounded-none bg-white text-black hover:bg-gray-200 font-bold tracking-wide">
                  {editingProgram ? 'Save Changes' : 'Create Program'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
