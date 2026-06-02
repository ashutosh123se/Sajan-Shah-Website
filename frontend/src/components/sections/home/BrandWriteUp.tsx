'use client';
import React from 'react';

interface BrandWriteUpProps {
  content?: {
    backgroundImage?: string;
    title?: string;
    heading?: string;
    paragraphs?: string[];
    highlight?: string;
    ctaText?: string;
    ctaLink?: string;
  };
}

export const BrandWriteUp: React.FC<BrandWriteUpProps> = ({ content }) => {
  const backgroundImage = content?.backgroundImage || "/sajan sir.png";
  const title = content?.title || "SAJAN";

  const heading =
    content?.heading ||
    `16+ million people impacted. 6,800+ presentations delivered. 800+ industries served. 50+ countries reached. Five continents addressed. 8 published books. 4 TEDx Talks. 4 speeches at the Parliament of the World's Religions.`;

  const paragraphs = content?.paragraphs || [
    "Sajan Shah has made it his life's work to demystify the human potential process, reframe what it means to \"win,\" and help people develop the mindset, confidence, and skills needed to achieve extraordinary results.",

    "Every person, every team, and every organization has something to achieve.",

    "Helping people truly understand how they can positively influence outcomes, improve decision-making, drive results, and maintain integrity empowers them to realize more of their untapped potential.",

    "Sajan is known not for simply talking about success principles, but for showing audiences exactly how to apply them. His sessions combine practical strategies, neuroscience-backed insights, and real-world tools that people can use immediately.",

    "By teaching proven frameworks that strengthen communication, influence, leadership, learning, and performance, audiences walk away with a new perception of their own capability.",

    "Just imagine the confidence that comes from knowing exactly what to do, exactly when to do it, and having the clarity to put new learnings into action immediately.",

    "Having impacted over 16 million people and delivered more than 5,000 presentations across 800+ industries, 50+ countries, and five continents, you can be confident that you are working with a seasoned professional whose work has been appreciated by global personalities including His Holiness the Dalai Lama and Roger Federer, and who remains deeply committed to creating meaningful and measurable value for every audience he serves."
  ];

  const highlight =
    content?.highlight ||
    "He is by no means your typical motivational speaker.";

  const ctaText = content?.ctaText || "Learn More About Sajan Shah";
  const ctaLink = content?.ctaLink || "/about";

  const displayParagraphs = paragraphs.filter((p) => p !== highlight);

  return (
    <section className="relative min-h-[850px] lg:min-h-[1000px] bg-black overflow-hidden flex items-center">
      {/* Background Image - Full Bleed with Narrative Fade */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="Sajan Shah Live on Stage"
          className="w-full h-full object-cover opacity-90"
        />

        {/* Deep Gradient for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>

        {/* Bottom fade to blend with next section */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* Left: Article/Story Content */}
          <div className="lg:w-7/12 py-24">
            <div className="space-y-6 text-white/90 text-lg md:text-xl font-light leading-relaxed max-w-2xl relative">

              <h2 className="text-white/20 text-7xl md:text-8xl font-black absolute -top-12 -left-4 select-none -z-10 tracking-tighter">
                {title}
              </h2>

              <p className="font-medium text-white text-xl md:text-2xl leading-snug">
                {heading}
              </p>

              {displayParagraphs.slice(0, 2).map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}

              {highlight && (
                <p className="italic text-[#f26522] font-medium border-l-2 border-[#f26522] pl-6 py-2">
                  {highlight}
                </p>
              )}

              {displayParagraphs.slice(2).map((p, idx) => (
                <p key={idx + 2}>{p}</p>
              ))}

              <div className="pt-10">
                <button
                  onClick={() => (window.location.href = ctaLink)}
                  className="bg-[#f26522] hover:bg-[#d95a1e] text-white px-12 py-5 font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_0_30px_rgba(242,101,34,0.3)]"
                >
                  {ctaText}
                </button>
              </div>

            </div>
          </div>

          {/* Right: Empty spacer to allow the background image of Sajan to be visible */}
          <div className="lg:w-5/12 hidden lg:block"></div>

        </div>
      </div>
    </section>
  );
};