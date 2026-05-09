'use client';

import React from 'react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "Sajan's insights into memory and human potential are unparalleled. He doesn't just speak; he transforms.",
      name: "Dr. APJ Abdul Kalam",
      title: "Former President of India"
    },
    {
      quote: "The energy and practical knowledge Sajan brings to the stage is exactly what our organization needed.",
      name: "Global HR Director",
      title: "Fortune 500 Company"
    }
  ];

  return (
    <section className="py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
            What They Say
          </h2>
          <div className="w-24 h-1 bg-brand-orange mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 p-10 flex flex-col justify-center items-center text-center relative group">
              <span className="text-brand-orange text-8xl absolute top-4 left-6 opacity-20 font-serif leading-none">"</span>
              <p className="text-2xl md:text-3xl text-white font-bold italic mb-8 relative z-10 leading-snug">
                "{testimonial.quote}"
              </p>
              <div className="mt-auto">
                <p className="text-brand-orange font-black uppercase tracking-widest text-lg">
                  {testimonial.name}
                </p>
                <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mt-1">
                  {testimonial.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
