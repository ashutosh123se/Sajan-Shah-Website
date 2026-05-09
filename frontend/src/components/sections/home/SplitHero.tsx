'use client';
import React, { useState, useEffect } from 'react';

export const SplitHero: React.FC = () => {
  const words = ['Experience.', 'Movement.', 'Journey.'];
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCurrentWord(prev => (prev + 1) % words.length), 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section className="bg-white relative pb-32 pt-1">
      {/* Overlapping Orange Box mimicking the wide banner layout - Changed to relative negative margin to fix subpixel rendering line glitch */}
      <div className="relative -mt-24 md:-mt-32 mx-auto w-[90%] max-w-[1400px] bg-[#f26522] p-12 md:p-20 text-center shadow-[0_20px_50px_rgba(242,101,34,0.3)] z-30">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight tracking-wide">
          This Is Not an Event.<br />
          It’s a Transformation <span className="font-bold inline-block min-w-[300px] text-left">{words[currentWord]}</span>
        </h2>
      </div>

      {/* Narrative Split Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-32">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          {/* Left: Image (Editorial style) */}
          <div className="lg:w-5/12 relative group w-full">
            <div className="aspect-[3/4] bg-gray-100 w-full overflow-hidden relative border border-gray-200">
              {/* Placeholder for Sajan Shah image */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80 z-10 transition-opacity duration-700 group-hover:opacity-60"></div>
              <img src="/sajan-photo-bg.jpg" alt="Sajan Shah" className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 flex items-center justify-center text-gray-300 font-bold tracking-widest uppercase z-0 text-sm">
                Sajan Shah Photo
              </div>
            </div>
          </div>

          {/* Right: Text Content (Premium Typography) */}
          <div className="lg:w-7/12 py-8 flex flex-col justify-center">
            <h3 className="text-3xl md:text-5xl font-light text-gray-900 mb-8 leading-[1.2] tracking-tight">
              In today’s ever-changing world, most people are trying harder… but <span className="font-bold">thinking the same.</span>
            </h3>

            <div className="w-16 h-1 bg-[#111] mb-10"></div>

            <div className="space-y-6 text-lg md:text-xl text-gray-500 mb-12 font-light leading-relaxed">
              <p>From the way you think, react, decide, and act, everything is controlled by how your brain is wired.</p>
              <p>Yet, no one teaches you how to train it. You are told to stay motivated, work harder, and push more.</p>
              <p>But real transformation doesn’t come from effort alone, it comes from rewiring how you think and perform.</p>

              <p className="font-bold text-gray-900 mt-12 text-xl">A small shift in how your brain processes information can be the difference between:</p>
              <ul className="space-y-4 font-medium text-gray-800 mt-6">
                <li className="flex items-center"><span className="w-2 h-2 bg-[#f26522] mr-4 rounded-none flex-shrink-0"></span>confusion and clarity</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-[#f26522] mr-4 rounded-none flex-shrink-0"></span>stress and control</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-[#f26522] mr-4 rounded-none flex-shrink-0"></span>average and extraordinary results</li>
              </ul>
            </div>

            <div className="border-t border-gray-200 pt-10">
              <p className="text-xl md:text-2xl font-light text-gray-900 mb-2">
                The question is: Are you training your brain… or repeating old patterns?
              </p>
              <p className="text-xl text-[#f26522] font-bold">Start your transformation today.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Flip Cards Section */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {/* Card 1 - Speaking */}
          <div
            className="group relative w-full h-[420px] [perspective:2000px] cursor-pointer"
            onClick={() => (window.location.href = '/speaking')}
          >
            <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

              {/* Front Side */}
              <div className="absolute inset-0 overflow-hidden shadow-2xl [backface-visibility:hidden]">

                <div className="absolute inset-0 bg-[url('/card-speaking.jpg')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"></div>

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-4xl md:text-5xl font-light text-white tracking-wide">
                    Speaking
                  </h3>
                </div>
              </div>

              {/* Back Side */}
              <div className="absolute inset-0 bg-black border border-white/10 shadow-[0_0_40px_rgba(242,101,34,0.25)] flex flex-col items-center justify-center p-8 text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">

                <h3 className="text-3xl md:text-4xl font-light text-white mb-6">
                  Speaking
                </h3>

                <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-xs">
                  High-impact keynote experiences designed to transform thinking,
                  performance, and leadership.
                </p>

                <span className="bg-[#f26522] hover:bg-[#ff7a3d] transition-all duration-300 text-white px-8 py-3 uppercase tracking-[0.2em] text-xs font-semibold">
                  Find Out More
                </span>
              </div>
            </div>
          </div>

          {/* Card 2 - Webinar */}
          <div
            className="group relative w-full h-[420px] [perspective:2000px] cursor-pointer"
            onClick={() => (window.location.href = 'https://webinar.sajanshah.com')}
          >
            <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

              {/* Front Side */}
              <div className="absolute inset-0 overflow-hidden shadow-2xl [backface-visibility:hidden]">

                <div className="absolute inset-0 bg-[url('/card-webinar.jpg')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"></div>

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-4xl md:text-5xl font-light text-white tracking-wide">
                    Webinar
                  </h3>
                </div>
              </div>

              {/* Back Side */}
              <div className="absolute inset-0 bg-black border border-white/10 shadow-[0_0_40px_rgba(242,101,34,0.25)] flex flex-col items-center justify-center p-8 text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">

                <h3 className="text-3xl md:text-4xl font-light text-white mb-6">
                  Webinar
                </h3>

                <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-xs">
                  Join transformational online sessions focused on focus, confidence,
                  performance, and mindset breakthroughs.
                </p>

                <span className="bg-[#f26522] hover:bg-[#ff7a3d] transition-all duration-300 text-white px-8 py-3 uppercase tracking-[0.2em] text-xs font-semibold">
                  Find Out More
                </span>
              </div>
            </div>
          </div>

          {/* Card 3 - Impact */}
          <div
            className="group relative w-full h-[420px] [perspective:2000px] cursor-pointer"
            onClick={() => (window.location.href = '/impact')}
          >
            <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

              {/* Front Side */}
              <div className="absolute inset-0 overflow-hidden shadow-2xl [backface-visibility:hidden]">

                <div className="absolute inset-0 bg-[url('/card-impact.jpg')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"></div>

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-4xl md:text-5xl font-light text-white tracking-wide">
                    Impact
                  </h3>
                </div>
              </div>

              {/* Back Side */}
              <div className="absolute inset-0 bg-black border border-white/10 shadow-[0_0_40px_rgba(242,101,34,0.25)] flex flex-col items-center justify-center p-8 text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">

                <h3 className="text-3xl md:text-4xl font-light text-white mb-6">
                  Impact
                </h3>

                <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-xs">
                  Real transformation initiatives creating meaningful social and
                  educational impact across communities.
                </p>

                <span className="bg-[#f26522] hover:bg-[#ff7a3d] transition-all duration-300 text-white px-8 py-3 uppercase tracking-[0.2em] text-xs font-semibold">
                  Find Out More
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
