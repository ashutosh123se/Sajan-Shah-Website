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
  'A life-changing multi-day experience',
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
      <div className="max-w-4xl mx-auto flex flex-col gap-24">

        {/* 1. Motivation vs System Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4"
        >
          <p className="text-3xl md:text-5xl font-light text-gray-500 leading-snug">
            Motivation gives you a push.
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight tracking-tighter">
            Sajan Shah gives you a <span className="text-[#f26522]">system.</span>
          </h2>
        </motion.div>

        {/* 2. Focus Areas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-gray-400">His work focuses on</p>
            <div className="w-12 h-1 bg-[#f26522] mx-auto mt-6"></div>
          </div>

          <div className="flex flex-col gap-6 md:gap-8 max-w-3xl mx-auto">
            {data.focusAreas.map((area, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="flex items-start gap-4 text-left"
              >
                <div className="mt-1.5 w-2 h-2 rounded-full bg-[#f26522] shrink-0"></div>
                <div>
                  <h3 className="text-xl text-gray-900 font-bold mb-1">{area.title}</h3>
                  <p className="text-gray-500 text-sm md:text-base leading-relaxed">{area.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 3. Delivery Formats & Ultimate Outcome */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-black text-white rounded-3xl p-10 md:p-16 text-center shadow-2xl relative overflow-hidden"
        >
          {/* subtle background accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#f26522] opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <p className="text-xs font-black uppercase tracking-[0.4em] text-gray-500 mb-8 relative z-10">Whether it is</p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-16 relative z-10">
            {deliveryFormats.map((item, idx) => (
              <React.Fragment key={idx}>
                <span className="text-lg md:text-xl font-light italic text-gray-300 text-center">{item}</span>
                {idx < deliveryFormats.length - 1 && (
                  <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-[#f26522]"></span>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="w-full h-px bg-white/10 mb-16 relative z-10"></div>

          <div className="relative z-10">
            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-[#f26522] mb-6">
              {data.outcomeTagline}
            </p>
            <h3 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight uppercase">
              <span className="text-gray-500 font-light block mb-2 text-2xl md:text-4xl">Not temporary excitement.</span>
              A&nbsp;&nbsp;&nbsp;&nbsp;PERMANENT&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#f26522]">SHIFT.</span>
            </h3>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
