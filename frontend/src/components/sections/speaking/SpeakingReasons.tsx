'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface Reason {
  number: string;
  title: string;
  description: string;
}

interface ReasonsContent {
  bigNumber: string;
  highlightWord1: string;
  reasonsLabel1: string;
  highlightWord2: string;
  reasonsLabel2: string;
  reasons: Reason[];
  marqueeSectionLabel: string;
  marqueeSectionTitle: string;
  marqueeImages: string[];
  marqueeEventName: string;
  logoImage: string;
}

interface SpeakingReasonsProps {
  content?: {
    bigNumber?: string;
    highlightWord1?: string;
    reasonsLabel1?: string;
    highlightWord2?: string;
    reasonsLabel2?: string;
    reasons?: Reason[];
    marqueeSectionLabel?: string;
    marqueeSectionTitle?: string;
    marqueeImages?: string[];
    marqueeEventName?: string;
    logoImage?: string;
  };
}

const defaults: ReasonsContent = {
  bigNumber: "6",
  highlightWord1: "BIG",
  reasonsLabel1: "reasons that people",
  highlightWord2: "LOVE",
  reasonsLabel2: "working with Sajan",
  reasons: [
    { number: '1', title: 'Customized', description: 'Every session is personally crafted by Sajan to suit your unique audience, industry, and desired outcomes.' },
    { number: '2', title: 'Impactful', description: "Sajan's deep understanding of human psychology ensures your audience experiences a shift that lasts." },
    { number: '3', title: 'Experienced', description: 'With over a decade of global speaking experience, Sajan has the expertise to handle any audience.' },
    { number: '4', title: 'Professional', description: "Dedicated to serving your objectives through meticulous pre-event briefings and post-event engagement." },
    { number: '5', title: 'Relatable', description: 'A unique ability to connect and resonate with everyone from students to high-level CEOs.' },
    { number: '6', title: 'Results-Driven', description: "Delivers transformations, not just speeches. Focused on driving real action and tangible results." }
  ],
  marqueeSectionLabel: "Live from the Stage",
  marqueeSectionTitle: "Speaker Moments",
  marqueeImages: [
    "https://images.unsplash.com/photo-1475721027785-f74dea327912?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop"
  ],
  marqueeEventName: "World Transformation Summit 2024",
  logoImage: "/LOGO2.png"
};

export const SpeakingReasons: React.FC<SpeakingReasonsProps> = ({ content }) => {
  const data = {
    bigNumber: content?.bigNumber || defaults.bigNumber,
    highlightWord1: content?.highlightWord1 || defaults.highlightWord1,
    reasonsLabel1: content?.reasonsLabel1 || defaults.reasonsLabel1,
    highlightWord2: content?.highlightWord2 || defaults.highlightWord2,
    reasonsLabel2: content?.reasonsLabel2 || defaults.reasonsLabel2,
    reasons: content?.reasons || defaults.reasons,
    marqueeSectionLabel: content?.marqueeSectionLabel || defaults.marqueeSectionLabel,
    marqueeSectionTitle: content?.marqueeSectionTitle || defaults.marqueeSectionTitle,
    marqueeImages: content?.marqueeImages || defaults.marqueeImages,
    marqueeEventName: content?.marqueeEventName || defaults.marqueeEventName,
    logoImage: content?.logoImage || defaults.logoImage
  };

  return (
    <section className="py-32 bg-black text-white overflow-hidden border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6 md:px-16 mb-32">
        <div className="text-center mb-32">
          <h2 className="text-[120px] md:text-[180px] font-bold leading-none mb-0 text-white tracking-tighter">{data.bigNumber}</h2>
          <div className="space-y-1">
            <p className="text-2xl md:text-3xl font-light tracking-tight uppercase">
              <span className="text-[#f26522] font-black mr-2">{data.highlightWord1}</span>
              {data.reasonsLabel1}
            </p>
            <p className="text-2xl md:text-3xl font-light tracking-tight uppercase">
              <span className="text-[#f26522] font-black mr-2">{data.highlightWord2}</span>
              {data.reasonsLabel2}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-20">
          {data.reasons.map((reason, idx) => (
            <div key={idx} className="flex items-start gap-8 group">
              <div className="flex items-center gap-6 shrink-0 pt-1">
                <div className="w-8 h-[2px] bg-[#f26522]"></div>
                <span className="text-7xl md:text-8xl font-black text-white leading-none">
                  {reason.number}
                </span>
              </div>
              <div className="pt-2">
                <h3 className="text-2xl md:text-3xl font-bold mb-5 tracking-tight text-white group-hover:text-[#f26522] transition-colors">
                  {reason.title}
                </h3>
                <p className="text-gray-400 font-light leading-relaxed text-sm md:text-[15px] max-w-[340px]">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* IG Story Marquee Section */}
      <div className="relative py-24 bg-white">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#f26522]/20 to-transparent"></div>

        <div className="mb-16 px-6 text-center">
          <p className="text-[#f26522] font-bold uppercase tracking-[0.4em] text-[10px] mb-2">{data.marqueeSectionLabel}</p>
          <h3 className="text-3xl font-bold text-black uppercase tracking-widest">{data.marqueeSectionTitle}</h3>
          <div className="w-12 h-1 bg-black mx-auto mt-4"></div>
        </div>

        <div className="flex overflow-hidden">
          <motion.div
            animate={{ x: [0, -1920] }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 whitespace-nowrap"
          >
            {[...data.marqueeImages, ...data.marqueeImages, ...data.marqueeImages].map((img, idx) => (
              <div
                key={idx}
                className="relative w-[320px] h-[570px] flex-shrink-0 rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] group bg-gray-50"
              >
                <img
                  src={img}
                  alt="Stage Moment"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>

                <div className="absolute top-6 left-6 right-6 flex gap-1">
                  <div className="h-0.5 flex-1 bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full bg-white w-full origin-left animate-progress"></div>
                  </div>
                  <div className="h-0.5 flex-1 bg-white/30 rounded-full"></div>
                  <div className="h-0.5 flex-1 bg-white/30 rounded-full"></div>
                </div>

                <div className="absolute top-10 right-8 flex items-center gap-2">
                  <div className="px-2 py-1 bg-[#f26522] text-[8px] text-white font-bold rounded uppercase tracking-widest flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-white animate-pulse"></div> LIVE
                  </div>
                </div>

                <div className="absolute bottom-12 left-10 text-left">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full border-2 border-[#f26522] p-0.5">
                      <img src={data.logoImage} className="w-full h-full object-contain rounded-full bg-black" />
                    </div>
                    <div className="text-white text-[10px] font-bold tracking-widest uppercase">Sajan Shah</div>
                  </div>
                  <div className="text-white font-bold text-xl tracking-tight leading-none">
                    {data.marqueeEventName}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
};
