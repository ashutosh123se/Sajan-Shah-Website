'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import {
  DEFAULT_IMPACT_STORIES,
  normalizeImpactStoriesContent,
  type ImpactStoryItem,
} from '@/lib/impactStoryDefaults';

interface ImpactStoriesProps {
  content?: {
    heading?: string;
    subHeading?: string;
    stories?: ImpactStoryItem[];
  };
}

export const ImpactStories: React.FC<ImpactStoriesProps> = ({ content }) => {
  const data = normalizeImpactStoriesContent(content || DEFAULT_IMPACT_STORIES);
  const [selectedStory, setSelectedStory] = useState<ImpactStoryItem | null>(null);

  return (
    <section className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-20 border-b border-gray-900 pb-10">
          <div>
            <h2 className="text-[#f26522] font-bold uppercase tracking-[0.3em] text-sm mb-4">
              {data.subHeading}
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter">
              {data.heading}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.stories.map((story, idx) => (
            <div
              key={`${story.id ?? story.title}-${idx}`}
              onClick={() => setSelectedStory(story)}
              className="group cursor-pointer bg-[#050505] border border-gray-900 rounded-[2rem] p-10 hover:border-[#f26522]/50 hover:bg-[#0a0a0a] transition-all duration-500 flex flex-col h-full shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#f26522] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex-1">
                <h4 className="text-3xl md:text-4xl font-black text-[#f26522] mb-6 uppercase tracking-wide leading-snug">
                  {story.title}
                </h4>
                <p className="text-gray-400 font-light text-base mb-10 leading-relaxed">
                  {story.excerpt}
                </p>
              </div>

              <div className="mt-auto">
                <button className="flex items-center text-white font-bold text-xs uppercase tracking-widest group-hover:text-[#f26522] transition-colors border-none bg-transparent cursor-pointer p-0">
                  <span className="mr-3">Read Full Story</span>
                  <ArrowRight
                    size={16}
                    className="transform group-hover:translate-x-2 transition-transform"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-[#050505] border border-[#1f2937] rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col relative"
            >
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-6 right-6 p-3 bg-[#111] hover:bg-red-500/20 text-gray-400 hover:text-red-500 rounded-full transition-colors z-10 border border-[#1f2937] cursor-pointer"
              >
                <X size={24} />
              </button>

              <div className="p-8 md:p-12 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                <h3 className="text-4xl md:text-5xl font-black text-[#f26522] mb-10 uppercase tracking-wide pr-12 leading-snug">
                  {selectedStory.title}
                </h3>

                <article className="space-y-8 text-gray-300 text-lg leading-relaxed">
                  <div className="flex items-center justify-between pb-8 border-b border-white/10 mb-10 mt-2">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#f26522] to-orange-700 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        SS
                      </div>
                      <div>
                        <p className="font-bold text-white mb-0.5 text-lg">
                          {selectedStory.authorName || 'Sajan Shah'}
                        </p>
                        <p className="text-xs text-[#f26522] uppercase tracking-widest font-bold">
                          {selectedStory.authorRole || 'Founder, Live to Inspire'}
                        </p>
                      </div>
                    </div>
                    {(selectedStory.date || selectedStory.readTime) && (
                      <div className="text-right hidden sm:block">
                        {selectedStory.date && (
                          <p className="text-sm text-gray-400 font-medium">{selectedStory.date}</p>
                        )}
                        {selectedStory.readTime && (
                          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
                            {selectedStory.readTime}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {selectedStory.pullQuote && (
                    <p className="text-2xl font-light text-white leading-relaxed italic mb-12 border-l-4 border-[#f26522] pl-6 py-3 bg-white/5 rounded-r-xl">
                      {selectedStory.pullQuote}
                    </p>
                  )}

                  {selectedStory.bodyHtml ? (
                    <div
                      className="impact-story-body prose prose-invert prose-lg max-w-none
                        [&_h4]:text-2xl [&_h4]:font-bold [&_h4]:text-white [&_h4]:mt-10 [&_h4]:mb-4 [&_h4]:uppercase [&_h4]:tracking-wide
                        [&_h5]:text-lg [&_h5]:font-bold [&_h5]:text-[#f26522] [&_h5]:mb-3
                        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-3
                        [&_p.drop-cap]:first-letter:text-7xl [&_p.drop-cap]:first-letter:font-black [&_p.drop-cap]:first-letter:text-[#f26522] [&_p.drop-cap]:first-letter:mr-3 [&_p.drop-cap]:first-letter:float-left [&_p.drop-cap]:first-line:uppercase [&_p.drop-cap]:first-line:tracking-widest
                        [&_p.accent]:text-[#f26522] [&_p.accent]:italic [&_p.accent]:text-xl [&_p.accent]:font-medium [&_p.accent]:mt-8
                        [&_.stats-grid]:grid [&_.stats-grid]:md:grid-cols-2 [&_.stats-grid]:gap-8"
                      dangerouslySetInnerHTML={{ __html: selectedStory.bodyHtml }}
                    />
                  ) : (
                    <p className="text-gray-400">{selectedStory.excerpt}</p>
                  )}
                </article>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
