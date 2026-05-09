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
    return (audience || []).map((aud, index) => (
      <span 
        key={index}
        className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 mb-2"
      >
        {aud}
      </span>
    ));
  };

  return (
    <section className="py-24 bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-6 uppercase tracking-tight">
            Featured Programs
          </h2>
          <div className="w-24 h-1 bg-brand-orange mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
            Transform your learning journey with our most popular neuroscience-backed programs
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-none border border-gray-200 p-6 animate-pulse">
                <div className="h-48 bg-gray-200 mb-4"></div>
                <div className="h-4 bg-gray-200 mb-2"></div>
                <div className="h-4 bg-gray-200 w-3/4"></div>
              </div>
            ))}
          </div>
        ) : programs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <div 
                key={program.id}
                className="bg-white border border-gray-200 rounded-none overflow-hidden hover:border-brand-orange transition-all duration-300 group shadow-sm hover:shadow-xl"
              >
                {/* Thumbnail */}
                {program.thumbnailUrl && (
                  <div className="h-56 bg-gray-100 overflow-hidden relative">
                    <img
                      src={program.thumbnailUrl}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-0 transition-opacity" />
                  </div>
                )}

                <div className="p-8">
                  {/* Title */}
                  <h3 className="text-2xl font-black text-brand-dark mb-4 uppercase tracking-wide">
                    {program.title}
                  </h3>

                  {/* Pitch */}
                  <p className="text-gray-600 mb-6 line-clamp-3 text-lg">
                    {program.pitch}
                  </p>

                  {/* Audience Badges */}
                  <div className="mb-6">
                    {getAudienceBadges(program.targetAudience)}
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                    <div className="text-3xl font-black text-brand-orange">
                      {formatPrice(program.price)}
                    </div>
                    <Button 
                      className="font-bold uppercase tracking-widest rounded-none"
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
            <p className="text-gray-500 text-lg">No featured programs available at the moment.</p>
          </div>
        )}

        {/* View All CTA */}
        <div className="text-center mt-16">
          <Button 
            variant="outline"
            size="lg"
            className="font-bold uppercase tracking-widest px-8 py-4 rounded-none"
            onClick={() => window.location.href = '/programs'}
          >
            View All Programs →
          </Button>
        </div>
      </div>
    </section>
  );
};
