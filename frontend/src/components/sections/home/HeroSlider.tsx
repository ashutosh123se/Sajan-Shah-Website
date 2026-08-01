'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import {
  DEFAULT_HOME_HERO,
  HomeHeroContent,
  getActiveHomeHeroSlides,
  normalizeHomeHeroContent,
} from '@/lib/homeHeroDefaults';
import { resolveMediaUrl } from '@/lib/resolveMediaUrl';

interface HeroSliderProps {
  content?: Partial<HomeHeroContent>;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ content }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const hero = normalizeHomeHeroContent(content);
  const slides = getActiveHomeHeroSlides(content);

  useEffect(() => {
    setCurrentSlide(0);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, hero.intervalMs);
    return () => clearInterval(interval);
  }, [slides.length, hero.intervalMs]);

  const slide = slides[currentSlide] || DEFAULT_HOME_HERO.slides[0];
  const videoSrc = resolveMediaUrl(hero.backgroundVideo) || hero.backgroundVideo;
  const posterSrc =
    resolveMediaUrl(slide.image) ||
    resolveMediaUrl(hero.posterImage) ||
    hero.posterImage ||
    '/EVENT.png';

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden bg-black flex items-center justify-center">
      <div className="absolute inset-0 z-0 bg-black">
        <video
          className="w-full h-full object-cover opacity-85"
          src={videoSrc}
          poster={posterSrc}
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
            key={`${slide.id}-${currentSlide}`}
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
            {slide.ctaLink ? (
              <Link
                href={slide.ctaLink}
                className="inline-flex items-center text-[#f26522] hover:text-white uppercase tracking-widest text-sm font-bold transition-colors group mb-12"
              >
                {slide.ctaText || 'Learn More'}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
              </Link>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      {slides.length > 1 ? (
        <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center space-x-4">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 transition-all ${
                idx === currentSlide ? 'w-12 bg-[#f26522]' : 'w-8 bg-white/40 hover:bg-white/80'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
};
