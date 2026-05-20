'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Download,
  MessageSquare,
  PhoneCall,
  UserPlus,
  PlayCircle,
  ExternalLink
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  PlayCircle: <PlayCircle size={32} />,
  Download: <Download size={32} />,
  MessageSquare: <MessageSquare size={32} />,
  PhoneCall: <PhoneCall size={32} />,
  FileText: <FileText size={32} />,
  UserPlus: <UserPlus size={32} />,
};

interface Stat { value: string; label: string; }
interface Feature { title: string; desc: string; icon: string; linkText: string; }

interface FeaturesContent {
  sectionLabel: string;
  heading: string;
  headingDim: string;
  description: string;
  stats: Stat[];
  features: Feature[];
  ctaCardTitle: string;
  ctaCardDesc: string;
  ctaCardButtonText: string;
  whatsappNumber: string;
}

interface ProgramFeaturesProps {
  content?: {
    sectionLabel?: string;
    heading?: string;
    headingDim?: string;
    description?: string;
    stats?: Stat[];
    features?: Feature[];
    ctaCardTitle?: string;
    ctaCardDesc?: string;
    ctaCardButtonText?: string;
    whatsappNumber?: string;
  };
}

const defaults: FeaturesContent = {
  sectionLabel: "Universal Features",
  heading: "THE SUCCESS",
  headingDim: "ECOSYSTEM.",
  description: "We don't just provide programs; we provide a complete support infrastructure designed to streamline decision-making and ensure institutional alignment.",
  stats: [
    { value: "13+", label: "Programs" },
    { value: "16M+", label: "Lives Impacted" }
  ],
  features: [
    { title: "Program Topic Pages", desc: "Each program features a dedicated landing page with a 30-40 second video snippet, high-level pitch, and key results.", icon: "PlayCircle", linkText: "Explore Topics" },
    { title: "Centralized Brochures", desc: "Access PDF brochures for all 11 programs in one place, or grab the complete ecosystem with a one-click ZIP download.", icon: "Download", linkText: "Download All ZIP" },
    { title: "Impact Stories", desc: "Browse 6–12 detailed case studies featuring real-world transformations, anonymized data, and narrative summaries.", icon: "MessageSquare", linkText: "View Case Studies" },
    { title: "Invite Sajan to Speak", desc: "Direct booking portal for institutions. Connect via form or instant WhatsApp for rapid event scheduling.", icon: "PhoneCall", linkText: "Booking Portal" },
    { title: "Full Speaker Kit", desc: "A comprehensive, media-ready package including high-res headshots, formal profiles, and professional bios.", icon: "FileText", linkText: "Download Speaker Kit" }
  ],
  ctaCardTitle: "Rapid Response",
  ctaCardDesc: "Connect directly for event scheduling and technical requirements.",
  ctaCardButtonText: "WhatsApp Now",
  whatsappNumber: ""
};

export const ProgramFeatures: React.FC<ProgramFeaturesProps> = ({ content }) => {
  const data = {
    sectionLabel: content?.sectionLabel || defaults.sectionLabel,
    heading: content?.heading || defaults.heading,
    headingDim: content?.headingDim || defaults.headingDim,
    description: content?.description || defaults.description,
    stats: content?.stats || defaults.stats,
    features: content?.features || defaults.features,
    ctaCardTitle: content?.ctaCardTitle || defaults.ctaCardTitle,
    ctaCardDesc: content?.ctaCardDesc || defaults.ctaCardDesc,
    ctaCardButtonText: content?.ctaCardButtonText || defaults.ctaCardButtonText,
    whatsappNumber: content?.whatsappNumber || defaults.whatsappNumber
  };

  const handleWhatsApp = () => {
    const num = data.whatsappNumber || '+919876543210';
    window.open(`https://wa.me/${num.replace(/\D/g, '')}`, '_blank');
  };

  return (
    <section className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-20 items-center mb-24">
          <div className="lg:w-1/2">
            <h2 className="text-[#f26522] font-bold uppercase tracking-[0.4em] text-xs mb-4">{data.sectionLabel}</h2>
            <h3 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter leading-none mb-8">
              {data.heading} <br /> <span className="text-gray-700">{data.headingDim}</span>
            </h3>
            <p className="text-gray-400 text-lg font-light leading-relaxed">{data.description}</p>
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            {data.stats.map((stat, idx) => (
              <div
                key={idx}
                className={`aspect-square bg-gray-900/50 rounded-3xl border border-gray-800 flex items-center justify-center ${idx % 2 === 1 ? 'mt-12' : ''}`}
              >
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="p-12 bg-[#050505] border border-gray-900 rounded-[3rem] group hover:border-[#f26522]/30 transition-all cursor-pointer"
            >
              <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center text-[#f26522] mb-8 group-hover:bg-[#f26522] group-hover:text-white transition-all duration-500">
                {iconMap[feature.icon] || <PlayCircle size={32} />}
              </div>
              <h4 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">{feature.title}</h4>
              <p className="text-gray-500 text-sm font-light leading-relaxed mb-8 group-hover:text-gray-300 transition-colors">
                {feature.desc}
              </p>
              <div className="flex items-center gap-2 text-[#f26522] font-bold text-xs uppercase tracking-[0.2em] opacity-50 group-hover:opacity-100 transition-all">
                {feature.linkText} <ExternalLink size={12} />
              </div>
            </motion.div>
          ))}

          {/* WhatsApp Quick Connect Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="p-12 bg-gradient-to-br from-[#f26522] to-[#c54b15] rounded-[3rem] flex flex-col justify-center text-center shadow-2xl shadow-[#f26522]/20 group"
          >
            <h4 className="text-white font-bold text-xl mb-4 uppercase tracking-tight">{data.ctaCardTitle}</h4>
            <p className="text-white/80 text-sm font-light mb-10">{data.ctaCardDesc}</p>
            <button
              onClick={handleWhatsApp}
              className="bg-white text-black font-bold py-4 px-8 rounded-2xl text-xs uppercase tracking-widest hover:scale-105 transition-transform flex items-center justify-center gap-3"
            >
              <PhoneCall size={16} /> {data.ctaCardButtonText}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
