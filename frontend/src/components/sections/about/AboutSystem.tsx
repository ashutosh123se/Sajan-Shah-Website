'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AboutSystemProps {
  content?: {
    tagline?: string;
    heading?: string;
    focusAreas?: Array<{ title: string; desc: string }>;
    outcomeTagline?: string;
    outcomeQuote?: string;
  };
}

const deliveryFormats = [
  'A high-energy keynote',
  'A deep transformation workshop',
  'Or a life-changing multi-day experience',
];

export const AboutSystem: React.FC<AboutSystemProps> = ({ content }) => {
  const data = {
    tagline: content?.tagline || 'The Work',
    heading: content?.heading || 'The Work That Creates<br />Real Transformation',
    focusAreas: content?.focusAreas || [
      {
        title: 'Reprogramming Thinking Patterns',
        desc: 'Identifying and breaking the mental loops that hold you back from your potential.'
      },
      {
        title: 'Unstoppable Mental Discipline',
        desc: 'Building the internal strength to stay committed when motivation fades.'
      },
      {
        title: 'Enhancing Memory & Focus',
        desc: 'Mastering the cognitive tools to process and retain information at world-class levels.'
      },
      {
        title: 'Clarity in Decision-Making',
        desc: 'Eliminating mental fog to make high-stakes choices with absolute certainty.'
      },
      {
        title: 'Designing Habits of Success',
        desc: 'Creating automated systems of behavior that sustain long-term peak performance.'
      }
    ],
    outcomeTagline: content?.outcomeTagline || 'The Ultimate Outcome',
    outcomeQuote: content?.outcomeQuote || 'Not temporary excitement. <br />A PERMANENT SHIFT.'
  };

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
          <p className="text-[#f26522] text-[10px] font-black uppercase tracking-[0.5em] mb-6">{data.tagline}</p>
          <h2 
            className="text-4xl md:text-6xl font-black tracking-tighter text-gray-900 leading-none uppercase mb-6"
            dangerouslySetInnerHTML={{ __html: data.heading }}
          />
          <div className="w-16 h-1 bg-[#f26522] mx-auto mt-8"></div>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left Column: Focus Areas */}
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
              <ul className="space-y-8">
                {data.focusAreas.map((area, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    className="flex items-start gap-4"
                  >
                    <span className="mt-2 w-2 h-2 rounded-full bg-[#f26522] flex-shrink-0"></span>
                    <div className="space-y-1">
                      <span className="text-xl text-gray-900 font-bold leading-none block">{area.title}</span>
                      <p className="text-gray-500 text-sm font-light leading-relaxed">{area.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right Column: Delivery Formats & Outcome */}
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
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#f26522] mb-6">{data.outcomeTagline}</p>
              <div 
                className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight uppercase"
                dangerouslySetInnerHTML={{ __html: data.outcomeQuote.replace('<br />', '<br /><span className="text-[#f26522]">') + '</span>' }}
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
