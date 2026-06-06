'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

interface ImpactStory {
  title: string;
  excerpt: string;
  content: React.ReactNode;
}

const PencilsContent = (
  <article className="space-y-8 text-gray-300 text-lg leading-relaxed">
    <div className="flex items-center justify-between pb-8 border-b border-white/10 mb-10 mt-2">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#f26522] to-orange-700 flex items-center justify-center text-white font-bold text-xl shadow-lg">SS</div>
        <div>
          <p className="font-bold text-white mb-0.5 text-lg">Sajan Shah</p>
          <p className="text-xs text-[#f26522] uppercase tracking-widest font-bold">Founder, Live to Inspire</p>
        </div>
      </div>
      <div className="text-right hidden sm:block">
        <p className="text-sm text-gray-400 font-medium">May 15, 2024</p>
        <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">5 Min Read</p>
      </div>
    </div>
    
    <p className="text-2xl font-light text-white leading-relaxed italic mb-12 border-l-4 border-[#f26522] pl-6 py-3 bg-white/5 rounded-r-xl">
      "What if a simple pencil could become a tool for climate action?"
    </p>
    <p className="first-letter:text-7xl first-letter:font-black first-letter:text-[#f26522] first-letter:mr-3 first-letter:float-left first-line:uppercase first-line:tracking-widest">
      Over the last few years, Live to Inspire Charitable Trust has distributed more than 5 million plantable seed pencils to students from Grade 4 to Grade 10 across 25 States, 2 Union Territories, and 130+ cities in India.
    </p>
    <p>At first glance, it looks like a stationery distribution drive. In reality, it is a nationwide movement to create environmental awareness among the next generation.</p>
    
    <h4 className="text-2xl font-bold text-white mt-10 mb-4 uppercase tracking-wide">Why Does This Matter?</h4>
    <p>According to the United Nations, the world must significantly accelerate climate action to meet the Sustainable Development Goals by 2030. Yet environmental awareness alone is not enough. Action is required.</p>
    <p>A plantable pencil creates that action. Instead of becoming waste after use, the pencil can be planted in soil and transformed into a living plant.</p>
    <p>One pencil. One seed. One lesson in sustainability.</p>
    
    <h4 className="text-2xl font-bold text-white mt-10 mb-4 uppercase tracking-wide">The Power of 5 Million Pencils</h4>
    <ul className="list-disc pl-6 space-y-3">
      <li>5 Million+ Plantable Pencils Distributed</li>
      <li>25 States Reached</li>
      <li>2 Union Territories Covered</li>
      <li>130+ Cities Engaged</li>
      <li>Lakhs of Students Directly Impacted</li>
      <li>Millions of Family Members Indirectly Influenced</li>
    </ul>
    
    <h4 className="text-2xl font-bold text-white mt-10 mb-4 uppercase tracking-wide">Creating Climate Ambassadors</h4>
    <p>Most children learn about climate change through textbooks. Very few participate in climate action themselves.</p>
    <p>When a child plants a pencil and nurtures its growth, they learn: Responsibility, Patience, Environmental stewardship, and Sustainable living.</p>
    <p>More importantly, they carry these values home. One student influences an entire family. One classroom influences a community. One generation influences a nation.</p>
    
    <h4 className="text-2xl font-bold text-white mt-10 mb-4 uppercase tracking-wide">Supporting UN SDGs 2030</h4>
    <ul className="list-disc pl-6 space-y-3">
      <li>SDG 13 – Climate Action</li>
      <li>SDG 4 – Quality Education</li>
      <li>SDG 12 – Responsible Consumption and Production</li>
      <li>SDG 15 – Life on Land</li>
    </ul>
    
    <h4 className="text-2xl font-bold text-white mt-10 mb-4 uppercase tracking-wide">A Movement, Not a Distribution Drive</h4>
    <p>The true achievement is not distributing 5 million pencils. The true achievement is inspiring millions of young minds to think differently about the environment.</p>
    <p className="text-[#f26522] italic text-xl font-medium mt-8">Because every plantable pencil carries a powerful message: "When learning ends, life begins."</p>
  </article>
);

