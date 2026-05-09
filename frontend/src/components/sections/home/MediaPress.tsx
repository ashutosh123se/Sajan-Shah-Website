'use client';

import React, { useState, useEffect } from 'react';

interface PressArticle {
  id: string;
  title: string;
  source: string;
  thumbnail: string;
  url: string;
  date: string;
}

export const MediaPress: React.FC = () => {
  const [articles, setArticles] = useState<PressArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for demonstration
    const mockArticles: PressArticle[] = [
      {
        id: '1',
        title: 'Sajan Shah Revolutionizes Memory Training in Indian Schools',
        source: 'Times of India',
        thumbnail: '/press-1.jpg',
        url: 'https://example.com/article1',
        date: '2024-01-15',
      },
      {
        id: '2',
        title: 'Memory Man of India Launches New Online Learning Platform',
        source: 'Economic Times',
        thumbnail: '/press-2.jpg',
        url: 'https://example.com/article2',
        date: '2024-01-10',
      },
      {
        id: '3',
        title: 'Neuroscience-Based Education Gets Global Recognition',
        source: 'Forbes India',
        thumbnail: '/press-3.jpg',
        url: 'https://example.com/article3',
        date: '2024-01-05',
      },
      {
        id: '4',
        title: 'Youth Speaker Sajan Shah Inspires Millions',
        source: 'Hindustan Times',
        thumbnail: '/press-4.jpg',
        url: 'https://example.com/article4',
        date: '2023-12-20',
      },
    ];

    // Simulate loading
    setTimeout(() => {
      setArticles(mockArticles);
      setLoading(false);
    }, 1000);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Media & Press
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Featured in leading publications and media outlets worldwide
          </p>
        </div>

        {/* Press Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {loading ? (
            // Loading Skeletons
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-4 animate-pulse">
                <div className="h-32 bg-gray-200 rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))
          ) : (
            articles.map((article) => (
              <article 
                key={article.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                onClick={() => window.open(article.url, '_blank', 'noopener,noreferrer')}
              >
                {/* Thumbnail */}
                <div className="h-32 bg-gray-100">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Source */}
                  <div className="text-sm text-[#f26522] font-semibold mb-2">
                    {article.source}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:line-clamp-none">
                    {article.title}
                  </h3>

                  {/* Date */}
                  <div className="text-sm text-gray-500">
                    {formatDate(article.date)}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Media Logos Strip */}
        <div className="bg-gray-50 py-12 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-center text-lg font-semibold text-gray-700 mb-8">
              As Featured In
            </h3>
            
            {/* Auto-scrolling Logos */}
            <div className="relative">
              <div className="flex space-x-12 animate-scroll">
                {/* Duplicate logos for seamless scrolling effect */}
                {['The Times of India', 'Economic Times', 'Forbes India', 'Hindustan Times', 'BBC News', 'CNN', 'Reuters'].map((outlet, index) => (
                  <div 
                    key={`${outlet}-${index}`}
                    className="flex-shrink-0 h-12 w-32 md:w-40 flex items-center justify-center filter grayscale opacity-60 hover:opacity-100 transition-opacity"
                  >
                    <span className="text-sm md:text-base font-medium text-gray-600">
                      {outlet}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
