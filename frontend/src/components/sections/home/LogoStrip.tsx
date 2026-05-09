'use client';
import React from 'react';

export const LogoStrip: React.FC = () => {
  return (
    <section className="bg-black pt-16 pb-0">
      {/* Logos Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-center text-sm md:text-base text-gray-500 uppercase tracking-[0.2em] font-semibold mb-10">Trusted by Millions. Recognized Globally.</h2>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="text-2xl md:text-3xl font-black text-white">Forbes</div>
          <div className="text-2xl md:text-3xl font-black text-white">TEDx</div>
          <div className="text-2xl md:text-3xl font-black text-white">Times of India</div>
          <div className="text-2xl md:text-3xl font-black text-white">BBC</div>
          <div className="text-2xl md:text-3xl font-black text-white">CNN</div>
        </div>
      </div>

      {/* Subscribe Banner mimicking the reference design */}
      <div className="w-full bg-[#0a0a0a] py-24 border-t border-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
          
          {/* Left: Image composition (Using placeholders representing the books/workbooks) */}
          <div className="lg:w-2/5 flex justify-center lg:justify-end relative h-64 w-full">
             <div className="absolute inset-0 flex items-center justify-center lg:justify-end pr-0 lg:pr-10">
                <div className="w-40 h-56 md:w-48 md:h-64 bg-[#111] border border-gray-800 shadow-[20px_20px_40px_rgba(0,0,0,0.8)] transform -rotate-6 z-10 flex flex-col justify-between p-4">
                  <div className="h-3 md:h-4 w-full bg-[#f26522]"></div>
                  <div className="text-white text-[10px] md:text-xs font-bold mt-2 uppercase">Actionable Insights</div>
                  <div className="flex-1 mt-4 space-y-2">
                    <div className="h-1.5 md:h-2 bg-gray-700 w-full"></div>
                    <div className="h-1.5 md:h-2 bg-gray-700 w-5/6"></div>
                    <div className="h-1.5 md:h-2 bg-gray-700 w-4/6"></div>
                  </div>
                </div>
                <div className="w-40 h-56 md:w-48 md:h-64 bg-[#111] border border-gray-800 shadow-[20px_20px_40px_rgba(0,0,0,0.8)] transform rotate-6 z-0 flex flex-col justify-between p-4 ml-[-40px] md:ml-[-60px]">
                  <div className="h-3 md:h-4 w-full bg-[#f26522]"></div>
                  <div className="text-white text-[10px] md:text-xs font-bold mt-2 uppercase">Neuroscience</div>
                  <div className="flex-1 mt-4 space-y-2">
                    <div className="h-1.5 md:h-2 bg-gray-700 w-full"></div>
                    <div className="h-1.5 md:h-2 bg-gray-700 w-3/4"></div>
                  </div>
                </div>
             </div>
          </div>

          {/* Right: Text and Form */}
          <div className="lg:w-3/5 text-center lg:text-left z-20">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-10 leading-snug">
              Actionable insights, neuroscience-backed strategies, and powerful shifts – all in exchange for your email address...
            </h2>
            
            <form className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full max-w-xl mx-auto lg:mx-0" onSubmit={e => e.preventDefault()}>
              <input 
                type="text" 
                placeholder="Name" 
                className="px-5 py-4 bg-white text-gray-900 border-none outline-none w-full sm:w-1/2 shadow-inner text-sm md:text-base font-medium" 
                required 
              />
              <input 
                type="email" 
                placeholder="Email address" 
                className="px-5 py-4 bg-white text-gray-900 border-none outline-none w-full sm:w-1/2 shadow-inner text-sm md:text-base font-medium" 
                required 
              />
              <button 
                type="submit" 
                className="bg-[#f26522] hover:bg-[#d95a1e] text-white px-8 py-4 font-bold tracking-wide transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  );
};
