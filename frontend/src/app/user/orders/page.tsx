'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clipboard, CheckCircle, Package, Truck, Award, Calendar } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  image: string;
  category: string;
}

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product: Product;
}

interface Order {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
  trackingId?: string;
  shippingNotes?: string;
  paymentMethod?: string;
  items: OrderItem[];
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const fetchMyOrders = async () => {
    try {
      const response = await api.get('/orders/my-orders');
      setOrders(response.data.data.orders || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      toast.error('Failed to fetch order history');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'PAID': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'PROCESSING': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      case 'SHIPPED': return 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20';
      case 'DELIVERED': return 'text-green-400 bg-green-400/10 border-green-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getActiveStepIndex = (status: string) => {
    switch (status) {
      case 'PENDING': return 0;
      case 'PAID': return 1;
      case 'PROCESSING': return 2;
      case 'SHIPPED': return 3;
      case 'DELIVERED': return 4;
      default: return 0;
    }
  };

  const STATUS_STEPS = [
    { label: 'Order Placed', desc: 'We have received your order details.', icon: Calendar },
    { label: 'Confirmed', desc: 'Payment verified and confirmed.', icon: CheckCircle },
    { label: 'Processing', desc: 'Your items are being packaged.', icon: Package },
    { label: 'Shipped', desc: 'Dispatched and on the way.', icon: Truck },
    { label: 'Delivered', desc: 'Delivered to your address.', icon: Award },
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Tracking ID copied!');
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase">My Order History</h1>
          <p className="text-gray-400 mt-2 text-lg">Track your purchases, view detailed breakdown and shipping progress.</p>
        </div>
      </div>

      <div className="bg-[#0f0f0f] border border-white/10 p-6 md:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f26522]/5 rounded-full filter blur-[100px] pointer-events-none"></div>

        {loading ? (
          <div className="text-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f26522] mx-auto mb-4"></div>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Fetching orders...</p>
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map(order => {
              const activeIndex = getActiveStepIndex(order.status);
              return (
                <div 
                  key={order.id} 
                  className="border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] p-6 hover:border-white/20 transition-all duration-300 flex flex-col gap-6 group cursor-pointer"
                  onClick={() => setSelectedOrder(order)}
                >
                  {/* Order header row */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/5">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-xs font-black font-mono text-gray-500 tracking-wider">ORDER_#{order.id.slice(-8).toUpperCase()}</span>
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-2 py-0.5 border ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Placed on {new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <div className="text-2xl font-black text-white">₹{order.amount.toLocaleString()}</div>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Total Amount</p>
                    </div>
                  </div>

                  {/* Order details & Product List */}
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div className="space-y-4 flex-1 w-full">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex gap-4 items-center bg-white/[0.02] p-3 border border-white/5">
                            <div className="w-14 h-16 relative bg-black flex-shrink-0 overflow-hidden border border-white/10 flex items-center justify-center">
                              {item.product?.image ? (
                                <img 
                                  src={item.product.image} 
                                  alt={item.product.title} 
                                  className="w-full h-full object-contain"
                                />
                              ) : (
                                <span className="text-[8px] text-gray-600 uppercase font-black">No Cover</span>
                              )}
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-sm font-bold text-white truncate">{item.product?.title || 'Unknown Product'}</h4>
                              <p className="text-xs text-[#f26522] uppercase tracking-wider font-semibold">{item.product?.category}</p>
                              <p className="text-xs text-gray-400 mt-1 font-mono">{item.quantity} x ₹{item.price.toLocaleString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right column quick stats */}
                    <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-4 justify-between items-stretch lg:items-end lg:min-w-[240px]">
                      {order.trackingId ? (
                        <div className="p-3 bg-[#f26522]/5 border border-[#f26522]/20 flex-1 lg:flex-initial text-center lg:text-right">
                          <span className="text-[9px] text-[#f26522] font-black uppercase tracking-widest">Active Tracking</span>
                          <p className="text-sm font-mono font-black text-white mt-1">{order.trackingId}</p>
                        </div>
                      ) : (
                        <div className="p-3 bg-white/[0.02] border border-white/5 flex-1 lg:flex-initial text-center lg:text-right">
                          <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest block">Status</span>
                          <span className="text-xs text-gray-400 italic block mt-1">Pending shipping details</span>
                        </div>
                      )}
                      
                      <button 
                        className="bg-white text-black hover:bg-gray-200 px-6 py-3 font-bold uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 group-hover:bg-[#f26522] group-hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOrder(order);
                        }}
                      >
                        Track Order
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-gray-500 text-center py-24 border border-dashed border-white/10">
            <div className="mb-6 opacity-20">
              <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <p className="text-xl font-bold text-white mb-2 uppercase tracking-tight">No orders found</p>
            <p className="text-sm text-gray-400 mb-8 italic">Ready to transform your memory? Visit our store.</p>
            <button onClick={() => window.location.href = '/products'} className="bg-white text-black px-8 py-3 font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors">Start Shopping</button>
          </div>
        )}
      </div>

      {/* Tracking & Details Modal Popup */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-[#0f0f0f] border border-white/10 shadow-2xl p-6 md:p-8 overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Close */}
              <button 
                onClick={() => setSelectedOrder(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors z-20"
              >
                <X size={20} />
              </button>

              {/* Background gradient blur */}
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#f26522]/10 rounded-full filter blur-[80px] pointer-events-none"></div>

              {/* Modal Content */}
              <div className="space-y-8">
                {/* Header */}
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Order Details</h2>
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-2 py-0.5 border ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 font-mono">
                    ID: {selectedOrder.id} • Placed {new Date(selectedOrder.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* Tracking Progress Timeline */}
                <div className="bg-white/[0.01] border border-white/5 p-6 rounded-sm">
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#f26522] mb-6">Delivery Progress</h3>
                  
                  {/* Step Tracker */}
                  <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-4 mt-2">
                    {/* Line connection (desktop only) */}
                    <div className="hidden md:block absolute top-[18px] left-[5%] right-[5%] h-0.5 bg-white/10 -z-0">
                      <div 
                        className="h-full bg-[#f26522] transition-all duration-500" 
                        style={{ width: `${(getActiveStepIndex(selectedOrder.status) / 4) * 100}%` }}
                      ></div>
                    </div>

                    {STATUS_STEPS.map((step, idx) => {
                      const isActive = idx <= getActiveStepIndex(selectedOrder.status);
                      const StepIcon = step.icon;
                      
                      return (
                        <div key={idx} className="flex md:flex-col items-center gap-4 md:gap-2 z-10 w-full md:w-1/5 relative">
                          {/* Dot / Icon */}
                          <div className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 border ${
                            isActive 
                              ? 'bg-[#f26522] border-[#f26522] text-white shadow-[0_0_15px_rgba(242,101,34,0.4)]' 
                              : 'bg-black border-white/10 text-gray-600'
                          }`}>
                            <StepIcon size={16} />
                          </div>

                          {/* Details */}
                          <div className="text-left md:text-center min-w-0">
                            <p className={`text-xs font-bold ${isActive ? 'text-white' : 'text-gray-500'}`}>{step.label}</p>
                            <p className="text-[10px] text-gray-500 leading-tight mt-0.5 hidden md:block">{step.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Tracking details or shipping notes */}
                {(selectedOrder.trackingId || selectedOrder.shippingNotes) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedOrder.trackingId && (
                      <div className="bg-white/[0.02] border border-white/5 p-4 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black block">Tracking ID / Number</span>
                          <span className="text-lg font-mono font-black text-white mt-1 block">{selectedOrder.trackingId}</span>
                        </div>
                        <button 
                          onClick={() => handleCopy(selectedOrder.trackingId!)}
                          className="mt-4 self-start text-[10px] font-black uppercase tracking-widest text-[#f26522] hover:text-white transition-colors flex items-center gap-2"
                        >
                          <Clipboard size={12} /> Copy Tracking ID
                        </button>
                      </div>
                    )}
                    {selectedOrder.shippingNotes && (
                      <div className="bg-white/[0.02] border border-white/5 p-4">
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black block">Shipping Updates / Notes</span>
                        <p className="text-xs text-gray-300 italic mt-2 leading-relaxed">
                          "{selectedOrder.shippingNotes}"
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Items Summary list */}
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Items Summary</h3>
                  <div className="border border-white/5 divide-y divide-white/5">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="p-4 flex gap-4 items-center bg-white/[0.01]">
                        <div className="w-12 h-14 bg-black border border-white/10 flex-shrink-0 overflow-hidden flex items-center justify-center">
                          {item.product?.image ? (
                            <img src={item.product.image} alt={item.product.title} className="w-full h-full object-contain" />
                          ) : (
                            <span className="text-[8px] text-gray-600 font-bold uppercase">No Cover</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-white text-sm truncate">{item.product?.title || 'Unknown Product'}</h4>
                          <p className="text-[10px] text-[#f26522] uppercase tracking-widest font-semibold">{item.product?.category}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-gray-400 font-mono block">{item.quantity} x ₹{item.price.toLocaleString()}</span>
                          <span className="text-sm font-bold text-white font-mono block mt-0.5">₹{(item.quantity * item.price).toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer specs */}
                <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black block">Payment Method</span>
                    <span className="text-xs text-white font-bold uppercase tracking-wider block mt-0.5">{selectedOrder.paymentMethod || 'Razorpay'}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black block">Total Paid</span>
                    <span className="text-2xl font-black text-white block mt-0.5">₹{selectedOrder.amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
