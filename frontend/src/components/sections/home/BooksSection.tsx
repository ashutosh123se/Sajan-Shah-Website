'use client';
import React, { useState, useEffect } from 'react';
import api from '@/lib/api';

interface Book {
  title: string;
  image: string;
  subtext: string;
  description: string;
  stats: string[];
  closingText: string;
  testimonial: string;
  author: string;
  authorTitle: string;
  buyUrlAmazon?: string;
  buyUrlFlipkart?: string;
  buyUrlInternal?: string;
  category?: string;
}

const bookMetadata: Record<string, {
  subtext: string;
  stats: string[];
  closingText: string;
  testimonial: string;
  author: string;
  authorTitle: string;
  defaultImage: string;
}> = {
  'you-vs-you': {
    subtext: "A 100-Day Personal Transformation Challenge",
    stats: [
      "100 Days",
      "100 Challenges",
      "100 Quotes",
      "100 Real-Life Examples",
      "Build mental discipline",
      "Discover your purpose"
    ],
    closingText: "This is not a book you read. This is a challenge you complete.",
    testimonial: "“This book didn’t just inspire me, it changed how I show up every single day. 100 days later, I’m more disciplined, focused, and confident than ever before.”",
    author: "Aarav Mehta",
    authorTitle: "Student",
    defaultImage: "/You vs You.png"
  },
  'studenting-parenting': {
    subtext: "Build a Positive, Happy Home Culture",
    stats: [
      "Understand modern-day student challenges",
      "Improve parent-child communication",
      "Build a supportive, stress-free home environment",
      "Navigate digital-age parenting effectively"
    ],
    closingText: "This book doesn’t just guide, it aligns families for growth.",
    testimonial: "“For the first time, our home feels peaceful and connected. This book helped us understand each other, not just as parent and child, but as people.”",
    author: "Neha Sharma",
    authorTitle: "Parent",
    defaultImage: "/Studenting & Parenting.png"
  },
  'untold-stories-heroes': {
    subtext: "100 Transformational Journeys to Inspire",
    stats: [
      "Lessons from failure, resilience, and growth",
      "Insights for leadership and personal development",
      "Stories that ignite courage and action"
    ],
    closingText: "Curated and narrated by Sajan Shah, this book reveals one truth: The hero you admire… already exists within you.",
    testimonial: "“Every story pushed me to think bigger and act stronger. This book doesn’t just tell stories, it builds courage.”",
    author: "Rohan Verma",
    authorTitle: "Entrepreneur",
    defaultImage: "/Untold Stories of Your Heroes.png"
  }
};

const staticBooks: Book[] = [
  {
    title: "You v/s You",
    image: "/You vs You.png",
    subtext: "A 100-Day Personal Transformation Challenge",
    description: "Not just a book, your personal mentor in paperback form. A 100-day transformation journey designed to help you outgrow your old self through powerful, action-driven tasks.",
    stats: [
      "100 Days",
      "100 Challenges",
      "100 Quotes",
      "100 Real-Life Examples",
      "Build mental discipline",
      "Discover your purpose"
    ],
    closingText: "This is not a book you read. This is a challenge you complete.",
    testimonial: "“This book didn’t just inspire me, it changed how I show up every single day. 100 days later, I’m more disciplined, focused, and confident than ever before.”",
    author: "Aarav Mehta",
    authorTitle: "Student",
    buyUrlAmazon: "#",
    buyUrlFlipkart: "#"
  },
  {
    title: "Studenting & Parenting",
    image: "/Studenting & Parenting.png",
    subtext: "Build a Positive, Happy Home Culture",
    description: "A practical guide to transforming the relationship between students and parents in today’s fast-changing world. Structured with 100 chapters (50 for parents, 50 for students), this book creates a shared growth journey.",
    stats: [
      "Understand modern-day student challenges",
      "Improve parent-child communication",
      "Build a supportive, stress-free home environment",
      "Navigate digital-age parenting effectively"
    ],
    closingText: "This book doesn’t just guide, it aligns families for growth.",
    testimonial: "“For the first time, our home feels peaceful and connected. This book helped us understand each other, not just as parent and child, but as people.”",
    author: "Neha Sharma",
    authorTitle: "Parent",
    buyUrlAmazon: "#",
    buyUrlFlipkart: "#"
  },
  {
    title: "Untold Stories of Your Heroes",
    image: "/Untold Stories of Your Heroes.png",
    subtext: "100 Transformational Journeys to Inspire",
    description: "A powerful collection of 100 transformational stories of individuals who overcame challenges, broke barriers, and created impact. Across multiple fields, each story delivers lessons that drive real change.",
    stats: [
      "Lessons from failure, resilience, and growth",
      "Insights for leadership and personal development",
      "Stories that ignite courage and action"
    ],
    closingText: "Curated and narrated by Sajan Shah, this book reveals one truth: The hero you admire… already exists within you.",
    testimonial: "“Every story pushed me to think bigger and act stronger. This book doesn’t just tell stories, it builds courage.”",
    author: "Rohan Verma",
    authorTitle: "Entrepreneur",
    buyUrlAmazon: "#",
    buyUrlFlipkart: "#"
  }
];

