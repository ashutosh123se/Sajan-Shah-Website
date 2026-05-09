'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

export const IntroVideo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className="py-24 bg-brand-light border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Video Section */}
          <div className="relative">
            <div className="relative aspect-video bg-brand-dark overflow-hidden shadow-xl border-4 border-white ring-1 ring-gray-200">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Sajan Shah Introduction"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              
              {/* Play Overlay */}
              <button
                onClick={openModal}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-60 transition-all group"
              >
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-brand-orange text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <svg className="w-10 h-10 ml-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-xl font-bold uppercase tracking-widest">Play Full Video</p>
                </div>
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-6 uppercase tracking-tight">
                The Science of Memory
              </h2>
              <div className="w-24 h-1 bg-brand-orange mb-8"></div>
              <p className="text-xl text-gray-700 leading-relaxed font-medium">
                Discover how cutting-edge neuroscience research combines with proven memory techniques 
                to unlock your brain's true potential. Sajan Shah has helped over 200,000 students 
                transform their learning abilities and achieve extraordinary results.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-orange/10 rounded-none flex items-center justify-center border border-brand-orange/30">
                  <svg className="w-6 h-6 text-brand-orange" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-dark uppercase tracking-wide">Proven Methods</h3>
                  <p className="text-gray-600 text-lg mt-1">Backed by years of research and real-world application</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-orange/10 rounded-none flex items-center justify-center border border-brand-orange/30">
                  <svg className="w-6 h-6 text-brand-orange" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7m0 0v7l9-11h-7z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-dark uppercase tracking-wide">Practical Application</h3>
                  <p className="text-gray-600 text-lg mt-1">Techniques you can use immediately in daily life</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-orange/10 rounded-none flex items-center justify-center border border-brand-orange/30">
                  <svg className="w-6 h-6 text-brand-orange" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332-.477 4.5-1.253M13 9.5h7"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-dark uppercase tracking-wide">Lasting Results</h3>
                  <p className="text-gray-600 text-lg mt-1">Skills that stay with you for a lifetime</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="px-8" onClick={() => window.location.href = '/about'}>
                Know More
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="px-8"
                onClick={() => window.location.href = '/contact'}
              >
                Invite to Speak
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className="relative w-full max-w-5xl mx-4 aspect-video bg-black shadow-2xl border-2 border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-brand-orange transition-colors"
            >
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Sajan Shah Introduction"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
};
