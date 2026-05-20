'use client';

import React from 'react';
import { Play } from 'lucide-react';

interface LeadershipPhilosophyProps {
  content?: {
    heading?: string;
    subHeading?: string;
    quote?: string;
    boxQuote?: string;
    pillars?: string[];
  };
}

const DEFAULT_PILLARS = [
  "Pillar 1: Data-Driven Cognitive Empowerment",
  "Pillar 2: Environmental Awareness through Learning",
  "Pillar 3: Grassroots Level Institutional Training"
];

export const LeadershipPhilosophy: React.FC<LeadershipPhilosophyProps> = ({ content }) => {
  const heading = content?.heading || "WHY WE CONTRIBUTE";
  const subHeading = content?.subHeading || "Leadership Philosophy";
  const quote = content?.quote || "Social responsibility is not an option; it's a debt we owe to the future. Our contribution model is built on three pillars: Neuroscience, Sustainable Education, and Global Empowerment.";
  const boxQuote = content?.boxQuote || "Real education is giving back.";
  const pillars = content?.pillars || DEFAULT_PILLARS;

  const renderHeading = () => {
    if (heading.includes('<br') || heading.includes('\n')) {
      return <span dangerouslySetInnerHTML={{ __html: heading }} />;
    }
    return heading;
  };

  const renderBoxQuote = () => {
    if (boxQuote.includes('<br') || boxQuote.includes('\n')) {
      return <span dangerouslySetInnerHTML={{ __html: boxQuote }} />;
    }
    return boxQuote;
  };

  return (
    <section className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-20 items-center">
        <div className="lg:w-1/2">
          <div className="relative group">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" 
              alt="Sajan Shah" 
              className="rounded-[3rem] grayscale group-hover:grayscale-0 transition-all duration-1000 shadow-2xl" 
            />
            <div className="absolute -bottom-10 -right-10 bg-[#f26522] p-10 rounded-[3rem] hidden md:block shadow-2xl">
              <div className="text-white text-2xl font-bold tracking-tighter leading-none italic">
                "{renderBoxQuote()}"
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <h2 className="text-[#f26522] font-bold uppercase tracking-[0.3em] text-sm mb-4">{subHeading}</h2>
          <h3 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter uppercase leading-none">
            {renderHeading()}
          </h3>
          <p className="text-gray-300 text-lg font-light leading-relaxed mb-8 italic border-l-2 border-[#f26522] pl-8">
            "{quote}"
          </p>
          <div className="space-y-4 text-gray-500 font-light mb-12">
            {pillars.map((p, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <span className="w-2 h-2 rounded-full bg-gray-800 group-hover:bg-[#f26522] transition-colors"></span>
                <span className="group-hover:text-white transition-colors">{p}</span>
              </div>
            ))}
          </div>
          <button className="flex items-center gap-6 group bg-transparent border-none text-left cursor-pointer">
            <div className="w-20 h-20 rounded-full border border-gray-800 flex items-center justify-center group-hover:bg-[#f26522] group-hover:border-[#f26522] transition-all shadow-xl">
              <div className="text-white group-hover:scale-125 transition-transform">
                <Play size={24} fill="white" />
              </div>
            </div>
            <div className="text-left">
              <div className="text-white uppercase font-bold text-xs tracking-widest mb-1">Watch Leadership Message</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">Sajan Shah - Founder</div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
