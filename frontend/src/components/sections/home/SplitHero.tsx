'use client';
import React, { useState, useEffect } from 'react';
import { MediaImage } from '@/components/common/MediaImage';

interface SplitHeroProps {
  content?: {
    bannerText?: string;
    bannerWords?: string[];
    mainImage?: string;
    mainHeading?: string;
    paragraphs?: string[];
    comparisonHeading?: string;
    comparisonList?: string[];
    footerQuote?: string;
    footerHighlight?: string;
    cards?: Array<{
      title: string;
      image: string;
      desc: string;
      ctaText?: string;
      ctaLink?: string;
    }>;
  };
}

export const SplitHero: React.FC<SplitHeroProps> = ({ content }) => {
  const words = content?.bannerWords?.length
    ? content.bannerWords
    : ['Experience.', 'Movement.', 'Journey.'];
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCurrentWord(prev => (prev + 1) % words.length), 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  const bannerText = content?.bannerText || "This Is Not an Event.<br />It's a Transformation";
  const mainImage = content?.mainImage || 'https://webinar.sajanshah.com/assets/mentor-portrait-DVhB0Q8D.jpeg';
  const mainHeading =
    content?.mainHeading ||
    'In today’s ever-changing world, most people are trying harder… but <span class="font-bold">thinking the same.</span>';
  const paragraphs = content?.paragraphs || [
    'From the way you think, react, decide, and act, everything is controlled by how your brain is wired.',
    'Yet, no one teaches you how to train it. You are told to stay motivated, work harder, and push more.',
    'But real transformation doesn’t come from effort alone, it comes from rewiring how you think and perform.',
  ];
  const comparisonHeading =
    content?.comparisonHeading ||
    'A small shift in how your brain processes information can be the difference between:';
  const comparisonList = content?.comparisonList || [
    'confusion and clarity',
    'stress and control',
    'average and extraordinary results',
  ];
  const footerQuote =
    content?.footerQuote || 'The question is: Are you training your brain… or repeating old patterns?';
  const footerHighlight = content?.footerHighlight || 'Start your transformation today.';
  const cards = content?.cards || [
    {
      title: 'Webinar',
      image: '/webinar.png',
      desc: 'Join transformational online sessions focused on focus, confidence, performance, and mindset breakthroughs.',
      ctaText: 'Find Out More',
      ctaLink: 'https://webinar.sajanshah.com',
    },
    {
      title: 'Speaking',
      image: '/IMG_7631.jpg',
      desc: 'High-impact keynote experiences designed to transform thinking, performance, and leadership.',
      ctaText: 'Find Out More',
      ctaLink: '/speaking',
    },
    {
      title: 'Impact',
      image: '/impact.png',
      desc: 'Real transformation initiatives creating meaningful social and educational impact across communities.',
      ctaText: 'Find Out More',
      ctaLink: '/contributions',
    },
  ];

  return (
    <section className="bg-white relative pb-32 pt-1">
      <div className="relative -mt-16 md:-mt-20 mx-auto w-[85%] max-w-[1100px] bg-[#f26522] p-8 md:p-12 text-center shadow-[0_20px_50px_rgba(242,101,34,0.3)] z-30">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight tracking-wide">
          <span dangerouslySetInnerHTML={{ __html: bannerText }} />{' '}
          <span className="font-bold inline-block min-w-[200px] md:min-w-[250px] text-left">{words[currentWord]}</span>
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-32">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          <div className="lg:w-5/12 lg:sticky lg:top-32 relative group w-full self-start">
            <div className="aspect-[3/4] bg-[#0a0a0a] w-full overflow-hidden relative border border-gray-100 shadow-[20px_20px_60px_rgba(0,0,0,0.1)]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mainImage}
                alt="Sajan Shah"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
              />
              <div className="absolute -inset-4 border border-gray-100/10 z-0 pointer-events-none"></div>
            </div>
          </div>

          <div className="lg:w-7/12 py-8 flex flex-col justify-center">
            <h3
              className="text-3xl md:text-5xl font-light text-gray-900 mb-8 leading-[1.2] tracking-tight"
              dangerouslySetInnerHTML={{ __html: mainHeading }}
            />
            <div className="w-16 h-1 bg-[#111] mb-10"></div>
            <div className="space-y-6 text-lg md:text-xl text-gray-500 mb-12 font-light leading-relaxed">
              {paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
              <p className="font-bold text-gray-900 mt-12 text-xl">{comparisonHeading}</p>
              <ul className="space-y-4 font-medium text-gray-800 mt-6">
                {comparisonList.map((item, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="w-2 h-2 bg-[#f26522] mr-4 rounded-none flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-gray-200 pt-10">
              <p className="text-xl md:text-2xl font-light text-gray-900 mb-2">{footerQuote}</p>
              <p className="text-xl text-[#f26522] font-bold">{footerHighlight}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {cards.map((card) => (
            <div
              key={card.title}
              className="group relative w-full h-[450px] [perspective:1200px] cursor-pointer"
              onClick={() => {
                if (card.ctaLink) window.location.href = card.ctaLink;
              }}
            >
              <div className="relative w-full h-full transition-transform duration-[1200ms] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] ease-[cubic-bezier(0.23,1,0.32,1)]">
                <div className="absolute inset-0 [backface-visibility:hidden] [transform-style:preserve-3d] overflow-hidden rounded-sm shadow-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <MediaImage src={card.image} alt={card.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center [transform-style:preserve-3d]">
                    <h3 className="text-4xl md:text-5xl font-light text-white tracking-widest [transform:translateZ(70px)] drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)] uppercase">
                      {card.title}
                    </h3>
                  </div>
                </div>
                <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] [transform-style:preserve-3d] overflow-hidden rounded-sm shadow-2xl bg-[#0a0a0a]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <MediaImage src={card.image} alt={card.title} className="w-full h-full object-cover opacity-20 transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center [transform-style:preserve-3d]">
                    <div className="[transform:translateZ(130px)] flex flex-col items-center">
                      <h3 className="text-3xl md:text-4xl font-light text-white mb-6 drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)] uppercase tracking-wider">
                        {card.title}
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed mb-10 max-w-xs font-light drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                        {card.desc}
                      </p>
                      <span className="inline-block bg-[#f26522] hover:bg-white hover:text-black transition-all duration-500 text-white px-10 py-4 uppercase tracking-[0.3em] text-[10px] font-bold shadow-[0_25px_50px_-12px_rgba(242,101,34,0.5)]">
                        {card.ctaText || 'Find Out More'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
