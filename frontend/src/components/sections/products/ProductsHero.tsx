'use client';

import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { id: 1, value: '10 L+', label: 'COPIES SOLD' },
  { id: 2, value: '3 CORE', label: 'TRANSFORMATION BOOKS' },
  { id: 3, value: '1000+', label: 'REVIEWS & TESTIMONIALS' },
  { id: 4, value: 'BESTSELLING ON', label: 'FLIPKART & AMAZON' },
  { id: 5, value: 'IMPACTING', label: '16+ MILLION LIVES' },
];

export const ProductsHero: React.FC = () => {
  return (
    <section className="relative pt-56 pb-32 bg-[#0a0a0a] z-30 min-h-[600px] flex flex-col justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/products.png" 
          alt="Products Background" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]/80"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center w-full">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center items-center space-x-4 mb-6"
          >
            {['Books', 'Courses', 'Merchandise'].map((item, index) => (
              <React.Fragment key={item}>
                <span className="text-gray-300 uppercase tracking-[0.3em] text-sm font-black drop-shadow-md">
                  {item}
                </span>
                {index < 2 && <span className="text-white/30">|</span>}
              </React.Fragment>
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase drop-shadow-2xl"
          >
            Explore <span className="text-[#f26522]">Now</span> →
          </motion.h1>
        </div>

        {/* Overlapping Stats Box */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full relative z-[100]"
          style={{ marginBottom: '-200px' }}
        >
          <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-[0_60px_120px_rgba(0,0,0,0.3)] border border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
              
              {/* Stat 1 */}
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black text-[#f26522] mb-1">10 L+</div>
                <div className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">Copies Sold</div>
              </div>

              {/* Stat 2 */}
              <div className="text-center border-l border-gray-100 px-4">
                <div className="text-4xl md:text-5xl font-black text-[#f26522] mb-1">3 CORE</div>
                <div className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">Transformation Books</div>
              </div>

              {/* Stat 3 */}
              <div className="text-center border-l border-gray-100 px-4">
                <div className="text-4xl md:text-5xl font-black text-[#f26522] mb-1">1000+</div>
                <div className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">Reviews & Testimonials</div>
              </div>

              {/* Special Stat: Amazon & Flipkart */}
              <div className="text-center border-l border-gray-100 px-6">
                <div className="text-[10px] text-gray-400 font-black tracking-widest uppercase mb-4">Bestselling On</div>
                <div className="flex items-center justify-center gap-6">
                  {/* Amazon Logo */}
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-6 object-contain" />
                  {/* Flipkart Logo - User provided link, increased size */}
                  <img 
                    src="https://tse2.mm.bing.net/th/id/OIP.idB_-eo5pNgOG8Ker3jEpgHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" 
                    alt="Flipkart" 
                    className="h-10 md:h-12 object-contain"
                  />
                </div>
              </div>

              {/* Stat 5 */}
              <div className="text-center border-l border-gray-100 px-4">
                <div className="text-4xl md:text-5xl font-black text-[#f26522] mb-1">16M+</div>
                <div className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">Lives Impacted</div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
;
