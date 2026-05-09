'use client';
import React, { useEffect, useRef, useState } from 'react';

export const EventSchedule: React.FC = () => {
  const events = [
    { title: "Neuroscience Leadership Masterclass", brief: "Rewiring the minds of top executives. Learn how to lead with a brain-centric approach that drives unprecedented results.", date: "15 Oct 2026", time: "10:00 AM - 4:00 PM", venue: "Mumbai, India", type: "Event" },
    { title: "Student & Parent Transformation", brief: "Bridging the generational gap. A deeply emotional and holistic session designed to rebuild home culture and student confidence.", date: "22 Oct 2026", time: "2:00 PM - 5:00 PM", venue: "Delhi, India", type: "Event" },
    { title: "Focus & Discipline Webinar", brief: "Distraction is the enemy of greatness. An intensive online session to hack your focus and build unbreakable discipline.", date: "05 Nov 2026", time: "7:00 PM - 8:30 PM", venue: "Online", type: "Webinar" },
    { title: "Memory Mastery for Professionals", brief: "Your memory is not weak, it's just untrained. Discover the systems to upgrade your cognitive capacity instantly.", date: "12 Nov 2026", time: "6:00 PM - 8:00 PM", venue: "Online", type: "Webinar" }
  ];

  return (
    <section className="py-32 bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#f26522] rounded-full mix-blend-multiply filter blur-[200px] opacity-[0.03]"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Narrative Header */}
        <div className="text-center md:text-left mb-24 max-w-3xl">
          <p className="text-[#f26522] font-bold uppercase tracking-widest text-sm mb-4">The Journey Continues</p>
          <h2 className="text-4xl md:text-6xl font-light leading-tight mb-8">
            Be Part of the Next <span className="font-bold">Chapter.</span>
          </h2>
          <p className="text-xl text-gray-400 font-light leading-relaxed">
            Every event is a catalyst. It's not just about showing up; it's about walking away completely transformed. Find an upcoming session and take the first step.
          </p>
        </div>

        {/* Cinematic Timeline */}
        <div className="relative border-l border-gray-800 ml-4 md:ml-0 md:pl-12 space-y-20">
          {events.map((evt, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Node */}
              <div className="absolute -left-[54px] md:-left-[54px] top-2 w-5 h-5 bg-[#111] border-2 border-gray-800 rounded-full group-hover:border-[#f26522] group-hover:bg-[#f26522] transition-colors duration-500 shadow-[0_0_15px_rgba(242,101,34,0)] group-hover:shadow-[0_0_15px_rgba(242,101,34,0.6)] hidden md:block"></div>
              
              <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                
                {/* Date & Meta Information */}
                <div className="md:w-1/4 shrink-0 pl-6 md:pl-0 border-l border-gray-800 md:border-none relative">
                   <div className="absolute -left-[5px] top-2 w-2 h-2 bg-gray-800 rounded-full md:hidden"></div>
                   <p className="text-3xl md:text-4xl font-bold text-white mb-2">{evt.date.split(' ')[0]} <span className="text-xl font-light text-[#f26522]">{evt.date.split(' ').slice(1).join(' ')}</span></p>
                   <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-1">{evt.time}</p>
                   <p className="text-sm text-gray-600 font-light flex items-center gap-2">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                     {evt.venue}
                   </p>
                </div>

                {/* Narrative Content */}
                <div className="md:w-3/4 bg-[#111] p-10 border border-gray-900 group-hover:border-gray-800 transition-colors duration-500">
                  <div className="inline-block px-3 py-1 bg-[#1a1a1a] text-[#f26522] text-xs font-bold uppercase tracking-widest mb-6">
                    {evt.type}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-normal text-white mb-4 tracking-wide group-hover:text-[#f26522] transition-colors duration-500">{evt.title}</h3>
                  <p className="text-gray-400 font-light leading-relaxed mb-8">
                    {evt.brief}
                  </p>
                  <button className="text-sm text-white font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                    Reserve Your Seat <span className="text-[#f26522]">→</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center md:text-left border-t border-gray-900 pt-12">
          <button className="bg-transparent border border-gray-700 hover:border-white text-white px-10 py-5 font-bold uppercase tracking-widest text-sm transition-all duration-300" onClick={() => window.location.href = '/events'}>
            View Full Calendar
          </button>
        </div>

      </div>
    </section>
  );
};
