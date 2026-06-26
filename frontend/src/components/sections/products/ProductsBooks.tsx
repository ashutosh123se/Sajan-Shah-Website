'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import api from '@/lib/api';

const staticBooks = [
  {
    id: 'static-1',
    name: 'YOU v/s YOU',
    subtitle: 'A 100-Day Personal Transformation Challenge',
    description: 'A powerful 100-day system designed to help you break old patterns, build discipline, and transform your thinking through daily action.',
    image_homepage: '/you vs you F.png',
    image_product_page: '/you vs you B.png',
    buy_url_flipkart: '#',
    buy_url_amazon: '#',
    is_featured: false,
  },
  {
    id: 'static-2',
    name: 'STUDENTING & PARENTING',
    subtitle: 'Build a Positive, Happy Home Culture',
    description: 'A practical guide for students and parents to improve communication, reduce stress, and create a growth-focused environment at home.',
    image_homepage: '/Studenting & Parenting F.png',
    image_product_page: '/Studenting & Parenting B.png',
    buy_url_flipkart: '#',
    buy_url_amazon: '#',
    is_featured: false,
  },
  {
    id: 'static-3',
    name: 'UNTOLD STORIES OF YOUR HEROES',
    subtitle: '100 Transformational Journeys to Inspire',
    description: 'A collection of powerful stories that build courage, mindset, and leadership by learning from real-life struggles and success journeys.',
    image_homepage: '/Untold Stories of Your HEroes F.png',
    image_product_page: '/Untold Stories of Your HEroes B.png',
    buy_url_flipkart: '#',
    buy_url_amazon: '#',
    is_featured: true,
  },
  {
    id: 'static-4',
    name: 'SMART STUDIES',
    subtitle: 'Study Smarter. Perform Better.',
    description: 'A practical system designed to help students improve focus, retention, and study efficiency using smarter learning techniques.',
    image_homepage: '/Smart Studies F.jpeg',
    image_product_page: '/Smart Studies B.jpeg',
    buy_url_flipkart: '#',
    buy_url_amazon: '#',
    is_featured: false,
    isSoldOut: true,
  },
  {
    id: 'static-5',
    name: 'BUSINESS GROWTH',
    subtitle: 'Build, Scale, and Lead with Clarity',
    description: 'A results-driven guide for entrepreneurs and professionals to grow their business, improve decision-making, and create sustainable success.',
    image_homepage: 'https://placehold.co/600x800/0a0a0a/f26522?text=BUSINESS+GROWTH',
    image_product_page: '',
    buy_url_flipkart: '#',
    buy_url_amazon: '#',
    is_featured: false,
  },
  {
    id: 'static-6',
    name: 'YOUTH',
    subtitle: 'Direction, Discipline, and Drive',
    description: 'A powerful guide for young individuals to gain clarity, build discipline, and take control of their future with confidence.',
    image_homepage: 'https://placehold.co/600x800/0a0a0a/f26522?text=YOUTH',
    image_product_page: '',
    buy_url_flipkart: '#',
    buy_url_amazon: '#',
    is_featured: false,
  },
  {
    id: 'static-7',
    name: 'LIFE NOTES',
    subtitle: 'Simple Thoughts. Powerful Impact.',
    description: 'A collection of deep reflections and practical insights to help you think clearly, stay grounded, and grow consistently in everyday life.',
    image_homepage: '/Life Notes F.png',
    image_product_page: '/Life Notes B.png',
    buy_url_flipkart: '#',
    buy_url_amazon: '#',
    is_featured: false,
  },
];

interface BookProduct {
  id: string;
  name: string;
  subtitle?: string;
  description: string;
  short_description?: string | null;
  image_homepage?: string | null;
  image_product_page?: string | null;
  buy_url_flipkart?: string | null;
  buy_url_amazon?: string | null;
  is_featured: boolean;
  image?: string;
  backImage?: string;
  flipkart?: string;
  amazon?: string;
  isSoldOut?: boolean;
}

