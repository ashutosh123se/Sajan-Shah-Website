'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';
import api from '@/lib/api';

interface Order {
  id: string;
  userEmail: string;
  user: {
    name: string;
    email: string;
  };
  amount: number;
  status: 'PENDING' | 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'FAILED' | 'REFUNDED';
  createdAt: string;
  trackingId?: string;
  shippingNotes?: string;
  shippingAddress?: string;
  phone?: string;
}

export default function AdminOrdersPage() {
  const { isSuperAdmin, isAdmin, isEditor, isShopManager } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusUpdate, setStatusUpdate] = useState<Order['status']>('PENDING');
  const [trackingId, setTrackingId] = useState('');
  const [shippingNotes, setShippingNotes] = useState('');

  const hasAccess = isSuperAdmin || isAdmin || isEditor || isShopManager;

  useEffect(() => {
    if (!hasAccess) return;
    fetchOrders();
  }, [hasAccess]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get('/orders');
      setOrders(response.data.data.orders || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrder = async () => {
    if (!selectedOrder) return;
    try {
      await api.patch(`/orders/${selectedOrder.id}/status`, {
        status: statusUpdate,
        trackingId,
        shippingNotes
      });
      
      toast.success('Order updated successfully');
      setSelectedOrder(null);
      fetchOrders();
    } catch (error) {
      console.error('Failed to update order:', error);
      toast.error('Failed to update order');
    }
  };

  const openUpdateModal = (order: Order) => {
    setSelectedOrder(order);
    setStatusUpdate(order.status);
    setTrackingId(order.trackingId || '');
    setShippingNotes(order.shippingNotes || '');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'PAID': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'PROCESSING': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'SHIPPED': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'DELIVERED': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'CANCELLED': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'FAILED': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-white/5 text-gray-400 border-white/10';
    }
  };

  if (!hasAccess) return <div className="p-8 text-red-600">Access Denied</div>;

  return (
    <div className="bg-[#141414] border border-white/10 shadow-2xl min-h-[80vh]">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-2xl font-bold text-white tracking-tight">Order & Tracking Management</h1>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : (
          <div className="overflow-x-auto border border-white/10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="px-6 py-4 font-semibold text-xs tracking-wider uppercase text-gray-400">Order ID</th>
                  <th className="px-6 py-4 font-semibold text-xs tracking-wider uppercase text-gray-400">Customer</th>
                  <th className="px-6 py-4 font-semibold text-xs tracking-wider uppercase text-gray-400">Date</th>
                  <th className="px-6 py-4 font-semibold text-xs tracking-wider uppercase text-gray-400">Total</th>
                  <th className="px-6 py-4 font-semibold text-xs tracking-wider uppercase text-gray-400">Status</th>
                  <th className="px-6 py-4 font-semibold text-xs tracking-wider uppercase text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-transparent">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors duration-200">
                    <td className="px-6 py-4 font-medium text-white tracking-wider">#{order.id.slice(-6)}</td>
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">{order.user?.name || 'Guest'}</div>
                      <div className="text-sm text-gray-400">{order.user?.email || order.userEmail}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-light text-lg text-white">₹{order.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 font-medium tracking-wide border text-xs uppercase ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => openUpdateModal(order)} className="text-gray-400 hover:text-white transition-colors text-sm font-medium tracking-wide">
                        Update Status
                      </button>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#141414] border border-white/10 p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-6 text-white tracking-tight">Update Order #{selectedOrder.id.slice(-6)}</h2>
            
            <div className="space-y-5">
              {selectedOrder.shippingAddress && (
                <div className="bg-white/5 p-4 border border-white/10 text-sm">
                  <p className="text-gray-500 uppercase text-[10px] tracking-widest mb-2">Shipping Details</p>
                  <p className="text-white mb-1">{selectedOrder.shippingAddress}</p>
                  <p className="text-blue-400 font-mono">{selectedOrder.phone}</p>
                </div>
              )}

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-gray-400 mb-2">Order Status</label>
                <select 
                  value={statusUpdate} 
                  onChange={(e) => setStatusUpdate(e.target.value as Order['status'])}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white transition-all rounded-none appearance-none"
                >
                  <option value="PENDING" className="bg-[#141414]">Pending</option>
                  <option value="PAID" className="bg-[#141414]">Paid</option>
                  <option value="PROCESSING" className="bg-[#141414]">Processing</option>
                  <option value="SHIPPED" className="bg-[#141414]">Shipped</option>
                  <option value="DELIVERED" className="bg-[#141414]">Delivered</option>
                  <option value="CANCELLED" className="bg-[#141414]">Cancelled</option>
                  <option value="FAILED" className="bg-[#141414]">Failed</option>
                  <option value="REFUNDED" className="bg-[#141414]">Refunded</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-gray-400 mb-2">Tracking ID</label>
                <input 
                  type="text" 
                  value={trackingId} 
                  onChange={(e) => setTrackingId(e.target.value)} 
                  placeholder="e.g. BLUDART12345"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white transition-all rounded-none" 
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-gray-400 mb-2">Shipment Update / Notes</label>
                <textarea 
                  value={shippingNotes} 
                  onChange={(e) => setShippingNotes(e.target.value)} 
                  placeholder="e.g. Package is out for delivery"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white transition-all rounded-none"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8 pt-4 border-t border-white/10">
              <Button type="button" variant="outline" onClick={() => setSelectedOrder(null)} className="bg-transparent text-white border-white/20 hover:bg-white/10 rounded-none">Cancel</Button>
              <Button type="button" onClick={handleUpdateOrder} className="bg-white text-black hover:bg-gray-200 rounded-none border border-white transition-all">Save Updates</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
