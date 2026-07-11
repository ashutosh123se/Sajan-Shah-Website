'use client';
import React, { useState } from 'react';
import { AppPromoModal } from './AppPromoModal';
import { PlantablePencilsModal } from './PlantablePencilsModal';
import { UVGlassesModal } from './UVGlassesModal';
import { EthosGlobalModal } from './EthosGlobalModal';
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
  Scale
} from 'lucide-react';

interface InitiativeCardsProps {
  initiatives?: Array<{
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    slug?: string;
  }>;
}

const defaultInitiatives = [
  { title: 'Ethos Global Advisory', desc: 'Strategic consultancy for social impact.', icon: <Scale size={32} />, img: '/Our Core Initiatives/Ethos Global Advisory cover.png' },
  { title: 'Live to Inspire', desc: 'Our core foundation for large-scale impact.', icon: <Flame size={32} />, img: '/live to bg.jpeg' },
  { title: 'Plantable Pencils Drive', desc: 'Green education through sustainable tools.', icon: <PenTool size={32} />, img: '/Our Core Initiatives/Plantable Pencils Drive cover.jpeg' },
  { title: 'Sajan Shah App', desc: 'Digital neuroscience tools in your pocket.', icon: <Smartphone size={32} />, img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop' },
  { title: 'Season of Learning', desc: 'Continuous education programs for all ages.', icon: <BookOpen size={32} />, img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2069&auto=format&fit=crop' },
  { title: 'Teachers Training Program', desc: 'Upskilling educators with neuroscience.', icon: <Apple size={32} />, img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop' },
  { title: 'UV Glasses Drive', desc: 'Vision health for underprivileged communities.', icon: <Glasses size={32} />, img: '/Our Core Initiatives/UV Glasses Drive cover.jpeg' },
  { title: 'United First Initiative', desc: 'Aligning with UN SDGs to drive global change.', icon: <Globe size={32} />, img: '/united first.png' },
  { title: 'YMF (Youth Motivation Forum)', desc: 'Empowering the next generation of leaders.', icon: <GraduationCap size={32} />, img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop' },
];

export const InitiativeCards: React.FC<InitiativeCardsProps> = ({ initiatives: apiInitiatives = [] }) => {
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [isPencilsModalOpen, setIsPencilsModalOpen] = useState(false);
  const [isUVGlassesModalOpen, setIsUVGlassesModalOpen] = useState(false);
  const [isEthosModalOpen, setIsEthosModalOpen] = useState(false);

  const dbInitiatives = apiInitiatives.map(init => ({
    title: init.title,
    desc: init.description,
    icon: <Globe size={32} />,
    img: init.imageUrl || '/LOGO.png',
    slug: init.slug,
  }));

  const initiatives = dbInitiatives.length > 0
    ? dbInitiatives
    : defaultInitiatives;

  return (
    <section className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight uppercase">Our Core Initiatives</h2>
          <div className="w-24 h-1 bg-[#f26522] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initiatives.map((item, idx) => (
            <motion.div
              key={`${item.title}-${idx}`}
              whileHover={{ y: -10 }}
              onClick={() => {
                if (item.title === 'Sajan Shah App') {
                  setIsAppModalOpen(true);
                } else if (item.title === 'Ethos Global Advisory') {
                  setIsEthosModalOpen(true);
                } else if (item.title === 'Plantable Pencils Drive') {
                  setIsPencilsModalOpen(true);
                } else if (item.title === 'UV Glasses Drive') {
                  setIsUVGlassesModalOpen(true);
                } else if (item.title === 'Season of Learning') {
                  window.open('https://sol.sajanshah.com/', '_blank');
                } else if (item.title === 'Live to Inspire' || item.title === 'United First Initiative') {
                  window.open('https://www.unitedfirst.in/', '_blank');
                }
              }}
              className="group relative h-[450px] md:h-[480px] rounded-2xl overflow-hidden cursor-pointer shadow-2xl"
            >
              <img
                src={item.img}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 scale-[1.15] group-hover:scale-[1.25] grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity group-hover:opacity-90"></div>

              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="text-white mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 leading-relaxed">
                  {item.desc}
                </p>
                <div className="mt-6 flex items-center text-[#f26522] font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500">
                  Learn More <span className="ml-2">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <AppPromoModal isOpen={isAppModalOpen} onClose={() => setIsAppModalOpen(false)} />
      <PlantablePencilsModal isOpen={isPencilsModalOpen} onClose={() => setIsPencilsModalOpen(false)} />
      <UVGlassesModal isOpen={isUVGlassesModalOpen} onClose={() => setIsUVGlassesModalOpen(false)} />
      <EthosGlobalModal isOpen={isEthosModalOpen} onClose={() => setIsEthosModalOpen(false)} />
    </section>
  );
};
