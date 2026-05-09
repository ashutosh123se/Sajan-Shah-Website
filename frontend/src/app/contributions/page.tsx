'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import api from '@/lib/api';

interface Initiative {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  stats?: string;
  order: number;
  isActive: boolean;
}

export default function ContributionsPage() {
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInitiatives();
  }, []);

  const fetchInitiatives = async () => {
    try {
      const response = await api.get('/initiatives');
      setInitiatives(response.data.data.initiatives || []);
    } catch (error) {
      console.error('Failed to fetch initiatives:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Contributions
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Making a difference through education, empowerment, and community impact
            </p>
          </div>
        </div>
      </section>

      {/* Initiatives Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : initiatives.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {initiatives.map((initiative) => (
                <div 
                  key={initiative.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* Image */}
                  <div className="h-48 bg-gray-100">
                    <img
                      src={initiative.imageUrl}
                      alt={initiative.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6">
                    {/* Title */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {initiative.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {initiative.description}
                    </p>

                    {/* Stats */}
                    {initiative.stats && (
                      <div className="text-center mb-4">
                        <span className="text-2xl font-bold text-blue-600">
                          {initiative.stats}
                        </span>
                      </div>
                    )}

                    {/* CTA */}
                    <Button 
                      className="w-full"
                      onClick={() => window.location.href = `/contributions/${initiative.slug}`}
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No initiatives available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Numbers that speak to our commitment and results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: '200,000+',
                label: 'Students Reached',
                description: 'Across India and internationally',
                color: 'blue',
              },
              {
                number: '500+',
                label: 'Events Conducted',
                description: 'Workshops, seminars, and conferences',
                color: 'green',
              },
              {
                number: '30+',
                label: 'Countries',
                description: 'Global reach and impact',
                color: 'purple',
              },
              {
                number: '10+',
                label: 'Years',
                description: 'Of dedicated service',
                color: 'orange',
              },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-4xl md:text-5xl font-bold text-${stat.color}-600 mb-2`}>
                  {stat.number}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {stat.label}
                </h3>
                <p className="text-gray-600">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Together, we can create a world where everyone has access to quality education and the tools to unlock their full potential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => window.location.href = '/programs'}
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              Explore Programs
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => window.location.href = '/contact'}
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Partner With Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
