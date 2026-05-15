'use client';

import React from 'react';
import { SpeakingHero } from '@/components/sections/speaking/SpeakingHero';
import { SpeakingLogos } from '@/components/sections/speaking/SpeakingLogos';
import { SpeakingMessage } from '@/components/sections/speaking/SpeakingMessage';
import { SpeakingReasons } from '@/components/sections/speaking/SpeakingReasons';
import { ProgramCatalog } from '@/components/sections/speaking/ProgramCatalog';
import { ProgramFeatures } from '@/components/sections/speaking/ProgramFeatures';
import { motion } from 'framer-motion';

export default function SpeakingPage() {
  return (
    <main className="min-h-screen bg-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <SpeakingHero />
        <SpeakingLogos />
        <SpeakingMessage />
        <SpeakingReasons />
        <ProgramCatalog />
        <ProgramFeatures />
      </motion.div>
    </main>
  );
}
