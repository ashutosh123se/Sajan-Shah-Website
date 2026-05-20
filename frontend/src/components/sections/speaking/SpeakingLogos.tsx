'use client';

import React from 'react';

interface Logo {
  name: string;
  displayType: 'text' | 'tedx';
  color?: string;
  borderColor?: string;
  fontStyle?: string;
  primaryColor?: string;
}

interface SpeakingLogosProps {
  content?: {
    label?: string;
    logos?: Logo[];
  };
}

const defaultLogos: Logo[] = [
  { name: 'TATA', displayType: 'text', color: '#005a9c', fontStyle: 'black' },
  { name: 'TEDx', displayType: 'tedx', primaryColor: '#e62b1e' },
  { name: 'ONGC', displayType: 'text', color: '#222', borderColor: '#dc2626' },
  { name: 'SBI', displayType: 'text', color: '#222', fontStyle: 'bold' },
  { name: 'Zydus', displayType: 'text', color: '#004b8d', fontStyle: 'black italic' },
];

export const SpeakingLogos: React.FC<SpeakingLogosProps> = ({ content }) => {
  const data = {
    label: content?.label || 'Trusted by:',
    logos: content?.logos || defaultLogos
  };

  const renderLogo = (logo: Logo, idx: number) => {
    if (logo.displayType === 'tedx') {
      return (
        <div key={idx} className="flex items-center text-2xl font-black">
          <span style={{ color: logo.primaryColor || '#e62b1e' }}>{logo.name.replace('x', '')}</span>
          <span className="text-gray-900 font-light ml-0.5">x</span>
        </div>
      );
    }
    return (
      <div key={idx} className="flex flex-col items-center">
        <span
          className={`text-2xl font-${logo.fontStyle?.includes('black') ? 'black' : logo.fontStyle?.includes('bold') ? 'bold' : 'semibold'} ${logo.fontStyle?.includes('italic') ? 'italic' : ''} tracking-tighter ${logo.borderColor ? `border-b-2` : ''}`}
          style={{ color: logo.color || '#222', borderColor: logo.borderColor }}
        >
          {logo.name}
        </span>
      </div>
    );
  };

  return (
    <section className="py-16 bg-white border-y border-gray-100 shadow-xl relative z-20 mt-0 mx-6 md:mx-16 rounded-xl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 w-full">
          <div className="shrink-0">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-2 lg:mb-0">{data.label}</p>
            <div className="w-12 h-0.5 bg-[#f26522] hidden lg:block"></div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-20">
            {data.logos.map((logo, idx) => renderLogo(logo, idx))}
          </div>
        </div>
      </div>
    </section>
  );
};
