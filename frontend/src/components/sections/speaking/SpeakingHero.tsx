'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const SpeakingHero: React.FC = () => {
  // Array of images for the grid background (Phil M Jones style)
  const gridImages = [
    '/impact.png',
    '/webinar.png',
    '/You vs You.png',
    '/speaking.jpeg',
    '/sajan sir.png',
    '/Studenting & Parenting.png',
    '/Untold Stories of Your Heroes.png',
    '/impact.png',
    '/webinar.png',
    '/speaking.jpeg'
  ];

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-black pt-20">
      {/* Phil M Jones Style Image Grid Background */}
      <div className="absolute inset-0 z-0 grid grid-cols-2 md:grid-cols-5 gap-1 opacity-65">
        {gridImages.map((img, idx) => (
          <div key={idx} className="relative aspect-video md:aspect-square overflow-hidden group">
            <img 
              src={img} 
              alt="Speaking" 
              className="w-full h-full object-cover grayscale"
            />
          </div>
        ))}
        {/* Fill rest if needed with overlay to ensure dark theme */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight"
        >
          This Isn’t Motivation.<br />
          <span className="italic font-light text-gray-300">This Is</span> <span className="text-[#f26522]">Transformation.</span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 mt-12"
        >
          <button 
            onClick={() => window.location.href = '#message'}
            className="w-full md:w-auto bg-[#f26522] hover:bg-[#d95a1e] text-white px-10 py-5 font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(242,101,34,0.3)]"
          >
            Book Sajan to Speak →
          </button>
          <button 
            onClick={() => window.open('https://webinar.sajanshah.com', '_blank')}
            className="w-full md:w-auto bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 px-10 py-5 font-bold tracking-widest uppercase transition-all duration-300"
          >
            Virtual Training →
          </button>
        </motion.div>
      </div>
    </section>
  );
};
