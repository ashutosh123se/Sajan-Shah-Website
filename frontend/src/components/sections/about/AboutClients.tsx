'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────
   All 71 testimonial images from /T/ folder
───────────────────────────────────────────── */
const STORY_IMAGES = [
  '/T/2023-01-19 (7).png',
  '/T/2023-01-19 (13).png',
  '/T/2023-01-19 (19).png',
  '/T/2023-01-19 (23).png',
  '/T/2023-01-19 (35).png',
  '/T/2023-01-19 (37).png',
  '/T/2023-01-19 (39).png',
  '/T/2023-01-19 (40).png',
  '/T/2023-01-19 (42).png',
  '/T/2023-01-19 (46).png',
  '/T/2023-01-19 (49).png',
  '/T/2023-01-19 (53).png',
  '/T/2023-01-19 (58).png',
  '/T/2023-01-19 (61).png',
  '/T/2023-01-19 (63).png',
  '/T/2023-01-19 (64).png',
  '/T/2023-01-19 (65).png',
  '/T/2023-01-19 (66).png',
  '/T/2023-01-19 (67).png',
  '/T/2023-01-19 (68).png',
  '/T/2023-01-19 (69).png',
  '/T/2023-01-19 (70).png',
  '/T/2023-01-19 (71).png',
  '/T/2023-01-19 (72).png',
  '/T/2023-01-19 (74).png',
  '/T/2023-01-19 (76).png',
  '/T/2023-01-19 (78).png',
  '/T/2023-01-19 (79).png',
  '/T/2023-01-19 (80).png',
  '/T/2023-01-19 (82).png',
  '/T/2023-01-19 (84).png',
  '/T/2023-01-19 (85).png',
  '/T/2023-01-19 (86).png',
  '/T/2023-01-19 (87).png',
  '/T/2023-01-19 (90).png',
  '/T/2023-01-19 (91).png',
  '/T/2023-01-19 (92).png',
  '/T/2023-01-19 (93).png',
  '/T/2023-01-19 (94).png',
  '/T/2023-01-19 (95).png',
  '/T/2023-01-19 (96).png',
  '/T/2023-01-19 (98).png',
  '/T/2023-01-19 (99).png',
  '/T/2023-01-19 (100).png',
  '/T/2023-01-19 (101).png',
  '/T/2023-01-19 (102).png',
  '/T/2023-01-19 (105).png',
  '/T/2023-01-19 (107).png',
  '/T/2023-01-19 (108).png',
  '/T/2023-01-19 (109).png',
  '/T/2023-01-19 (110).png',
  '/T/2023-01-19 (111).png',
  '/T/2023-01-19 (112).png',
  '/T/2023-01-19 (113).png',
  '/T/2023-01-19 (114).png',
  '/T/2023-01-19 (115).png',
  '/T/2023-01-19 (116).png',
  '/T/2023-01-19 (118).png',
  '/T/2023-01-19 (119).png',
  '/T/2023-01-19 (121).png',
  '/T/2023-01-19 (122).png',
  '/T/2023-01-19 (123).png',
  '/T/2023-01-19 (124).png',
  '/T/2023-01-19 (126).png',
  '/T/2023-01-19 (127).png',
  '/T/2023-01-19 (128).png',
  '/T/2023-01-19 (129).png',
  '/T/2023-01-19 (130).png',
  '/T/2023-01-19 (131).png',
  '/T/2023-01-19 (132).png',
];

