'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import api from '@/lib/api';
import toast from 'react-hot-toast';

interface Contributor {
  id: string;
  name: string;
  photoUrl: string;
  role: string;
  description: string;
  order: number;
}

export default function AdminContributorsPage() {
  const { isSuperAdmin, isAdmin } = useAuth();
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Contributor>>({
    name: '',
    photoUrl: '',
    role: '',
    description: '',
    order: 0
  });

  useEffect(() => {
    if (isSuperAdmin || isAdmin) {
      fetchContributors();
    }
  }, [isSuperAdmin, isAdmin]);

  const fetchContributors = async () => {
    try {
      setLoading(true);
      const response = await api.get('/contributors');
      setContributors(response.data.data.contributors || []);
    } catch (error) {
      console.error('Failed to fetch contributors:', error);
      toast.error('Failed to load contributors');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (contributor: Contributor) => {
    setFormData(contributor);
    setIsEditing(true);
  };

  const handleCreate = () => {
    setFormData({
      name: '',
      photoUrl: '',
      role: '',
      description: '',
      order: contributors.length
    });
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await api.put(`/contributors/${formData.id}`, formData);
        toast.success('Contributor updated successfully');
      } else {
        await api.post('/contributors', formData);
        toast.success('Contributor created successfully');
      }
      setIsEditing(false);
      fetchContributors();
    } catch (error) {
      console.error('Failed to save contributor:', error);
      toast.error('Failed to save contributor');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this contributor?')) return;
    try {
      await api.delete(`/contributors/${id}`);
      toast.success('Contributor deleted successfully');
      fetchContributors();
    } catch (error) {
      console.error('Failed to delete contributor:', error);
      toast.error('Failed to delete contributor');
    }
  };

  if (!isSuperAdmin && !isAdmin) {
    return <div className="p-8 text-center text-red-600 font-bold">Access Denied</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white tracking-tight">Manage Contributors</h1>
        <Button onClick={handleCreate} className="bg-white text-black hover:bg-gray-200 rounded-none">
          Add New Contributor
        </Button>
      </div>

      {isEditing ? (
        <div className="bg-[#141414] border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-6">{formData.id ? 'Edit Contributor' : 'New Contributor'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase text-gray-400 mb-1">Name</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 text-white px-4 py-2" />
              </div>
              <div>
                <label className="block text-xs uppercase text-gray-400 mb-1">Role</label>
                <input required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-white/5 border border-white/10 text-white px-4 py-2" />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase text-gray-400 mb-1">Photo URL</label>
              <input required value={formData.photoUrl} onChange={e => setFormData({...formData, photoUrl: e.target.value})} className="w-full bg-white/5 border border-white/10 text-white px-4 py-2" />
            </div>
            <div>
              <label className="block text-xs uppercase text-gray-400 mb-1">Description</label>
              <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-white/5 border border-white/10 text-white px-4 py-2 h-32" />
            </div>
            <div>
              <label className="block text-xs uppercase text-gray-400 mb-1">Display Order</label>
              <input type="number" required value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} className="w-full bg-white/5 border border-white/10 text-white px-4 py-2" />
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <Button type="button" onClick={() => setIsEditing(false)} variant="outline" className="border-white/10 text-white hover:bg-white/5">Cancel</Button>
              <Button type="submit" className="bg-white text-black hover:bg-gray-200">Save Contributor</Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full py-12 text-center text-gray-500">Loading contributors...</div>
          ) : contributors.length > 0 ? (
            contributors.sort((a,b) => a.order - b.order).map(contributor => (
              <div key={contributor.id} className="bg-[#141414] border border-white/10 p-4 flex gap-4 items-start">
                <img src={contributor.photoUrl} alt={contributor.name} className="w-20 h-20 object-cover border border-white/10" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white truncate">{contributor.name}</h3>
                  <p className="text-xs text-blue-400 mb-2">{contributor.role}</p>
                  <p className="text-xs text-gray-400 line-clamp-2 mb-4">{contributor.description}</p>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(contributor)} className="text-xs text-white hover:underline">Edit</button>
                    <button onClick={() => handleDelete(contributor.id)} className="text-xs text-red-400 hover:underline">Delete</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-white/5 border border-white/10 text-gray-500">No contributors found.</div>
          )}
        </div>
      )}
    </div>
  );
}
