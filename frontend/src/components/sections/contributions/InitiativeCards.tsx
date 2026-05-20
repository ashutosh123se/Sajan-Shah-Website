'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  GraduationCap, 
  BookOpen, 
  PenTool, 
  Glasses, 
  Smartphone, 
  Apple, 
  Flame, 
  Scale,
  Sparkles
} from 'lucide-react';

interface Initiative {
  id?: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  stats?: string | null;
}

interface InitiativeCardsProps {
  initiatives?: Initiative[];
}

const DEFAULT_INITIATIVES: Initiative[] = [
  { title: "United First Initiative", description: "Aligning with UN SDGs to drive global change.", imageUrl: "https://images.unsplash.com/photo-1540910419892-f7e722a49206?q=80&w=2070&auto=format&fit=crop" },
  { title: "YMF (Youth Motivation Forum)", description: "Empowering the next generation of leaders.", imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" },
  { title: "Season of Learning", description: "Continuous education programs for all ages.", imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2069&auto=format&fit=crop" },
  { title: "Plantable Pencils Drive", description: "Green education through sustainable tools.", imageUrl: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=2070&auto=format&fit=crop" },
  { title: "UV Glasses Drive", description: "Vision health for underprivileged communities.", imageUrl: "https://images.unsplash.com/photo-1511499767390-a73355326627?q=80&w=2070&auto=format&fit=crop" },
  { title: "Sajan Shah App", description: "Digital neuroscience tools in your pocket.", imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop" },
  { title: "Teachers Training Program", description: "Upskilling educators with neuroscience.", imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop" },
  { title: "Live to Inspire", description: "Our core foundation for large-scale impact.", imageUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2070&auto=format&fit=crop" },
  { title: "Ethos Global Advisory", description: "Strategic consultancy for social impact.", imageUrl: "https://images.unsplash.com/photo-1454165833767-0275ef20356e?q=80&w=2070&auto=format&fit=crop" }
];

const getIconForInitiative = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('united') || t.includes('global') || t.includes('world')) return <Globe size={32} />;
  if (t.includes('youth') || t.includes('motivation') || t.includes('ymf')) return <GraduationCap size={32} />;
  if (t.includes('learning') || t.includes('season')) return <BookOpen size={32} />;
  if (t.includes('pencil') || t.includes('write')) return <PenTool size={32} />;
  if (t.includes('glass') || t.includes('vision') || t.includes('eye')) return <Glasses size={32} />;
  if (t.includes('app') || t.includes('mobile') || t.includes('digital')) return <Smartphone size={32} />;
  if (t.includes('teacher') || t.includes('train')) return <Apple size={32} />;
  if (t.includes('inspire') || t.includes('foundation') || t.includes('live')) return <Flame size={32} />;
  if (t.includes('ethos') || t.includes('advisory')) return <Scale size={32} />;
  return <Sparkles size={32} />;
};

export const InitiativeCards: React.FC<InitiativeCardsProps> = ({ initiatives = [] }) => {
  const activeInitiatives = initiatives.length > 0 ? initiatives : DEFAULT_INITIATIVES;

  return (
    <section className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight uppercase">Our Core Initiatives</h2>
          <div className="w-24 h-1 bg-[#f26522] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeInitiatives.map((item, idx) => (
            <motion.div 
              key={item.id || idx}
              whileHover={{ y: -10 }}
              className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer shadow-2xl"
            >
              <img 
                src={item.imageUrl || "https://images.unsplash.com/photo-1540910419892-f7e722a49206?q=80&w=2070&auto=format&fit=crop"} 
                alt={item.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity group-hover:opacity-90"></div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="text-white mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  {getIconForInitiative(item.title)}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 leading-relaxed">
                  {item.description}
                </p>
                {item.stats && (
                  <div className="mt-2 text-xs font-semibold text-brand-orange">
                    Impact: {item.stats}
                  </div>
                )}
                <div className="mt-6 flex items-center text-[#f26522] font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500">
                  Learn More <span className="ml-2">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