/* ─────────────────────────────────────────────
   Full-width scatter — 71 entries across 7 rows
   left/top as % of container, some bleed off
   edges for authentic scattered-pile effect
───────────────────────────────────────────── */
const SCATTER = [
  // Row 1 — top (top: -3% → 10%)
  { left: '-2%',  top:  '0%',  rot:  -8, z:  3 },
  { left: '10%',  top:  '-3%', rot:   5, z:  7 },
  { left: '22%',  top:   '1%', rot:  -3, z:  2 },
  { left: '34%',  top:  '-2%', rot:  11, z:  5 },
  { left: '46%',  top:   '2%', rot: -14, z:  8 },
  { left: '58%',  top:  '-1%', rot:   7, z:  1 },
  { left: '70%',  top:   '0%', rot:  -5, z: 14 },
  { left: '82%',  top:  '-2%', rot:   9, z:  4 },
  { left: '93%',  top:   '3%', rot:  -7, z:  6 },
  // Row 2 (top: 13% → 20%)
  { left: '-3%',  top:  '14%', rot:   4, z:  9 },
  { left:  '8%',  top:  '13%', rot:  -9, z: 11 },
  { left: '20%',  top:  '15%', rot:  12, z:  2 },
  { left: '32%',  top:  '13%', rot:  -6, z: 10 },
  { left: '44%',  top:  '16%', rot:   3, z: 12 },
  { left: '56%',  top:  '14%', rot: -12, z:  7 },
  { left: '68%',  top:  '15%', rot:   8, z: 15 },
  { left: '80%',  top:  '13%', rot:  -5, z:  3 },
  { left: '92%',  top:  '17%', rot:  14, z:  8 },
  // Row 3 (top: 28% → 35%)
  { left:  '2%',  top:  '29%', rot:  -8, z: 13 },
  { left: '14%',  top:  '28%', rot:   5, z:  4 },
  { left: '26%',  top:  '30%', rot:  -3, z:  9 },
  { left: '38%',  top:  '29%', rot:  11, z:  6 },
  { left: '50%',  top:  '31%', rot: -14, z: 11 },
  { left: '62%',  top:  '28%', rot:   7, z:  2 },
  { left: '74%',  top:  '30%', rot:  -5, z: 16 },
  { left: '86%',  top:  '29%', rot:   9, z:  5 },
  { left: '95%',  top:  '33%', rot:  -7, z: 10 },
  // Row 4 (top: 43% → 50%)
  { left: '-2%',  top:  '44%', rot:   4, z:  7 },
  { left: '10%',  top:  '43%', rot:  -9, z: 12 },
  { left: '22%',  top:  '45%', rot:  12, z:  3 },
  { left: '34%',  top:  '43%', rot:  -6, z:  8 },
  { left: '46%',  top:  '46%', rot:   3, z: 14 },
  { left: '58%',  top:  '44%', rot: -12, z:  1 },
  { left: '70%',  top:  '45%', rot:   8, z:  9 },
  { left: '82%',  top:  '43%', rot:  -5, z:  6 },
  { left: '93%',  top:  '47%', rot:  14, z: 13 },
  // Row 5 (top: 57% → 64%)
  { left:  '3%',  top:  '58%', rot:  -8, z:  4 },
  { left: '15%',  top:  '57%', rot:   5, z: 10 },
  { left: '27%',  top:  '59%', rot:  -3, z:  7 },
  { left: '39%',  top:  '57%', rot:  11, z: 15 },
  { left: '51%',  top:  '60%', rot: -14, z:  2 },
  { left: '63%',  top:  '58%', rot:   7, z: 11 },
  { left: '75%',  top:  '59%', rot:  -5, z:  5 },
  { left: '87%',  top:  '57%', rot:   9, z:  8 },
  { left: '96%',  top:  '61%', rot:  -7, z: 16 },
  // Row 6 (top: 72% → 79%)
  { left: '-3%',  top:  '73%', rot:   4, z:  3 },
  { left:  '9%',  top:  '72%', rot:  -9, z:  9 },
  { left: '21%',  top:  '74%', rot:  12, z: 14 },
  { left: '33%',  top:  '72%', rot:  -6, z:  6 },
  { left: '45%',  top:  '75%', rot:   3, z: 12 },
  { left: '57%',  top:  '73%', rot: -12, z:  4 },
  { left: '69%',  top:  '74%', rot:   8, z:  7 },
  { left: '81%',  top:  '72%', rot:  -5, z: 10 },
  { left: '93%',  top:  '76%', rot:  14, z:  1 },
  // Row 7 — bottom (top: 86% → 93%)
  { left:  '2%',  top:  '87%', rot:  -8, z: 13 },
  { left: '13%',  top:  '86%', rot:   5, z:  5 },
  { left: '25%',  top:  '88%', rot:  -3, z:  8 },
  { left: '37%',  top:  '86%', rot:  11, z: 15 },
  { left: '49%',  top:  '89%', rot: -14, z:  3 },
  { left: '61%',  top:  '87%', rot:   7, z: 11 },
  { left: '73%',  top:  '88%', rot:  -5, z:  6 },
  { left: '85%',  top:  '86%', rot:   9, z: 16 },
  { left: '94%',  top:  '90%', rot:  -7, z:  4 },
  // extras (some overlap rows for denser look)
  { left: '16%',  top:  '42%', rot:   6, z: 17 },
  { left: '52%',  top:  '17%', rot:  -4, z: 18 },
  { left: '78%',  top:  '62%', rot:  10, z: 19 },
  { left: '40%',  top:  '83%', rot:  -6, z: 20 },
  { left:  '6%',  top:  '61%', rot:   3, z: 21 },
  { left: '64%',  top:  '41%', rot: -11, z: 22 },
  { left: '88%',  top:  '82%', rot:   5, z: 23 },
];

interface AboutClientsProps {
  content?: {
    tagline?: string;
    headingPart1?: string;
    headingPart2?: string;
    clientsLogoImage?: string;
  };
}

