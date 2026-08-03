import React from 'react';

export default function CartHero() {
  return (
    <section className="pt-64 pb-16 px-4 md:px-8 max-w-7xl mx-auto relative overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
        <div>
          <h1 className="text-5xl md:text-7xl font-black tracking-normal leading-[1.1] mb-8 uppercase">
            Your <span className="text-brand-orange">Selection</span>
          </h1>
          <p className="text-gray-400 max-w-md text-lg">
            Review your selected programs and products. Every choice is a step towards your transformation.
          </p>
        </div>
        <div className="hidden md:block">
           <div className="w-24 h-1 bg-brand-orange"></div>
        </div>
      </div>
    </section>
  );
}
