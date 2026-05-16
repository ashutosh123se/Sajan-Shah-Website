'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const SpeakingMessage: React.FC = () => {
  return (
    <section id="message" className="py-24 bg-white text-gray-900 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          
          {/* Left Column: Title + Image */}
          <div className="lg:w-1/3 flex flex-col space-y-12">
            <div className="space-y-4">
              <div className="w-16 h-0.5 bg-gray-200"></div>
              <h2 className="text-4xl font-light leading-tight">
                A Personal <br />
                <span className="font-bold">Message From</span><br />
                <span className="text-[#f26522] italic font-serif text-5xl">Sajan Shah</span>
              </h2>
              <div className="w-full h-0.5 bg-gray-200"></div>
            </div>

            <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-2xl">
              <img 
                src="/Sir Speaking.jpeg" 
                alt="Sajan Shah" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column: Message Content */}
          <div className="lg:w-2/3 pt-4">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8 text-lg md:text-xl font-light text-gray-700 leading-relaxed"
            >
              <p>Firstly, I want to begin by saying <span className="italic font-normal">thank you.</span></p>
              
              <p>
                Being considered to impact your audience is not just an opportunity, 
                it is a responsibility I deeply value.
              </p>

              <p className="text-2xl font-normal text-gray-900">
                Every session I deliver is designed with one objective: 
                <span className="text-[#f26522]"> to create a shift that lasts beyond the event.</span>
              </p>

              <p>
                This page is created to help you understand how we can work together, 
                what your audience will experience, and the transformation they can expect.
              </p>

              <p>
                Whether your event is live, virtual, or hybrid, the focus remains the same:
              </p>

              <div className="flex flex-wrap gap-8 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#f26522]"></div>
                  <span className="font-bold tracking-tighter text-3xl">Clarity.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#f26522]"></div>
                  <span className="font-bold tracking-tighter text-3xl">Action.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#f26522]"></div>
                  <span className="font-bold tracking-tighter text-3xl">Results.</span>
                </div>
              </div>

              <p>
                My commitment is simple, to deliver an experience that engages your audience, 
                challenges their thinking, and drives real change.
              </p>

              <p>
                Take a moment to explore, and see how we can create something impactful together.
              </p>

              <div className="pt-12">
                <p className="text-gray-500 italic mb-2">With Purpose,</p>
                <h3 className="text-4xl font-serif italic text-gray-900">Sajan Shah</h3>
                <div className="mt-2">
                  <img 
                    src="/sir sign.png" 
                    alt="Sajan Shah Signature" 
                    className="h-20 w-auto opacity-90 contrast-125"
                  />
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
