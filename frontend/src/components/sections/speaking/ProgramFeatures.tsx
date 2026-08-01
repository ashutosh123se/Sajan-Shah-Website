'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall } from 'lucide-react';

interface ProgramFeaturesProps {
  content?: {
    sectionLabel?: string;
    heading?: string;
    headingDim?: string;
    description?: string;
    stats?: Array<{ value: string; label: string }>;
    ctaCardTitle?: string;
    ctaCardDesc?: string;
    ctaCardButtonText?: string;
    whatsappNumber?: string;
  };
}

export const ProgramFeatures: React.FC<ProgramFeaturesProps> = ({ content }) => {
  const sectionLabel = content?.sectionLabel || 'Universal Features';
  const heading = content?.heading || 'THE SUCCESS';
  const headingDim = content?.headingDim || 'ECOSYSTEM.';
  const description =
    content?.description ||
    "We don't just provide programs; we provide a complete support infrastructure designed to streamline decision-making and ensure institutional alignment.";
  const stats = content?.stats || [
    { value: '12+', label: 'Programs' },
    { value: '16M+', label: 'Lives Impacted' },
  ];

  return (
    <section className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-20 items-center mb-24">
          <div className="lg:w-1/2">
            <h2 className="text-[#f26522] font-bold uppercase tracking-[0.4em] text-xs mb-4">{sectionLabel}</h2>
            <h3 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter leading-none mb-8">
              {heading} <br /> <span className="text-gray-700">{headingDim}</span>
            </h3>
            <p className="text-gray-400 text-lg font-light leading-relaxed">{description}</p>
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            {stats.slice(0, 2).map((stat, idx) => (
              <div
                key={stat.label}
                className={`aspect-square bg-gray-900/50 rounded-3xl border border-gray-800 flex items-center justify-center ${idx === 1 ? 'mt-12' : ''}`}
              >
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="p-12 bg-gradient-to-br from-[#f26522] to-[#c54b15] rounded-[3rem] flex flex-col justify-center text-center shadow-2xl shadow-[#f26522]/20 group cursor-pointer"
            onClick={() => {
              if (content?.whatsappNumber) {
                window.open(`https://wa.me/${content.whatsappNumber}`, '_blank');
              } else {
                window.location.href = '/events#book-sajan';
              }
            }}
          >
            <h4 className="text-white font-bold text-xl mb-4 uppercase tracking-tight">
              {content?.ctaCardTitle || 'Invite Sajan to Speak'}
            </h4>
            <p className="text-white/80 text-sm font-light mb-10">
              {content?.ctaCardDesc ||
                'Direct booking portal for institutions. Connect via form or instant WhatsApp for rapid event scheduling.'}
            </p>
            <button className="bg-white text-black font-bold py-4 px-8 rounded-2xl text-xs uppercase tracking-widest hover:scale-105 transition-transform flex items-center justify-center gap-3">
              <PhoneCall size={16} /> {content?.ctaCardButtonText || 'Booking Portal'}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
