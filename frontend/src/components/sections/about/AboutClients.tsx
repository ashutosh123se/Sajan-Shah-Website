'use client';

import React from 'react';

export const AboutClients: React.FC = () => {
  return (
    <section className="py-24 bg-white text-black border-t border-gray-100">
      <div className="w-full">
        <div className="text-center mb-16 px-4">
          <h3 className="text-[#f26522] text-xs font-bold uppercase tracking-[0.3em] mb-4">Partnerships</h3>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Previous Delighted <span className="text-gray-400 font-light italic">Clients</span>
          </h2>
          <div className="w-16 h-1 bg-[#f26522] mx-auto mt-6"></div>
        </div>

        <div className="w-full">
          <img 
            src="/LOGO.png" 
            alt="Previous Delighted Clients" 
            className="w-full h-auto block"
          />
        </div>
      </div>
    </section>
  );
};
