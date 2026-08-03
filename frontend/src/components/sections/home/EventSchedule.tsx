'use client';

import React from 'react';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────
   Exact card shapes matching reference photos
───────────────────────────────────────────── */

// Instagram icon
const IGIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

// Twitter/X icon (old bird style as in reference)
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

// YouTube icon
const YTIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#ff0000" />
  </svg>
);

// Facebook icon
const FBIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

// LinkedIn icon
const LIIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface CardDef {
  platform: string;
  handle: string;
  stat: string;
  label: string;
  url: string;
  iconBg: string | { from: string; via: string; to: string };
  glowRgb: string;
  pos: { top: string; left: string };
  delay: number;
  rotate: number;
  hasTail?: boolean;
  tailSide?: 'bottom-left' | 'bottom-right';
  Icon: React.FC;
}

const CARDS: CardDef[] = [
  {
    platform: 'Instagram',
    handle: '@sajanshahofficial',
    stat: '166K',
    label: 'Followers',
    url: 'https://www.instagram.com/sajan_shahh/',
    iconBg: { from: '#f9ce34', via: '#ee2a7b', to: '#6228d7' },
    glowRgb: '238,42,123',
    pos: { top: '10%', left: '17%' },
    delay: 0,
    rotate: -4,
    hasTail: true,
    tailSide: 'bottom-right',
    Icon: IGIcon,
  },
  {
    platform: 'Twitter',
    handle: '@sajanshah',
    stat: '1.3K',
    label: 'Followers',
    url: 'https://x.com/sajanofficial',
    iconBg: '#1da1f2',
    glowRgb: '29,161,242',
    pos: { top: '6%', left: '62%' },
    delay: 0.5,
    rotate: 3,
    hasTail: true,
    tailSide: 'bottom-left',
    Icon: TwitterIcon,
  },
  {
    platform: 'Facebook',
    handle: 'Sajan Shah',
    stat: '21k',
    label: 'Followers',
    url: 'https://www.facebook.com/SajanShahPage',
    iconBg: '#1877f2',
    glowRgb: '24,119,242',
    pos: { top: '46%', left: '14%' },
    delay: 1.0,
    rotate: -3,
    hasTail: true,
    tailSide: 'bottom-right',
    Icon: FBIcon,
  },
  {
    platform: 'LinkedIn',
    handle: 'Sajan Shah',
    stat: '5K',
    label: 'Followers',
    url: 'https://www.linkedin.com/in/sajan-shah-7840244a/',
    iconBg: '#0077b5',
    glowRgb: '0,119,181',
    pos: { top: '46%', left: '67%' },
    delay: 1.5,
    rotate: 2.5,
    hasTail: true,
    tailSide: 'bottom-left',
    Icon: LIIcon,
  },
  {
    platform: 'YouTube',
    handle: 'Sajan Shah',
    stat: '98.9K',
    label: 'Subscribers',
    url: 'https://www.youtube.com/@SajanShah',
    iconBg: '#ff0000',
    glowRgb: '255,0,0',
    pos: { top: '65%', left: '36%' },
    delay: 2.0,
    rotate: -1.5,
    hasTail: true,
    tailSide: 'bottom-left',
    Icon: YTIcon,
  },
];