export const BooksSection: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const response = await api.get('/v1/products/featured');
        const featuredProducts = response.data.data.products || [];
        
        if (featuredProducts.length > 0) {
          // If we have products, map the featured products using our metadata dictionary or fallback values
          const mappedBooks = featuredProducts.map((b: any) => {
            const meta = bookMetadata[b.slug] || {
              subtext: b.short_description || `A premium ${b.category} by Sajan Shah`,
              stats: [
                "High-quality transformational resource",
                "Designed for elite mental performance",
                "Authentic and curated by Sajan Shah"
              ],
              closingText: "Curated and narrated by Sajan Shah.",
              testimonial: "“This changed how I show up every single day. I’m more disciplined, focused, and confident.”",
              author: "Verified Purchaser",
              authorTitle: "Customer",
              defaultImage: b.image_homepage || "/placeholder-book.png"
            };
 
            return {
              title: b.name,
              image: b.image_homepage || meta.defaultImage,
              subtext: b.short_description || meta.subtext,
              description: b.description,
              stats: Array.isArray(meta.stats) ? meta.stats : [meta.stats],
              closingText: meta.closingText,
              testimonial: meta.testimonial,
              author: meta.author,
              authorTitle: meta.authorTitle,
              buyUrlAmazon: b.buy_url_amazon || undefined,
              buyUrlFlipkart: b.buy_url_flipkart || undefined,
              buyUrlInternal: b.buy_url_internal || undefined,
              category: b.category,
            };
          });
          setBooks(mappedBooks);
        } else {
          // If the featured list is empty, default to empty list
          setBooks([]);
        }
      } catch (error) {
        console.error('Failed to fetch featured books, falling back to static list:', error);
        setBooks(staticBooks);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBooks();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#0a0a0a] text-white py-20 text-center">
        <p className="text-gray-400">Loading featured books...</p>
      </section>
    );
  }

  // If loading is finished and there are no featured books, we can hide the section or display nothing
  if (books.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#0a0a0a] text-white">
      {/* Title section - matching the Learn. Apply. Transform. intent */}
      <div className="py-20 border-b border-gray-800 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">Learn. Apply. Transform.</h2>
      </div>

      {books.map((book, idx) => (
        <div key={idx} className="border-b border-gray-800">
          <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row min-h-[600px]">
            
            {/* Text Side */}
            <div className={`w-full lg:w-1/2 p-10 lg:p-24 flex flex-col justify-center ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-4 text-white">{book.title}</h2>
              <p className="text-xl lg:text-2xl text-gray-300 font-light mb-8">{book.subtext}</p>
              
              <div className="w-full h-px bg-gray-800 mb-8"></div>
              
              <p className="text-base lg:text-lg text-gray-400 mb-8 leading-relaxed">
                {book.description}
              </p>

              <div className="mb-8 space-y-3">
                {book.stats.map((stat, i) => (
                  <p key={i} className="text-base lg:text-lg text-gray-200 flex items-start">
                    <span className="w-2 h-2 bg-[#f26522] rounded-full mr-4 mt-2.5 flex-shrink-0"></span>
                    <span>{stat}</span>
                  </p>
                ))}
              </div>

              <p className="text-lg text-white font-semibold mb-10 italic border-l-4 border-[#f26522] pl-4">
                {book.closingText}
              </p>

              <div className="w-full h-px bg-[#f26522] mb-12 opacity-50"></div>

              {/* Quote Card mimicking reference */}
              <div className="bg-[#151515] p-8 md:p-10 border border-gray-800 shadow-[0_0_50px_rgba(0,0,0,0.6)] flex flex-col md:flex-row gap-8 items-start relative mb-12 rounded-sm transform transition-transform hover:-translate-y-1">
                <div className="w-20 h-20 rounded-full bg-gray-800 flex-shrink-0 border-2 border-gray-700 overflow-hidden shadow-inner">
                   <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-gray-500 text-xs font-bold tracking-widest uppercase">Member</div>
                </div>
                <div>
                  <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-6 font-light">
                    "{book.testimonial.replace(/[“”]/g, '')}"
                  </p>
                  <p className="text-[#f26522] font-semibold tracking-wide text-lg">{book.author}</p>
                  <p className="text-sm text-gray-500 mt-1 uppercase tracking-widest">{book.authorTitle}</p>
                </div>
              </div>

              <div className="flex gap-4 flex-wrap">
                {book.category === 'book' ? (
                  <>
                    <a 
                      href={book.buyUrlFlipkart && book.buyUrlFlipkart !== '#' ? book.buyUrlFlipkart : `https://www.flipkart.com/search?q=Sajan+Shah+${encodeURIComponent(book.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#f26522] hover:bg-[#d95a1e] text-white px-10 py-5 font-bold text-lg transition-colors inline-block tracking-wide shadow-lg text-center rounded-sm"
                    >
                      Order on Flipkart
                    </a>
                    <a 
                      href={book.buyUrlAmazon && book.buyUrlAmazon !== '#' ? book.buyUrlAmazon : `https://www.amazon.in/s?k=Sajan+Shah+${encodeURIComponent(book.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-transparent border-2 border-white/20 hover:border-white text-white px-10 py-5 font-bold text-lg transition-colors inline-block tracking-wide shadow-lg text-center rounded-sm"
                    >
                      Order on Amazon
                    </a>
                  </>
                ) : (
                  <a 
                    href={book.buyUrlInternal && book.buyUrlInternal !== '#' ? book.buyUrlInternal : `/products#${book.category}s`}
                    className="bg-[#f26522] hover:bg-[#d95a1e] text-white px-10 py-5 font-bold text-lg transition-colors inline-block tracking-wide shadow-lg text-center rounded-sm"
                  >
                    Buy Now
                  </a>
                )}
              </div>
            </div>

            {/* Image Side - Uncropped & Ambient Backlit Premium Presentation */}
            <div className={`w-full lg:w-1/2 relative min-h-[500px] lg:min-h-full overflow-hidden ${idx % 2 !== 0 ? 'lg:order-1' : ''} bg-[#0c0c0c] flex items-center justify-center p-4 lg:p-6`}>
               {/* Blurred background ambient glow */}
               <div 
                 className="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-30 scale-110 pointer-events-none"
                 style={{ backgroundImage: `url(${book.image})` }}
               ></div>
               {/* High-quality uncropped centered product image with 3D shadow */}
               <img 
                 src={book.image} 
                 alt={book.title} 
                 className="relative z-10 max-h-[600px] lg:max-h-[900px] w-auto object-contain transition-transform duration-[2000ms] hover:scale-105 drop-shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
               />
               {/* Vignette Overlay for depth */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
            </div>

          </div>
        </div>
      ))}
    </section>
  );
};
