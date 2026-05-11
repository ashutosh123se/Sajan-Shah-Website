'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const AboutClients: React.FC = () => {
  return (
    <section className="py-24 bg-white text-black px-4 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h3 className="text-[#f26522] text-xs font-bold uppercase tracking-[0.3em] mb-4">Partnerships</h3>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Previous Delighted <span className="text-gray-400 font-light italic">Clients</span>
          </h2>
          <div className="w-16 h-1 bg-[#f26522] mx-auto mt-6"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative group flex justify-center"
        >
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50 max-w-5xl w-full overflow-hidden">
            <img 
              src="/LOGO.png" 
              alt="Previous Delighted Clients" 
              className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 opacity-80 hover:opacity-100"
            />
          </div>
          
          {/* Subtle background element */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-gray-50 via-white to-gray-50 opacity-50 blur-3xl rounded-full"></div>
        </motion.div>
      </div>
    </section>
  );
};
