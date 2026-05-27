'use client';

import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { SajanEvent } from './eventsData';

interface EventsWebinarsProps {
  events: SajanEvent[];
}

export default function EventsWebinars({ events }: EventsWebinarsProps) {
  const [showAll, setShowAll] = useState(false);
  const allWebinars = events;
  const webinars = showAll ? allWebinars : allWebinars.slice(0, 2);

  const bgImages = [
    '/Sir Event3.jpeg',
    '/sir Event2.jpeg',
    '/Sir Event4.jpeg'
  ];

  return (
    <section id="webinars" className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/5 relative overflow-hidden">
      {/* Background abstract element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none"></div>

      <div className="flex flex-col md:flex-row justify-between items-end mb-24 relative z-10">
        <div>
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-normal mb-8 leading-[1.1]">
            Upcoming <br className="hidden md:block" />
            <span className="text-brand-orange">Webinars</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-md">Join virtual sessions from anywhere in the world and unlock your full potential.</p>
        </div>
      </div>

      <div className="space-y-12 relative z-10">
        {webinars.map((webinar, index) => (
          <div 
            key={webinar.id} 
            id={`event-card-${webinar.id}`}
            className="group relative w-full bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden flex flex-col md:flex-row hover:border-brand-orange/40 transition-all duration-500 shadow-2xl"
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img 
                src={bgImages[index % bgImages.length]} 
                alt="Webinar Background" 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000 scale-100 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-700"></div>
            </div>

            {/* Left Content Side */}
            <div className="flex-1 p-8 md:p-14 relative z-20 flex flex-col justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-500 drop-shadow-2xl">
              <div className="flex items-center space-x-3 text-brand-orange font-bold text-xs tracking-[0.2em] uppercase mb-6">
                <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
                <span>{webinar.topic || 'Virtual Masterclass'}</span>
              </div>
              
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-normal leading-[1.1] mb-6 pr-4">
                {webinar.title}
              </h3>
              
              <p className="text-gray-400 mb-10 max-w-xl text-sm md:text-base leading-relaxed">
                Step into a powerful learning experience where you discover how to guide people through breakthroughs, rewire limiting beliefs, and create lasting personal transformation.
              </p>
              
              <div className="flex flex-wrap items-center gap-x-10 gap-y-6 mt-auto">
                <Button 
                  onClick={() => document.getElementById('book-sajan')?.scrollIntoView({ behavior: 'smooth' })}
                  className="rounded-full bg-white text-black hover:bg-brand-orange hover:text-white font-black px-10 py-4 uppercase tracking-widest text-xs transition-all shadow-lg hover:shadow-brand-orange/20"
                >
                  Learn More
                </Button>
                
                <div className="flex gap-10">
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Date</div>
                    <div className="font-bold text-sm text-gray-200">{format(webinar.date, 'do MMM yyyy')}</div>
                  </div>
                  
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Time</div>
                    <div className="font-bold text-sm text-gray-200">10:00 AM IST</div>
                  </div>
                  
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Place</div>
                    <div className="font-bold text-sm text-gray-200">Zoom Virtual</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Stub Separation Line */}
            <div className="hidden md:flex absolute top-0 bottom-0 right-[350px] w-12 flex-col justify-between items-center z-30 pointer-events-none">
               <div className="w-6 h-6 bg-brand-dark rounded-full -mt-3 shadow-inner"></div>
               <div className="flex-1 w-px border-l-2 border-dashed border-white/20 my-2"></div>
               <div className="w-6 h-6 bg-brand-dark rounded-full -mb-3 shadow-inner"></div>
            </div>

            {/* Right Side Ticket Stub / Registration */}
            <div className="w-full md:w-[350px] relative bg-black/30 backdrop-blur-sm p-8 md:p-10 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/5 opacity-60 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
              {/* Signature Watermark */}
              <div className="absolute inset-0 opacity-[0.06] pointer-events-none z-0 flex items-center justify-center overflow-hidden">
                <img src="/sir sign.png" alt="Signature Watermark" className="w-full h-full object-cover object-center rotate-[-15deg] scale-125" />
              </div>

              <div className="absolute top-12 right-6 opacity-10 z-10">
                <div className="text-6xl font-black rotate-90 origin-top-right">0{index + 1}</div>
              </div>
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="inline-block border border-brand-orange/30 text-brand-orange text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1 rounded-full mb-4">
                    Admit One
                  </div>
                  <h4 className="text-xl font-bold uppercase tracking-tight">Reserve Your Spot</h4>
                </div>

                <div className="mt-8">
                  <Button 
                    onClick={() => document.getElementById('book-sajan')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full bg-brand-orange text-white hover:bg-white hover:text-black font-black uppercase tracking-widest py-4 text-xs rounded-xl shadow-[0_0_20px_rgba(239,111,15,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all"
                  >
                    Register Free
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!showAll && allWebinars.length > 2 && (
        <div className="mt-12 flex justify-center relative z-10">
          <button 
            onClick={() => setShowAll(true)}
            className="bg-transparent border-none outline-none text-brand-orange hover:text-orange-400 font-black transition-all flex items-center group text-2xl uppercase tracking-widest cursor-pointer"
          >
            More <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
          </button>
        </div>
      )}
    </section>
  );
}
