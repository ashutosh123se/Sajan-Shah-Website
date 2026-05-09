'use client';
import React, { useState } from 'react';

export const IntroVideo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-24 md:py-32 bg-white text-center border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4 tracking-wide">
          See for yourself...
        </h2>
        <p className="text-sm md:text-base text-gray-500 mb-16 uppercase tracking-[0.2em] font-semibold">
          Experience the Transformation
        </p>

        {/* Video Player mimicking the reference */}
        <div 
          className="relative aspect-video bg-black w-full max-w-5xl mx-auto shadow-2xl group cursor-pointer mb-24 overflow-hidden" 
          onClick={() => setIsModalOpen(true)}
        >
          <img src="/video-thumbnail.jpg" alt="Video Thumbnail" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
          
          {/* Custom Play Button Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors duration-500">
            <div className="w-24 h-24 bg-[#f26522] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(242,101,34,0.6)] transform group-hover:scale-110 transition-transform pl-2">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
          
          {/* Fake Video Controls Strip */}
          <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-black/90 to-transparent flex items-end pb-3 px-4 justify-between">
             <div className="flex items-center space-x-4">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                <div className="text-white text-xs font-mono">03:45</div>
             </div>
             <div className="flex-1 mx-6 h-1 bg-gray-600 relative mb-2">
                <div className="absolute top-0 left-0 h-full w-1/3 bg-[#f26522]"></div>
             </div>
             <div className="flex items-center space-x-4 text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M6.5 9L3 12m0 0l3.5 3M3 12h18"/></svg>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
             </div>
          </div>
        </div>

        {/* Large Testimonial as seen in reference */}
        <div className="max-w-4xl mx-auto px-4 mt-10">
          <h3 className="text-2xl md:text-3xl lg:text-4xl text-[#f26522] font-light leading-relaxed mb-8">
            "Sajan was phenomenal! He delivered an engaging and powerful message to our audience that allowed them to view their roles and power to influence in an entirely new light. His teachings are principal based and he has the ability to connect to any crowd!"
          </h3>
          <p className="text-base text-gray-500 uppercase tracking-widest font-bold">
            Event Organizer, Global Leadership Summit
          </p>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 p-4" onClick={() => setIsModalOpen(false)}>
            <div className="relative w-full max-w-5xl aspect-video bg-black shadow-2xl" onClick={e => e.stopPropagation()}>
              <button onClick={() => setIsModalOpen(false)} className="absolute -top-12 right-0 text-white hover:text-[#f26522] z-10 transition-colors">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Sajan Shah Transformation"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
