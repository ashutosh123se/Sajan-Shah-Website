'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  video?: string;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
}

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides: Slide[] = [
    {
      id: 1,
      title: 'NEUROSCIENCE DRIVES DRIVEN SUCCESS™',
      subtitle: 'shift your story. shape your success.',
      description: 'Join the premier SOL Event to transform your life.',
      image: '/hero-1.jpg',
      primaryCta: { text: 'Join SOL Event', href: '/events/sol' },
      secondaryCta: { text: 'Learn More', href: '/about' },
    },
    {
      id: 2,
      title: 'NEUROSCIENCE DRIVES DRIVEN SUCCESS™',
      subtitle: 'Master Your Mind. Master Your Life.',
      description: 'Attend our exclusive webinars and unlock your true potential.',
      image: '/hero-2.jpg',
      primaryCta: { text: 'Register for Webinars', href: '/events/webinars' },
      secondaryCta: { text: 'Free Resources', href: '/contributions' },
    },
    {
      id: 3,
      title: 'NEUROSCIENCE DRIVES DRIVEN SUCCESS™',
      subtitle: 'The Humanity Initiative',
      description: 'Inspiring 1.2 billion young minds to create a better tomorrow.',
      image: '/hero-3.jpg',
      primaryCta: { text: 'Get Involved', href: '/contributions' },
      secondaryCta: { text: 'Our Mission', href: '/about' },
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsPlaying(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsPlaying(false);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slide Background */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
        {currentSlideData.video ? (
          <video
            className="w-full h-full object-cover"
            src={currentSlideData.video}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={currentSlideData.image}
            alt={currentSlideData.title}
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Dark Overlay for high contrast text */}
        <div className="absolute inset-0 bg-black bg-opacity-70" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white max-w-5xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight uppercase">
            {currentSlideData.title.split('DRIVEN SUCCESS™').map((part, i) => (
              <React.Fragment key={i}>
                {part}
                {i === 0 && <span className="text-brand-orange">DRIVEN SUCCESS™</span>}
              </React.Fragment>
            ))}
          </h1>
          <p className="text-2xl md:text-4xl font-bold mb-6 text-gray-300 italic">
            {currentSlideData.subtitle}
          </p>
          <p className="text-lg md:text-xl mb-10 text-gray-400 max-w-2xl mx-auto">
            {currentSlideData.description}
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="font-bold uppercase tracking-wider px-8 py-4"
              onClick={() => window.location.href = currentSlideData.primaryCta.href}
            >
              {currentSlideData.primaryCta.text}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="font-bold uppercase tracking-wider px-8 py-4 text-white border-white hover:bg-white hover:text-black"
              onClick={() => window.location.href = currentSlideData.secondaryCta.href}
            >
              {currentSlideData.secondaryCta.text}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute bottom-8 right-8 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </button>
    </section>
  );
};
