'use client';

import React from 'react';

interface LogoItem {
  name?: string;
  imageUrl?: string;
  displayType?: string;
}

interface SpeakingLogosProps {
  content?: {
    label?: string;
    /** Empty / text-only → show designer strip. Items with imageUrl → custom logos. */
    logos?: Array<LogoItem | string>;
    stripImage?: string;
  };
}

function hasImageLogos(logos: Array<LogoItem | string>) {
  return logos.some((logo) => typeof logo === 'object' && !!logo?.imageUrl);
}

export const SpeakingLogos: React.FC<SpeakingLogosProps> = ({ content }) => {
  const label = content?.label || 'Trusted by:';
  const logos = content?.logos || [];
  const stripImage = content?.stripImage || '/SPEAKINGlogo.png';

  // Server often stores text names (TATA, TEDX…). Local/designer look is the logo strip image.
  const useDesignerStrip = logos.length === 0 || !hasImageLogos(logos);
  const imageLogos = useDesignerStrip
    ? []
    : (logos.filter((logo) => typeof logo === 'object' && logo?.imageUrl) as LogoItem[]);

  return (
    <section className="py-12 bg-white border-y border-gray-100 shadow-xl relative z-20 mt-0 mx-6 md:mx-16 rounded-xl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 w-full">
          <div className="shrink-0">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs md:text-sm mb-2 lg:mb-0">
              {label}
            </p>
            <div className="w-12 h-0.5 bg-[#f26522] hidden lg:block mt-1"></div>
          </div>

          <div className="flex-1 flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {useDesignerStrip ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={stripImage}
                alt="Trusted partners"
                className="h-12 md:h-16 lg:h-20 w-auto object-contain scale-110 md:scale-125 origin-center"
              />
            ) : (
              imageLogos.map((logo, idx) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={`${logo.name || logo.imageUrl}-${idx}`}
                  src={logo.imageUrl}
                  alt={logo.name || 'Partner logo'}
                  className="h-10 md:h-14 w-auto object-contain"
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
