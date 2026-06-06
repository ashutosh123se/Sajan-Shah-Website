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
    { name: "The Hero - Self Mastery Program", pitch: "Unlocking peak performance and mental resilience.", badges: ["Youth", "Corporate"], img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop", isFeatured: true },
    { name: "Building a Positive Home Culture — Parenting Program", pitch: "Empowering parents to create a supportive and thriving home environment.", badges: ["Parents", "Families"], img: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2070&auto=format&fit=crop" },
    { name: "Train The Trainer Program", pitch: "Equipping professionals with the tools to inspire and educate effectively.", badges: ["Professionals", "Trainers"], img: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop" },
    { name: "The Business Hero Program", pitch: "Transforming corporate leaders into visionaries and industry pioneers.", badges: ["Corporate", "Business"], img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop" },
    { name: "Boost Your Business Program", pitch: "Strategies to accelerate growth, optimize performance, and scale success.", badges: ["Corporate", "Entrepreneurs"], img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" },
    { name: "Catch a Lie — Micro Emotions Program", pitch: "Mastering the art of reading micro-expressions and understanding human behavior.", badges: ["Corporate", "Psychology"], img: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?q=80&w=2069&auto=format&fit=crop" },
    { name: "Teach The Teachers Program", pitch: "Empowering educators with modern methodologies to engage and inspire students.", badges: ["Teachers", "Educators"], img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop" },
    { name: "Life Adventure Experience Program", pitch: "An immersive journey to discover your true potential and embrace life's challenges.", badges: ["Youth", "Adventure"], img: "https://images.unsplash.com/photo-1533692328991-08159ff19fca?q=80&w=2069&auto=format&fit=crop" },
    { name: "You v/s You — Exclusive Program", pitch: "A deep dive into personal mastery and overcoming internal barriers.", badges: ["Exclusive", "Mentorship"], img: "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2070&auto=format&fit=crop" },
    { name: "Creative Self — Tailored Motivational Program", pitch: "Unleashing your inner creativity and driving innovation in your personal and professional life.", badges: ["Creatives", "Professionals"], img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop" },
    { name: "1:1 Personal Mentorship Program", pitch: "Direct, personalized guidance from Sajan to accelerate your path to success.", badges: ["Mentorship", "Personal"], img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop" }
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
