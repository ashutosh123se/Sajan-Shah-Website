'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/Button';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { items, updateItemQuantity, removeFromCart, getTotalPrice, clearAllItems } = useCart();
  
  const [mounted, setMounted] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<'RAZORPAY' | 'COD'>('RAZORPAY');
  
  const [shippingData, setShippingData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: ''
  });

  React.useEffect(() => {
    setMounted(true);
    if (user) {
      setShippingData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    if (checkoutStep === 'cart') {
      setCheckoutStep('shipping');
      return;
    }

    if (checkoutStep === 'shipping') {
      if (!shippingData.email || !shippingData.name || !shippingData.phone || !shippingData.address || !shippingData.city) {
        toast.error('Please fill all required details');
        return;
      }
      setCheckoutStep('payment');
      return;
    }

    // Process Payment
    try {
      const orderRes = await api.post('/orders/create', {
        items: items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price
        })),
        userEmail: shippingData.email,
        userName: shippingData.name,
        paymentMethod,
        shippingAddress: `${shippingData.address}, ${shippingData.city} - ${shippingData.zip}`,
        phone: shippingData.phone
      });

      const { razorpayOrderId, amount, currency, key, orderId } = orderRes.data.data;

      if (paymentMethod === 'RAZORPAY') {
        const options = {
          key,
          amount,
          currency,
          name: 'Sajan Shah',
          description: 'Payment for your order',
          order_id: razorpayOrderId,
          handler: async (response: any) => {
            try {
              await api.post('/orders/verify', {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId
              });
              toast.success('Payment successful!');
              clearAllItems();
              router.push(`/products/order-success?orderId=${orderId}&method=RAZORPAY`);
            } catch (err) {
              toast.error('Payment verification failed');
            }
          },
          prefill: {
            name: shippingData.name,
            email: shippingData.email,
            contact: shippingData.phone
          },
          theme: { color: '#000000' }
        };
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        toast.success('Order placed successfully (COD)');
        clearAllItems();
        router.push(`/products/order-success?orderId=${orderId}&method=COD`);
      }
    } catch (error) {
      toast.error('Failed to create order');
    }
  };

  const steps = [
    { id: 'cart', label: 'Review Cart' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'payment', label: 'Payment' }
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0C0C0C] text-white flex items-center justify-center font-mono text-[10px] uppercase tracking-[0.3em]">
        Authenticating Cart Summary...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white pt-52 pb-32 px-4 relative overflow-hidden">
      {/* Background Logo Watermark */}
      <div className="fixed inset-0 flex items-center justify-center opacity-[0.1] pointer-events-none select-none z-0 overflow-hidden">
        <div className="flex flex-col items-center transform -rotate-12 scale-[3.5] md:scale-[5]">
          <div className="flex items-baseline text-6xl tracking-tighter">
            <span className="font-light text-white uppercase">sajan</span>
            <span className="font-black text-white uppercase"><span className="text-[#f26522]">s</span>hah</span>
          </div>
          <div className="flex items-center mt-2 w-full">
            <div className="h-[1px] bg-[#f26522] flex-grow"></div>
            <span className="mx-4 text-[8px] text-white font-medium lowercase tracking-[0.2em] whitespace-nowrap">
              shift your story. shape your success.
            </span>
            <div className="h-[1px] bg-[#f26522] flex-grow"></div>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Step Indicator */}
        <div className="flex justify-center mb-20">
          <div className="flex items-center space-x-4 md:space-x-8">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 flex items-center justify-center text-[10px] uppercase font-black tracking-widest transition-all duration-500 border ${
                    checkoutStep === step.id ? 'bg-white text-black border-white scale-110 shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 
                    steps.findIndex(s => s.id === checkoutStep) > index ? 'bg-green-500/20 text-green-500 border-green-500/30' : 'bg-white/5 text-gray-500 border-white/10'
                  }`}>
                    {steps.findIndex(s => s.id === checkoutStep) > index ? '✓' : `0${index + 1}`}
                  </div>
                  <span className={`text-[9px] uppercase tracking-[0.2em] mt-3 font-bold ${checkoutStep === step.id ? 'text-white' : 'text-gray-600'}`}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 md:w-24 h-[1px] -mt-6 transition-all duration-700 ${
                    steps.findIndex(s => s.id === checkoutStep) > index ? 'bg-green-500/30' : 'bg-white/10'
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 items-start">
          
          {/* Main Content Area */}
          <div className="flex-1 w-full">
            <AnimatePresence mode="wait">
              {checkoutStep === 'cart' && (
                <motion.div 
                  key="cart"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <div className="flex justify-between items-end border-b border-white/5 pb-6">
                    <h1 className="text-5xl font-black tracking-tighter uppercase leading-none">The Collection</h1>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-1">{items.length} Distinct Items</span>
                  </div>
                  
                  {items.length > 0 ? (
                    <div className="divide-y divide-white/5">
                      {items.map(item => (
                        <div key={item.product.id} className="py-8 first:pt-0 flex gap-8 group">
                          <div className="w-32 h-40 bg-white/[0.03] overflow-hidden relative border border-white/5">
                            <img src={item.product.imageUrl} alt={item.product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          </div>
                          <div className="flex-1 flex flex-col justify-between py-2">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="text-2xl font-black uppercase tracking-tighter mb-1">{item.product.title}</h3>
                                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">{item.product.category}</p>
                              </div>
                              <button onClick={() => removeFromCart(item.product.id)} className="text-gray-600 hover:text-[#f26522] transition-colors h-fit p-1" title="Remove item">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                              </button>
                            </div>
                            
                            <div className="flex justify-between items-center mt-8">
                              <div className="flex items-center bg-white/[0.03] border border-white/10 px-1 py-1">
                                <button onClick={() => updateItemQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 transition-colors">-</button>
                                <span className="w-10 text-center text-xs font-black tracking-tighter">{item.quantity}</span>
                                <button onClick={() => updateItemQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 transition-colors">+</button>
                              </div>
                              <div className="text-2xl font-light tracking-tighter">₹{(item.product.price * item.quantity).toLocaleString()}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-32 text-center">
                      <p className="text-gray-500 text-sm uppercase tracking-[0.3em] mb-12">Your collection is currently empty</p>
                      <button 
                        onClick={() => router.push('/products')} 
                        className="px-12 py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] hover:bg-gray-200 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
                      >
                        Explore Offerings
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

              {checkoutStep === 'shipping' && (
                <motion.div 
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-12"
                >
                  <div className="border-b border-white/5 pb-6">
                    <h2 className="text-5xl font-black tracking-tighter uppercase leading-none">Destination</h2>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mt-2">Where shall we send your selection?</p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-600 ml-1">Recipient Name</label>
                      <input value={shippingData.name} onChange={e => setShippingData({...shippingData, name: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 px-6 py-5 focus:outline-none focus:border-white/40 transition-all text-sm tracking-wide" placeholder="John Doe" />
                    </div>
                    {!isAuthenticated && (
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-600 ml-1">Email Address</label>
                        <input value={shippingData.email} onChange={e => setShippingData({...shippingData, email: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 px-6 py-5 focus:outline-none focus:border-white/40 transition-all text-sm tracking-wide" placeholder="john@example.com" />
                      </div>
                    )}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-600 ml-1">Phone Number</label>
                      <input value={shippingData.phone} onChange={e => setShippingData({...shippingData, phone: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 px-6 py-5 focus:outline-none focus:border-white/40 transition-all text-sm tracking-wide" placeholder="+91 00000 00000" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-600 ml-1">Complete Address</label>
                      <textarea value={shippingData.address} onChange={e => setShippingData({...shippingData, address: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 px-6 py-5 focus:outline-none focus:border-white/40 transition-all h-32 text-sm tracking-wide resize-none" placeholder="Flat, House No, Building, Street..." />
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-600 ml-1">City</label>
                        <input value={shippingData.city} onChange={e => setShippingData({...shippingData, city: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 px-6 py-5 focus:outline-none focus:border-white/40 transition-all text-sm tracking-wide" placeholder="Mumbai" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-600 ml-1">Zip Code</label>
                        <input value={shippingData.zip} onChange={e => setShippingData({...shippingData, zip: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 px-6 py-5 focus:outline-none focus:border-white/40 transition-all text-sm tracking-wide" placeholder="400001" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <button onClick={() => setCheckoutStep('cart')} className="px-10 py-5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/[0.05] transition-all">Back</button>
                    <button onClick={handleCheckout} className="flex-1 py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-gray-200 transition-all">Proceed to Final Step</button>
                  </div>
                </motion.div>
              )}

              {checkoutStep === 'payment' && (
                <motion.div 
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-12"
                >
                  <div className="border-b border-white/5 pb-6">
                    <h2 className="text-5xl font-black tracking-tighter uppercase leading-none">Settlement</h2>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mt-2">Select your preferred method of exchange</p>
                  </div>
                  
                  <div className="space-y-4">
                    <button onClick={() => setPaymentMethod('RAZORPAY')} className={`w-full group relative p-10 border transition-all duration-500 overflow-hidden ${paymentMethod === 'RAZORPAY' ? 'border-white bg-white/[0.05]' : 'border-white/10 bg-white/[0.02] hover:border-white/30'}`}>
                      <div className="relative z-10 flex justify-between items-center">
                        <div className="text-left">
                          <span className="block font-black uppercase tracking-[0.4em] text-lg mb-1">Instant Settlement</span>
                          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Secure Gateway • UPI, Cards, Netbanking</span>
                        </div>
                        <div className={`w-6 h-6 border transition-all duration-500 flex items-center justify-center ${paymentMethod === 'RAZORPAY' ? 'bg-white border-white' : 'border-white/20'}`}>
                          {paymentMethod === 'RAZORPAY' && <div className="w-2 h-2 bg-black"></div>}
                        </div>
                      </div>
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                         <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                      </div>
                    </button>

                    <button onClick={() => setPaymentMethod('COD')} className={`w-full group relative p-10 border transition-all duration-500 overflow-hidden ${paymentMethod === 'COD' ? 'border-white bg-white/[0.05]' : 'border-white/10 bg-white/[0.02] hover:border-white/30'}`}>
                      <div className="relative z-10 flex justify-between items-center">
                        <div className="text-left">
                          <span className="block font-black uppercase tracking-[0.4em] text-lg mb-1">On Arrival</span>
                          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Pay upon physical delivery of selection</span>
                        </div>
                        <div className={`w-6 h-6 border transition-all duration-500 flex items-center justify-center ${paymentMethod === 'COD' ? 'bg-white border-white' : 'border-white/20'}`}>
                          {paymentMethod === 'COD' && <div className="w-2 h-2 bg-black"></div>}
                        </div>
                      </div>
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M20 7h-9m3 3h-3m3 3h-3m3 3h-3m3 3h-3M4 17a3 3 0 106 0 3 3 0 00-6 0zm10 0a3 3 0 106 0 3 3 0 00-6 0zM4 17V6a2 2 0 012-2h12a2 2 0 112 2v11m-10 0h4"/></svg>
                      </div>
                    </button>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button onClick={() => setCheckoutStep('shipping')} className="px-10 py-5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/[0.05] transition-all">Back</button>
                    <button onClick={handleCheckout} className="flex-1 py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-gray-200 transition-all shadow-[0_10px_40px_rgba(255,255,255,0.15)]">Complete Selection</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Summary Area */}
          <div className="w-full lg:w-[380px] shrink-0 sticky top-32">
            <div className="bg-white/[0.03] border border-white/10 p-10 backdrop-blur-md">
              <h3 className="text-xl font-black tracking-widest uppercase mb-10 pb-6 border-b border-white/10">The Appraisal</h3>
              
              <div className="space-y-6 mb-12">
                <div className="flex justify-between items-center text-gray-500">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Subtotal</span>
                  <span className="text-lg font-light tracking-tighter text-white">₹{getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-gray-500">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Standard Logistic</span>
                  <span className="text-[10px] text-green-500 uppercase tracking-[0.4em] font-black">Complimentary</span>
                </div>
                <div className="pt-10 border-t border-white/10 flex justify-between items-end">
                  <span className="text-xs font-black uppercase tracking-[0.3em]">Grand Total</span>
                  <div className="text-right">
                    <span className="block text-4xl font-black tracking-tighter leading-none">₹{getTotalPrice().toLocaleString()}</span>
                    <span className="text-[9px] text-gray-600 uppercase tracking-widest mt-2 block italic">All duties inclusive</span>
                  </div>
                </div>
              </div>
              
              {checkoutStep === 'cart' && items.length > 0 && (
                <button 
                  onClick={handleCheckout} 
                  className="w-full py-6 bg-white text-black text-xs font-black uppercase tracking-[0.3em] hover:bg-gray-200 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)] relative overflow-hidden group"
                >
                  <span className="relative z-10">Initiate Checkout</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.05] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                </button>
              )}
              
              <div className="mt-12 space-y-6 border-t border-white/5 pt-10">
                <div className="flex items-start gap-4">
                  <div className="w-4 h-4 mt-0.5 border border-white/20 flex items-center justify-center">
                    <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-[9px] text-gray-500 leading-relaxed uppercase tracking-widest font-medium">Secure 256-bit cryptographic encryption</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-4 h-4 mt-0.5 border border-white/20 flex items-center justify-center">
                    <div className="w-1 h-1 bg-white/40"></div>
                  </div>
                  <p className="text-[9px] text-gray-500 leading-relaxed uppercase tracking-widest font-medium">Handcrafted logistics & premium packaging</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
