'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';

import api from '@/lib/api';

const staticMerchandise = [
  { id: 'static-m1', name: 'T-SHIRTS', subtitle: 'Wear Your Mindset', description: 'Apparel designed to reflect discipline, focus, and growth—because what you wear influences how you think.', image: 'https://placehold.co/600x600/0a0a0a/f26522?text=T-SHIRTS', buy_url_internal: '#' },
  { id: 'static-m2', name: 'BOTTLES', subtitle: 'Stay Fueled, Stay Focused', description: 'Hydration meets discipline, carry your mindset wherever you go.', image: 'https://placehold.co/600x600/0a0a0a/f26522?text=BOTTLES', buy_url_internal: '#' },
  { id: 'static-m3', name: 'BANDS', subtitle: 'Wear Your Commitment', description: 'Simple yet powerful reminders on your wrist to stay consistent and focused.', image: 'https://placehold.co/600x600/0a0a0a/f26522?text=BANDS', buy_url_internal: '#' },
  { id: 'static-m4', name: 'EXAM PADS', subtitle: 'Write Your Success Story', description: 'Designed for students to stay organized, focused, and ready to perform.', image: 'https://placehold.co/600x600/0a0a0a/f26522?text=EXAM+PADS', buy_url_internal: '#' },
  { id: 'static-m5', name: 'KEY CHAINS (I-G Series)', subtitle: 'Carry Your Identity', description: 'Keep your mindset close, small reminders that create big shifts.', image: 'https://placehold.co/600x600/0a0a0a/f26522?text=KEY+CHAINS', buy_url_internal: '#' },
  { id: 'static-m6', name: '12-IN-1 PRODUCTIVITY KIT', subtitle: 'Structure Your Day, Upgrade Your Life', description: 'A complete system to improve focus, planning, and execution, built for daily performance.', image: 'https://placehold.co/600x600/0a0a0a/f26522?text=PRODUCTIVITY+KIT', buy_url_internal: '#' },
  { id: 'static-m7', name: 'PLANTABLE PENCILS', subtitle: 'Grow While You Write', description: 'Eco-friendly tools that symbolize growth, write today, plant tomorrow.', image: 'https://placehold.co/600x600/0a0a0a/f26522?text=PLANTABLE+PENCILS', buy_url_internal: '#' },
  { id: 'static-m8', name: 'CAP', subtitle: 'Think Different. Stand Different.', description: 'A bold expression of identity and confidence in everyday life.', image: 'https://placehold.co/600x600/0a0a0a/f26522?text=CAP', buy_url_internal: '#' },
  { id: 'static-m9', name: 'PENS', subtitle: 'Write with Purpose', description: 'More than writing tools, designed to remind you of clarity, focus, and action.', image: 'https://placehold.co/600x600/0a0a0a/f26522?text=PENS', buy_url_internal: '#' },
  { id: 'static-m10', name: 'MUGS', subtitle: 'Start Your Day with Intent', description: 'Every sip becomes a reminder of your goals, discipline, and mindset.', image: 'https://placehold.co/600x600/0a0a0a/f26522?text=MUGS', buy_url_internal: '#' },
  { id: 'static-m11', name: 'CANDLES', subtitle: 'Create Your Focus Space', description: 'Set the environment for clarity, calmness, and deep thinking.', image: 'https://placehold.co/600x600/0a0a0a/f26522?text=CANDLES', buy_url_internal: '#' },
];

interface MerchProduct {
  id: string;
  name: string;
  subtitle?: string;
  description: string;
  image?: string;
  buy_url_internal?: string;
  price?: number;
}

export const ProductsMerchandise: React.FC = () => {
  const [merchList, setMerchList] = useState<MerchProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCartAndRedirect = (item: MerchProduct) => {
    addToCart({
      id: item.id,
      title: item.name,
      description: item.description,
      price: item.price || 499,
      imageUrl: item.image || '',
      category: 'merchandise',
      stock: 100
    }, 1);
    router.push('/cart');
  };

  useEffect(() => {
    const fetchMerchandise = async () => {
      try {
        const response = await api.get('/v1/products');
        const dbProducts = response.data.data.products || [];
        const dbMerch = dbProducts.filter((p: any) => p.category === 'merchandise');
        
        if (dbMerch.length > 0) {
          setMerchList(dbMerch.map((m: any) => ({
            id: m.id,
            name: m.name,
            subtitle: m.short_description || 'Exclusive Merchandise',
            description: m.description,
            image: m.image_homepage || m.image_product_page || 'https://placehold.co/600x600/0a0a0a/f26522?text=MERCHANDISE',
            buy_url_internal: m.buy_url_internal || '#',
            price: m.price !== null ? Number(m.price) : 499,
          })));
        } else {
          setMerchList(staticMerchandise);
        }
      } catch (error) {
        console.error('Failed to fetch merchandise:', error);
        setMerchList(staticMerchandise);
      } finally {
        setLoading(false);
      }
    };
    fetchMerchandise();
  }, []);

  const activeMerch = merchList.length > 0 ? merchList : staticMerchandise;

  if (loading) {
    return (
      <div className="py-24 text-center text-gray-500 bg-[#0a0a0a]">
        Loading Merchandise...
      </div>
    );
  }

  return (
    <section id="merchandise" className="py-32 bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 bg-white text-black text-[10px] font-black tracking-widest uppercase rounded-full mb-6"
          >
            MERCHANDISE BY SAJAN SHAH
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tighter"
          >
            Wear the Identity <br />You Want to <span className="text-[#f26522]">Become</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-400 font-light max-w-3xl mx-auto"
          >
            Wear It. Use It. Become It. These are not just products. They are daily reminders of the person you are becoming.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeMerch.map((item: MerchProduct, index: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative aspect-square bg-gray-900 rounded-3xl overflow-hidden border border-white/5 cursor-pointer"
              onClick={() => handleAddToCartAndRedirect(item)}
            >
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-40"
              />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-12 group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black via-black/40 to-transparent">
                <h3 className="text-xl font-black mb-1 text-white tracking-tight leading-none">{item.name}</h3>
                <p className="text-[#f26522] text-[10px] font-black tracking-widest uppercase mb-4">{item.subtitle}</p>
                <div className="overflow-hidden h-0 group-hover:h-auto transition-all duration-500">
                  <p className="text-gray-400 text-xs leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity delay-200">
                    {item.description}
                  </p>
                </div>
              </div>
              
              {/* Static Badge */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                 <div className="w-10 h-10 rounded-full bg-[#f26522] flex items-center justify-center text-white">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