export const ProductsBooks: React.FC = () => {
  const [booksList, setBooksList] = useState<BookProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/v1/products');
        const dbProducts = response.data.data.products || [];
        const dbBooks = dbProducts.filter((p: any) => p.category === 'book');
        
        if (dbBooks.length > 0) {
          const mappedDb = dbBooks.map((b: any) => ({
            id: b.id,
            name: b.name,
            subtitle: b.short_description || 'A Book by Sajan Shah',
            description: b.description,
            image_homepage: b.image_homepage,
            image_product_page: b.image_product_page,
            buy_url_flipkart: b.buy_url_flipkart,
            buy_url_amazon: b.buy_url_amazon,
            is_featured: b.is_featured,
          }));
          const dbNames = new Set(mappedDb.map((b: BookProduct) => b.name.toLowerCase()));
          setBooksList([
            ...mappedDb,
            ...staticBooks.filter(s => !dbNames.has(s.name.toLowerCase())),
          ]);
        } else {
          setBooksList(staticBooks);
        }
      } catch (error) {
        console.error('Failed to fetch books:', error);
        setBooksList(staticBooks);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const activeBooks = booksList.length > 0 ? booksList : staticBooks;
  const featuredBook = activeBooks.find((b: BookProduct) => b.is_featured) || activeBooks[0];
  const otherBooks = activeBooks.filter((b: BookProduct) => b.id !== featuredBook.id);

  if (loading) {
    return (
      <div className="py-24 text-center text-gray-500 bg-[#050505]">
        Loading Books Catalog...
      </div>
    );
  }

  return (
    <section id="books" className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 bg-[#f26522] text-white text-[10px] font-black tracking-widest uppercase rounded-full mb-6"
          >
            BOOKS BY SAJAN SHAH
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight uppercase"
          >
            Don’t Just Read. <span className="text-gray-500">Transform.</span>
          </motion.h2>
        </div>

        {/* Featured Book (Author Landing Page Style) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-gray-900 to-black rounded-[40px] border border-white/10 p-8 md:p-16 mb-24 shadow-[0_40px_80px_rgba(0,0,0,0.6)] relative overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center relative z-10">
            {/* Book 3D Mockup Container (Flip Animation) */}
            <div className="lg:w-5/12 w-full flex justify-center">
              <div className="relative w-full max-w-[350px] aspect-[3/4] group perspective-1000 cursor-pointer">
                <div className="relative w-full h-full transition-transform duration-[1200ms] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] ease-[cubic-bezier(0.23,1,0.32,1)]">
                  
                  {/* Front Side */}
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform-style:preserve-3d]">
                    <img 
                      src={featuredBook.image_homepage || 'https://placehold.co/600x800/0a0a0a/f26522?text=Product'} 
                      alt={featuredBook.name}
                      className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  </div>

                  {/* Back Side */}
                  <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] [transform-style:preserve-3d]">
                    <img 
                      src={featuredBook.image_product_page || featuredBook.image_homepage || 'https://placehold.co/600x800/0a0a0a/f26522?text=Product'} 
                      alt={featuredBook.name}
                      className="w-full h-full object-contain opacity-100"
                    />
                  </div>

                </div>
              </div>
            </div>

            {/* Book Details */}
            <div className="lg:w-7/12 flex flex-col justify-center text-left">
              <div className="inline-block px-3 py-1 bg-white/10 text-[#f26522] text-[10px] font-black tracking-widest uppercase rounded-sm mb-6 w-max">
                Bestseller
              </div>
              <h3 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter uppercase leading-none drop-shadow-lg">
                {featuredBook.name}
              </h3>
              <p className="text-[#f26522] font-bold text-xl md:text-2xl mb-8 tracking-wide uppercase">
                {featuredBook.subtitle}
              </p>
              
              <div className="w-16 h-1 bg-white/20 mb-8"></div>
              
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 font-light max-w-2xl">
                {featuredBook.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                 <a 
                   href={featuredBook.buy_url_flipkart && featuredBook.buy_url_flipkart !== '#' ? featuredBook.buy_url_flipkart : `https://www.flipkart.com/search?q=Sajan+Shah+${encodeURIComponent(featuredBook.name)}`} 
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex-1 bg-white text-black py-4 px-8 rounded-full font-black text-xs uppercase tracking-widest text-center hover:bg-[#f26522] hover:text-white transition-all duration-300 shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:shadow-[0_15px_40px_rgba(242,101,34,0.4)]"
                 >
                   Get it on Flipkart
                 </a>
                 <a 
                   href={featuredBook.buy_url_amazon && featuredBook.buy_url_amazon !== '#' ? featuredBook.buy_url_amazon : `https://www.amazon.in/s?k=Sajan+Shah+${encodeURIComponent(featuredBook.name)}`} 
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex-1 bg-transparent border-2 border-white/20 text-white py-4 px-8 rounded-full font-black text-xs uppercase tracking-widest text-center hover:bg-white hover:text-black transition-all duration-300"
                 >
                   Get it on Amazon
                 </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {otherBooks.map((book: BookProduct, index: number) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="group relative perspective-1000 cursor-pointer"
            >
              {/* Image Container with 3D Flip */}
              <div className="relative w-full aspect-[4/5] transition-transform duration-[1200ms] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] ease-[cubic-bezier(0.23,1,0.32,1)]">
                
                {/* Front Side */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform-style:preserve-3d]">
                  <img 
                    src={book.image_homepage || 'https://placehold.co/600x800/0a0a0a/f26522?text=Product'} 
                    alt={book.name}
                    className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  {book.isSoldOut && (
                    <div className="absolute top-4 right-4 bg-[#f26522] text-white px-3 py-1.5 text-[9px] font-black tracking-widest rounded-full uppercase z-30 shadow-lg">
                      Sold Out
                    </div>
                  )}
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] [transform-style:preserve-3d]">
                  <img 
                    src={book.image_product_page || book.image_homepage || 'https://placehold.co/600x800/0a0a0a/f26522?text=Product'} 
                    alt={book.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Dynamic Description / Buttons Area */}
              <div className="relative mt-6 min-h-[160px] flex flex-col justify-center overflow-hidden">
                
                {/* Default Text (Fades out and moves down on hover) */}
                <div className="absolute inset-0 transition-all duration-500 opacity-100 group-hover:opacity-0 group-hover:translate-y-4 pointer-events-auto group-hover:pointer-events-none text-center px-4">
                  <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">
                    {book.name}
                  </h3>
                  <p className="text-gray-500 font-bold text-[10px] mb-4 tracking-widest uppercase">
                    {book.subtitle}
                  </p>
                  <p className="text-gray-400 font-light text-sm leading-relaxed mb-0 line-clamp-3">
                    {book.description}
                  </p>
                </div>

                {/* Buttons (Fades in and moves up on hover) */}
                {book.isSoldOut ? (
                  <div className="absolute inset-0 px-8 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 pointer-events-none">
                     <span className="w-full bg-[#f26522]/10 border border-[#f26522]/30 text-[#f26522] py-4 rounded-full font-black text-xs uppercase tracking-widest text-center shadow-lg cursor-not-allowed">
                       SOLD OUT
                     </span>
                  </div>
                ) : (book.image_product_page || book.backImage || book.buy_url_flipkart || book.buy_url_amazon || book.flipkart || book.amazon) ? (
                  <div className="absolute inset-0 px-8 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto">
                     <a 
                       href={(book.buy_url_flipkart && book.buy_url_flipkart !== '#') ? book.buy_url_flipkart : (book.flipkart || `https://www.flipkart.com/search?q=Sajan+Shah+${encodeURIComponent(book.name)}`)} 
                       target="_blank"
                       rel="noopener noreferrer"
                       className="w-full bg-white text-black py-4 rounded-full font-bold text-[10px] uppercase tracking-widest text-center hover:bg-[#f26522] hover:text-white transition-colors shadow-lg pointer-events-auto"
                     >
                       Buy on Flipkart
                     </a>
                     <a 
                       href={(book.buy_url_amazon && book.buy_url_amazon !== '#') ? book.buy_url_amazon : (book.amazon || `https://www.amazon.in/s?k=Sajan+Shah+${encodeURIComponent(book.name)}`)} 
                       target="_blank"
                       rel="noopener noreferrer"
                       className="w-full bg-transparent border border-white/30 text-white py-4 rounded-full font-bold text-[10px] uppercase tracking-widest text-center hover:bg-white hover:text-black transition-colors shadow-lg pointer-events-auto"
                     >
                       Buy on Amazon
                     </a>
                  </div>
                ) : (
                  <div className="absolute inset-0 px-8 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 pointer-events-none">
                     <p className="text-gray-500 font-bold text-xs tracking-widest uppercase border border-gray-600 px-6 py-3 rounded-full">
                       Not Yet Available
                     </p>
                  </div>
                )}

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
