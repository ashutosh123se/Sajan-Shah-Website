'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AboutHero } from '@/components/sections/about/AboutHero';
import { AboutMissionVision } from '@/components/sections/about/AboutMissionVision';
import { AboutBio } from '@/components/sections/about/AboutBio';
import { AboutSystem } from '@/components/sections/about/AboutSystem';
import { AboutMovement } from '@/components/sections/about/AboutMovement';
import { AboutAccolades } from '@/components/sections/about/AboutAccolades';
import { AboutClients } from '@/components/sections/about/AboutClients';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#f26522]/30">
      
      {/* 1. Cinematic Hero Section */}
      <AboutHero />

      {/* 2. Mission & Vision (White High Contrast) */}
      <AboutMissionVision />

      {/* 3. Biography Section (Exactly Like... Nobody Else) */}
      <AboutBio />

      {/* 4. Transformation System (Roadmap) */}
      <AboutSystem />

      {/* 5. Movement Builder (Split Layout) */}
      <AboutMovement />

      {/* 6. Noteworthy Accolades (Recognition List) */}
      <AboutAccolades />

      {/* 7. Previous Delighted Clients */}
      <AboutClients />

      {/* 7. Final Positioning Section */}
      <section className="py-32 bg-white text-center px-4 border-t border-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-3xl md:text-5xl font-light text-gray-400 italic mb-10 leading-tight">
            "You don't need more motivation.<br />
            You need a <span className="text-black font-bold not-italic underline decoration-[#f26522] decoration-4 underline-offset-8">rewired mind.</span>"
          </h3>
          <div className="w-20 h-1 bg-[#f26522] mx-auto mb-16"></div>
          
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-12 py-5 bg-black text-white font-bold uppercase tracking-widest hover:bg-[#f26522] transition-colors duration-300"
          >
            Start Your Transformation
          </motion.a>
        </motion.div>
      </section>

    </main>
  );
}
