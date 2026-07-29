'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';

interface FeaturedProduct {
  id: string;
  name: string;
  slug: string;
  short_description?: string | null;
  description?: string | null;
  image_homepage?: string | null;
  buy_url_amazon?: string | null;
  buy_url_internal?: string | null;
  featured_order?: number | null;
}

function splitDescription(description?: string | null) {
  if (!description) return { body: '', bullets: [] as string[], closing: '' };

  const parts = description.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  if (parts.length === 0) return { body: '', bullets: [], closing: '' };

  const body = parts[0];
  const bulletBlock = parts.find((p) => p.includes('•')) || '';
  const bullets = bulletBlock
    ? bulletBlock.split('•').map((s) => s.trim()).filter(Boolean)
    : [];
  const closing =
    parts.find((p, i) => i > 0 && !p.includes('•')) ||
    (parts.length > 1 && !parts[parts.length - 1].includes('•') ? parts[parts.length - 1] : '');

  return { body, bullets, closing };
}

export const BooksSection: React.FC = () => {
  const [books, setBooks] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await api.get('/v1/products/featured');
        const products = (response.data?.data?.products || []) as FeaturedProduct[];
        setBooks(
          [...products].sort(
            (a, b) => (a.featured_order || 0) - (b.featured_order || 0)
          )
        );
      } catch (error) {
        console.error('Failed to fetch homepage featured products:', error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#0a0a0a] text-white py-24 text-center text-gray-500">
        Loading featured products...
      </section>
    );
  }

  if (books.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#0a0a0a] text-white">
      <div className="py-20 border-b border-gray-800 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
          Learn. Apply. Transform.
        </h2>
      </div>

      {books.map((book, idx) => {
        const { body, bullets, closing } = splitDescription(book.description);
        const ctaHref =
          (book.buy_url_amazon && book.buy_url_amazon !== '#'
            ? book.buy_url_amazon
            : null) ||
          (book.buy_url_internal && book.buy_url_internal !== '#'
            ? book.buy_url_internal
            : null) ||
          `/products/${book.slug}`;
        const isExternal = ctaHref.startsWith('http');

        return (
          <div key={book.id} className="border-b border-gray-800">
            <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row min-h-[600px]">
              <div
                className={`w-full lg:w-1/2 p-10 lg:p-24 flex flex-col justify-center ${
                  idx % 2 !== 0 ? 'lg:order-2' : ''
                }`}
              >
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-4 text-white">
                  {book.name}
                </h2>
                {book.short_description && (
                  <p className="text-xl lg:text-2xl text-gray-300 font-light mb-8">
                    {book.short_description}
                  </p>
                )}

                <div className="w-full h-px bg-gray-800 mb-8" />

                {body && (
                  <p className="text-base lg:text-lg text-gray-400 mb-8 leading-relaxed whitespace-pre-line">
                    {body}
                  </p>
                )}

                {bullets.length > 0 && (
                  <div className="mb-8 space-y-3">
                    {bullets.map((stat, i) => (
                      <p
                        key={i}
                        className="text-base lg:text-lg text-gray-200 flex items-start"
                      >
                        <span className="w-2 h-2 bg-[#f26522] rounded-full mr-4 mt-2.5 flex-shrink-0" />
                        <span>{stat}</span>
                      </p>
                    ))}
                  </div>
                )}

                {closing && (
                  <p className="text-lg text-white font-semibold mb-10 italic border-l-4 border-[#f26522] pl-4">
                    {closing}
                  </p>
                )}

                <div className="w-full h-px bg-[#f26522] mb-12 opacity-50" />

                <div className="mb-10 lg:mb-0">
                  <a
                    href={ctaHref}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="bg-[#f26522] hover:bg-[#d95a1e] text-white px-10 py-5 font-bold text-lg transition-colors inline-block tracking-wide shadow-lg"
                  >
                    {isExternal ? 'Order on Amazon' : 'View Product'}
                  </a>
                </div>
              </div>

              <div
                className={`w-full lg:w-1/2 relative min-h-[500px] lg:min-h-full overflow-hidden ${
                  idx % 2 !== 0 ? 'lg:order-1' : ''
                }`}
              >
                {book.image_homepage ? (
                  <img
                    src={book.image_homepage}
                    alt={book.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#151515] flex items-center justify-center text-gray-500">
                    No homepage cover
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.4)] pointer-events-none" />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};
