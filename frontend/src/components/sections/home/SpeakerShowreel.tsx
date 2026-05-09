'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

export const SpeakerShowreel: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const outcomes = [
    'Transform audience engagement with proven memory techniques',
    'Increase learning retention by up to 300%',
    'Create lasting impact through neuroscience-backed education',
  ];

  return (
    <section className="py-24 bg-brand-dark text-white border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight">
            Speaker Showreel
          </h2>
          <div className="w-24 h-1 bg-brand-orange mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-medium">
            Experience the energy and impact of Sajan Shah's live presentations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Video Section */}
          <div className="relative">
            <div className="relative aspect-video bg-black overflow-hidden border-2 border-white/20 shadow-2xl group">
              {/* Video Thumbnail with Play Button */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: 'url(/showreel-thumbnail.jpg)' }}
              >
                <div className="absolute inset-0 bg-brand-dark bg-opacity-60 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                  <button
                    onClick={openModal}
                    className="bg-brand-orange text-white p-6 rounded-none transition-all hover:bg-brand-orangeHover group-hover:scale-110 shadow-xl"
                  >
                    <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl md:text-4xl font-black mb-6 uppercase tracking-wide">
                Inspiring Audiences Worldwide
              </h3>
              <p className="text-xl text-gray-300 leading-relaxed mb-6 font-medium">
                From corporate boardrooms to educational institutions, Sajan Shah delivers 
                transformative keynotes that combine cutting-edge memory science with practical applications 
                for real-world success.
              </p>
            </div>

            {/* Key Outcomes */}
            <div className="space-y-6 bg-white/5 p-8 border border-white/10">
              <h4 className="text-xl font-bold text-brand-orange uppercase tracking-widest mb-6">
                Key Outcomes:
              </h4>
              {outcomes.map((outcome, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-brand-orange/20 rounded-none flex items-center justify-center border border-brand-orange/50 mt-1">
                    <svg className="w-4 h-4 text-brand-orange" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-300 font-medium text-lg">{outcome}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Button 
                size="lg"
                onClick={() => window.location.href = '/contact'}
                className="w-full sm:w-auto px-10 py-5 text-lg"
              >
                Invite Sajan to Speak
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
            className="relative w-full max-w-5xl mx-4 aspect-video bg-black border-2 border-white/10 shadow-2xl"
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
              src="https://www.youtube.com/embed/your-showreel-video-id?autoplay=1"
              title="Sajan Shah Speaker Showreel"
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
