'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const SpeakingLogos: React.FC = () => {

  return (
    <section className="py-16 bg-white border-y border-gray-100 shadow-xl relative z-20 mt-0 mx-6 md:mx-16 rounded-xl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 w-full">
          <div className="shrink-0">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-2 lg:mb-0">Trusted by:</p>
            <div className="w-12 h-0.5 bg-[#f26522] hidden lg:block"></div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-20">
            {/* TATA */}
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black tracking-tighter text-[#005a9c]">TATA</span>
            </div>

            {/* TEDx */}
            <div className="flex items-center text-2xl font-black">
              <span className="text-[#e62b1e]">TED</span>
              <span className="text-gray-900 font-light ml-0.5">x</span>
            </div>

            {/* ONGC */}
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold tracking-widest text-gray-800 border-b-2 border-red-600">ONGC</span>
            </div>

            {/* State Bank Of India */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border-4 border-[#00a9e0] flex items-center justify-center">
                <div className="w-1 h-3 bg-white"></div>
              </div>
              <span className="text-lg font-bold text-[#222] tracking-tight">SBI</span>
            </div>

            {/* Zydus */}
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black italic tracking-tighter text-[#004b8d]">Zydus</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
