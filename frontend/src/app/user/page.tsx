'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';

interface Order {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
  trackingId?: string;
  shippingNotes?: string;
}

export default function UserDashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const fetchMyOrders = async () => {
    try {
      const response = await api.get('/orders/my-orders');
      setOrders(response.data.data.orders || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'text-yellow-400';
      case 'PAID': return 'text-blue-400';
      case 'PROCESSING': return 'text-blue-400';
      case 'SHIPPED': return 'text-indigo-400';
      case 'DELIVERED': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#141414] p-6 border border-white/10 rounded-xl shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-4">My Orders</h3>
          <p className="text-3xl font-bold text-white">{orders.length}</p>
        </div>
        <div className="bg-[#141414] p-6 border border-white/10 rounded-xl shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-4">Total Spent</h3>
          <p className="text-3xl font-bold text-white">₹{orders.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-[#141414] border border-white/10 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Recent Orders</h2>
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading your orders...</div>
        ) : orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="border border-white/5 bg-white/[0.02] p-6 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-mono text-gray-500">#{order.id.slice(-6)}</span>
                    <span className={`text-xs font-bold uppercase tracking-widest ${getStatusColor(order.status)}`}>{order.status}</span>
                  </div>
                  <div className="text-white font-medium">₹{order.amount.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</div>
                </div>
                
                <div className="flex flex-col items-end">
                  {order.trackingId && (
                    <div className="mb-2 text-right">
                      <p className="text-[10px] text-gray-500 uppercase tracking-tighter">Tracking ID</p>
                      <p className="text-sm font-mono text-white">{order.trackingId}</p>
                    </div>
                  )}
                  {order.shippingNotes && (
                    <p className="text-xs text-gray-400 italic max-w-xs text-right">"{order.shippingNotes}"</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-center py-12 border-2 border-dashed border-white/5 rounded-lg">
            You haven't placed any orders yet.
          </div>
        )}
      </div>
    </div>
  );
}

