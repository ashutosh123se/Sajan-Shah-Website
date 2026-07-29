'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';

interface PressArticle {
  id: string;
  title: string;
  source: string;
  thumbnail: string;
  url: string;
  date: string;
  order?: number;
}

function isStoryArticle(article: PressArticle) {
  return !article.title.toLowerCase().startsWith('as featured in');
}

export const MediaPress: React.FC = () => {
  const [articles, setArticles] = useState<PressArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await api.get('/press');
        const dbArticles = (res.data?.data?.articles || [])
          .map((a: any) => ({
            id: a.id,
            title: a.title,
            source: a.source,
            thumbnail: a.thumbnail || a.imageUrl || '',
            url: a.url,
            date: a.date,
            order: a.order,
          }))
          .filter(isStoryArticle);

        setArticles(dbArticles);
      } catch (error) {
        console.error('Failed to fetch press articles:', error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (!loading && articles.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-[#0a0a0a] border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Media & Press
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto font-light">
            Featured in leading publications and media outlets worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-[#141414] border border-white/10 p-4 animate-pulse">
                  <div className="h-32 bg-white/5 mb-3" />
                  <div className="h-4 bg-white/5 rounded mb-2" />
                  <div className="h-3 bg-white/5 rounded w-3/4" />
                </div>
              ))
            : articles.map((article) => (
                <article
                  key={article.id}
                  className="bg-[#141414] border border-white/10 overflow-hidden hover:border-[#f26522]/40 transition-colors cursor-pointer group"
                  onClick={() => {
                    if (article.url && article.url !== '#') {
                      window.open(article.url, '_blank', 'noopener,noreferrer');
                    }
                  }}
                >
                  <div className="h-36 bg-black/40 overflow-hidden">
                    {article.thumbnail ? (
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">
                        {article.source}
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="text-sm text-[#f26522] font-semibold mb-2 uppercase tracking-wide">
                      {article.source}
                    </div>
                    <h3 className="text-base font-semibold text-white mb-2 line-clamp-2 group-hover:text-[#f26522] transition-colors">
                      {article.title}
                    </h3>
                    <div className="text-xs text-gray-500">{formatDate(article.date)}</div>
                  </div>
                </article>
              ))}
        </div>
      </div>
    </section>
  );
};