const VisionContent = (
  <article className="space-y-8 text-gray-300 text-lg leading-relaxed">
    <div className="flex items-center justify-between pb-8 border-b border-white/10 mb-10 mt-2">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#f26522] to-orange-700 flex items-center justify-center text-white font-bold text-xl shadow-lg">SS</div>
        <div>
          <p className="font-bold text-white mb-0.5 text-lg">Sajan Shah</p>
          <p className="text-xs text-[#f26522] uppercase tracking-widest font-bold">Memory Man of India & Founder</p>
        </div>
      </div>
      <div className="text-right hidden sm:block">
        <p className="text-sm text-gray-400 font-medium">April 22, 2024</p>
        <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">7 Min Read</p>
      </div>
    </div>
    
    <p className="text-2xl font-light text-white leading-relaxed italic mb-12 border-l-4 border-[#f26522] pl-6 py-3 bg-white/5 rounded-r-xl">
      "What if education could transform not just students, but entire cities?"
    </p>
    <p className="first-letter:text-7xl first-letter:font-black first-letter:text-[#f26522] first-letter:mr-3 first-letter:float-left first-line:uppercase first-line:tracking-widest">
      For the last 8 years, the Season of Learning (SOL) Initiative has been doing exactly that—building future-ready students, stronger families, responsible citizens, and socially conscious communities through neuroscience-based education and social transformation.
    </p>
    <p>Today, SOL stands as one of India's most impactful educational outreach movements.</p>
    
    <h4 className="text-2xl font-bold text-white mt-10 mb-4 uppercase tracking-wide">Impact by the Numbers</h4>
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h5 className="text-lg font-bold text-[#f26522] mb-3">Since Inception</h5>
        <ul className="list-disc pl-6 space-y-2">
          <li>15 Million+ Lives Impacted</li>
          <li>8 Years of Continuous Execution</li>
          <li>Hundreds of Cities Reached</li>
          <li>Thousands of Schools Engaged</li>
          <li>Millions of Students, Parents, and Educators Benefited</li>
        </ul>
      </div>
      <div>
        <h5 className="text-lg font-bold text-[#f26522] mb-3">Every Month</h5>
        <ul className="list-disc pl-6 space-y-2">
          <li>2 Cities Transformed & 60 Schools Reached</li>
          <li>480 School Sessions Conducted</li>
          <li>50,000+ People Directly Impacted</li>
          <li>5 Public Mega Shows Conducted</li>
        </ul>
      </div>
    </div>

    <h4 className="text-2xl font-bold text-white mt-10 mb-4 uppercase tracking-wide">Why Season of Learning?</h4>
    <p>The world of 2030 will demand more than academic knowledge. It will require: Critical Thinking, Emotional Intelligence, Character, Leadership, Civic Sense, Adaptability, and Social Responsibility.</p>
    <p>Yet most students are never formally taught these life skills. Season of Learning bridges that gap.</p>

    <h4 className="text-2xl font-bold text-white mt-10 mb-4 uppercase tracking-wide">Driving the UN SDGs</h4>
    <ul className="list-disc pl-6 space-y-3">
      <li><strong>SDG 4 – Quality Education:</strong> Making learning practical, relevant, and future-focused.</li>
      <li><strong>SDG 5 – Gender Equality:</strong> Promoting respect, inclusion, and equal opportunities.</li>
      <li><strong>SDG 13 – Climate Action:</strong> Encouraging environmental responsibility and sustainable behavior.</li>
    </ul>

    <h4 className="text-2xl font-bold text-white mt-10 mb-4 uppercase tracking-wide">The Real Impact</h4>
    <p>The biggest achievement of Season of Learning is not the number of sessions conducted. It is the number of lives transformed.</p>
    <p>A student discovers confidence. A parent gains a new perspective. A teacher inspires differently. A community becomes stronger. A city becomes more aware. And slowly, a nation moves forward.</p>
    <p className="text-[#f26522] text-xl font-bold mt-8 italic">Season of Learning is not a program. It is a movement for the future of India.</p>
  </article>
);

