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
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Speaker Showreel
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the energy and impact of Sajan Shah's live presentations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Video Section */}
          <div className="relative">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              {/* Video Thumbnail with Play Button */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url(/showreel-thumbnail.jpg)' }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <button
                    onClick={openModal}
                    className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-900 p-6 rounded-full transition-all group"
                  >
                    <svg className="w-12 h-12 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Inspiring Audiences Worldwide
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                From corporate boardrooms to educational institutions, Sajan Shah delivers 
                transformative keynotes that combine cutting-edge memory science with practical applications 
                for real-world success.
              </p>
            </div>

            {/* Key Outcomes */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-blue-400 mb-4">
                Key Outcomes:
              </h4>
              {outcomes.map((outcome, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-300 font-medium">{outcome}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-6">
              <Button 
                size="lg"
                onClick={() => window.location.href = '/contact'}
                className="bg-blue-600 hover:bg-blue-700 text-white"
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeModal}
        >
          <div 
            className="relative w-full max-w-5xl mx-4 aspect-video bg-black rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
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
