'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';

interface LogoStripProps {
  content?: {
    logosHeading?: string;
    logos?: string[];
    subscribeQuote?: string;
    subscribeDesc?: string;
    subscribeSubtext?: string;
  };
}

const FALLBACK_OUTLETS = [
  'ANI', 'Business Standard', 'The Tribune', 'LatestLY', 'Google News',
  'Daily Hunt', 'Indian News Network', 'Indian Economic Observer',
  'National Insight', 'Rising Entrepreneurs', 'London Channel News',
  'Washington DC Dispatch', 'Dubai City Reporter', 'British Columbia Times',
  'England News Portal', 'France Network Times', 'Richmond Evening News',
  'Buffalo Dispatch', 'Maldives Star Plus', 'Lanka Express',
  'Lokmat Times Today', 'Mumbai Live', 'Gujarat Taraf', 'Hyderabad News',
  'Bangalore Buzz', 'Rajasthan Express', 'Madhya Pradesh Chronicle',
  'Telangana Journal', 'Punjab Live', 'Calcutta Courier',
];

export const LogoStrip: React.FC<LogoStripProps> = ({ content }) => {
  const logosHeading = content?.logosHeading || 'Recognized Globally & Trusted by Millions';
  const [logos, setLogos] = useState<string[]>(content?.logos || FALLBACK_OUTLETS);
  const subscribeQuote = content?.subscribeQuote || 'Master your mind. Master your performance.';
  const subscribeDesc = content?.subscribeDesc || 'Get weekly neuroscience-backed insights and strategies directly from Sajan Shah. No fluff, just pure transformation.';
  const subscribeSubtext = content?.subscribeSubtext || 'Join 100k+ subscribers on the journey.';

  useEffect(() => {
    if (content?.logos?.length) return;

    const fetchOutlets = async () => {
      try {
        const res = await api.get('/press');
        const articles = res.data?.data?.articles || [];
        const seen = new Set<string>();
        const sources: string[] = [];
        for (const article of articles) {
          const source = (article.source || '').trim();
          if (!source || seen.has(source.toLowerCase())) continue;
          seen.add(source.toLowerCase());
          sources.push(source);
        }
        if (sources.length > 0) setLogos(sources);
      } catch (error) {
        console.error('Failed to fetch press outlets for logo strip:', error);
      }
    };

    fetchOutlets();
  }, [content?.logos]);

  const formattedQuote = subscribeQuote
    .replace(/(mind)/gi, '<span class="font-bold">mind</span>')
    .replace(/(performance)/gi, '<span class="font-bold text-[#f26522]">performance</span>');

  return (
    <section className="bg-black pt-24 pb-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 overflow-hidden">
        <h2 className="text-center text-xs md:text-sm text-gray-600 uppercase tracking-[0.4em] font-bold mb-16">
          {logosHeading}
        </h2>

        <div className="relative group overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

          <div className="flex animate-scroll whitespace-nowrap hover:pause">
            {[...logos, ...logos].map((logo, idx) => (
              <div
                key={`${logo}-${idx}`}
                className="text-2xl md:text-4xl font-black text-gray-700 mx-10 md:mx-16 uppercase tracking-tighter transition-all duration-500 hover:text-[#f26522] cursor-default"
                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.05)' }}
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="newsletter-section" className="w-full bg-[#0a0a0a] py-24 lg:py-32 border-t border-gray-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24 relative z-10">
          <div className="lg:w-1/2 relative h-[28rem] w-full flex items-center justify-center lg:justify-start pt-12 pb-8">
            <div className="absolute top-1/2 left-1/2 lg:left-1/3 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#f26522]/10 rounded-full filter blur-[80px]" />
            <div className="relative group">
              <div className="w-48 h-64 md:w-56 md:h-72 shadow-[30px_30px_60px_rgba(0,0,0,0.8)] transform -rotate-12 transition-transform group-hover:-rotate-6 duration-700 z-20 rounded-2xl overflow-hidden bg-white">
                <img src="/page1 (1).png" alt="Neuroscience" className="w-full h-full object-cover object-top" />
              </div>
              <div className="absolute top-4 left-12 w-48 h-64 md:w-56 md:h-72 shadow-[30px_30px_60px_rgba(0,0,0,0.8)] transform rotate-12 transition-transform group-hover:rotate-6 duration-700 z-10 rounded-2xl overflow-hidden bg-white">
                <img src="/page2.png" alt="Strategies" className="w-full h-full object-cover object-top" />
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-10 leading-[1.2] tracking-tight italic">
              &quot;
              {subscribeQuote.includes('mind') ? (
                <span dangerouslySetInnerHTML={{ __html: formattedQuote }} />
              ) : (
                subscribeQuote
              )}
              &quot;
            </h2>
            <p className="text-gray-400 text-lg mb-12 font-light leading-relaxed max-w-xl">
              {subscribeDesc}
            </p>

            <form
              className="flex flex-col gap-4 w-full max-w-lg mx-auto lg:mx-0"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as any;
                const name = form.fullName.value;
                const phone = form.phone.value;
                const email = form.email.value;
                if (!email || !name || !phone) return;
                try {
                  const toast = (await import('react-hot-toast')).default;
                  await api.post('/newsletter', { name, phone, email, source: 'logo-strip-subscribe' });
                  toast.success('Welcome aboard!');
                  form.fullName.value = '';
                  form.phone.value = '';
                  form.email.value = '';
                } catch {
                  const toast = (await import('react-hot-toast')).default;
                  toast.error('Failed to subscribe');
                }
              }}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Your full name"
                  className="px-6 py-5 bg-[#151515] border border-gray-800 text-white outline-none w-full sm:flex-1 text-sm md:text-base font-light focus:border-[#f26522] transition-colors"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  className="px-6 py-5 bg-[#151515] border border-gray-800 text-white outline-none w-full sm:flex-1 text-sm md:text-base font-light focus:border-[#f26522] transition-colors"
                  required
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  className="px-6 py-5 bg-[#151515] border border-gray-800 text-white outline-none w-full sm:flex-1 text-sm md:text-base font-light focus:border-[#f26522] transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#f26522] hover:bg-[#d95a1e] text-white px-10 py-5 font-bold tracking-[0.2em] uppercase text-xs transition-all duration-300 shadow-[0_10px_20px_rgba(242,101,34,0.2)]"
                >
                  Join Now
                </button>
              </div>
            </form>
            <p className="text-[10px] text-gray-600 mt-6 uppercase tracking-widest font-bold">
              {subscribeSubtext}
            </p>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `,
        }}
      />
    </section>
  );
};
