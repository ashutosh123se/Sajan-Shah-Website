'use client';
import React, { useState } from 'react';
import { MediaImage } from '@/components/common/MediaImage';
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
  Scale,
} from 'lucide-react';

interface InitiativeCardsProps {
  initiatives?: Array<{
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    slug?: string;
    linkUrl?: string | null;
  }>;
}

type ModalKey = 'app' | 'pencils' | 'uv' | 'ethos';

const ICON_BY_SLUG: Record<string, React.ReactNode> = {
  'ethos-global-advisory': <Scale size={32} />,
  'live-to-inspire': <Flame size={32} />,
  'plantable-pencils-drive': <PenTool size={32} />,
  'sajan-shah-app': <Smartphone size={32} />,
  'season-of-learning': <BookOpen size={32} />,
  'teachers-training-program': <Apple size={32} />,
  'uv-glasses-drive': <Glasses size={32} />,
  'united-first-initiative': <Globe size={32} />,
  'ymf-youth-motivation-forum': <GraduationCap size={32} />,
};

const DEFAULT_LINK_BY_SLUG: Record<string, string> = {
  'ethos-global-advisory': 'modal:ethos',
  'plantable-pencils-drive': 'modal:pencils',
  'sajan-shah-app': 'modal:app',
  'uv-glasses-drive': 'modal:uv',
  'season-of-learning': 'https://sol.sajanshah.com/',
  'live-to-inspire': 'https://livetoinspire.in/',
  'united-first-initiative': 'https://livetoinspire.in/',
  'teachers-training-program': 'https://teachers.sajanshah.com',
  'ymf-youth-motivation-forum': '/events#book-sajan',
};

const defaultInitiatives = [
  {
    title: 'Ethos Global Advisory',
    desc: 'Strategic consultancy for social impact.',
    icon: <Scale size={32} />,
    img: '/Our Core Initiatives/Ethos Global Advisory cover.png',
    slug: 'ethos-global-advisory',
    linkUrl: 'modal:ethos',
  },
  {
    title: 'Live to Inspire',
    desc: 'Our core foundation for large-scale impact.',
    icon: <Flame size={32} />,
    img: '/live to bg.jpeg',
    slug: 'live-to-inspire',
    linkUrl: 'https://livetoinspire.in/',
  },
  {
    title: 'Plantable Pencils Drive',
    desc: 'Green education through sustainable tools.',
    icon: <PenTool size={32} />,
    img: '/Our Core Initiatives/Plantable Pencils Drive cover.jpeg',
    slug: 'plantable-pencils-drive',
    linkUrl: 'modal:pencils',
  },
  {
    title: 'Sajan Shah App',
    desc: 'Digital neuroscience tools in your pocket.',
    icon: <Smartphone size={32} />,
    img: '/APP/app.webp',
    slug: 'sajan-shah-app',
    linkUrl: 'modal:app',
  },
  {
    title: 'Season of Learning',
    desc: 'Continuous education programs for all ages.',
    icon: <BookOpen size={32} />,
    img: '/EVENT.png',
    slug: 'season-of-learning',
    linkUrl: 'https://sol.sajanshah.com/',
  },
  {
    title: 'Teachers Training Program',
    desc: 'Upskilling educators with neuroscience.',
    icon: <Apple size={32} />,
    img: '/Sir Speaking.jpeg',
    slug: 'teachers-training-program',
    linkUrl: 'https://teachers.sajanshah.com',
  },
  {
    title: 'UV Glasses Drive',
    desc: 'Vision health for underprivileged communities.',
    icon: <Glasses size={32} />,
    img: '/Our Core Initiatives/UV Glasses Drive cover.jpeg',
    slug: 'uv-glasses-drive',
    linkUrl: 'modal:uv',
  },
  {
    title: 'United First Initiative',
    desc: 'Aligning with UN SDGs to drive global change.',
    icon: <Globe size={32} />,
    img: '/united first.png',
    slug: 'united-first-initiative',
    linkUrl: 'https://livetoinspire.in/',
  },
  {
    title: 'YMF (Youth Motivation Forum)',
    desc: 'Empowering the next generation of leaders.',
    icon: <GraduationCap size={32} />,
    img: '/impact.png',
    slug: 'ymf-youth-motivation-forum',
    linkUrl: '/events#book-sajan',
  },
];

function resolveLink(slug?: string, linkUrl?: string | null, title?: string) {
  if (linkUrl) return linkUrl;
  if (slug && DEFAULT_LINK_BY_SLUG[slug]) return DEFAULT_LINK_BY_SLUG[slug];
  // Legacy title fallbacks
  if (title === 'Sajan Shah App') return 'modal:app';
  if (title === 'Ethos Global Advisory') return 'modal:ethos';
  if (title === 'Plantable Pencils Drive') return 'modal:pencils';
  if (title === 'UV Glasses Drive') return 'modal:uv';
  if (title === 'Season of Learning') return 'https://sol.sajanshah.com/';
  if (title === 'Live to Inspire' || title === 'United First Initiative') {
    return 'https://livetoinspire.in/';
  }
  if (title === 'Teachers Training Program') return 'https://teachers.sajanshah.com';
  if (title?.includes('YMF')) return '/events#book-sajan';
  return '';
}

export const InitiativeCards: React.FC<InitiativeCardsProps> = ({
  initiatives: apiInitiatives = [],
}) => {
  const [activeModal, setActiveModal] = useState<ModalKey | null>(null);

  const dbInitiatives = apiInitiatives.map((init) => ({
    title: init.title,
    desc: init.description,
    icon: ICON_BY_SLUG[init.slug || ''] || <Globe size={32} />,
    img: init.imageUrl || '/LOGO.png',
    slug: init.slug,
    linkUrl: resolveLink(init.slug, init.linkUrl, init.title),
  }));

  const initiatives = dbInitiatives.length > 0 ? dbInitiatives : defaultInitiatives;

  const handleClick = (item: { title: string; linkUrl?: string }) => {
    const link = item.linkUrl || '';
    if (link.startsWith('modal:')) {
      const key = link.replace('modal:', '') as ModalKey;
      if (['app', 'pencils', 'uv', 'ethos'].includes(key)) {
        setActiveModal(key);
      }
      return;
    }
    if (link) {
      if (link.startsWith('/') || link.startsWith('#')) {
        window.location.href = link;
      } else {
        window.open(link, '_blank', 'noopener,noreferrer');
      }
    }
  };

  return (
    <section className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight uppercase">
            Our Core Initiatives
          </h2>
          <div className="w-24 h-1 bg-[#f26522] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initiatives.map((item, idx) => (
            <motion.div
              key={`${item.title}-${idx}`}
              whileHover={{ y: -10 }}
              onClick={() => handleClick(item)}
              className="group relative h-[450px] md:h-[480px] rounded-2xl overflow-hidden cursor-pointer shadow-2xl"
            >
              <MediaImage
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
      <AppPromoModal isOpen={activeModal === 'app'} onClose={() => setActiveModal(null)} />
      <PlantablePencilsModal
        isOpen={activeModal === 'pencils'}
        onClose={() => setActiveModal(null)}
      />
      <UVGlassesModal isOpen={activeModal === 'uv'} onClose={() => setActiveModal(null)} />
      <EthosGlobalModal isOpen={activeModal === 'ethos'} onClose={() => setActiveModal(null)} />
    </section>
  );
};
