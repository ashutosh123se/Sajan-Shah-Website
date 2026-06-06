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

export default function MyOrdersPage() {
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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-4xl font-black text-white tracking-tighter uppercase">My Order History</h1>
        <p className="text-gray-400 mt-2 text-lg">Track your purchases and view order status.</p>
      </div>

      <div className="bg-[#141414] border border-white/10 p-8 shadow-2xl">
        {loading ? (
          <div className="text-center py-24">
            <img src="/loding.png" alt="Loading" className="animate-spin object-contain h-12 w-12 mx-auto mb-4" />
            <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">Fetching orders...</p>
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="border border-white/5 bg-white/[0.02] p-8 hover:border-white/20 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-sm font-black font-mono text-gray-600">ORDER_#{order.id.slice(-8).toUpperCase()}</span>
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-2 py-0.5 border ${getStatusColor(order.status).replace('text-', 'border-').replace('400', '500/30')} ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="text-3xl font-black text-white mb-1">₹{order.amount.toLocaleString()}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Placed on {new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </div>
                
                <div className="flex flex-col items-end gap-4 min-w-[200px]">
                  {order.trackingId ? (
                    <div className="text-right p-4 bg-white/5 border border-white/10 w-full">
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-bold">Tracking ID</p>
                      <p className="text-lg font-mono text-white font-black">{order.trackingId}</p>
                      {order.shippingNotes && (
                        <p className="text-[11px] text-blue-400 mt-2 italic font-medium leading-relaxed">"{order.shippingNotes}"</p>
                      )}
                    </div>
                  ) : (
                    <div className="text-right">
                      <p className="text-xs text-gray-600 uppercase font-bold tracking-widest italic">Shipping updates will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-center py-24 border-2 border-dashed border-white/5">
            <div className="mb-6 opacity-20">
              <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <p className="text-xl font-bold text-white mb-2 uppercase tracking-tight">No orders yet</p>
            <p className="text-sm text-gray-400 mb-8 italic">Ready to transform your memory? Visit our store.</p>
            <button onClick={() => window.location.href = '/products'} className="bg-white text-black px-8 py-3 font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors">Start Shopping</button>
          </div>
        )}
      </div>
    </div>
  );
}
