'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AboutHero } from '@/components/sections/about/AboutHero';
import { AboutMissionVision } from '@/components/sections/about/AboutMissionVision';
import { AboutBio } from '@/components/sections/about/AboutBio';
import { AboutSystem } from '@/components/sections/about/AboutSystem';
import { AboutMovement } from '@/components/sections/about/AboutMovement';
import { AboutAccolades } from '@/components/sections/about/AboutAccolades';
import { AboutClients } from '@/components/sections/about/AboutClients';
import api from '@/lib/api';

interface Section {
  key: string;
  content: any;
  isActive: boolean;
}

export default function AboutPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await api.get('/about');
        if (response.data.success) {
          setSections(response.data.data.sections);
        }
      } catch (error) {
        console.error('Error fetching about sections:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  const getSection = (key: string) => {
    return sections.find(s => s.key === key)?.content;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <img src="/loding.png" alt="Loading" className="animate-spin object-contain h-32 w-32" />
        <div className="font-mono text-xs uppercase tracking-[0.3em]">Loading....</div>
      </div>
    );
  }

  const finalPositioning = getSection('final_positioning') || {
    quote: "You don't need more motivation.<br />You need a rewired mind.",
    ctaText: "Start Your Transformation",
    ctaLink: "/products"
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#f26522]/30">
      
      {/* 1. Cinematic Hero Section */}
      <AboutHero content={getSection('hero')} />

      {/* 2. Mission & Vision (White High Contrast) */}
      <AboutMissionVision content={getSection('mission_vision')} />

      {/* 3. Biography Section (Exactly Like... Nobody Else) */}
      <AboutBio content={getSection('bio')} />

      {/* 4. Transformation System (Roadmap) */}
      <AboutSystem content={getSection('system')} />

      {/* 5. Movement Builder (Split Layout) */}
      <AboutMovement content={getSection('movement')} />

      {/* 6. Noteworthy Accolades (Recognition List) */}
      <AboutAccolades content={getSection('accolades')} />

      {/* 7. Previous Delighted Clients */}
      <AboutClients content={getSection('clients')} />

      {/* 8. Final Positioning Section */}
      <section className="py-32 bg-white text-center px-4 border-t border-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-3xl md:text-5xl font-light text-gray-400 italic mb-10 leading-tight" 
              dangerouslySetInnerHTML={{ __html: `"${finalPositioning.quote}"` }}>
          </h3>
          <div className="w-20 h-1 bg-[#f26522] mx-auto mb-16"></div>
          
          <motion.a
            href={finalPositioning.ctaLink}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-12 py-5 bg-black text-white font-bold uppercase tracking-widest hover:bg-[#f26522] transition-colors duration-300"
          >
            {finalPositioning.ctaText}
          </motion.a>
        </motion.div>
      </section>

    </main>
  );
}