const UVContent = (
  <article className="space-y-8 text-gray-300 text-lg leading-relaxed">
    <div className="flex items-center justify-between pb-8 border-b border-white/10 mb-10 mt-2">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#f26522] to-orange-700 flex items-center justify-center text-white font-bold text-xl shadow-lg">SS</div>
        <div>
          <p className="font-bold text-white mb-0.5 text-lg">Sajan Shah</p>
          <p className="text-xs text-[#f26522] uppercase tracking-widest font-bold">Founder, Live to Inspire</p>
        </div>
      </div>
      <div className="text-right hidden sm:block">
        <p className="text-sm text-gray-400 font-medium">March 10, 2024</p>
        <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">6 Min Read</p>
      </div>
    </div>
    
    <p className="text-2xl font-light text-white leading-relaxed italic mb-12 border-l-4 border-[#f26522] pl-6 py-3 bg-white/5 rounded-r-xl">
      Every morning, before most cities wake up, millions of sanitation workers begin their day. They clean our roads. They collect our waste. They maintain public hygiene. They protect public health.
    </p>
    <p className="first-letter:text-7xl first-letter:font-black first-letter:text-[#f26522] first-letter:mr-3 first-letter:float-left first-line:uppercase first-line:tracking-widest">
      Yet, many of these frontline workers continue to perform their duties without adequate protection from dust, pollution, harmful particles, sunlight, and airborne infections.
    </p>
    <p>At Live to Inspire Charitable Trust, we believe that those who protect our communities deserve protection themselves.</p>
    <p>Every year, we distribute 50,000 UV Protection Glasses and 250,000 Protective Masks to sanitation workers across 15 States and 2 Union Territories of India. Because dignity begins with safety.</p>

    <h4 className="text-2xl font-bold text-white mt-10 mb-4 uppercase tracking-wide">The Invisible Health Risk</h4>
    <p>Sanitation workers face daily exposure to dust, harmful waste particles, air pollution, UV radiation, eye irritation, and respiratory challenges.</p>
    <p>While society often notices the cleanliness they create, very few recognize the health risks they endure.</p>

    <h4 className="text-2xl font-bold text-white mt-10 mb-4 uppercase tracking-wide">The Power of a Simple Safety Kit</h4>
    <ul className="list-disc pl-6 space-y-3">
      <li>50,000 UV Protection Glasses</li>
      <li>5 Protective Masks per Worker (250,000 Annually)</li>
      <li>15 States Covered & 2 Union Territories Reached</li>
    </ul>
    <p>These are not merely products. They are preventive health tools. For thousands of workers, these simple tools become a shield against occupational health risks.</p>

    <h4 className="text-2xl font-bold text-white mt-10 mb-4 uppercase tracking-wide">More Than Distribution: Restoring Dignity</h4>
    <p>The impact of this initiative goes beyond physical protection. It sends a powerful message: <em>"Your work matters. Your health matters. Your life matters."</em></p>
    <p>When we provide protective equipment, we are not only improving workplace safety—we are recognizing their dignity and contribution to society.</p>

    <h4 className="text-2xl font-bold text-white mt-10 mb-4 uppercase tracking-wide">Supporting the UN SDGs 2030</h4>
    <ul className="list-disc pl-6 space-y-3">
      <li><strong>SDG 3 – Good Health and Well-Being:</strong> Promoting better occupational health.</li>
      <li><strong>SDG 8 – Decent Work and Economic Growth:</strong> Contributing to safer workplaces.</li>
      <li><strong>SDG 10 – Reduced Inequalities:</strong> Supporting vulnerable communities.</li>
      <li><strong>SDG 11 – Sustainable Cities and Communities:</strong> Strengthening the foundation of urban communities.</li>
    </ul>

    <h4 className="text-2xl font-bold text-white mt-10 mb-4 uppercase tracking-wide">A Call for Collective Responsibility</h4>
    <p>If every organization, institution, corporation, and citizen contributed even a small effort toward protecting frontline workers, the impact would be transformative.</p>
    <p className="text-[#f26522] italic text-xl font-bold mt-8">Because a cleaner India begins with healthier sanitation workers.</p>
  </article>
);

const DEFAULT_STORIES: ImpactStory[] = [
  { 
    title: "5 Million Plantable Pencils", 
    excerpt: "5 Million Opportunities to Change India's Future. What if a simple pencil could become a tool for climate action?",
    content: PencilsContent
  },
  { 
    title: "15 Million Lives Impacted. Season of Learning", 
    excerpt: "One Mission: Preparing India for 2030 through neuroscience-based education and social transformation.",
    content: VisionContent
  },
  { 
    title: "50,000 UV Protection Glasses", 
    excerpt: "How Live to Inspire Charitable Trust Is Supporting India's Frontline Sanitation Workers.",
    content: UVContent
  }
];

interface ImpactStoriesProps {
  content?: any;
}

export const ImpactStories: React.FC<ImpactStoriesProps> = ({ content }) => {
  const [selectedStory, setSelectedStory] = useState<ImpactStory | null>(null);

  return (
    <section className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-20 border-b border-gray-900 pb-10">
          <div>
            <h2 className="text-[#f26522] font-bold uppercase tracking-[0.3em] text-sm mb-4">Impact Stories</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter">CASE STUDIES</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DEFAULT_STORIES.map((story, idx) => (
            <div 
              key={idx} 
              onClick={() => setSelectedStory(story)}
              className="group cursor-pointer bg-[#050505] border border-gray-900 rounded-[2rem] p-10 hover:border-[#f26522]/50 hover:bg-[#0a0a0a] transition-all duration-500 flex flex-col h-full shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#f26522] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex-1">
                <h4 className="text-3xl md:text-4xl font-black text-[#f26522] mb-6 uppercase tracking-wide leading-snug">{story.title}</h4>
                <p className="text-gray-400 font-light text-base mb-10 leading-relaxed">{story.excerpt}</p>
              </div>
              
              <div className="mt-auto">
                <button className="flex items-center text-white font-bold text-xs uppercase tracking-widest group-hover:text-[#f26522] transition-colors border-none bg-transparent cursor-pointer p-0">
                  <span className="mr-3">Read Full Story</span>
                  <ArrowRight size={16} className="transform group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#050505] border border-[#1f2937] rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col relative"
            >
              <button 
                onClick={() => setSelectedStory(null)}
                className="absolute top-6 right-6 p-3 bg-[#111] hover:bg-red-500/20 text-gray-400 hover:text-red-500 rounded-full transition-colors z-10 border border-[#1f2937] cursor-pointer"
              >
                <X size={24} />
              </button>
              
              <div className="p-8 md:p-12 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                <h3 className="text-4xl md:text-5xl font-black text-[#f26522] mb-10 uppercase tracking-wide pr-12 leading-snug">
                  {selectedStory.title}
                </h3>
                <div className="prose prose-invert prose-lg max-w-none">
                  {selectedStory.content}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
