'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MessageContent {
  sectionLabel: string;
  speakerName: string;
  speakerImage: string;
  signatureImage: string;
  signOffText: string;
  paragraphs: string[];
  pillars: string[];
}

interface SpeakingMessageProps {
  content?: {
    sectionLabel?: string;
    speakerName?: string;
    speakerImage?: string;
    signatureImage?: string;
    signOffText?: string;
    paragraphs?: string[];
    pillars?: string[];
  };
}

const defaults: MessageContent = {
  sectionLabel: "A Personal Message From",
  speakerName: "Sajan Shah",
  speakerImage: "/Sir Speaking.jpeg",
  signatureImage: "/sir sign.png",
  signOffText: "With Purpose,",
  paragraphs: [
    "Firstly, I want to begin by saying <em>thank you.</em>",
    "Being considered to impact your audience is not just an opportunity, it is a responsibility I deeply value.",
    "Every session I deliver is designed with one objective: <highlight>to create a shift that lasts beyond the event.</highlight>",
    "This page is created to help you understand how we can work together, what your audience will experience, and the transformation they can expect.",
    "Whether your event is live, virtual, or hybrid, the focus remains the same:",
    "My commitment is simple, to deliver an experience that engages your audience, challenges their thinking, and drives real change.",
    "Take a moment to explore, and see how we can create something impactful together."
  ],
  pillars: ["Clarity.", "Action.", "Results."]
};

const renderParagraph = (text: string, idx: number) => {
  if (text.includes('<highlight>')) {
    const parts = text.split(/<highlight>|<\/highlight>/);
    return (
      <p key={idx} className="text-2xl font-normal text-gray-900">
        {parts[0]}
        <span className="text-[#f26522]">{parts[1]}</span>
        {parts[2]}
      </p>
    );
  }
  if (text.includes('<em>')) {
    const parts = text.split(/<em>|<\/em>/);
    return (
      <p key={idx}>
        {parts[0]}<span className="italic font-normal">{parts[1]}</span>{parts[2]}
      </p>
    );
  }
  return <p key={idx}>{text}</p>;
};

export const SpeakingMessage: React.FC<SpeakingMessageProps> = ({ content }) => {
  const preferLocal = (cmsImg?: string, fallback?: string) => {
    const img = (cmsImg || '').trim();
    if (!img) return fallback || '';
    if (img.startsWith('/') && !img.startsWith('//')) return img;
    if (img.includes('/uploads/')) return img;
    return fallback || img;
  };

  const data = {
    sectionLabel: content?.sectionLabel || defaults.sectionLabel,
    speakerName: content?.speakerName || defaults.speakerName,
    speakerImage: preferLocal(content?.speakerImage, defaults.speakerImage),
    signatureImage: preferLocal(content?.signatureImage, defaults.signatureImage),
    signOffText: content?.signOffText || defaults.signOffText,
    paragraphs: content?.paragraphs || defaults.paragraphs,
    pillars: content?.pillars || defaults.pillars
  };

  return (
    <section id="message" className="py-24 bg-white text-gray-900 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-20 items-start">

          {/* Left Column: Title + Image */}
          <div className="lg:w-1/3 flex flex-col space-y-12">
            <div className="space-y-4">
              <div className="w-16 h-0.5 bg-gray-200"></div>
              <h2 className="text-4xl font-light leading-tight">
                {data.sectionLabel.split(' ').slice(0, 2).join(' ')} <br />
                <span className="font-bold">{data.sectionLabel.split(' ').slice(2).join(' ')}</span><br />
                <span className="text-[#f26522] italic font-serif text-5xl">{data.speakerName}</span>
              </h2>
              <div className="w-full h-0.5 bg-gray-200"></div>
            </div>

            <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-2xl">
              <img
                src={data.speakerImage}
                alt={data.speakerName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column: Message Content */}
          <div className="lg:w-2/3 pt-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8 text-lg md:text-xl font-light text-gray-700 leading-relaxed"
            >
              {data.paragraphs.map((p, idx) => renderParagraph(p, idx))}

              {data.pillars.length > 0 && (
                <div className="flex flex-wrap gap-8 py-4">
                  {data.pillars.map((pillar, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#f26522]"></div>
                      <span className="font-bold tracking-tighter text-3xl">{pillar}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-12">
                <p className="text-gray-500 italic mb-2">{data.signOffText}</p>
                <h3 className="text-4xl font-serif italic text-gray-900">{data.speakerName}</h3>
                <div className="mt-2">
                  <img
                    src={data.signatureImage}
                    alt={`${data.speakerName} Signature`}
                    className="h-20 w-auto opacity-90 contrast-125"
                  />
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
