'use client';
import React from 'react';
import { ProgramCard } from './ProgramCard';

interface Program {
  name: string;
  pitch: string;
  badges: string[];
  img: string;
  isActive?: boolean;
  isFeatured?: boolean;
  link?: string;
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
  sectionLabel: 'The Program Catalog',
  heading: 'IMPACT-DRIVEN',
  headingDim: 'EXPERIENCES.',
  subtext: 'Select a program to explore transformation details',
  programs: [
    {
      name: "India's Biggest Memory & Family Event",
      pitch: 'Revolutionizing how families learn and grow together through neuroscience.',
      badges: ['Students', 'Parents'],
      img: '/webinar.png',
      isFeatured: true,
      link: 'https://webinar.sajanshah.com/',
    },
    {
      name: "World's First Educational Experience Summit",
      pitch: 'A global stage for the future of experiential learning.',
      badges: ['Youth', 'Teachers'],
      img: '/Untold Stories of Your Heroes.png',
      isFeatured: true,
      link: 'https://education.sajanshah.com',
    },
    {
      name: 'The Hero - Self Mastery Program',
      pitch: 'Unlocking peak performance and mental resilience.',
      badges: ['Youth', 'Corporate'],
      img: '/Speking Hero.jpeg',
      isFeatured: true,
      link: 'https://hero.sajanshah.com',
    },
    {
      name: 'Building a Positive Home Culture — Parenting Program',
      pitch: 'Empowering parents to create a supportive and thriving home environment.',
      badges: ['Parents', 'Families'],
      img: '/Studenting & Parenting.png',
      link: 'https://parenting.sajanshah.com',
    },
    {
      name: 'Train The Trainer Program',
      pitch: 'Equipping professionals with the tools to inspire and educate effectively.',
      badges: ['Professionals', 'Trainers'],
      img: '/Sir Speaking.jpeg',
      link: 'https://t3p.sajanshah.com',
    },
    {
      name: 'Boost Your Business Program',
      pitch: 'Strategies to accelerate growth, optimize performance, and scale success.',
      badges: ['Corporate', 'Entrepreneurs'],
      img: '/impact.png',
      link: 'https://business.sajanshah.com',
    },
    {
      name: 'Catch a Lie — Micro Emotions Program',
      pitch: 'Mastering the art of reading micro-expressions and understanding human behavior.',
      badges: ['Corporate', 'Psychology'],
      img: '/Live from the Stage/3.jpeg',
      link: 'https://catchalie.sajanshah.com',
    },
    {
      name: 'Teach The Teachers Program',
      pitch: 'Empowering educators with modern methodologies to engage and inspire students.',
      badges: ['Teachers', 'Educators'],
      img: '/Live from the Stage/1.jpeg',
      link: 'https://teachers.sajanshah.com',
    },
    {
      name: 'Life Adventure Experience Program',
      pitch: "An immersive journey to discover your true potential and embrace life's challenges.",
      badges: ['Youth', 'Adventure'],
      img: '/Live from the Stage/6.jpeg',
      link: 'https://adventure.sajanshah.com',
    },
    {
      name: 'You v/s You — Exclusive Program',
      pitch: 'A deep dive into personal mastery and overcoming internal barriers.',
      badges: ['Exclusive', 'Mentorship'],
      img: '/You vs You.png',
    },
    {
      name: 'Customise Program By Sajan Shah',
      pitch: 'Unleashing your inner creativity and driving innovation in your personal and professional life.',
      badges: ['Creatives', 'Professionals'],
      img: '/Live from the Stage/8.jpeg',
      link: 'https://customise.sajanshah.com',
    },
    {
      name: '1:1 Personal Mentorship Program',
      pitch: 'Direct, personalized guidance from Sajan to accelerate your path to success.',
      badges: ['Mentorship', 'Personal'],
      img: '/Live from the Stage/10.png',
      link: 'https://personalgrowth.sajanshah.com',
    },
  ],
};

function normalizeName(name?: string) {
  return (name || '')
    .toLowerCase()
    .replace(/[–—−]/g, '-')
    .replace(/[^a-z0-9]+/g, '')
    .trim();
}

/** Keep local `/public` or `/uploads` images; replace Unsplash/external stock with designer defaults. */
function preferLocalImage(cmsImg?: string, fallback?: string) {
  const img = (cmsImg || '').trim();
  if (!img) return fallback || '';
  if (img.startsWith('/') && !img.startsWith('//')) return img;
  if (img.includes('/uploads/')) return img;
  return fallback || img;
}

/** Server CMS often stores programs without `link` / with Unsplash images — align to local defaults. */
function mergePrograms(cmsPrograms?: Program[]): Program[] {
  if (!cmsPrograms?.length) return defaults.programs;

  return cmsPrograms
    .filter((p) => p && p.isActive !== false)
    .map((program) => {
      const fallback = defaults.programs.find(
        (d) => normalizeName(d.name) === normalizeName(program.name)
      );
      const link = (program.link && String(program.link).trim()) || fallback?.link || '';
      return {
        ...fallback,
        ...program,
        img: preferLocalImage(program.img, fallback?.img),
        link,
        badges:
          Array.isArray(program.badges) && program.badges.length
            ? program.badges
            : fallback?.badges || [],
      };
    });
}

export const ProgramCatalog: React.FC<ProgramCatalogProps> = ({ content }) => {
  const data = {
    sectionLabel: content?.sectionLabel || defaults.sectionLabel,
    heading: content?.heading || defaults.heading,
    headingDim: content?.headingDim || defaults.headingDim,
    subtext: content?.subtext || defaults.subtext,
    programs: mergePrograms(content?.programs),
  };

  return (
    <section id="programs" className="py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-24 text-center">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-[#f26522]"></div>
            <h2 className="text-[#f26522] font-bold uppercase tracking-[0.4em] text-xs">
              {data.sectionLabel}
            </h2>
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
              key={`${program.name}-${idx}`}
              name={program.name}
              pitch={program.pitch}
              badges={program.badges}
              img={program.img}
              isFeatured={program.isFeatured}
              link={program.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
