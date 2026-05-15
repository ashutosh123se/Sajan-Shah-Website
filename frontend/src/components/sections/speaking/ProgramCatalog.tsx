'use client';
import React from 'react';
import { ProgramCard } from './ProgramCard';

const programs = [
  {
    name: "India's Biggest Memory & Family Event",
    pitch: "Revolutionizing how families learn and grow together through neuroscience.",
    badges: ["Students", "Parents"],
    img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop",
    isFeatured: true
  },
  {
    name: "World’s First Educational Experience Summit",
    pitch: "A global stage for the future of experiential learning.",
    badges: ["Youth", "Teachers"],
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
    isFeatured: true
  },
  {
    name: "The Hero — Self Mastery Program",
    pitch: "Unlocking peak performance and mental resilience.",
    badges: ["Youth", "Corporate"],
    img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Positive Home Culture — Parenting",
    pitch: "Scientific parenting strategies for the modern age.",
    badges: ["Parents"],
    img: "https://images.unsplash.com/photo-1536640712247-c5753ff74a50?q=80&w=2050&auto=format&fit=crop"
  },
  {
    name: "Train The Trainer Program",
    pitch: "Elite mentorship for aspiring speakers and coaches.",
    badges: ["Corporate"],
    img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "The Business Hero Program",
    pitch: "Neuroscience-backed leadership for modern entrepreneurs.",
    badges: ["Corporate"],
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Boost Your Business Program",
    pitch: "Exponential growth strategies for small to large enterprises.",
    badges: ["Corporate"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
  },
  {
    name: "Catch a Lie — Micro Emotions",
    pitch: "Master the art of non-verbal communication and behavioral analysis.",
    badges: ["Corporate", "Youth"],
    img: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Teach The Teachers Program",
    pitch: "Empowering educators with high-impact pedagogical tools.",
    badges: ["Teachers"],
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop"
  },
  {
    name: "Life Adventure Experience Program",
    pitch: "Outdoor experiential learning to push personal boundaries.",
    badges: ["Youth", "Students"],
    img: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "You v/s You — Exclusive",
    pitch: "A personal deep-dive into overcoming internal limitations.",
    badges: ["Youth"],
    img: "https://images.unsplash.com/photo-1434493566906-db97476866ec?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Creative Self — Tailored Motivation",
    pitch: "Customized programs designed for specific institutional needs.",
    badges: ["Youth", "Corporate"],
    img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "1:1 Personal Mentorship",
    pitch: "Direct, high-impact consulting with Sajan Shah.",
    badges: ["Corporate", "Youth"],
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop"
  }
];

export const ProgramCatalog: React.FC = () => {
  return (
    <section id="programs" className="py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-24 text-center">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-[#f26522]"></div>
            <h2 className="text-[#f26522] font-bold uppercase tracking-[0.4em] text-xs">The Program Catalog</h2>
            <div className="w-12 h-[1px] bg-[#f26522]"></div>
          </div>
          <h3 className="text-4xl md:text-7xl font-bold text-white uppercase tracking-tighter leading-none mb-6">
            IMPACT-DRIVEN <br /> <span className="text-gray-800">EXPERIENCES.</span>
          </h3>
          <p className="text-gray-500 text-sm font-light tracking-widest uppercase">Select a program to explore transformation details</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {programs.map((program, idx) => (
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
