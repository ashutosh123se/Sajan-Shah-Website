'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const AboutMissionVision: React.FC = () => {
  return (
    <section className="py-24 bg-white text-black px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-[#f26522] text-xs font-bold uppercase tracking-[0.3em]">Mission</h3>
            <h2 className="text-3xl md:text-5xl font-light leading-tight">
              Igniting a global movement to inspire <span className="font-bold">1.2 billion young minds.</span>
            </h2>
            <p className="text-gray-500 text-lg font-light leading-relaxed">
              To think differently, act consciously, and create extraordinary impact in the world.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 lg:border-l lg:border-gray-100 lg:pl-16"
          >
            <h3 className="text-[#f26522] text-xs font-bold uppercase tracking-[0.3em]">Vision</h3>
            <h2 className="text-3xl md:text-5xl font-light leading-tight">
              A world powered by <span className="font-bold">clarity and awareness.</span>
            </h2>
            <p className="text-gray-500 text-lg font-light leading-relaxed">
              To build a world where individuals are not driven by pressure, but powered by a rewired mind.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
