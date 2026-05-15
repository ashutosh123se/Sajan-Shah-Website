'use client';
import React, { useState } from 'react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      text: "Sajan is a passionate motivator and speaker. He just need a mic and stage to improve your productivity.",
      author: "Muhammad Faisal",
      title: "Four Times Guinness World Record Holder for Strongest Memory"
    },
    {
      text: "Sajan is doing commendable work for the development of the country. I really appreciate his efforts and dedication towards building the next generation. Keep up the good work.",
      author: "His Holiness Dalai Lama",
      title: "Spiritual Leader"
    },
    {
      text: "Sajan is very young, dynamic and a smart strategic speaker with amazing practical knowledge and examples. My best wishes are always with him.",
      author: "Acharya Dr. Lokesh Muni",
      title: "World Peace Ambassador, Founder of Ahimsa Vishwa Bharti"
    },
    {
      text: "It was really motivating to hear Sajan in Jammu Kashmir. His vision and mission towards the nation is really inspiring. His passion and energy is amazing. Keep it up Sajan.",
      author: "Hon. Dr. Jitendra Singh",
      title: "Minister of State for Prime Minister's Office"
    },
    {
      text: "Sajan, not only do you motivate the youth & empower them; but you are serving the nation in a much bigger way. Never stop what you're doing.",
      author: "Hon. Piyush Goyal",
      title: "Minister of Commerce and Industry"
    },
    {
      text: "Well, first of all, I love watching him LIVE. His energy to enlighten and encourage the people, to achieve their potential to optimum level, is unmatchable! The highly thoughtful programs that he has done have potential which can help anyone to achieve real world class results.",
      author: "Sammeer Sata",
      title: "Senior Vice President, Reliance Industries Limited"
    },
    {
      text: "Sajan Shah has a clutter less thinking that helps 1000s to get Uncluttered. Met him just for an hour and found him having all that a leader needs.",
      author: "Dr. A Velumani",
      title: "Promoter & MD, Thyrocare Tech. Ltd."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-24 md:py-32 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-light text-white mb-6 tracking-wide">Global Personalities with Testimonials</h2>
          <div className="w-16 h-1 bg-[#f26522] mx-auto"></div>
        </div>

        <div className="relative bg-[#111] rounded-none p-10 md:p-20 shadow-2xl border border-gray-900 overflow-hidden">
          {/* Subtle Orange Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#f26522] to-transparent opacity-50"></div>

          {/* Quotation Mark Graphic */}
          <div className="absolute top-10 left-10 md:left-20 transform -translate-x-1/2 -translate-y-1/2 text-[#1a1a1a] select-none">
            <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 32 32">
              <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2h4V8h-4zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2h4V8h-4z"/>
            </svg>
          </div>

          <div className="text-center min-h-[300px] flex flex-col justify-center relative z-10 mt-6">
            <p className="text-2xl md:text-3xl lg:text-4xl text-white font-light italic leading-relaxed mb-12 tracking-wide max-w-4xl mx-auto">
              "{testimonials[currentIndex].text}"
            </p>
            <div>
              <h4 className="text-xl font-bold text-[#f26522] uppercase tracking-widest">{testimonials[currentIndex].author}</h4>
              <p className="text-gray-500 font-medium mt-2 text-sm uppercase tracking-widest">{testimonials[currentIndex].title}</p>
            </div>
          </div>

          <div className="flex justify-center items-center mt-12 relative z-20">
            <div className="flex space-x-3">
              {testimonials.map((_, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 transition-all ${idx === currentIndex ? 'bg-[#f26522] w-10' : 'bg-gray-800 w-4 hover:bg-gray-600'}`}
                  aria-label={`Go to Testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