/* ─────────────────────────────────────────────
   Single Badge — exact reference style
   Layout: [  colored icon square | name \n STAT \n label  ]
   With optional speech-bubble tail
───────────────────────────────────────────── */
function Badge({ card, idx }: { card: CardDef; idx: number }) {
  const iconBgStyle =
    typeof card.iconBg === 'string'
      ? { background: card.iconBg }
      : {
        background: `linear-gradient(160deg, ${card.iconBg.from} 0%, ${card.iconBg.via} 50%, ${card.iconBg.to} 100%)`,
      };

  const tailLeft = card.tailSide === 'bottom-left';
  const tailRight = card.tailSide === 'bottom-right';

  return (
    <motion.div
      className="absolute"
      style={{ top: card.pos.top, left: card.pos.left, zIndex: 20 }}
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.2 + idx * 0.13, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {/* floating wrapper */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.8 + idx * 0.45, repeat: Infinity, ease: 'easeInOut', delay: card.delay }}
        style={{ rotate: `${card.rotate}deg` }}
      >
        <motion.a
          href={card.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{
            scale: 1.07,
            rotate: 0,
            boxShadow: `0 18px 48px rgba(${card.glowRgb},0.5), 0 4px 16px rgba(0,0,0,0.4)`,
            transition: { duration: 0.2 },
          }}
          className="block no-underline"
        >
          {/* Card shell */}
          <div
            className="flex items-center bg-white/95 rounded-[12px] md:rounded-[18px] shadow-[0_8px_20px_rgba(0,0,0,0.35),0_2px_4px_rgba(0,0,0,0.2)] md:shadow-[0_12px_40px_rgba(0,0,0,0.45),0_2px_8px_rgba(0,0,0,0.3)] border-[1.5px] md:border-[2.5px] border-white/95 p-1.5 md:p-2.5 gap-2 md:gap-3.5 min-w-[120px] max-w-[160px] md:min-w-[200px] md:max-w-[240px] backdrop-blur-md cursor-pointer relative"
          >
            {/* Brand icon block */}
            <div
              style={iconBgStyle}
              className="w-10 h-10 md:w-16 md:h-16 rounded-[8px] md:rounded-[14px] flex items-center justify-center shrink-0 p-2 md:p-3.5"
            >
              <card.Icon />
            </div>

            {/* Text block */}
            <div className="flex flex-col justify-center pr-1 md:pr-1.5">
              <span className="text-[9px] md:text-[13px] font-bold text-[#1a1a1a] leading-tight tracking-tight">
                {card.handle}
              </span>
              <span className="text-[16px] md:text-[26px] font-black text-[#0f0f0f] leading-none tracking-tight mt-0.5">
                {card.stat}
              </span>
              <span className="text-[8px] md:text-[11px] font-medium text-[#888] leading-tight mt-px">
                {card.label}
              </span>
            </div>
          </div>

          {/* Speech bubble tail */}
          {card.hasTail && (
            <div 
              className={`absolute -bottom-2 md:-bottom-[14px] w-0 h-0 border-l-[6px] md:border-l-[12px] border-r-[6px] md:border-r-[12px] border-t-[8px] md:border-t-[15px] border-x-transparent border-t-white/95 drop-shadow-[0_4px_3px_rgba(0,0,0,0.15)] ${tailLeft ? 'left-4 md:left-7' : ''} ${tailRight ? 'right-4 md:right-7' : ''}`}
            />
          )}
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main Export
───────────────────────────────────────────── */
export const EventSchedule: React.FC = () => {
  return (
    <section className="relative w-full bg-[#080808] py-20 md:py-28 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Section Heading */}
        <div className="text-center mb-14 md:mb-20">
          <p className="text-[#f26522] text-xs md:text-sm font-bold uppercase tracking-[0.45em] mb-3">
            Follow The Journey
          </p>
          <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight leading-tight">
            Our Global{' '}
            <span className="font-semibold italic text-[#f26522]">Digital Empire</span>
          </h2>
          <div className="w-14 h-[3px] bg-[#f26522] mx-auto mt-6 rounded-full" />
        </div>

        {/* Image + Floating Badges container */}
        <div
          className="relative w-full rounded-3xl overflow-visible"
          style={{
            boxShadow: '0 40px 90px rgba(0,0,0,0.75)',
          }}
        >
          {/* Crowd image */}
          <div
            className="relative w-full overflow-hidden rounded-3xl"
            style={{ aspectRatio: '16/9' }}
          >
            <img
              src="/Autographs sir.jpeg"
              alt="Sajan Shah with fans"
              className="w-full h-full object-cover pointer-events-none select-none"
              style={{ filter: 'brightness(0.82) contrast(1.08) saturate(1.05)' }}
            />
            {/* Depth vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.3) 100%), linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 25%, transparent 70%, rgba(0,0,0,0.45) 100%)',
              }}
            />
          </div>

          {/* Floating badges — fully responsive */}
          <div className="absolute inset-0 pointer-events-none" style={{ overflow: 'visible' }}>
            {CARDS.map((card, idx) => (
              <div key={card.platform} className="pointer-events-auto">
                <Badge card={card} idx={idx} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
