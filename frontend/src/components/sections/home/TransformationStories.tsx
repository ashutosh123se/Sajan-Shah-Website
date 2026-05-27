'use client';
import React from 'react';

export const TransformationStories: React.FC = () => {
  const images = [
    "1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg",
    "7.jpeg", "8.jpeg", "9.jpeg", "10.jpeg", "11.jpeg", "13.jpeg",
    "14.jpeg", "15.jpeg", "16.jpeg", "17.jpeg", "18.jpeg"
  ];

  // Duplicate for seamless infinite loop
  const allImages = [...images, ...images];

  return (
    <section className="py-24 bg-[#0a0a0a] relative border-t border-gray-900">
      {/* Heading */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-light text-white mb-6 tracking-wide">
            Stories of Transformation
          </h2>
          <div className="w-16 h-1 bg-[#f26522] mx-auto"></div>
        </div>
      </div>

      {/* Marquee wrapper */}
      <div className="relative w-full overflow-hidden">
        {/* Edge fade left */}
        <div className="absolute top-0 left-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
        {/* Edge fade right */}
        <div className="absolute top-0 right-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling track */}
        <div
          className="flex marquee-track"
          style={{
            width: 'max-content',
          }}
        >
          {allImages.map((img, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 mx-3 rounded-xl overflow-hidden border border-gray-800 shadow-xl group"
              style={{ width: '320px', height: '300px' }}
            >
              <img
                src={`/Stories of Transformation/${img}`}
                alt={`Transformation Story ${(idx % images.length) + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
