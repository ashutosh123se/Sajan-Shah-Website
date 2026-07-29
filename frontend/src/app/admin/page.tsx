'use client';

import React, { useState, useEffect } from 'react';
import api from '@/lib/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalEvents: 0,
    totalLeads: 0
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/stats');
      setStats(response.data.data.stats);
      setRecentActivity(response.data.data.recentActivity);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <img src="/loding.png" alt="Loading" className="animate-spin object-contain h-12 w-12" />
      </div>
    );
  }

  return (
    <div className="bg-[#141414] rounded-none border border-white/10 shadow-2xl p-8">
      <h1 className="text-3xl font-bold text-white tracking-tight mb-8">
        Analytics Dashboard
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-white/5 p-6 border border-white/10 hover:border-white/30 transition-all duration-300">
          <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-2">Total Users</h3>
          <p className="text-4xl font-light text-white">{stats.totalUsers.toLocaleString()}</p>
        </div>

        <div className="bg-white/5 p-6 border border-white/10 hover:border-white/30 transition-all duration-300">
          <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-2">Total Orders</h3>
          <p className="text-4xl font-light text-white">{stats.totalOrders.toLocaleString()}</p>
        </div>

        <div className="bg-white/5 p-6 border border-white/10 hover:border-white/30 transition-all duration-300">
          <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-2">Revenue</h3>
          <p className="text-4xl font-light text-white">₹{stats.totalRevenue.toLocaleString()}</p>
        </div>

        <div className="bg-white/5 p-6 border border-white/10 hover:border-white/30 transition-all duration-300">
          <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-2">Products</h3>
          <p className="text-4xl font-light text-white">{stats.totalProducts}</p>
        </div>

        <div className="bg-white/5 p-6 border border-white/10 hover:border-white/30 transition-all duration-300">
          <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-2">Events</h3>
          <p className="text-4xl font-light text-white">{stats.totalEvents}</p>
        </div>

        <div className="bg-white/5 p-6 border border-white/10 hover:border-white/30 transition-all duration-300">
          <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-2">Total Leads</h3>
          <p className="text-4xl font-light text-[#f26522]">{stats.totalLeads.toLocaleString()}</p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">
          Recent Activity
        </h2>
        <div className="bg-white/5 p-6 border border-white/10">
          <div className="space-y-4 divide-y divide-white/5">
            {recentActivity.length > 0 ? recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-6 text-sm py-3 first:pt-0 last:pb-0">
                <span className="w-24 text-gray-500 font-medium tracking-wider">{activity.time}</span>
                <span className="text-gray-300">{activity.action}</span>
              </div>
            )) : (
              <p className="text-gray-500 py-4">No recent activity found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
