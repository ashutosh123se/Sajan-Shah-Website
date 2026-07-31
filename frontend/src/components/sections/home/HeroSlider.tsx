'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface HeroSliderProps {
  content?: {
    slides?: Array<{
      id: number | string;
      headline: string;
      subheadline: string;
      ctaText: string;
      ctaLink: string;
      video?: string;
      image?: string;
    }>;
  };
}

const DEFAULT_SLIDES = [
  {
    id: 1,
    headline: "India’s Biggest Memory & Family Transformation Experience",
    subheadline:
      'One stage. Thousands of lives. A system designed to transform how families think, learn, and grow together.',
    ctaText: 'Join Now',
    ctaLink: 'https://sol.sajanshah.com',
  },
  {
    id: 2,
    headline: 'Transform From Home. No Travel Required.',
    subheadline:
      'Join India’s most powerful student-parent webinar and experience real breakthroughs in focus, confidence, and results.',
    ctaText: 'Reserve Your Seat',
    ctaLink: 'https://webinar.sajanshah.com',
  },
  {
    id: 3,
    headline: 'Upgrade Your Life With Proven Systems',
    subheadline:
      'Access powerful programs designed to improve thinking, performance, and personal growth - step by step.',
    ctaText: 'Explore Programs',
    ctaLink: '/products',
  },
  {
    id: 4,
    headline: 'Live to Inspire. Lead to Serve.',
    subheadline:
      'Be part of a movement focused on creating real impact through education, awareness, and human transformation.',
    ctaText: 'Join the Initiative',
    ctaLink: 'https://unitedfirst.in',
  },
];

export const HeroSlider: React.FC<HeroSliderProps> = ({ content }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = content?.slides?.length ? content.slides : DEFAULT_SLIDES;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden bg-black flex items-center justify-center">
      {/* Loopable Background Video */}
      <div className="absolute inset-0 z-0 bg-black">
        <video
          className="w-full h-full object-cover opacity-85"
          src="/sajan_hero.mp4"
          poster="/EVENT.png"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/20 to-transparent z-10 pointer-events-none" />
      </div>

      <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8 text-center max-w-6xl mx-auto pt-32 sm:pt-48 md:pt-64 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white/60 mb-6 sm:mb-10 leading-[1.2] md:leading-[1.15] tracking-tight drop-shadow-2xl"
              style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}
            >
              {slide.headline}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-light text-white/40 mb-8 sm:mb-10 max-w-3xl mx-auto drop-shadow-md leading-relaxed">
              {slide.subheadline}
            </p>
            <Link
              href={slide.ctaLink}
              className="inline-flex items-center text-[#f26522] hover:text-white uppercase tracking-widest text-sm font-bold transition-colors group mb-12"
            >
              {slide.ctaText}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center space-x-4">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 transition-all ${idx === currentSlide ? 'w-12 bg-[#f26522]' : 'w-8 bg-white/40 hover:bg-white/80'}`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
