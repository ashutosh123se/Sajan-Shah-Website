'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import api from '@/lib/api';
import toast from 'react-hot-toast';

interface Banner {
  id: string;
  title: string;
  imageUrl: string;
  linkUrl?: string;
  isActive: boolean;
}

export default function AdminBannerPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    imageUrl: '',
    linkUrl: '',
    isActive: false,
  });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await api.get('/banners');
      setBanners(response.data.data.banners || []);
    } catch (error) {
      console.error('Failed to fetch banners:', error);
      toast.error('Failed to load banners');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (banner: Banner) => {
    setFormData({
      id: banner.id,
      title: banner.title,
      imageUrl: banner.imageUrl,
      linkUrl: banner.linkUrl || '',
      isActive: banner.isActive,
    });
    setIsEditing(true);
  };

  const handleCreate = () => {
    setFormData({
      id: '',
      title: '',
      imageUrl: '',
      linkUrl: '',
      isActive: true,
    });
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await api.put(`/banners/${formData.id}`, formData);
        toast.success('Banner updated successfully');
      } else {
        await api.post('/banners', formData);
        toast.success('Banner created successfully');
      }
      setIsEditing(false);
      fetchBanners();
    } catch (error) {
      console.error('Failed to save banner:', error);
      toast.error('Failed to save banner');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this banner?')) return;
    try {
      await api.delete(`/banners/${id}`);
      toast.success('Banner deleted successfully');
      fetchBanners();
    } catch (error) {
      console.error('Failed to delete banner:', error);
      toast.error('Failed to delete banner');
    }
  };

  const toggleActive = async (banner: Banner) => {
    try {
      await api.put(`/banners/${banner.id}`, {
        ...banner,
        isActive: !banner.isActive,
      });
      toast.success(banner.isActive ? 'Banner deactivated' : 'Banner activated');
      fetchBanners();
    } catch (error) {
      console.error('Failed to toggle banner status:', error);
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Popup Banner</h1>
          <p className="text-gray-400 text-sm mt-1">Manage the promotional popup banner shown to visitors.</p>
        </div>
        <Button onClick={handleCreate} className="bg-white text-black hover:bg-gray-200 rounded-none font-medium">
          Create Banner
        </Button>
      </div>

      {isEditing ? (
        <div className="bg-[#1a1a1a] border border-white/10 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-white">{formData.id ? 'Edit Banner' : 'New Banner'}</h2>
            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-white">Cancel</button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Banner Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-[#222] border border-white/10 text-white px-4 py-2 focus:border-white focus:outline-none transition-colors"
                  placeholder="e.g. Master Your Memory Webclass"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={formData.imageUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                  className="w-full bg-[#222] border border-white/10 text-white px-4 py-2 focus:border-white focus:outline-none transition-colors"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Link URL (Optional)</label>
                <input
                  type="text"
                  value={formData.linkUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, linkUrl: e.target.value }))}
                  className="w-full bg-[#222] border border-white/10 text-white px-4 py-2 focus:border-white focus:outline-none transition-colors"
                  placeholder="/events or https://..."
                />
              </div>

              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                  className="w-4 h-4 rounded-none bg-[#222] border-white/10 text-white focus:ring-0 focus:ring-offset-0"
                />
                <label htmlFor="isActive" className="ml-2 text-sm text-gray-300">Set as Active (this will deactivate other banners)</label>
              </div>
            </div>

            {formData.imageUrl && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-300 mb-2">Preview</p>
                <div className="relative aspect-video max-w-md bg-[#222] border border-white/10 overflow-hidden">
                  <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              </div>
            )}

            <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)} className="border-white/10 text-white hover:bg-[#222] rounded-none">
                Cancel
              </Button>
              <Button type="submit" className="bg-white text-black hover:bg-gray-200 rounded-none">
                Save Banner
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full py-12 text-center text-gray-400">Loading banners...</div>
          ) : banners.length > 0 ? (
            banners.map((banner) => (
              <div key={banner.id} className="bg-[#1a1a1a] border border-white/10 overflow-hidden flex flex-col">
                <div className="relative aspect-video bg-[#222]">
                  <img src={banner.imageUrl} alt={banner.title} className="w-full h-full object-cover" />
                  {banner.isActive && (
                    <div className="absolute top-2 right-2 bg-green-500 text-black text-xs font-bold px-2 py-1 uppercase tracking-wide shadow-lg">
                      Active
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-white mb-1 truncate" title={banner.title}>{banner.title}</h3>
                  {banner.linkUrl && (
                    <p className="text-xs text-blue-400 mb-4 truncate">{banner.linkUrl}</p>
                  )}
                  <div className="mt-auto pt-4 flex gap-2 border-t border-white/10">
                    <button onClick={() => toggleActive(banner)} className={`flex-1 text-xs font-medium py-2 transition-colors ${banner.isActive ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'}`}>
                      {banner.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button onClick={() => handleEdit(banner)} className="flex-1 bg-white/5 hover:bg-white/10 text-white text-xs font-medium py-2 transition-colors">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(banner.id)} className="flex-1 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 text-xs font-medium py-2 transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-[#1a1a1a] border border-white/10 text-gray-400">
              No banners created yet. Create one to display a popup on your site.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
