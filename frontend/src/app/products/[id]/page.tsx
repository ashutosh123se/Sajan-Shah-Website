'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/Button';
import api from '@/lib/api';
import toast from 'react-hot-toast';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'shipping' | 'payment'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'RAZORPAY' | 'COD'>('RAZORPAY');
  
  const [shippingData, setShippingData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    zip: ''
  });

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      const rawProduct = response.data.data.product;
      if (rawProduct) {
        setProduct({
          id: rawProduct.id,
          title: rawProduct.name || rawProduct.title || '',
          description: rawProduct.description || '',
          price: rawProduct.price !== null ? Number(rawProduct.price) : 0,
          imageUrl: rawProduct.image_product_page || rawProduct.image_homepage || rawProduct.imageUrl || '',
          category: rawProduct.category || '',
          stock: 100 // virtual stock for digital products/merchandise
        });
      } else {
        toast.error('Product not found');
        router.push('/products');
      }
    } catch (error) {
      toast.error('Product not found');
      router.push('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (checkoutStep === 'details') {
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
        items: [{ productId: product!.id, quantity, price: product!.price }],
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
          description: `Order for ${product!.title}`,
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
        router.push(`/products/order-success?orderId=${orderId}&method=COD`);
      }
    } catch (error) {
      toast.error('Failed to create order');
    }
  };

  if (loading) return <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <img src="/loding.png" alt="Loading" className="animate-spin object-contain h-32 w-32" />
        <div className="font-mono text-xs uppercase tracking-[0.3em]">Loading....</div>
      </div>;
  if (!product) return null;

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image */}
          <div className="relative group">
            <div className="aspect-square bg-white/5 border border-white/10 overflow-hidden">
              <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
          </div>

          {/* Details & Checkout */}
          <div className="flex flex-col">
            {checkoutStep === 'details' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div>
                  <span className="text-blue-500 font-mono text-sm uppercase tracking-widest">{product.category}</span>
                  <h1 className="text-5xl font-black mt-2 tracking-tighter uppercase">{product.title}</h1>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed">{product.description}</p>
                <div className="flex items-center justify-between py-4 border-y border-white/10">
                  <div className="text-4xl font-light">₹{product.price.toLocaleString()}</div>
                  <div className={`px-3 py-1 text-xs font-bold uppercase tracking-widest ${product.stock > 0 ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                    {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                  <div className="flex items-center border border-white/20 w-full sm:w-auto justify-between">
                    <button 
                      onClick={() => setQuantity(q => Math.max(1, q-1))} 
                      className="px-6 py-3 hover:bg-white/10"
                      disabled={product.stock <= 0}
                    >-</button>
                    <span className="px-8 font-mono text-lg">{product.stock > 0 ? quantity : 0}</span>
                    <button 
                      onClick={() => setQuantity(q => Math.min(product.stock, q+1))} 
                      className="px-6 py-3 hover:bg-white/10"
                      disabled={product.stock <= 0}
                    >+</button>
                  </div>
                  <div className="flex flex-1 gap-4 w-full">
                    <Button 
                      onClick={() => addToCart(product, quantity)}
                      disabled={product.stock <= 0}
                      variant="outline"
                      className="flex-1 border-white/20 text-white hover:bg-white/5 rounded-none h-14 uppercase font-bold tracking-widest transition-all"
                    >
                      Add to Cart
                    </Button>
                    <Button 
                      onClick={handleCheckout} 
                      disabled={product.stock <= 0}
                      className="flex-1 bg-white text-black hover:bg-gray-200 disabled:bg-gray-800 disabled:text-gray-500 rounded-none h-14 uppercase font-bold tracking-widest shadow-[0_10px_20px_rgba(255,255,255,0.1)]"
                    >
                      {product.stock > 0 ? 'Buy Now' : 'Sold Out'}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {checkoutStep === 'shipping' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-3xl font-bold tracking-tighter uppercase">Shipping Details</h2>
                <div className="grid grid-cols-1 gap-4">
                  <input placeholder="Full Name" value={shippingData.name} onChange={e => setShippingData({...shippingData, name: e.target.value})} className="bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-white transition-all" />
                  {!isAuthenticated && (
                    <input placeholder="Email Address" value={shippingData.email} onChange={e => setShippingData({...shippingData, email: e.target.value})} className="bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-white transition-all" />
                  )}
                  <input placeholder="Phone Number" value={shippingData.phone} onChange={e => setShippingData({...shippingData, phone: e.target.value})} className="bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-white transition-all" />
                  <textarea placeholder="Complete Address" value={shippingData.address} onChange={e => setShippingData({...shippingData, address: e.target.value})} className="bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-white transition-all h-32" />
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="City" value={shippingData.city} onChange={e => setShippingData({...shippingData, city: e.target.value})} className="bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-white transition-all" />
                    <input placeholder="Zip Code" value={shippingData.zip} onChange={e => setShippingData({...shippingData, zip: e.target.value})} className="bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-white transition-all" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setCheckoutStep('details')} className="border-white/10 text-white rounded-none">Back</Button>
                  <Button onClick={handleCheckout} className="flex-1 bg-white text-black hover:bg-gray-200 rounded-none">Continue to Payment</Button>
                </div>
              </div>
            )}

            {checkoutStep === 'payment' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-3xl font-bold tracking-tighter uppercase">Payment Method</h2>
                <div className="space-y-4">
                  <button onClick={() => setPaymentMethod('RAZORPAY')} className={`w-full p-6 border flex justify-between items-center transition-all ${paymentMethod === 'RAZORPAY' ? 'border-white bg-white/10' : 'border-white/10 bg-white/5 hover:border-white/30'}`}>
                    <span className="font-bold uppercase tracking-widest">Razorpay (Cards/UPI)</span>
                    {paymentMethod === 'RAZORPAY' && <div className="w-4 h-4 bg-white rounded-full"></div>}
                  </button>
                  <button onClick={() => setPaymentMethod('COD')} className={`w-full p-6 border flex justify-between items-center transition-all ${paymentMethod === 'COD' ? 'border-white bg-white/10' : 'border-white/10 bg-white/5 hover:border-white/30'}`}>
                    <span className="font-bold uppercase tracking-widest">Cash on Delivery (Testing)</span>
                    {paymentMethod === 'COD' && <div className="w-4 h-4 bg-white rounded-full"></div>}
                  </button>
                </div>
                <div className="bg-white/5 p-6 border border-white/10">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Total Amount</span>
                    <span className="font-bold">₹{(product.price * quantity).toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-4 italic">* Secure transactions powered by industry standard encryption.</p>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setCheckoutStep('shipping')} className="border-white/10 text-white rounded-none">Back</Button>
                  <Button onClick={handleCheckout} className="flex-1 bg-white text-black hover:bg-gray-200 rounded-none font-bold uppercase tracking-widest h-14">
                    Place Order
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
