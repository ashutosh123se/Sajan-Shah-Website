'use client';

import React from 'react';
import { motion } from 'framer-motion';

const categories = [
  {
    id: 1,
    title: 'BOOKS',
    description: 'Build the Foundation of Your Thinking',
    cta: 'Explore Books →',
    link: '#books',
    image: 'https://placehold.co/800x1000/0a0a0a/f26522?text=BOOKS',
  },
  {
    id: 2,
    title: 'COURSES',
    description: 'Step-by-Step Systems for Real Growth',
    cta: 'Explore Courses →',
    link: '#courses',
    image: 'https://placehold.co/800x1000/0a0a0a/3b82f6?text=COURSES',
  },
  {
    id: 3,
    title: 'MERCHANDISE',
    description: 'Wear the Identity You Want to Become',
    cta: 'Explore Merchandise →',
    link: '#merchandise',
    image: 'https://placehold.co/800x1000/0a0a0a/10b981?text=MERCHANDISE',
  },
];

export const ProductCategories: React.FC = () => {
  return (
    <section id="categories" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight uppercase">
            Books | Courses | Merchandise
          </h2>
        </div>

        {/* Cinematic Flip Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* Card 1 - Books */}
          <div
            className="group relative w-full h-[450px] [perspective:1200px] cursor-pointer"
            onClick={() => {
              const el = document.getElementById('books');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = '/products#books';
              }
            }}
          >
            <div className="relative w-full h-full transition-transform duration-[1200ms] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] ease-[cubic-bezier(0.23,1,0.32,1)]">
              
              {/* Front Side */}
              <div className="absolute inset-0 [backface-visibility:hidden] [transform-style:preserve-3d] overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src="/BOOK.png" 
                  alt="Books" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center [transform-style:preserve-3d]">
                  <h3 className="text-4xl md:text-5xl font-light text-white tracking-widest [transform:translateZ(70px)] drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)] uppercase">
                    Books
                  </h3>
                </div>
              </div>

              {/* Back Side */}
              <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] [transform-style:preserve-3d] overflow-hidden rounded-2xl shadow-2xl bg-[#0a0a0a]">
                <img 
                  src="/BOOK.png" 
                  alt="Books" 
                  className="w-full h-full object-cover opacity-20 transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center [transform-style:preserve-3d]">
                  <div className="[transform:translateZ(130px)] flex flex-col items-center">
                    <h3 className="text-3xl md:text-4xl font-light text-white mb-2 drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)] uppercase tracking-wider">
                      BOOKS BY SAJAN SHAH
                    </h3>
                    <p className="text-[#f26522] font-bold text-lg mb-4 tracking-widest uppercase">
                      Don’t Just Read. Transform.
                    </p>
                    <p className="text-white/80 text-sm leading-relaxed mb-10 max-w-xs font-light drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                      Build the Foundation of Your Thinking
                    </p>
                    <span className="inline-block bg-[#f26522] hover:bg-white hover:text-black transition-all duration-500 text-white px-10 py-4 uppercase tracking-[0.3em] text-[10px] font-bold shadow-[0_25px_50px_-12px_rgba(242,101,34,0.5)]">
                      Explore Books →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - Courses */}
          <div
            className="group relative w-full h-[450px] [perspective:1200px] cursor-pointer"
            onClick={() => {
              const el = document.getElementById('courses');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = '/products#courses';
              }
            }}
          >
            <div className="relative w-full h-full transition-transform duration-[1200ms] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] ease-[cubic-bezier(0.23,1,0.32,1)]">
              
              {/* Front Side */}
              <div className="absolute inset-0 [backface-visibility:hidden] [transform-style:preserve-3d] overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src="/COURESE.png" 
                  alt="Courses" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center [transform-style:preserve-3d]">
                  <h3 className="text-4xl md:text-5xl font-light text-white tracking-widest [transform:translateZ(70px)] drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)] uppercase">
                    Courses
                  </h3>
                </div>
              </div>

              {/* Back Side */}
              <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] [transform-style:preserve-3d] overflow-hidden rounded-2xl shadow-2xl bg-[#0a0a0a]">
                <img 
                  src="/COURESE.png" 
                  alt="Courses" 
                  className="w-full h-full object-cover opacity-20 transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center [transform-style:preserve-3d]">
                  <div className="[transform:translateZ(130px)] flex flex-col items-center">
                    <h3 className="text-3xl md:text-4xl font-light text-white mb-6 drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)] uppercase tracking-wider">
                      COURSES BY SAJAN SHAH
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-10 max-w-xs font-light drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                      Step-by-Step Systems for Real Growth
                    </p>
                    <span className="inline-block bg-[#f26522] hover:bg-white hover:text-black transition-all duration-500 text-white px-10 py-4 uppercase tracking-[0.3em] text-[10px] font-bold shadow-[0_25px_50px_-12px_rgba(242,101,34,0.5)]">
                      Explore Courses →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 - Merchandise */}
          <div
            className="group relative w-full h-[450px] [perspective:1200px] cursor-pointer"
            onClick={() => {
              const el = document.getElementById('merchandise');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = '/products#merchandise';
              }
            }}
          >
            <div className="relative w-full h-full transition-transform duration-[1200ms] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] ease-[cubic-bezier(0.23,1,0.32,1)]">
              
              {/* Front Side */}
              <div className="absolute inset-0 [backface-visibility:hidden] [transform-style:preserve-3d] overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src="/MERCHANDISE.png" 
                  alt="Merchandise" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center [transform-style:preserve-3d]">
                  <h3 className="text-4xl md:text-5xl font-light text-white tracking-widest [transform:translateZ(70px)] drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)] uppercase">
                    Merchandise
                  </h3>
                </div>
              </div>

              {/* Back Side */}
              <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] [transform-style:preserve-3d] overflow-hidden rounded-2xl shadow-2xl bg-[#0a0a0a]">
                <img 
                  src="/MERCHANDISE.png" 
                  alt="Merchandise" 
                  className="w-full h-full object-cover opacity-20 transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center [transform-style:preserve-3d]">
                  <div className="[transform:translateZ(130px)] flex flex-col items-center">
                    <h3 className="text-3xl md:text-4xl font-light text-white mb-6 drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)] uppercase tracking-wider">
                      MERCHANDISE
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-10 max-w-xs font-light drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                      Wear the Identity You Want to Become
                    </p>
                    <span className="inline-block bg-[#f26522] hover:bg-white hover:text-black transition-all duration-500 text-white px-10 py-4 uppercase tracking-[0.3em] text-[10px] font-bold shadow-[0_25px_50px_-12px_rgba(242,101,34,0.5)]">
                      Explore Merchandise →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

