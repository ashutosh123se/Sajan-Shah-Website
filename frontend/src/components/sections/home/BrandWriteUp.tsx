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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Brand Statement */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Transforming Lives Through Memory Science
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Sajan Shah combines cutting-edge neuroscience research with practical memory techniques 
              to help students, professionals, and organizations unlock their full potential. 
              With over a decade of experience and 200,000+ lives impacted, his mission is to 
              make learning accessible, engaging, and effective for everyone.
            </p>
            <div className="flex justify-center">
              <Button onClick={() => window.location.href = '/about'}>
                Read Full Bio
              </Button>
            </div>
          </div>

          {/* Identity Badges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {identityBadges.map((badge, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-100 hover:shadow-lg transition-all"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{badge.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {badge.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 p-8 rounded-2xl">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Transform Your Learning Journey?
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Join thousands who have already discovered the power of advanced memory techniques 
                and neuroscience-backed education.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="secondary"
                  onClick={() => window.location.href = '/programs'}
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Explore Programs
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = '/contact'}
                  className="border-white text-white hover:bg-white hover:text-blue-600"
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
