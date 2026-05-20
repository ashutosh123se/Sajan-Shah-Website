'use client';
import React from 'react';
import { ProgramCard } from './ProgramCard';

interface Program {
  name: string;
  pitch: string;
  badges: string[];
  img: string;
  isFeatured?: boolean;
}

interface CatalogContent {
  sectionLabel: string;
  heading: string;
  headingDim: string;
  subtext: string;
  programs: Program[];
}

interface ProgramCatalogProps {
  content?: {
    sectionLabel?: string;
    heading?: string;
    headingDim?: string;
    subtext?: string;
    programs?: Program[];
  };
}

const defaults: CatalogContent = {
  sectionLabel: "The Program Catalog",
  heading: "IMPACT-DRIVEN",
  headingDim: "EXPERIENCES.",
  subtext: "Select a program to explore transformation details",
  programs: [
    { name: "India's Biggest Memory & Family Event", pitch: "Revolutionizing how families learn and grow together through neuroscience.", badges: ["Students", "Parents"], img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop", isFeatured: true },
    { name: "World's First Educational Experience Summit", pitch: "A global stage for the future of experiential learning.", badges: ["Youth", "Teachers"], img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop", isFeatured: true },
    { name: "The Hero — Self Mastery Program", pitch: "Unlocking peak performance and mental resilience.", badges: ["Youth", "Corporate"], img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop" },
  ]
};

export const ProgramCatalog: React.FC<ProgramCatalogProps> = ({ content }) => {
  const data = {
    sectionLabel: content?.sectionLabel || defaults.sectionLabel,
    heading: content?.heading || defaults.heading,
    headingDim: content?.headingDim || defaults.headingDim,
    subtext: content?.subtext || defaults.subtext,
    programs: content?.programs || defaults.programs
  };

  return (
    <section id="programs" className="py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-24 text-center">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-[#f26522]"></div>
            <h2 className="text-[#f26522] font-bold uppercase tracking-[0.4em] text-xs">{data.sectionLabel}</h2>
            <div className="w-12 h-[1px] bg-[#f26522]"></div>
          </div>
          <h3 className="text-4xl md:text-7xl font-bold text-white uppercase tracking-tighter leading-none mb-6">
            {data.heading} <br /> <span className="text-gray-800">{data.headingDim}</span>
          </h3>
          <p className="text-gray-500 text-sm font-light tracking-widest uppercase">{data.subtext}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.programs.map((program, idx) => (
            <ProgramCard
              key={idx}
              name={program.name}
              pitch={program.pitch}
              badges={program.badges}
              img={program.img}
              isFeatured={program.isFeatured}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
