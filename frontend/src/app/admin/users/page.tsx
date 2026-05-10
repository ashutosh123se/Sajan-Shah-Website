'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';
import api from '@/lib/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  photoUrl?: string;
  phone?: string;
  createdAt: string;
  isActive: boolean;
}

export default function AdminUsersPage() {
  const { isSuperAdmin } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Create User Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'CUSTOMER',
  });

  useEffect(() => {
    if (!isSuperAdmin) return;
    fetchUsers();
  }, [isSuperAdmin]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users');
      setUsers(response.data.data.users || []);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleUpdate = async (userId: string, newRole: string) => {
    try {
      await api.patch(`/users/${userId}/role`, { role: newRole });
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      toast.success('User role updated');
    } catch (error: any) {
      toast.error('Failed to update user role');
    }
  };

  const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
    try {
      await api.patch(`/users/${userId}/status`, { isActive: !currentStatus });
      setUsers(users.map(u => u.id === userId ? { ...u, isActive: !currentStatus } : u));
      toast.success(currentStatus ? 'User deactivated' : 'User activated');
    } catch (error: any) {
      toast.error('Failed to update status');
    }
  };

  const handleResetPassword = async (userId: string) => {
    if (!confirm('Are you sure you want to reset password for this user?')) return;
    try {
      await api.post(`/users/${userId}/reset-password`);
      toast.success('Password reset link sent to user email');
    } catch (error: any) {
      toast.error('Failed to reset password');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.delete(`/users/${userId}`);
      setUsers(users.filter(u => u.id !== userId));
      toast.success('User deleted successfully');
    } catch (error: any) {
      toast.error('Failed to delete user');
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/users', formData);
      setUsers([...users, response.data.data.user]);
      toast.success('User created successfully');
      setIsModalOpen(false);
      setFormData({ name: '', email: '', password: '', role: 'CUSTOMER' });
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to create user');
    }
  };

  const generateCredentials = () => {
    const tempPassword = Math.random().toString(36).slice(-8) + 'A1!';
    setFormData({ ...formData, password: tempPassword });
    toast.success('Password generated');
  };

  if (!isSuperAdmin) {
    return (
      <div className="p-8 text-center text-red-600">
        <h1 className="text-2xl font-bold">Access Denied</h1>
      </div>
    );
  }

  const getRoleBadge = (role: string) => {
    const colors: any = {
      SUPER_ADMIN: 'bg-red-100 text-red-800',
      ADMIN: 'bg-purple-100 text-purple-800',
      EDITOR: 'bg-blue-100 text-blue-800',
      SHOP_MANAGER: 'bg-green-100 text-green-800',
      SUBSCRIBER: 'bg-gray-100 text-gray-800',
      CUSTOMER: 'bg-yellow-100 text-yellow-800',
    };
    return (
      <span className={`text-xs px-2 py-1 rounded-full ${colors[role] || 'bg-gray-100'}`}>
        {role.replace('_', ' ')}
      </span>
    );
  };

  return (
    <div className="bg-[#141414] border border-white/10 shadow-2xl min-h-[80vh]">
      <div className="p-6 border-b border-white/10 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white tracking-tight">User Management</h1>
        <Button onClick={() => setIsModalOpen(true)} className="bg-white text-black hover:bg-gray-200 rounded-none border border-white transition-all duration-300">
          Add New User
        </Button>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-all duration-300 rounded-none"
          />
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading users...</div>
        ) : (
          <div className="overflow-x-auto border border-white/10">
            <table className="min-w-full divide-y divide-white/10">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-transparent divide-y divide-white/10">
                {users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())).map((user) => (
                  <tr key={user.id} className="hover:bg-white/5 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-white">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleUpdate(user.id, e.target.value)}
                        className="text-xs bg-[#141414] border border-white/20 text-white rounded-none px-2 py-1 focus:outline-none focus:border-white transition-all"
                        disabled={user.id === '1'}
                      >
                        <option value="SUPER_ADMIN">Super Admin</option>
                        <option value="ADMIN">Admin</option>
                        <option value="EDITOR">Editor</option>
                        <option value="SHOP_MANAGER">Shop Manager</option>
                        <option value="SUBSCRIBER">Subscriber</option>
                        <option value="CUSTOMER">Customer</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(user.id, user.isActive)}
                        disabled={user.id === '1'}
                        className={`text-xs px-3 py-1 font-medium tracking-wide border ${
                          user.isActive ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                        } ${user.id !== '1' ? 'hover:opacity-80 cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                      >
                        {user.isActive ? 'ACTIVE' : 'INACTIVE'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium space-x-4">
                      <button
                        onClick={() => handleResetPassword(user.id)}
                        className="text-gray-400 hover:text-white transition-colors"
                        disabled={user.id === '1'}
                      >
                        Reset Password
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                        disabled={user.id === '1'}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#141414] border border-white/10 p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-6 text-white tracking-tight">Create New User</h2>
            <form onSubmit={handleCreateUser} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-gray-400 mb-2">Full Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white transition-all rounded-none" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-gray-400 mb-2">Email</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white transition-all rounded-none" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-gray-400 mb-2">Role</label>
                <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white transition-all rounded-none appearance-none">
                  <option value="SUPER_ADMIN" className="bg-[#141414]">Super Admin</option>
                  <option value="ADMIN" className="bg-[#141414]">Admin</option>
                  <option value="EDITOR" className="bg-[#141414]">Editor</option>
                  <option value="SHOP_MANAGER" className="bg-[#141414]">Shop Manager</option>
                  <option value="SUBSCRIBER" className="bg-[#141414]">Subscriber</option>
                  <option value="CUSTOMER" className="bg-[#141414]">Customer</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-gray-400 mb-2">Password Credentials</label>
                <div className="flex">
                  <input required type="text" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="flex-1 px-4 py-2 bg-white/5 border border-white/10 border-r-0 text-white focus:outline-none focus:border-white transition-all rounded-none" />
                  <button type="button" onClick={generateCredentials} className="bg-white/10 px-4 text-sm font-medium text-white hover:bg-white hover:text-black border border-white/10 transition-all">
                    Generate
                  </button>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 mt-8 pt-4 border-t border-white/10">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="bg-transparent text-white border-white/20 hover:bg-white/10 rounded-none">Cancel</Button>
                <Button type="submit" className="bg-white text-black hover:bg-gray-200 rounded-none border border-white transition-all">Create User</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
