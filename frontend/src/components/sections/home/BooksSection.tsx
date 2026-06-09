'use client';
import React from 'react';

export const BooksSection: React.FC = () => {
  const books = [
    {
      title: "You v/s You",
      amazonLink: "https://www.amazon.in/s?k=Sajan+Shah+YOU+v%2Fs+YOU",
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
      author: "Sharma Dhruv",
      authorImage: "/Sharma Dhruv.jpeg",
      authorTitle: "Student"
    },
    {
      title: "Studenting & Parenting",
      amazonLink: "https://www.amazon.in/s?k=Sajan+Shah+STUDENTING+%26+PARENTING",
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
      author: "Neha Jeswani",
      authorImage: "/Neha Jeswani.png",
      authorTitle: "Parent"
    },
    {
      title: "Untold Stories of Your Heroes",
      amazonLink: "https://www.amazon.in/s?k=Sajan+Shah+UNTOLD+STORIES+OF+YOUR+HEROES",
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
      authorImage: "/Rohan Verma.png",
      authorTitle: "Entrepreneur"
    }
  ];

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
                  <img src={book.authorImage} alt={book.author} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-6 font-light">
                    "{book.testimonial.replace(/[“”]/g, '')}"
                  </p>
                  <p className="text-[#f26522] font-semibold tracking-wide text-lg">{book.author}</p>
                  <p className="text-sm text-gray-500 mt-1 uppercase tracking-widest">{book.authorTitle}</p>
                </div>
              </div>

              <div className="mb-10 lg:mb-0">
                <a href={book.amazonLink} target="_blank" rel="noopener noreferrer" className="bg-[#f26522] hover:bg-[#d95a1e] text-white px-10 py-5 font-bold text-lg transition-colors inline-block tracking-wide shadow-lg">
                  Order on Amazon
                </a>
              </div>
            </div>

            {/* Image Side - Full Bleed Coverage */}
            <div className={`w-full lg:w-1/2 relative min-h-[500px] lg:min-h-full overflow-hidden ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
              <img
                src={book.image}
                alt={book.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-105"
              />
              {/* Overlay for text legibility and depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
              <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.4)] pointer-events-none"></div>
            </div>

          </div>
        </div>
      ))}
    </section>
  );
};
