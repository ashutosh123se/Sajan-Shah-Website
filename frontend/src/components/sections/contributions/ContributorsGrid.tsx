'use client';

import React from 'react';
import { MediaImage } from '@/components/common/MediaImage';

type Contributor = {
  id: string;
  name: string;
  photoUrl: string;
  role: string;
  description: string;
  order: number;
};

interface ContributorsGridProps {
  contributors: Contributor[];
}

export function ContributorsGrid({ contributors }: ContributorsGridProps) {
  // Don't hide the section completely — show it if there are contributors
  if (!contributors || contributors.length === 0) return null;

  return (
    <section className="w-full bg-black py-16 md:py-20 px-4 md:px-8 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 md:mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-zinc-500 mb-3">Contributors</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Team Contributors
          </h2>
          <p className="text-zinc-400 mt-3 max-w-2xl mx-auto text-sm md:text-base">
            The people behind the mission, making an impact every day.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {contributors
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((contributor) => (
              <article
                key={contributor.id}
                className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5 md:p-6 hover:border-zinc-800 transition-colors"
              >
                <MediaImage
                  src={contributor.photoUrl || 'https://via.placeholder.com/320x320'}
                  alt={contributor.name}
                  className="w-full h-56 object-cover rounded-xl border border-zinc-900"
                />
                <h3 className="text-xl font-bold text-white mt-4">{contributor.name}</h3>
                <p className="text-[#f26522] text-xs font-bold uppercase tracking-wider mt-1">
                  {contributor.role}
                </p>
                <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
                  {contributor.description}
                </p>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
