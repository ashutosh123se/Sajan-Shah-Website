'use client';

import React from 'react';
import { motion } from 'framer-motion';

const merchandise = [
  { id: 1, title: 'T-SHIRTS', subtitle: 'Wear Your Mindset', description: 'Apparel designed to reflect discipline, focus, and growth—because what you wear influences how you think.', image: 'https://placehold.co/600x600/0a0a0a/f26522?text=T-SHIRTS' },
  { id: 2, title: 'BOTTLES', subtitle: 'Stay Fueled, Stay Focused', description: 'Hydration meets discipline, carry your mindset wherever you go.', image: 'https://placehold.co/600x600/0a0a0a/f26522?text=BOTTLES' },
  { id: 3, title: 'BANDS', subtitle: 'Wear Your Commitment', description: 'Simple yet powerful reminders on your wrist to stay consistent and focused.', image: 'https://placehold.co/600x600/0a0a0a/f26522?text=BANDS' },
  { id: 4, title: 'EXAM PADS', subtitle: 'Write Your Success Story', description: 'Designed for students to stay organized, focused, and ready to perform.', image: 'https://placehold.co/600x600/0a0a0a/f26522?text=EXAM+PADS' },
  { id: 5, title: 'KEY CHAINS (I-G Series)', subtitle: 'Carry Your Identity', description: 'Keep your mindset close, small reminders that create big shifts.', image: 'https://placehold.co/600x600/0a0a0a/f26522?text=KEY+CHAINS' },
  { id: 6, title: '12-IN-1 PRODUCTIVITY KIT', subtitle: 'Structure Your Day, Upgrade Your Life', description: 'A complete system to improve focus, planning, and execution, built for daily performance.', image: 'https://placehold.co/600x600/0a0a0a/f26522?text=PRODUCTIVITY+KIT' },
  { id: 7, title: 'PLANTABLE PENCILS', subtitle: 'Grow While You Write', description: 'Eco-friendly tools that symbolize growth, write today, plant tomorrow.', image: 'https://placehold.co/600x600/0a0a0a/f26522?text=PLANTABLE+PENCILS' },
  { id: 8, title: 'CAP', subtitle: 'Think Different. Stand Different.', description: 'A bold expression of identity and confidence in everyday life.', image: 'https://placehold.co/600x600/0a0a0a/f26522?text=CAP' },
  { id: 9, title: 'PENS', subtitle: 'Write with Purpose', description: 'More than writing tools, designed to remind you of clarity, focus, and action.', image: 'https://placehold.co/600x600/0a0a0a/f26522?text=PENS' },
  { id: 10, title: 'MUGS', subtitle: 'Start Your Day with Intent', description: 'Every sip becomes a reminder of your goals, discipline, and mindset.', image: 'https://placehold.co/600x600/0a0a0a/f26522?text=MUGS' },
  { id: 11, title: 'CANDLES', subtitle: 'Create Your Focus Space', description: 'Set the environment for clarity, calmness, and deep thinking.', image: 'https://placehold.co/600x600/0a0a0a/f26522?text=CANDLES' },
];

export const ProductsMerchandise: React.FC = () => {
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
          {merchandise.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative aspect-square bg-gray-900 rounded-3xl overflow-hidden border border-white/5"
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-40"
              />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-12 group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black via-black/40 to-transparent">
                <h3 className="text-xl font-black mb-1 text-white tracking-tight leading-none">{item.title}</h3>
                <p className="text-[#f26522] text-[10px] font-black tracking-widest uppercase mb-4">{item.subtitle}</p>
                <div className="overflow-hidden h-0 group-hover:h-auto transition-all duration-500">
                  <p className="text-gray-400 text-xs leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity delay-200">
                    {item.description}
                  </p>
                  <a href="#" className="inline-flex items-center text-white font-black text-[10px] uppercase tracking-[0.2em] hover:text-[#f26522] transition-colors">
                    Buy Now →
                  </a>
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
