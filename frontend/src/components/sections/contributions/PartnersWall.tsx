'use client';

import React from 'react';

interface PartnersWallProps {
  content?: {
    heading?: string;
    logoUrl?: string;
  };
}

export const PartnersWall: React.FC<PartnersWallProps> = ({ content }) => {
  const heading = content?.heading || "Our Supportive Organizations";
  const logoUrl = content?.logoUrl || "/CONTRIBUTIONS LOGO.png";

  return (
    <section className="py-40 bg-[#050505]">
      <div className="w-full">
        <div className="text-center">
          <h3 className="text-xl md:text-3xl font-bold text-gray-800 uppercase tracking-[0.6em] mb-16">{heading}</h3>

          <div className="relative group w-full px-4 md:px-12">
            <div className="absolute inset-0 bg-gradient-to-r from-[#f26522]/5 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <img
              src={logoUrl}
              alt="Institution Partners Logo Wall"
              className="w-full h-auto object-contain relative z-10 opacity-60 group-hover:opacity-100 transition-all duration-1000 grayscale group-hover:grayscale-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
