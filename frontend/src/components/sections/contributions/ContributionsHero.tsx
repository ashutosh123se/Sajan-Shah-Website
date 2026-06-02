'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface ContributionsHeroProps {
  content?: {
    heading?: string;
    subHeading?: string;
    paragraph?: string;
  };
}

export const ContributionsHero: React.FC<ContributionsHeroProps> = ({ content }) => {
  const heading = content?.heading || "IMPACT BEYOND BOUNDARIES";
  const subHeading = content?.subHeading || "";
  const paragraph = content?.paragraph || "We don't just build careers; we build legacies through education, empowerment, and sustainable social change aligned with the UNSDG 2030 India vision.";

  // Format heading if it contains a break or is plain
  const renderHeading = () => {
    if (heading.includes('<br') || heading.includes('\n')) {
      return <span dangerouslySetInnerHTML={{ __html: heading }} />;
    }
    return heading;
  };

  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black pt-40">
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <motion.div
          animate={{
            scale: [1.32, 1.40, 1.28, 1.37, 1.32, 1.32],
            x: ["-5%", "5%", "-5%", "5%", "-1%", "-5%"],
            y: ["-5%", "5%", "5%", "-5%", "2%", "-5%"]
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-full h-full will-change-transform"
        >
          <img
            src="/Social Work/CONTRIBUTIONS Hero .jpeg"
            alt="Impact Header"
            className="w-full h-full object-cover object-center opacity-45"
          />
        </motion.div>

        {/* Soft top-and-bottom dark linear gradient for readability (leaving sides completely clean and clear) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 z-20 pointer-events-none"></div>
      </div>

      <div className="relative z-30 max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-[#f26522] font-bold uppercase tracking-[0.3em] text-sm mb-4">{subHeading}</h2>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter uppercase leading-[1.1]">
            {renderHeading()}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed italic">
            "{paragraph}"
          </p>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-[#f26522] to-transparent"></div>
      </motion.div>
    </section>
  );
};
