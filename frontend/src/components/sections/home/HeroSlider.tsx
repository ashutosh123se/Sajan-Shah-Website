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

export const HeroSlider: React.FC<HeroSliderProps> = ({ content }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const defaultSlides = [
    {
      id: 1,
      headline: "India’s Biggest Memory & Family Transformation Experience",
      subheadline: "One stage. Thousands of lives. A system designed to transform how families think, learn, and grow together.",
      ctaText: "Join Now",
      ctaLink: "https://sol.sajanshah.com"
    },
    {
      id: 2,
      headline: "Transform From Home. No Travel Required.",
      subheadline: "Join India’s most powerful student-parent webinar and experience real breakthroughs in focus, confidence, and results.",
      ctaText: "Reserve Your Seat",
      ctaLink: "https://webinar.sajanshah.com"
    },
    {
      id: 3,
      headline: "Upgrade Your Life With Proven Systems",
      subheadline: "Access powerful programs designed to improve thinking, performance, and personal growth - step by step.",
      ctaText: "Explore Programs",
      ctaLink: "/products"
    },
    {
      id: 4,
      headline: "Live to Inspire. Lead to Serve.",
      subheadline: "Be part of a movement focused on creating real impact through education, awareness, and human transformation.",
      ctaText: "Join the Initiative",
      ctaLink: "https://unitedfirst.in"
    }
  ];

  const slides = content?.slides || defaultSlides;

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
        <iframe
          className="w-full h-full object-cover opacity-40 pointer-events-none scale-150 md:scale-125"
          src="https://player.vimeo.com/video/1204461566?background=1"
          allow="autoplay; fullscreen"
          frameBorder="0"
        />
        {/* Stronger bottom-to-top dark overlay to make text pop while keeping the video clear */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/50 to-black/30 z-10 pointer-events-none" />
      </div>

      {/* Content lower on the screen for better breathing room */}
      <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8 text-center max-w-6xl mx-auto pt-32 sm:pt-48 md:pt-64 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Solid white heading to stand out against the faded video */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-10 leading-[1.2] md:leading-[1.15] tracking-tight drop-shadow-2xl" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
              {slide.headline}
            </h1>
            {/* Faded subheadline (opacity-40) */}
            <p className="text-lg sm:text-xl md:text-2xl font-medium text-white/90 max-w-4xl mx-auto mb-10 leading-relaxed drop-shadow-lg">
              {slide.subheadline}
            </p>
            {/* CTA Button */}
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

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center space-x-4">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 transition-all ${idx === currentSlide ? 'w-12 bg-[#f26522]' : 'w-8 bg-white/40 hover:bg-white/80'}`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
