'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import api from '@/lib/api';
import toast from 'react-hot-toast';

interface Member {
  id: string;
  name: string;
  email: string | null;
  photoUrl: string;
  bio: string;
  tier: string;
  joinedAt: string;
}

export default function AdminMembersPage() {
  const { isSuperAdmin, isAdmin, isEditor } = useAuth();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Member>>({
    name: '',
    email: '',
    photoUrl: '',
    bio: '',
    tier: 'Community'
  });

  useEffect(() => {
    if (isSuperAdmin || isAdmin || isEditor) {
      fetchMembers();
    }
  }, [isSuperAdmin, isAdmin, isEditor]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/members');
      setMembers(response.data.data.members || []);
    } catch (error) {
      console.error('Failed to fetch members:', error);
      toast.error('Failed to load members');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member: Member) => {
    setFormData(member);
    setIsEditing(true);
  };

  const handleCreate = () => {
    setFormData({
      name: '',
      email: '',
      photoUrl: '',
      bio: '',
      tier: 'Community'
    });
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await api.put(`/members/${formData.id}`, formData);
        toast.success('Member updated successfully');
      } else {
        await api.post('/members', formData);
        toast.success('Member created successfully');
      }
      setIsEditing(false);
      fetchMembers();
    } catch (error) {
      console.error('Failed to save member:', error);
      toast.error('Failed to save member');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;
    try {
      await api.delete(`/members/${id}`);
      toast.success('Member deleted successfully');
      fetchMembers();
    } catch (error) {
      console.error('Failed to delete member:', error);
      toast.error('Failed to delete member');
    }
  };

  if (!isSuperAdmin && !isAdmin && !isEditor) {
    return <div className="p-8 text-center text-red-600 font-bold">Access Denied</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white tracking-tight">Manage Members</h1>
        <Button onClick={handleCreate} className="bg-white text-black hover:bg-gray-200 rounded-none">
          Add New Member
        </Button>
      </div>

      {isEditing ? (
        <div className="bg-[#141414] border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-6">{formData.id ? 'Edit Member' : 'New Member'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase text-gray-400 mb-1">Name</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 text-white px-4 py-2" />
              </div>
              <div>
                <label className="block text-xs uppercase text-gray-400 mb-1">Email (Optional)</label>
                <input value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 text-white px-4 py-2" />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase text-gray-400 mb-1">Photo URL</label>
              <input required value={formData.photoUrl} onChange={e => setFormData({...formData, photoUrl: e.target.value})} className="w-full bg-white/5 border border-white/10 text-white px-4 py-2" />
            </div>
            <div>
              <label className="block text-xs uppercase text-gray-400 mb-1">Bio</label>
              <textarea required value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full bg-white/5 border border-white/10 text-white px-4 py-2 h-32" />
            </div>
            <div>
              <label className="block text-xs uppercase text-gray-400 mb-1">Tier</label>
              <select value={formData.tier} onChange={e => setFormData({...formData, tier: e.target.value})} className="w-full bg-white/5 border border-white/10 text-white px-4 py-2">
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Community">Community</option>
              </select>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <Button type="button" onClick={() => setIsEditing(false)} variant="outline" className="border-white/10 text-white hover:bg-white/5">Cancel</Button>
              <Button type="submit" className="bg-white text-black hover:bg-gray-200">Save Member</Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full py-12 text-center text-gray-500">Loading members...</div>
          ) : members.length > 0 ? (
            members.map(member => (
              <div key={member.id} className="bg-[#141414] border border-white/10 p-4 flex gap-4 items-start">
                <img src={member.photoUrl} alt={member.name} className="w-20 h-20 object-cover border border-white/10" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white truncate">{member.name}</h3>
                  <p className="text-xs text-blue-400 mb-2">{member.tier}</p>
                  <p className="text-xs text-gray-400 line-clamp-2 mb-4">{member.bio}</p>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(member)} className="text-xs text-white hover:underline">Edit</button>
                    <button onClick={() => handleDelete(member.id)} className="text-xs text-red-400 hover:underline">Delete</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-white/5 border border-white/10 text-gray-500">No members found.</div>
          )}
        </div>
      )}
    </div>
  );
}
