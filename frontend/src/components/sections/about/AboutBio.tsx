'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AboutBioProps {
  content?: {
    image?: string;
    heading1?: string;
    heading2?: string;
    introBold?: string;
    introItalic?: string;
    mainDescription?: string;
    quote?: string;
    statsParagraph?: string;
    recognitionParagraph?: string;
    truthHeading?: string;
    truthQuote?: string;
  };
}

export const AboutBio: React.FC<AboutBioProps> = ({ content }) => {
  const data = {
    image: content?.image || "https://webinar.sajanshah.com/assets/mentor-portrait-DVhB0Q8D.jpeg",
    heading1: content?.heading1 || "Exactly Like...",
    heading2: content?.heading2 || "Nobody Else",
    introBold: content?.introBold || "Widely known as the Memory Man of India and a 4 -Time Speaker at the Parliament of the World's Religions.",
    introItalic: content?.introItalic || "While many speakers focus on motivation, Sajan focuses on transformation.",
    mainDescription: content?.mainDescription || "Sajan Shah has impacted over 16 million lives, delivered 6,800+ presentations, worked across 800+ industries, spoken in 50+ countries spanning five continents, authored 8 books, and delivered 4 TEDx Talks. For more than 16 years, Sajan has been helping people unlock their potential, challenge limiting beliefs, and achieve results that once seemed beyond their reach.",
    quote: content?.quote || "His work is built on a powerful principle: extraordinary results are created when people transform the way they think, learn, communicate, and act.",
    statsParagraph: content?.statsParagraph || "Combining neuroscience, psychology, human behavior, memory science, and peak performance principles, he equips audiences with practical tools and strategies that create measurable change in both personal and professional life.<br/><br/>Every individual has greater potential than they realize. Every organization has opportunities waiting to be unlocked.<br/><br/>Sajan's sessions help people strengthen confidence, improve decision-making, enhance communication, build resilience, and develop the mindset required to perform at their highest level.<br/><br/>He is known for making complex concepts simple, actionable, and immediately applicable.<br/><br/>Rather than telling people what success looks like, he helps them discover how to create it for themselves.",
    recognitionParagraph: content?.recognitionParagraph || "A respected global speaker, educator, and thought leader, Sajan has shared stages with world-renowned personalities and his work has been recognized and appreciated by His Holiness the Dalai Lama, Roger Federer, and World Peace Ambassador Acharya Lokesh.<br/><br/>Whether speaking to students, educators, parents, professionals, entrepreneurs, or corporate leaders, Sajan brings a unique combination of global experience, scientific insights, practical wisdom, and authentic human connection.<br/><br/>When audiences leave a Sajan Shah experience, they leave with more than inspiration, they leave with greater clarity, stronger belief, and actionable strategies to create meaningful and lasting results.",
    truthHeading: content?.truthHeading || "The Core Truth",
    truthQuote: content?.truthQuote || "He doesn't just inspire people. <br />He rewires them."
  };

  return (
    <div className="bg-[#fafafa]">
      {/* Narrative Split Section */}
      <section className="py-32 text-gray-900 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 lg:gap-24 items-start">

            {/* Left: Sticky Image Container (Mirroring SplitHero) */}
            <div className="lg:w-5/12 lg:sticky lg:top-32 relative group w-full self-start">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="aspect-[3/4] bg-[#0a0a0a] w-full overflow-hidden relative shadow-[20px_20px_60px_rgba(0,0,0,0.1)] group border border-gray-100"
              >
                {/* Overlay with subtle brand glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 transition-opacity duration-700 group-hover:opacity-60"></div>

                <img
                  src={data.image}
                  alt="Sajan Shah"
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                />

                {/* Floating Frame Element for depth */}
                <div className="absolute -inset-4 border border-gray-100/10 z-0 pointer-events-none"></div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 py-10 border-t border-b border-gray-200"
              >
                <h2 className="text-4xl md:text-6xl font-light mb-3 tracking-tight">{data.heading1}</h2>
                <h2 className="text-4xl md:text-6xl font-extrabold text-[#f26522] uppercase tracking-tighter leading-none">{data.heading2}</h2>
              </motion.div>
            </div>

            {/* Right: Text Content (Premium Editorial) */}
            <div className="lg:w-7/12 py-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                {/* Intro Hook */}
                <div className="space-y-6">
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight tracking-tight">
                    {data.introBold}
                  </p>
                  <p className="text-2xl md:text-3xl font-light text-[#f26522] leading-tight tracking-tight italic">
                    {data.introItalic}
                  </p>
                </div>

                <div className="w-16 h-1 bg-[#111] mb-10"></div>

                <div className="space-y-10 text-gray-600 text-xl font-light leading-relaxed">
                  <p className="text-gray-900 font-medium">
                    {data.mainDescription}
                  </p>

                  <div className="border-l-2 border-[#f26522] pl-8 py-3 bg-white/50 backdrop-blur-sm shadow-sm rounded-r-lg">
                    <p className="font-bold text-gray-900 italic text-2xl">
                      "{data.quote}"
                    </p>
                  </div>

                  <div className="space-y-8">
                    <p dangerouslySetInnerHTML={{ __html: data.statsParagraph }}>
                    </p>
                    <p dangerouslySetInnerHTML={{ __html: data.recognitionParagraph }}>
                    </p>
                  </div>

                  <div className="pt-16 pb-12 border-t border-gray-100 mt-20">
                    <h4 className="text-gray-400 font-bold mb-6 uppercase tracking-[0.3em] text-[12px]">{data.truthHeading}</h4>
                    <p className="text-4xl md:text-5xl font-light italic text-gray-300 leading-tight" dangerouslySetInnerHTML={{ __html: data.truthQuote }}>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
