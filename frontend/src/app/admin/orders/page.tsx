'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  trackingId?: string;
  shippingUpdate?: string;
}

export default function AdminOrdersPage() {
  const { isSuperAdmin, isAdmin, isShopManager } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusUpdate, setStatusUpdate] = useState<Order['status']>('Pending');
  const [trackingId, setTrackingId] = useState('');
  const [shippingUpdate, setShippingUpdate] = useState('');

  const hasAccess = isSuperAdmin || isAdmin || isShopManager;

  useEffect(() => {
    if (!hasAccess) return;
    fetchOrders();
  }, [hasAccess]);

  const fetchOrders = async () => {
    try {
      // Mocked data for UI demonstration
      const mockOrders: Order[] = [
        { id: 'ORD-001', customerName: 'John Doe', customerEmail: 'john@example.com', total: 450, status: 'Pending', date: '2026-05-09' },
        { id: 'ORD-002', customerName: 'Jane Smith', customerEmail: 'jane@example.com', total: 1200, status: 'Processing', date: '2026-05-08' },
        { id: 'ORD-003', customerName: 'Robert Johnson', customerEmail: 'rob@example.com', total: 850, status: 'Shipped', date: '2026-05-07', trackingId: 'TRK123456789' },
      ];
      setOrders(mockOrders);
    } catch (error) {
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrder = () => {
    if (!selectedOrder) return;
    try {
      setOrders(orders.map(o => o.id === selectedOrder.id ? { 
        ...o, 
        status: statusUpdate, 
        trackingId: trackingId || o.trackingId,
        shippingUpdate: shippingUpdate || o.shippingUpdate
      } : o));
      toast.success('Order updated successfully');
      setSelectedOrder(null);
    } catch (error) {
      toast.error('Failed to update order');
    }
  };

  const openUpdateModal = (order: Order) => {
    setSelectedOrder(order);
    setStatusUpdate(order.status);
    setTrackingId(order.trackingId || '');
    setShippingUpdate(order.shippingUpdate || '');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Processing': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Shipped': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'Delivered': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Cancelled': return 'bg-red-500/10 text-red-400 border-red-500/20';
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
                    <td className="px-6 py-4 font-medium text-white tracking-wider">#{order.id}</td>
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">{order.customerName}</div>
                      <div className="text-sm text-gray-400">{order.customerEmail}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{new Date(order.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-light text-lg text-white">₹{order.total}</td>
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
            <h2 className="text-xl font-bold mb-6 text-white tracking-tight">Update Order #{selectedOrder.id}</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-gray-400 mb-2">Order Status</label>
                <select 
                  value={statusUpdate} 
                  onChange={(e) => setStatusUpdate(e.target.value as Order['status'])}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white transition-all rounded-none appearance-none"
                >
                  <option value="Pending" className="bg-[#141414]">Pending</option>
                  <option value="Processing" className="bg-[#141414]">Processing</option>
                  <option value="Shipped" className="bg-[#141414]">Shipped</option>
                  <option value="Delivered" className="bg-[#141414]">Delivered</option>
                  <option value="Cancelled" className="bg-[#141414]">Cancelled</option>
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
                  value={shippingUpdate} 
                  onChange={(e) => setShippingUpdate(e.target.value)} 
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
