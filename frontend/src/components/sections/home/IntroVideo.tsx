'use client';
import React, { useState } from 'react';

export const IntroVideo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle body scroll locking
  React.useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <section className="py-24 md:py-32 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#f26522]/5 rounded-full filter blur-[120px] -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <p className="text-[#f26522] font-bold text-sm tracking-[0.4em] uppercase mb-6">Experience The Energy</p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-16 leading-tight tracking-tight">
          Witness the <span className="font-bold">Transformation.</span>
        </h2>

        {/* Cinematic Video Player Container */}
        <div 
          className="relative aspect-video w-full max-w-5xl mx-auto shadow-[0_30px_60px_rgba(0,0,0,0.8)] group cursor-pointer mb-24 overflow-hidden border border-gray-900 rounded-sm" 
          onClick={() => setIsModalOpen(true)}
        >
          {/* Main Looping Video Background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <video
              src="/sajan_intro.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/40"></div>
          </div>
          
          {/* Subtle Hover Indicator */}
          <div className="absolute inset-0 flex items-center justify-center bg-[#f26522]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <p className="text-white font-bold tracking-[0.4em] uppercase text-xs border border-white/20 px-6 py-3 backdrop-blur-md">Expand Showreel</p>
          </div>
          
          {/* Aesthetic Controls Strip */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
            <div className="h-full w-1/3 bg-[#f26522] group-hover:w-full transition-all duration-[10s] ease-linear"></div>
          </div>
        </div>

        {/* Premium Quote Section */}
        <div className="max-w-4xl mx-auto px-4 mt-16">
          <div className="relative">
            <svg className="absolute -top-12 -left-8 w-20 h-20 text-gray-900 -z-10" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H10.017C9.46472 13 9.017 12.5523 9.017 12V9C9.017 7.89543 9.91243 7 11.017 7H15.017C16.1216 7 17.017 7.89543 17.017 9V15C17.017 16.1046 16.1216 17 15.017 17H14.017V21H14.017ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.017C5.46472 8 5.017 8.44772 5.017 9V12C5.017 12.5523 4.56929 13 4.017 13H1.017C0.464722 13 -0.017 12.5523 -0.017 12V9C-0.017 7.89543 0.878432 7 1.983 7H6.017C7.12157 7 8.017 7.89543 8.017 9V15C8.017 16.1046 7.12157 17 6.017 17H5.017V21H5.017Z"/></svg>
            <h3 className="text-2xl md:text-3xl text-gray-300 font-light leading-relaxed italic mb-8 relative z-10">
              "Sajan was phenomenal! He delivered a message that allowed our audience to view their power to influence in an entirely new light. He has the rare ability to connect to any crowd instantly."
            </h3>
          </div>
          <div className="w-12 h-1 bg-[#f26522] mx-auto mb-6"></div>
          <p className="text-sm text-gray-500 uppercase tracking-[0.3em] font-bold">
            Executive Director, Global Leadership Summit
          </p>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-12 backdrop-blur-xl" onClick={() => setIsModalOpen(false)}>
            <div className="relative w-full max-w-6xl aspect-video bg-black shadow-[0_0_100px_rgba(242,101,34,0.3)] border border-white/5" onClick={e => e.stopPropagation()}>
              {/* Close Button Top Right */}
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="absolute -top-16 right-0 md:-right-12 text-white hover:text-[#f26522] transition-all duration-300 transform hover:rotate-90 p-2"
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <video
                src="/sajan_intro.mp4"
                controls
                autoPlay
                className="w-full h-full rounded-sm"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
