'use client';

import React from 'react';
import { motion } from 'framer-motion';

const stories = [
  { id: 1, image: '/Stories of Transformation/1.jpeg' },
  { id: 2, image: '/Stories of Transformation/2.jpeg' },
  { id: 3, image: '/Stories of Transformation/3.jpeg' },
  { id: 4, image: '/Stories of Transformation/4.jpeg' },
  { id: 5, image: '/Stories of Transformation/5.jpeg' },
  { id: 6, image: '/Stories of Transformation/6.jpeg' },
  { id: 7, image: '/Stories of Transformation/7.jpeg' },
  { id: 8, image: '/Stories of Transformation/8.jpeg' },
  { id: 9, image: '/Stories of Transformation/9.jpeg' },
  { id: 10, image: '/Stories of Transformation/10.jpeg' },
  { id: 11, image: '/Stories of Transformation/11.jpeg' },
  { id: 13, image: '/Stories of Transformation/13.jpeg' },
  { id: 14, image: '/Stories of Transformation/14.jpeg' },
  { id: 15, image: '/Stories of Transformation/15.jpeg' },
  { id: 16, image: '/Stories of Transformation/16.jpeg' },
  { id: 17, image: '/Stories of Transformation/17.jpeg' },
  { id: 18, image: '/Stories of Transformation/18.jpeg' },
];

export const ProductsTransformation: React.FC = () => {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black text-gray-900 mb-4 tracking-tighter"
          >
            Stories of <span className="text-[#f26522]">Transformation</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-500 font-light"
          >
            Real journeys. Real struggles. Real breakthroughs.
          </motion.p>
        </div>
      </div>

      {/* Horizontal Scrolling Slider */}
      <div className="relative overflow-hidden">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 60,
              ease: "linear",
            },
          }}
          className="flex gap-8 whitespace-nowrap w-max"
        >
          {[...stories, ...stories].map((story, index) => (
            <div 
              key={`${story.id}-${index}`} 
              className="relative w-[260px] md:w-[320px] h-[360px] md:h-[450px] bg-[#0a0a0a] rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl border border-gray-100/10 shrink-0 flex items-center justify-center group"
            >
              {/* Premium blurred backdrop to fill aspect ratio without ugly bars */}
              <div 
                className="absolute inset-0 bg-cover bg-center blur-3xl opacity-60 scale-125 group-hover:scale-150 group-hover:opacity-80 transition-all duration-1000 ease-out"
                style={{ backgroundImage: `url('${story.image}')` }}
              />
              <div className="absolute inset-0 bg-black/20 z-0"></div>
              {/* Main uncropped image */}
              <img 
                src={story.image} 
                alt="Transformation Story"
                className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          ))}
        </motion.div>
        
        {/* Gradients to fade edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
      </div>
    </section>
  );
};
