'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const ContactHero: React.FC = () => {
  return (
    <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/contact-hero.png" 
          alt="Contact Sajan Shah" 
          className="w-full h-full object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-1000 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mt-20 md:mt-32">
        <motion.p 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[#f26522] font-bold text-sm tracking-[0.4em] uppercase mb-4"
        >
          Connect With Sajan Shah
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-light tracking-tight mb-6"
        >
          Let's Create <span className="font-bold">Impact Together.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-gray-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed"
        >
          Whether you’re looking to host a transformational session, collaborate, or seek support, you’re at the right place.
        </motion.p>
      </div>
    </section>
  );
};
