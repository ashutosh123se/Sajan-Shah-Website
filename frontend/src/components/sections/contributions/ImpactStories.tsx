'use client';

import React from 'react';

interface ImpactStory {
  title: string;
  excerpt: string;
  imageUrl?: string;
}

interface ImpactStoriesProps {
  content?: {
    heading?: string;
    subHeading?: string;
    stories?: ImpactStory[];
  };
}

const DEFAULT_STORIES: ImpactStory[] = [
  { title: "The Pencils of Hope", excerpt: "How 50,000 plantable pencils transformed a rural district's approach to green education.", imageUrl: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=2070&auto=format&fit=crop" },
  { title: "Empowering Educators", excerpt: "A journey of training 500 teachers in Ahmedabad with cognitive science techniques.", imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop" },
  { title: "Vision for the Future", excerpt: "The UV glasses drive that provided vision correction for thousands of students.", imageUrl: "https://images.unsplash.com/photo-1511499767390-a73355326627?q=80&w=2070&auto=format&fit=crop" }
];

export const ImpactStories: React.FC<ImpactStoriesProps> = ({ content }) => {
  const heading = content?.heading || "CASE STUDIES";
  const subHeading = content?.subHeading || "Impact Stories";
  const stories = content?.stories || DEFAULT_STORIES;

  return (
    <section className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-20 border-b border-gray-900 pb-10">
          <div>
            <h2 className="text-[#f26522] font-bold uppercase tracking-[0.3em] text-sm mb-4">{subHeading}</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter">{heading}</h3>
          </div>
          <button className="hidden md:block text-gray-500 hover:text-white uppercase tracking-widest text-[10px] font-bold transition-colors bg-transparent border-none cursor-pointer">
            View All Stories →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stories.map((story, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="h-[350px] overflow-hidden rounded-[2rem] mb-6 relative shadow-2xl">
                <img 
                  src={story.imageUrl || "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=2070&auto=format&fit=crop"} 
                  alt={story.title} 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-[#f26522] transition-colors uppercase tracking-tight">{story.title}</h4>
              <p className="text-gray-500 font-light text-sm mb-8 leading-relaxed line-clamp-2">{story.excerpt}</p>
              <button className="text-white font-bold text-[10px] uppercase tracking-widest border border-white/10 px-8 py-4 rounded-full hover:bg-[#f26522] hover:border-[#f26522] transition-all bg-transparent cursor-pointer">
                Read Full Story
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
