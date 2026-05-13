'use client';

import React from 'react';
import { motion } from 'framer-motion';

const focusAreas = [
  'Reprogramming thinking patterns',
  'Building unstoppable mental discipline',
  'Enhancing memory and focus',
  'Creating clarity in decision-making',
  'Designing habits that sustain success',
];

const deliveryFormats = [
  'A high-energy keynote',
  'A deep transformation workshop',
  'Or a life-changing multi-day experience',
];

export const AboutSystem: React.FC = () => {
  return (
    <section className="py-32 bg-[#fafafa] text-gray-900 px-4 border-t border-gray-100">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <p className="text-[#f26522] text-[10px] font-black uppercase tracking-[0.5em] mb-6">The Work</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-gray-900 leading-none uppercase mb-6">
            The Work That Creates<br />
            <span className="text-[#f26522]">Real Transformation</span>
          </h2>
          <div className="w-16 h-1 bg-[#f26522] mx-auto mt-8"></div>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            {/* Motivation vs System */}
            <div className="space-y-4">
              <p className="text-2xl md:text-3xl font-light text-gray-500 leading-snug">
                Motivation gives you a push.
              </p>
              <p className="text-2xl md:text-3xl font-black text-gray-900 leading-snug tracking-tight">
                Sajan Shah gives you a system.
              </p>
            </div>

            <div className="w-12 h-px bg-gray-200"></div>

            {/* His work focuses on */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-6">His work focuses on</p>
              <ul className="space-y-4">
                {focusAreas.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    className="flex items-start gap-4"
                  >
                    <span className="mt-2 w-2 h-2 rounded-full bg-[#f26522] flex-shrink-0"></span>
                    <span className="text-lg text-gray-700 font-medium leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            {/* Whether it is */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-6">Whether it is</p>
              <ul className="space-y-4">
                {deliveryFormats.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    className="flex items-start gap-4"
                  >
                    <span className="mt-2 w-2 h-2 rounded-full bg-gray-300 flex-shrink-0"></span>
                    <span className="text-lg text-gray-600 font-light leading-relaxed italic">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="w-12 h-px bg-gray-200"></div>

            {/* Closing Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-3"
            >
              <p className="text-xl text-gray-400 font-light leading-relaxed">
                The result is not temporary excitement.
              </p>
              <p className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-none uppercase">
                The result is a <span className="text-[#f26522]">permanent shift.</span>
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};


