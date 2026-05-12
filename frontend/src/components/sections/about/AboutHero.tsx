'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const AboutHero: React.FC = () => {
  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/impact.png" 
          alt="Sajan Shah Cinematic" 
          className="w-full h-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mt-40 md:mt-64">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="text-[#f26522] text-xs md:text-sm font-bold uppercase tracking-[0.5em] mb-4">
            Legacy of Transformation
          </h2>
          <h1 className="text-5xl md:text-8xl font-light tracking-tight text-white mb-6 uppercase">
            Sajan <span className="font-bold">Shah</span>
          </h1>
          <div className="w-24 h-1 bg-[#f26522] mx-auto"></div>
        </motion.div>
      </div>
    </section>
  );
};
