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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#f26522] border-t-transparent rounded-full animate-spin"></div>
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
        <SpeakingReasons content={getSection('reasons')} />
        <ProgramCatalog content={getSection('catalog')} />
        <ProgramFeatures content={getSection('features')} />
      </motion.div>
    </main>
  );
}
