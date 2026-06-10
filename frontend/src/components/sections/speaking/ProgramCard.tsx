'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ProgramCardProps {
  name: string;
  pitch: string;
  badges: string[];
  img: string;
  isFeatured?: boolean;
  link?: string;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({ name, pitch, badges, img, isFeatured, link }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      onClick={() => link && window.open(link, '_blank', 'noopener,noreferrer')}
      className={`group relative h-[500px] rounded-[2.5rem] overflow-hidden border shadow-2xl transition-all duration-500 ${link ? 'cursor-pointer' : 'cursor-default'} ${
        isFeatured ? 'border-[#f26522]/50 scale-105 z-10' : 'border-gray-900 bg-black'
      }`}
    >
      {/* 1. Thumbnail (Image/Video Placeholder) */}
      <img 
        src={img} 
        alt={name} 
        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-60 group-hover:opacity-100 group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
      
      {/* Content Container */}
      <div className="absolute inset-0 p-10 flex flex-col justify-end">
        
        {/* 2. Optional Micro-Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {isFeatured && (
            <span className="px-3 py-1 bg-[#f26522] rounded-full text-[8px] font-bold text-white uppercase tracking-widest animate-pulse">
              Featured Experience
            </span>
          )}
          {badges.map((badge, bIdx) => (
            <span key={bIdx} className="px-3 py-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-[8px] font-bold text-[#f26522] uppercase tracking-widest">
              {badge}
            </span>
          ))}
        </div>
        
        {/* 3. Program Name */}
        <h4 className="text-2xl md:text-3xl font-bold text-white mb-3 uppercase tracking-tighter group-hover:text-[#f26522] transition-colors leading-none">
          {name}
        </h4>

        {/* 4. 1-line Impact-Driven Pitch */}
        <p className="text-gray-400 text-sm font-light leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          {pitch}
        </p>
        
        {/* 5. “View Program” CTA */}
        <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 border-b border-[#f26522] pb-1">
            View Program <ArrowUpRight size={14} className="text-[#f26522]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
