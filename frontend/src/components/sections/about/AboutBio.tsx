'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const AboutBio: React.FC = () => {
  return (
    <div className="bg-[#fafafa]">
      {/* Narrative Split Section */}
      <section className="py-32 text-gray-900 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 lg:gap-24 items-start">
            
            {/* Left: Sticky Image Container (Mirroring SplitHero) */}
            <div className="lg:w-5/12 lg:sticky lg:top-32 relative group w-full self-start">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="aspect-[3/4] bg-[#0a0a0a] w-full overflow-hidden relative shadow-[20px_20px_60px_rgba(0,0,0,0.1)] group border border-gray-100"
              >
                {/* Overlay with subtle brand glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 transition-opacity duration-700 group-hover:opacity-60"></div>
                
                <img 
                  src="https://webinar.sajanshah.com/assets/mentor-portrait-DVhB0Q8D.jpeg" 
                  alt="Sajan Shah" 
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" 
                />
                
                {/* Floating Frame Element for depth */}
                <div className="absolute -inset-4 border border-gray-100/10 z-0 pointer-events-none"></div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 py-10 border-t border-b border-gray-200"
              >
                <h2 className="text-4xl md:text-6xl font-light mb-3 tracking-tight">Exactly Like...</h2>
                <h2 className="text-4xl md:text-6xl font-extrabold text-[#f26522] uppercase tracking-tighter leading-none">Nobody Else</h2>
              </motion.div>
            </div>

            {/* Right: Text Content (Premium Editorial) */}
            <div className="lg:w-7/12 py-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                {/* Intro Hook */}
                <div className="space-y-6">
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight tracking-tight">
                    Most people try to change their life by pushing harder.
                  </p>
                  <p className="text-2xl md:text-3xl font-light text-[#f26522] leading-tight tracking-tight italic">
                    Sajan Shah teaches something radically different.
                  </p>
                </div>

                <div className="w-16 h-1 bg-[#111] mb-10"></div>
                
                <div className="space-y-10 text-gray-600 text-xl font-light leading-relaxed">
                  <p className="text-gray-900 font-medium">
                    Change how you think… and your life changes automatically. Because the problem is not your effort. The problem is your wiring. And once that changes, everything changes.
                  </p>
                  
                  <div className="border-l-2 border-[#f26522] pl-8 py-3 bg-white/50 backdrop-blur-sm shadow-sm rounded-r-lg">
                    <p className="font-bold text-gray-900 italic text-2xl">
                      "Sajan Shah is one of India’s youngest motivational speakers and is widely known as the Memory Man of India."
                    </p>
                  </div>

                  <div className="space-y-8">
                    <p>
                      A Speaker at the World Parliament of Religions, 3-Time TEDx Speaker, and Author of 8 Transformational Books, he has impacted over 16+ million lives across the globe.
                    </p>
                    <p>
                      Recognized and appreciated by global icons including <span className="text-gray-900 font-medium">HH Dalai Lama</span>, Tennis Champion <span className="text-gray-900 font-medium">Roger Federer</span>, and World Peace Ambassador <span className="text-gray-900 font-medium">Acharya Lokesh</span>.
                    </p>
                  </div>
                  
                  <div className="pt-16 pb-12 border-t border-gray-100 mt-20">
                    <h4 className="text-gray-400 font-bold mb-6 uppercase tracking-[0.3em] text-[12px]">The Core Truth</h4>
                    <p className="text-4xl md:text-5xl font-light italic text-gray-300 leading-tight">
                      "He doesn't just inspire people. <br />
                      <span className="text-[#f26522] font-bold not-italic text-gray-900">He rewires them.</span>"
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
