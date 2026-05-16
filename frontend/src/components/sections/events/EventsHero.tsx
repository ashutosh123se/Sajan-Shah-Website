import React from 'react';
import { Button } from '@/components/ui/Button';

export default function EventsHero() {
  return (
    <section className="pt-64 pb-16 px-4 md:px-8 max-w-7xl mx-auto border-b border-white/10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <h1 className="text-5xl md:text-7xl font-black tracking-normal leading-[1.1] mb-8">
            Sajan Shah <br />
            <span className="text-gray-400">events calendar</span>
          </h1>
        </div>
        <div className="max-w-xs">
          <p className="text-gray-400 mb-6">Create your own success story through the massive impact of a Sajan Shah event.</p>
          <Button className="rounded-full bg-white text-black hover:bg-brand-orange hover:text-white font-bold px-8">
            View all events
          </Button>
        </div>
      </div>
    </section>
  );
}
