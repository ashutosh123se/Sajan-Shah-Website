'use client';

import React, { useEffect, useState } from 'react';
import { SpeakingHero } from '@/components/sections/speaking/SpeakingHero';
import { SpeakingLogos } from '@/components/sections/speaking/SpeakingLogos';
import { SpeakingMessage } from '@/components/sections/speaking/SpeakingMessage';
import { SpeakingReasons } from '@/components/sections/speaking/SpeakingReasons';
import { ProgramCatalog } from '@/components/sections/speaking/ProgramCatalog';
import { ProgramFeatures } from '@/components/sections/speaking/ProgramFeatures';
import { motion } from 'framer-motion';
import api from '@/lib/api';

interface Section {
  key: string;
  content: any;
  isActive: boolean;
}

export default function SpeakingPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await api.get('/speaking');
        if (response.data.success) {
          setSections(response.data.data.sections);
        }
      } catch (error) {
        console.error('Error fetching speaking sections:', error);
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

  return (
    <main className="min-h-screen bg-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <SpeakingHero content={getSection('hero')} />
        <SpeakingLogos content={getSection('logos')} />
        <SpeakingMessage content={getSection('message')} />
        <ProgramCatalog content={getSection('catalog')} />
        <SpeakingReasons content={getSection('reasons')} />
        <ProgramFeatures content={getSection('features')} />

        {/* Final Quote Section */}
        <section className="py-32 bg-white text-center px-4 border-t border-gray-100">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto px-4"
          >
            <h3 className="text-3xl md:text-5xl font-light text-gray-400 italic mb-10 leading-tight">
              "Confidence is not built by motivation.<br className="hidden md:block" /> It is built by evidence and action."
            </h3>
            <div className="w-20 h-1 bg-[#f26522] mx-auto"></div>
          </motion.div>
        </section>
      </motion.div>
    </main>
  );
}
