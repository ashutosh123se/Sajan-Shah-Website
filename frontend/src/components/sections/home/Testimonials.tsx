'use client';

import React, { useState, useEffect } from 'react';
import api from '@/lib/api';

interface Testimonial {
  id: string;
  name: string;
  designation: string;
  organization?: string;
  photoUrl?: string;
  quote: string;
  videoUrl?: string;
  isActive: boolean;
  order: number;
}

export const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await api.get('/testimonials?limit=8');
        setTestimonials(response.data.data.testimonials || []);
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What People Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from students, professionals, and organizations transformed by Sajan Shah's programs
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
                <div className="h-24 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : testimonials.length > 0 ? (
          <div className="relative">
            {/* Main Testimonial Display */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex items-start space-x-4 mb-6">
                {currentTestimonial.photoUrl && (
                  <img
                    src={currentTestimonial.photoUrl}
                    alt={currentTestimonial.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {currentTestimonial.name}
                  </h3>
                  <p className="text-gray-600">
                    {currentTestimonial.designation}
                    {currentTestimonial.organization && (
                      <span> at {currentTestimonial.organization}</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-lg md:text-xl text-gray-700 italic leading-relaxed mb-6">
                "{currentTestimonial.quote}"
              </blockquote>

              {/* Video Testimonial */}
              {currentTestimonial.videoUrl && (
                <div className="text-center">
                  <button
                    onClick={() => window.open(currentTestimonial.videoUrl, '_blank')}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    Watch Video Testimonial
                  </button>
                </div>
              )}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center space-x-2 mb-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-blue-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-700 p-3 rounded-full shadow-lg transition-all"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-700 p-3 rounded-full shadow-lg transition-all"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Mobile Swipe Indicator */}
          <div className="text-center md:hidden mt-4">
            <p className="text-sm text-gray-500">Swipe to see more testimonials</p>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No testimonials available at the moment.</p>
        </div>
      )}
      </div>
    </section>
  );
};
