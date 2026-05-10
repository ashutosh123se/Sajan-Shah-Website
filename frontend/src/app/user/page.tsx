'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function UserDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white tracking-tight">
          Welcome back, <span className="text-gray-500">{user?.name}</span>
        </h1>
        <p className="text-gray-400 mt-2 text-lg">
          Here's what's happening with your account.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#141414] p-6 border border-white/10 rounded-xl shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-4">Total Orders</h3>
          <p className="text-3xl font-bold text-white">0</p>
        </div>
        <div className="bg-[#141414] p-6 border border-white/10 rounded-xl shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-4">Enrolled Events</h3>
          <p className="text-3xl font-bold text-white">0</p>
        </div>
        <div className="bg-[#141414] p-6 border border-white/10 rounded-xl shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-4">Points Earned</h3>
          <p className="text-3xl font-bold text-white">0</p>
        </div>
      </div>

      <div className="bg-[#141414] border border-white/10 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
        <div className="text-gray-500 text-center py-12 border-2 border-dashed border-white/5 rounded-lg">
          No recent activity to show.
        </div>
      </div>
    </div>
  );
}
