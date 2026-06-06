'use client';

import React from 'react';
import { motion } from 'framer-motion';

const stories = [
  { id: 1, image: '/T2/1.jpeg' },
  { id: 2, image: '/T2/2.jpeg' },
  { id: 3, image: '/T2/3.jpeg' },
  { id: 4, image: '/T2/4.jpeg' },
  { id: 5, image: '/T2/5.jpeg' },
  { id: 6, image: '/T2/6.jpeg' },
  { id: 7, image: '/T2/7.jpeg' },
  { id: 8, image: '/T2/8.jpeg' },
  { id: 9, image: '/T2/9.jpeg' },
  { id: 10, image: '/T2/10.jpeg' },
  { id: 11, image: '/T2/11.jpeg' },
  { id: 13, image: '/T2/13.jpeg' },
  { id: 14, image: '/T2/14.jpeg' },
  { id: 15, image: '/T2/15.jpeg' },
  { id: 16, image: '/T2/16.jpeg' },
  { id: 17, image: '/T2/17.jpeg' },
  { id: 18, image: '/T2/18.jpeg' },
  { id: 19, image: '/T2/19.jpeg' },
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
            Recognized By <span className="text-[#f26522]">The Media</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-500 font-light"
          >
            <i>Remembered By The People</i>
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
              className="w-[240px] md:w-[300px] rounded-[20px] md:rounded-[28px] overflow-hidden shadow-lg border border-gray-200 shrink-0 bg-white"
            >
              <img
                src={story.image}
                alt="Media Recognition"
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
