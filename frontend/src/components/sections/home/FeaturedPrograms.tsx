'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import api from '@/lib/api';

interface Program {
  id: string;
  title: string;
  slug: string;
  pitch: string;
  price: number;
  currency: string;
  thumbnailUrl?: string;
  targetAudience: string[];
  isFeatured: boolean;
}

export const FeaturedPrograms: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await api.get('/programs?featured=true&limit=3');
        setPrograms(response.data.data.programs || []);
      } catch (error) {
        console.error('Failed to fetch programs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const getAudienceBadges = (audience: string[]) => {
    return audience.map((aud, index) => (
      <span 
        key={index}
        className="inline-block bg-[#151515] text-[#f26522] text-xs px-2 py-1 rounded-full mr-2 mb-2"
      >
        {aud}
      </span>
    ));
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Programs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your learning journey with our most popular neuroscience-backed programs
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : programs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <div 
                key={program.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Thumbnail */}
                {program.thumbnailUrl && (
                  <div className="h-48 bg-gray-100">
                    <img
                      src={program.thumbnailUrl}
                      alt={program.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {program.title}
                  </h3>

                  {/* Pitch */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {program.pitch}
                  </p>

                  {/* Audience Badges */}
                  <div className="mb-4">
                    {getAudienceBadges(program.targetAudience)}
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-[#f26522]">
                      {formatPrice(program.price)}
                    </div>
                    <Button 
                      onClick={() => window.location.href = `/programs/${program.slug}`}
                    >
                      Enroll Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No featured programs available at the moment.</p>
          </div>
        )}

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Button 
            variant="outline"
            size="lg"
            onClick={() => window.location.href = '/programs'}
          >
            View All Programs →
          </Button>
        </div>
      </div>
    </section>
  );
};
