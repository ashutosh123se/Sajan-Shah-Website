'use client';
import React from 'react';
import { Button } from '@/components/ui/Button';

export const BrandWriteUp: React.FC = () => {
  const identityBadges = [
    {
      icon: '🧠',
      title: 'Memory Man of India',
      description: 'Nationally recognized memory expert'
    },
    {
      icon: '🌍',
      title: 'Global Youth Speaker',
      description: 'Inspiring millions across 30+ countries'
    },
    {
      icon: '🔬',
      title: 'Neuroscience-Backed',
      description: 'Science-based learning methodologies'
    },
    {
      icon: '👨‍🏫',
      title: 'Youth Mentor',
      description: 'Guiding the next generation'
    },
    {
      icon: '💼',
      title: 'Corporate Trainer',
      description: 'Elevating organizational excellence'
    },
    {
      icon: '📚',
      title: 'Education Transformer',
      description: 'Revolutionizing learning approaches'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Brand Statement */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-6 tracking-tight uppercase">
              Transforming Lives Through Memory Science
            </h2>
            <div className="w-24 h-1 bg-brand-orange mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 font-medium">
              Sajan Shah combines cutting-edge neuroscience research with practical memory techniques 
              to help students, professionals, and organizations unlock their full potential. 
              With over a decade of experience and 200,000+ lives impacted, his mission is to 
              make learning accessible, engaging, and effective for everyone.
            </p>
            <div className="flex justify-center">
              <Button size="lg" className="font-bold uppercase tracking-widest px-8" onClick={() => window.location.href = '/about'}>
                Read Full Bio
              </Button>
            </div>
          </div>

          {/* Identity Badges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {identityBadges.map((badge, index) => (
              <div 
                key={index}
                className="bg-brand-light p-8 rounded-none border border-gray-200 hover:border-brand-orange transition-all"
              >
                <div className="text-center">
                  <div className="text-5xl mb-6">{badge.icon}</div>
                  <h3 className="text-xl font-bold text-brand-dark mb-3 uppercase tracking-wide">
                    {badge.title}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed font-medium">
                    {badge.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-20 bg-brand-dark p-12 rounded-none border-t-4 border-brand-orange">
            <div className="text-center">
              <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tight">
                Ready to Transform Your Learning Journey?
              </h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
                Join thousands who have already discovered the power of advanced memory techniques 
                and neuroscience-backed education.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  size="lg"
                  onClick={() => window.location.href = '/programs'}
                  className="font-bold uppercase tracking-widest px-8"
                >
                  Explore Programs
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => window.location.href = '/contact'}
                  className="font-bold uppercase tracking-widest px-8 text-white border-white hover:bg-white hover:text-brand-dark"
                >
                  Book Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
