'use client';

import React from 'react';
import { motion } from 'framer-motion';

const stories = [
  { id: 1, image: 'https://placehold.co/800x600/0a0a0a/f26522?text=STORY+1' },
  { id: 2, image: 'https://placehold.co/800x600/0a0a0a/3b82f6?text=STORY+2' },
  { id: 3, image: 'https://placehold.co/800x600/0a0a0a/10b981?text=STORY+3' },
  { id: 4, image: 'https://placehold.co/800x600/0a0a0a/f26522?text=STORY+4' },
  { id: 5, image: 'https://placehold.co/800x600/0a0a0a/3b82f6?text=STORY+5' },
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
      <div className="relative">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ 
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          className="flex gap-8 whitespace-nowrap"
        >
          {[...stories, ...stories].map((story, index) => (
            <div 
              key={`${story.id}-${index}`} 
              className="w-[400px] md:w-[600px] aspect-video bg-gray-100 rounded-[40px] overflow-hidden shadow-xl border border-gray-100 shrink-0"
            >
              <img 
                src={story.image} 
                alt="Transformation Story"
                className="w-full h-full object-cover"
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
