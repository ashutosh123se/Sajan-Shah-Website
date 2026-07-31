'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SpeakingHeroProps {
  content?: {
    heading?: string;
    headingItalic?: string;
    headingHighlight?: string;
    gridImages?: string[];
    primaryButtonText?: string;
    primaryButtonScrollTarget?: string;
    secondaryButtonText?: string;
    secondaryButtonUrl?: string;
  };
}

export const SpeakingHero: React.FC<SpeakingHeroProps> = ({ content }) => {
  const heading = content?.heading || "This Isn't Motivation.";
  const headingItalic = content?.headingItalic || 'This Is';
  const headingHighlight = content?.headingHighlight || 'Transformation.';
  const bgImage = content?.gridImages?.[0] || '/Speking Hero.jpeg';
  const primaryText = content?.primaryButtonText || 'Book Sajan to Speak →';
  const primaryTarget = content?.primaryButtonScrollTarget || '/events#book-sajan';
  const secondaryText = content?.secondaryButtonText || 'Virtual Training →';
  const secondaryUrl = content?.secondaryButtonUrl || '/products#courses';

  const handlePrimary = () => {
    if (primaryTarget.startsWith('#')) {
      document.querySelector(primaryTarget)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = primaryTarget;
    }
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-black pt-36">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bgImage}
          alt="Sajan Shah Speaking Background"
          className="w-full h-full object-cover object-top filter brightness-90"
        />
        <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-7xl font-light text-white mb-8 tracking-wide leading-tight"
        >
          {heading}
          <br />
          <span className="italic font-extralight text-gray-200">{headingItalic}</span>{' '}
          <span className="text-[#f26522] font-semibold">{headingHighlight}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 mt-12"
        >
          <button
            onClick={handlePrimary}
            className="w-full md:w-auto bg-[#f26522] hover:bg-[#d95a1e] text-white px-10 py-5 font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(242,101,34,0.3)]"
          >
            {primaryText}
          </button>
          <button
            onClick={() => (window.location.href = secondaryUrl)}
            className="w-full md:w-auto bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 px-10 py-5 font-bold tracking-widest uppercase transition-all duration-300"
          >
            {secondaryText}
          </button>
        </motion.div>
      </div>
    </section>
  );
};
