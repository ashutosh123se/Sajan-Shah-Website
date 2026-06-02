'use client';

import React from 'react';

interface SpeakingLogosProps {
  content?: {
    label?: string;
  };
}

export const SpeakingLogos: React.FC<SpeakingLogosProps> = ({ content }) => {
  const label = content?.label || 'Trusted by:';

  return (
    <section className="py-12 bg-white border-y border-gray-100 shadow-xl relative z-20 mt-0 mx-6 md:mx-16 rounded-xl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 w-full">
          <div className="shrink-0">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs md:text-sm mb-2 lg:mb-0">{label}</p>
            <div className="w-12 h-0.5 bg-[#f26522] hidden lg:block mt-1"></div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <img 
              src="/SPEAKINGlogo.png" 
              alt="Trusted by TATA, TEDx, Parliament of World's Religions, Khushi, Zydus" 
              className="h-12 md:h-16 lg:h-20 w-auto object-contain scale-110 md:scale-125 origin-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
