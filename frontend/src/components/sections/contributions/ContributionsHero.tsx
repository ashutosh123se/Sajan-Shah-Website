'use client';
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

interface ContributionsHeroProps {
  content?: {
    heading?: string;
    subHeading?: string;
    paragraph?: string;
    videoUrl?: string;
  };
}

export const ContributionsHero: React.FC<ContributionsHeroProps> = ({ content }) => {
  const heading = content?.heading || "IMPACT BEYOND BOUNDARIES";
  const subHeading = content?.subHeading || "";
  const paragraph = content?.paragraph || "We don't just build careers; we build legacies through education, empowerment, and sustainable social change aligned with the UNSDG 2030 India vision.";
  const videoUrl = content?.videoUrl || "";

  const [isVideoActive, setIsVideoActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Format heading if it contains a break or is plain
  const renderHeading = () => {
    if (heading.includes('<br') || heading.includes('\n')) {
      return <span dangerouslySetInnerHTML={{ __html: heading }} />;
    }
    return heading;
  };

  const handleVideoClick = () => {
    if (!isVideoActive && videoRef.current) {
      setIsVideoActive(true);
      const video = videoRef.current;
      video.currentTime = 0;
      video.muted = false;
      video.loop = false;
      video.play().catch(() => {});
    }
  };

  return (
    <>
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

      {/* Video Section — Only rendered if videoUrl is provided via backend */}
      {videoUrl && (
        <section className="py-20 bg-black">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="mb-10">
              <p className="text-[#f26522] font-bold uppercase tracking-[0.3em] text-xs mb-4">Watch Our Story</p>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter uppercase">
                See The <span className="text-[#f26522]">Impact</span>
              </h2>
            </div>
            <div
              className="relative w-full aspect-video bg-[#0a0a0a] border border-gray-800 rounded-[2.5rem] overflow-hidden shadow-2xl cursor-pointer group"
              onClick={handleVideoClick}
            >
              <video
                ref={videoRef}
                src={videoUrl}
                autoPlay
                muted
                loop
                playsInline
                controls={isVideoActive}
                className={`w-full h-full object-cover transition-all duration-700 ${!isVideoActive ? 'grayscale' : 'grayscale-0'}`}
              />
              {!isVideoActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/15 transition-colors duration-500">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/25 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    <Play className="text-white ml-1" size={36} fill="white" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};
