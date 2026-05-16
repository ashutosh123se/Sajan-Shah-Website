'use client';
import React from 'react';
import { motion } from 'framer-motion';

export const DonateCTA: React.FC = () => {
  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#f26522]/10 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full"></div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight uppercase">
              YOUR CONTRIBUTION <br />
              <span className="text-[#f26522]">SAVES LIVES.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Every rupee donated goes directly towards providing neuroscience-backed education, health drives, and sustainable tools for children who need it most.
            </p>
            
            <div className="flex flex-col items-center gap-6">
              <button 
                onClick={() => window.location.href = '/donate'}
                className="bg-[#f26522] hover:bg-white hover:text-black text-white font-bold py-5 px-12 rounded-full transition-all duration-500 uppercase tracking-widest text-sm shadow-2xl shadow-[#f26522]/20"
              >
                Donate Now
              </button>
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium uppercase tracking-[0.2em]">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Impact Transparency: 100% Audit-Ready
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
