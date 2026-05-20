'use client';
import React, { useState, useEffect } from 'react';

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
      ctaLink: "https://sol.sajanshah.com",
      video: "https://cdn.pixabay.com/video/2020/05/25/40149-425251644_large.mp4",
      image: "/hero-1.jpg"
    },
    {
      id: 2,
      headline: "Transform From Home. No Travel Required.",
      subheadline: "Join India’s most powerful student-parent webinar and experience real breakthroughs in focus, confidence, and results.",
      ctaText: "Reserve Your Seat",
      ctaLink: "https://webinar.sajanshah.com",
      video: "https://cdn.pixabay.com/video/2019/04/17/22818-330691515_large.mp4",
      image: "/hero-2.jpg"
    },
    {
      id: 3,
      headline: "Upgrade Your Life With Proven Systems",
      subheadline: "Access powerful programs designed to improve thinking, performance, and personal growth - step by step.",
      ctaText: "Explore Programs",
      ctaLink: "/programs",
      video: "https://cdn.pixabay.com/video/2019/11/14/29038-372951939_large.mp4",
      image: "/hero-3.jpg"
    },
    {
      id: 4,
      headline: "Live to Inspire. Lead to Serve.",
      subheadline: "Be part of a movement focused on creating real impact through education, awareness, and human transformation.",
      ctaText: "Join the Initiative",
      ctaLink: "https://unitedfirst.in",
      video: "https://cdn.pixabay.com/video/2020/03/10/33481-396593414_large.mp4",
      image: "/hero-4.jpg"
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
      {/* Backgrounds */}
      {slides.map((s, idx) => (
        <div key={s.id} className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          {s.video ? (
            <video className="w-full h-full object-cover opacity-60" src={s.video} autoPlay muted loop playsInline />
          ) : (
            <div className="w-full h-full bg-gray-800 opacity-60" style={{ backgroundImage: `url(${s.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          )}
          {/* Overlay matching the dark gradient in the reference */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/50 to-transparent" />
        </div>
      ))}

      {/* Content lower on the screen for better breathing room */}
      <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8 text-center max-w-6xl mx-auto pt-48 md:pt-64 pb-12">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-10 leading-[1.15] tracking-tight drop-shadow-2xl animate-fade-in-up" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
          {slide.headline}
        </h1>
        <p className="text-xl md:text-2xl font-light text-gray-200 mb-16 max-w-3xl mx-auto drop-shadow-md animate-fade-in-up animation-delay-200 leading-relaxed">
          {slide.subheadline}
        </p>
        
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
