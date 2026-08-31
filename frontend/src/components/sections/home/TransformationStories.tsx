'use client';
import React from 'react';
import { MediaImage } from '@/components/common/MediaImage';

interface TransformationStoriesProps {
  content?: {
    heading?: string;
    images?: string[];
  };
}

export const TransformationStories: React.FC<TransformationStoriesProps> = ({ content }) => {
  const heading = content?.heading || "Blessed by Global Leaders";
  const defaultImages = [
    "/Stories of Transformation/1.jpeg", "/Stories of Transformation/2.jpeg", "/Stories of Transformation/3.jpeg", "/Stories of Transformation/4.jpeg", "/Stories of Transformation/5.jpeg", "/Stories of Transformation/6.jpeg",
    "/Stories of Transformation/7.jpeg", "/Stories of Transformation/8.jpeg", "/Stories of Transformation/9.jpeg", "/Stories of Transformation/10.jpeg", "/Stories of Transformation/11.jpeg", "/Stories of Transformation/12.jpeg", 
    "/Stories of Transformation/13.jpeg", "/Stories of Transformation/14.jpeg", "/Stories of Transformation/15.jpeg", "/Stories of Transformation/16.jpeg", "/Stories of Transformation/17.jpeg", "/Stories of Transformation/19.jpeg",
    "/Stories of Transformation/20.jpeg", "/Stories of Transformation/21.jpeg", "/Stories of Transformation/22.jpeg", "/Stories of Transformation/23.jpeg", "/Stories of Transformation/24.jpeg", "/Stories of Transformation/25.jpeg"
  ];
  
  const images = content?.images && content.images.length > 0 ? content.images : defaultImages;

  // Duplicate for seamless infinite loop
  const allImages = [...images, ...images];

  return (
    <section className="py-24 bg-[#0a0a0a] relative border-t border-gray-900">
      {/* Heading */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-light text-white mb-6 tracking-wide">
            {heading}
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
              <MediaImage
                src={img}
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
