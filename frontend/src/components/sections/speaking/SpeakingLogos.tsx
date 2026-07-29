'use client';

import React from 'react';

interface SpeakingLogosProps {
  content?: {
    label?: string;
    logos?: Array<{
      name?: string;
      imageUrl?: string;
      displayType?: string;
    }> | string[];
  };
}

export const SpeakingLogos: React.FC<SpeakingLogosProps> = ({ content }) => {
  const label = content?.label || 'Trusted by:';
  const logos = content?.logos || [];

  const logoNames = logos.map((logo) => (typeof logo === 'string' ? logo : logo.name || '')).filter(Boolean);

  return (
    <section className="py-12 bg-white border-y border-gray-100 shadow-xl relative z-20 mt-0 mx-6 md:mx-16 rounded-xl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 w-full">
          <div className="shrink-0">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs md:text-sm mb-2 lg:mb-0">{label}</p>
            <div className="w-12 h-0.5 bg-[#f26522] hidden lg:block mt-1"></div>
          </div>

          <div className="flex-1 flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {logoNames.length > 0 ? (
              logoNames.map((name) => (
                <span key={name} className="text-gray-800 font-black tracking-tight text-lg md:text-2xl uppercase">
                  {name}
                </span>
              ))
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/SPEAKINGlogo.png"
                alt="Trusted partners"
                className="h-12 md:h-16 lg:h-20 w-auto object-contain scale-110 md:scale-125 origin-center"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