export const AboutClients: React.FC<AboutClientsProps> = ({ content }) => {
  const data = {
    tagline: content?.tagline || 'Partnerships',
    headingPart1: content?.headingPart1 || 'Previous Delighted',
    headingPart2: content?.headingPart2 || 'Clients',
    clientsLogoImage: content?.clientsLogoImage || '/LOGO.png',
  };

  const [selected, setSelected] = useState<number | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  /* close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      {/* ── Existing Clients Logo Section ── */}
      <section className="py-24 bg-white text-black border-t border-gray-100">
        <div className="w-full">
          <div className="text-center mb-16 px-4">
            <h3 className="text-[#f26522] text-xs font-bold uppercase tracking-[0.3em] mb-4">
              {data.tagline}
            </h3>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              {data.headingPart1}{' '}
              <span className="text-gray-400 font-light italic">{data.headingPart2}</span>
            </h2>
            <div className="w-16 h-1 bg-[#f26522] mx-auto mt-6" />
          </div>
          <div className="w-full">
            <img
              src={data.clientsLogoImage}
              alt="Previous Delighted Clients"
              className="w-full h-auto block"
            />
          </div>
        </div>
      </section>

      {/* ── Scattered Photo Pile — Testimonials / Stories ── */}
      <section className="py-28 bg-[#0a0a0a] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">

          {/* Heading */}
          <div className="text-center mb-20">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#f26522] text-xs font-bold uppercase tracking-[0.45em] mb-4"
            >
              Real Stories · Real Impact
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-light tracking-tight"
            >
              Stories of{' '}
              <span className="font-semibold italic text-[#f26522]">Transformation</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-14 h-[3px] bg-[#f26522] mx-auto mt-6 rounded-full origin-left"
            />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-gray-500 text-sm mt-6"
            >
              Click on any photo to view it
            </motion.p>
          </div>

          {/* ── Scattered Pile Container — full-width, edge-to-edge ── */}
          <div
            className="relative w-full overflow-hidden"
            style={{ height: '1100px' }}
          >
            {STORY_IMAGES.map((src, idx) => {
              const s = SCATTER[idx] ?? { left: '50%', top: '50%', rot: 0, z: idx };
              const isHovered = hoveredIdx === idx;

              return (
                <motion.div
                  key={src}
                  className="absolute cursor-pointer select-none"
                  style={{
                    left: s.left,
                    top: s.top,
                    zIndex: isHovered ? 50 : s.z,
                  }}
                  initial={{ opacity: 0, scale: 0.5, rotate: s.rot }}
                  whileInView={{ opacity: 1, scale: 1, rotate: s.rot }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.045,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  animate={{
                    rotate: isHovered ? 0 : s.rot,
                    scale: isHovered ? 1.1 : 1,
                  }}
                  whileHover={{ scale: 1.12, rotate: 0, zIndex: 50 }}
                  onHoverStart={() => setHoveredIdx(idx)}
                  onHoverEnd={() => setHoveredIdx(null)}
                  onClick={() => setSelected(idx)}
                >
                  {/* Photo card */}
                  <div
                    className="rounded-xl overflow-hidden"
                    style={{
                      width: '160px',
                      height: '200px',
                      boxShadow: isHovered
                        ? '0 20px 50px rgba(0,0,0,0.7), 0 0 0 3px #f26522'
                        : '0 8px 28px rgba(0,0,0,0.6)',
                      border: '3px solid rgba(255,255,255,0.08)',
                      background: '#111',
                      transition: 'box-shadow 0.3s',
                    }}
                  >
                    <img
                      src={src}
                      alt={`Transformation story ${idx + 1}`}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>

                  {/* "click" hint on hover */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-[#f26522] font-bold uppercase tracking-widest"
                      >
                        View →
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Small instruction text */}
          <p className="text-center text-gray-600 text-xs mt-16 uppercase tracking-widest">
            {STORY_IMAGES.length} stories · click any photo to expand
          </p>
        </div>

        {/* ── Lightbox ── */}
        <AnimatePresence>
          {selected !== null && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            >
              {/* Blurred dark scrim */}
              <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

              {/* Image card */}
              <motion.div
                className="relative z-10 rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
                initial={{ scale: 0.75, opacity: 0, rotate: SCATTER[selected]?.rot ?? 0 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.75, opacity: 0, rotate: SCATTER[selected]?.rot ?? 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  maxWidth: '90vw',
                  maxHeight: '85vh',
                  border: '3px solid rgba(255,255,255,0.12)',
                }}
              >
                <img
                  src={STORY_IMAGES[selected]}
                  alt={`Story ${selected + 1}`}
                  className="block max-w-[90vw] max-h-[80vh] object-contain"
                />

                {/* Bottom bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-4 flex items-center justify-between">
                  <span className="text-white/70 text-xs font-medium uppercase tracking-widest">
                    Story {selected + 1} / {STORY_IMAGES.length}
                  </span>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelected((s) => (s! === 0 ? STORY_IMAGES.length - 1 : s! - 1))}
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#f26522] text-white text-sm flex items-center justify-center transition-colors"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => setSelected((s) => (s! === STORY_IMAGES.length - 1 ? 0 : s! + 1))}
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#f26522] text-white text-sm flex items-center justify-center transition-colors"
                    >
                      →
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Close button */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-[#f26522] text-white flex items-center justify-center transition-colors text-lg"
                aria-label="Close"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
};
