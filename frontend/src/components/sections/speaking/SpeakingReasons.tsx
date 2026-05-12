'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const SpeakingReasons: React.FC = () => {
  const reasons = [
    {
      number: '1',
      title: 'Customized',
      description: 'Every session is personally crafted by Sajan to suit your unique audience, industry, desired outcomes and meeting constraints.'
    },
    {
      number: '2',
      title: 'Impactful',
      description: "Sajan's deep understanding of human psychology and behavioral change ensures your audience experiences a shift that lasts."
    },
    {
      number: '3',
      title: 'Experienced',
      description: 'With over a decade of global speaking experience, Sajan has the confidence and expertise to handle any audience, big or small.'
    },
    {
      number: '4',
      title: 'Professional',
      description: "Sajan takes his responsibility seriously. From pre-event briefings to post-event engagement, he is dedicated to serving your objectives."
    },
    {
      number: '5',
      title: 'Relatable',
      description: 'Whether it is a room full of students or a boardroom of CEOs, Sajan has a unique ability to connect and resonate with everyone.'
    },
    {
      number: '6',
      title: 'Results-Driven',
      description: "Sajan doesn't just deliver a speech; he delivers a transformation. His focus is always on driving real action and tangible results."
    }
  ];

  return (
    <section className="py-32 bg-black text-white px-6 md:px-16 overflow-hidden border-t border-gray-900">
      <div className="max-w-6xl mx-auto">
        
        {/* Phil M Jones Style Title - Precise Recreation */}
        <div className="text-center mb-32">
          <h2 className="text-[120px] md:text-[180px] font-bold leading-none mb-0 text-white tracking-tighter">6</h2>
          <div className="space-y-1">
            <p className="text-2xl md:text-3xl font-light tracking-tight uppercase">
              <span className="text-[#f26522] font-black mr-2">BIG</span> 
              reasons that people 
            </p>
            <p className="text-2xl md:text-3xl font-light tracking-tight uppercase">
              <span className="text-[#f26522] font-black mr-2">LOVE</span> 
              working with Sajan
            </p>
          </div>
        </div>

        {/* Reasons Grid - Precise Recreation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-20">
          {reasons.map((reason, idx) => (
            <div key={idx} className="flex items-start gap-8 group">
              {/* Number and Line Column */}
              <div className="flex items-center gap-6 shrink-0 pt-1">
                <div className="w-8 h-[2px] bg-[#f26522]"></div>
                <span className="text-7xl md:text-8xl font-black text-white leading-none">
                  {reason.number}
                </span>
              </div>

              {/* Content Column */}
              <div className="pt-2">
                <h3 className="text-2xl md:text-3xl font-bold mb-5 tracking-tight text-white group-hover:text-[#f26522] transition-colors">
                  {reason.title}
                </h3>
                <p className="text-gray-400 font-light leading-relaxed text-sm md:text-[15px] max-w-[340px]">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
