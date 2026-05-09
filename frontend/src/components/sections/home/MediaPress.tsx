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
    <section className="py-24 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-6 uppercase tracking-tight">
            Media & Press
          </h2>
          <div className="w-24 h-1 bg-brand-orange mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
            Featured in leading publications and media outlets worldwide
          </p>
        </div>

        {/* Press Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {loading ? (
            // Loading Skeletons
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white border border-gray-200 p-4 animate-pulse">
                <div className="h-40 bg-gray-200 mb-4"></div>
                <div className="h-4 bg-gray-200 mb-2"></div>
                <div className="h-3 bg-gray-200 w-3/4"></div>
              </div>
            ))
          ) : (
            articles.map((article) => (
              <article 
                key={article.id}
                className="bg-white border border-gray-200 overflow-hidden hover:border-brand-orange transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-xl flex flex-col"
                onClick={() => window.open(article.url, '_blank', 'noopener,noreferrer')}
              >
                {/* Thumbnail */}
                <div className="h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Source */}
                  <div className="text-sm text-brand-orange font-bold uppercase tracking-widest mb-3">
                    {article.source}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-black text-brand-dark mb-4 leading-snug group-hover:text-brand-orange transition-colors line-clamp-3">
                    {article.title}
                  </h3>

                  {/* Date */}
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mt-auto pt-4 border-t border-gray-100">
                    {formatDate(article.date)}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Media Logos Strip */}
        <div className="bg-brand-light py-16 border-y border-gray-200 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-center text-xl font-black text-brand-dark mb-10 uppercase tracking-widest">
              As Featured In
            </h3>
            
            {/* Auto-scrolling Logos */}
            <div className="relative">
              <div className="flex space-x-16 animate-scroll justify-center flex-wrap gap-y-8">
                {/* Realistically these should be images, but simulating for now */}
                {['The Times of India', 'Economic Times', 'Forbes India', 'Hindustan Times', 'BBC News', 'CNN', 'Reuters'].map((outlet, index) => (
                  <div 
                    key={`${outlet}-${index}`}
                    className="flex-shrink-0 flex items-center justify-center filter grayscale opacity-50 hover:opacity-100 transition-opacity hover:grayscale-0"
                  >
                    <span className="text-xl md:text-2xl font-black text-brand-dark uppercase tracking-widest">
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
