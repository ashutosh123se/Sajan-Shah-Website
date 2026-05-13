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

export const AboutSystem: React.FC<AboutSystemProps> = ({ content }) => {
  const data = {
    tagline: content?.tagline || 'Transformation System',
    heading: content?.heading || 'Motivation is a push. <br />A System is a solution.',
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
      <div className="max-w-4xl mx-auto">
        <div className="space-y-16">
          <div className="space-y-4 text-center">
            <h3 className="text-[#f26522] text-[10px] font-black uppercase tracking-[0.5em]">{data.tagline}</h3>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 leading-none" dangerouslySetInnerHTML={{ __html: data.heading }}>
            </h2>
          </div>

          <div className="space-y-14 relative pl-8 md:pl-12 border-l border-gray-100 mt-20">
            {data.focusAreas.map((area, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                className="relative"
              >
                {/* Step Marker */}
                <div className="absolute -left-[37px] md:-left-[53px] top-0 w-4 h-4 rounded-full bg-white border-2 border-[#f26522] shadow-sm"></div>
                
                <div className="space-y-2">
                  <span className="text-[#f26522] text-[10px] font-bold tracking-widest uppercase opacity-60">Phase 0{idx + 1}</span>
                  <h4 className="text-2xl font-bold tracking-tight text-gray-900">{area.title}</h4>
                  <p className="text-gray-500 text-lg font-light leading-relaxed">
                    {area.desc}
                  </p>
                </div>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mt-24 p-12 bg-white border border-gray-100 rounded-[2.5rem] text-center shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-[#f26522] to-transparent"></div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#f26522] mb-6">{data.outcomeTagline}</h4>
              <p className="text-2xl md:text-4xl font-light italic text-gray-400 leading-tight" dangerouslySetInnerHTML={{ __html: data.outcomeQuote }}>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
