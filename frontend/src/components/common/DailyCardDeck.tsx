'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const dailyReveals = [
  "Embrace the unknown, for it is the only certainty.",
  "Your struggle today is developing the strength you need for tomorrow.",
  "The most important conversations you'll ever have are the ones you'll have with yourself.",
  "Discipline is choosing between what you want now, and what you want most.",
  "A river cuts through rock, not because of its power, but because of its persistence."
];

const HIDDEN_PATHS = ['/login', '/register', '/cart', '/admin'];

function getDayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

export default function DailyCardDeck() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  const [popupVisible, setPopupVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [revealedWeek, setRevealedWeek] = useState(0);

  const currentWeekNum = Math.min(52, Math.floor(getDayOfYear() / 7) + 1);

  useEffect(() => {
    setMounted(true);
    const savedWeek = localStorage.getItem('sajan_shah_revealed_week');
    if (savedWeek) {
      setRevealedWeek(parseInt(savedWeek, 10));
    }
  }, []);

  useEffect(() => {
    if (step >= 4) {
      localStorage.setItem('sajan_shah_revealed_week', currentWeekNum.toString());
      setRevealedWeek(currentWeekNum);
    }
  }, [step, currentWeekNum]);

  // Watch for any modal/popup overlay appearing in the DOM
  useEffect(() => {
    if (!mounted) return;
    const checkForPopups = () => {
      const hasPopup = document.querySelector(
        '[role="dialog"], [role="alertdialog"], [data-modal], .fixed.inset-0.z-\\[55\\], .fixed.inset-0.z-\\[50\\], .fixed.inset-0.z-\\[60\\], .fixed.inset-0.z-\\[70\\], .fixed.inset-0.z-\\[80\\], .fixed.inset-0.z-\\[90\\]'
      );
      // Also check for any fixed full-screen overlay (common modal pattern)
      const allFixed = document.querySelectorAll('.fixed.inset-0');
      let foundPopup = !!hasPopup;
      allFixed.forEach(el => {
        // Ignore our own overlay and the deck itself
        if (!el.closest('[data-daily-deck]')) {
          foundPopup = true;
        }
      });
      setPopupVisible(foundPopup);
    };

    const observer = new MutationObserver(checkForPopups);
    observer.observe(document.body, { childList: true, subtree: true });
    checkForPopups();

    return () => observer.disconnect();
  }, [mounted]);

  // Hide on login, cart, admin pages
  const shouldHide = HIDDEN_PATHS.some(p => pathname.startsWith(p));
  if (!mounted || shouldHide || popupVisible) return null;

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      setStep(1);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setStep(0);
    }, 800);
  };

  const nextStep = () => {
    if (step < 4) {
      setStep(prev => prev + 1);
    }
  };

  const cards = [
    {
      id: 1,
      type: 'intro',
      front: (
        <img src="/card1.png" alt="Card 1" className="w-full h-full object-fill rounded-xl" />
      ),
      backClass: "bg-black border-zinc-800",
      frontClass: "bg-transparent border-0",
    },
    {
      id: 2,
      type: 'insight',
      front: (
        <img src="/card2.png" alt="Card 2" className="w-full h-full object-fill rounded-xl" />
      ),
      backClass: "bg-black border-zinc-800",
      frontClass: "bg-transparent border-0",
    },
    {
      id: 3,
      type: 'challenge',
      front: (
        <img src="/card3.png" alt="Card 3" className="w-full h-full object-fill rounded-xl" />
      ),
      backClass: "bg-black border-zinc-800",
      frontClass: "bg-transparent border-0",
    },
    {
      id: 4,
      type: 'daily',
      front: (
        <img
          src={`/weekly-cards/card-${currentWeekNum}.jpg`}
          alt="Weekly Card"
          className="w-full h-full object-fill rounded-xl"
        />
      ),
      backClass: "bg-black border-zinc-800",
      frontClass: "bg-transparent border-0",
    }
  ];

  return (
    <div data-daily-deck="true">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-black/60 pointer-events-auto"
            onClick={handleClose}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-80" />
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2"
            >
              <X className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className={cn(
          "fixed z-[101] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] [perspective:1200px]",
          isOpen
            ? "inset-0 flex items-center justify-center p-4 md:p-10 pointer-events-none"
            : "bottom-6 right-6 md:bottom-10 md:right-10 w-16 md:w-20 aspect-[1054/1492] cursor-pointer group"
        )}
        onClick={!isOpen ? handleOpen : undefined}
        animate={!isOpen ? { y: [0, -8, 0] } : { y: 0 }}
        transition={!isOpen ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
      >
        <div className={cn(
          "relative w-full h-full",
          isOpen ? "w-[220px] md:w-[266px] h-[400px] md:h-[480px] pointer-events-auto" : ""
        )}>
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                layoutId="deck-box"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className={cn(
                  "absolute inset-0 w-full h-full flex flex-col items-center justify-center z-[60]"
                )}
              >
                {/* Dynamic Glow: White over Black bg, Black over White bg */}
                <div className="absolute -inset-2 bg-white blur-xl mix-blend-difference opacity-50 rounded-2xl pointer-events-none"></div>

                {/* Box Frame */}
                <div className="relative w-full h-full rounded-xl overflow-hidden border border-zinc-500/30">
                  {revealedWeek === currentWeekNum ? (
                    <img src={`/weekly-cards/card-${currentWeekNum}.jpg`} alt="Weekly Card" className="w-full h-full object-fill" />
                  ) : (
                    <img src="/cover-of-card.png" alt="Cover" className="w-full h-full object-fill" />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {cards.map((card, idx) => {
            const isFlipped = step >= card.id;
            const isDismissed = isOpen && isFlipped && step > card.id;

            let yOffset = 0;
            let xOffset = 0;
            let rotate = 0;
            let scale = !isOpen ? 0.8 : 1;
            const cardOpacity = !isOpen ? 0 : (isDismissed ? 0 : 1);

            if (isOpen && isDismissed) {
              yOffset = -50;
              xOffset = card.id % 2 === 0 ? 50 : -50;
              rotate = card.id % 2 === 0 ? 10 : -10;
              scale = 0.9;
            }

            return (
              <motion.div
                key={card.id}
                className={cn(
                  "absolute inset-0 w-full h-full [transform-style:preserve-3d]",
                )}
                initial={false}
                animate={{
                  y: yOffset,
                  x: xOffset,
                  rotateZ: rotate,
                  scale: scale,
                  rotateY: isFlipped ? 180 : 0,
                  opacity: cardOpacity,
                  zIndex: isOpen ? (isFlipped ? 50 - card.id : 40 - card.id) : 10 - card.id,
                }}
                style={{ pointerEvents: (!isOpen || isDismissed) ? "none" : "auto" }}
                transition={{
                  duration: 0.8,
                  ease: [0.23, 1, 0.32, 1],
                  rotateY: { duration: card.type === 'joker' ? 1.5 : 0.8, ease: "easeInOut" },
                  opacity: { duration: 0.5 }
                }}
                onClick={(e) => {
                  if (isOpen && !isDismissed) {
                    e.stopPropagation();
                    nextStep();
                  }
                }}
              >
                {/* Back of Card */}
                <div
                  className={cn(
                    "absolute inset-0 w-full h-full rounded-xl [backface-visibility:hidden] overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                  )}
                >
                  <img src="/cover-of-card.png" alt="Card Back" className="w-full h-full object-fill" />
                </div>

                {/* Front */}
                <div
                  className={cn(
                    "absolute inset-0 [backface-visibility:hidden] rounded-xl border overflow-hidden",
                    card.frontClass
                  )}
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  {isFlipped && card.front}
                </div>
              </motion.div>
            );
          })}

          <AnimatePresence>
            {isOpen && step < 4 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute -bottom-16 left-0 right-0 text-center pointer-events-none"
              >
                <span className="text-white/40 text-xs tracking-widest uppercase font-mono animate-pulse">
                  {step === 0 ? "Tap to draw" : "Tap for next"}
                </span>
              </motion.div>
            )}
            {!isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute -top-6 md:-top-8 left-0 right-0 text-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
