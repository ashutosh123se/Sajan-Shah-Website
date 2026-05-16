'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AboutMovementProps {
  content?: {
    mainTitle?: string;
    row1Image1?: string;
    row1Tagline?: string;
    row1Heading?: string;
    row1Description?: string;
    row1SubTagline?: string;
    row1SubDescription?: string;
    row1Image2?: string;
    row2Text1Heading?: string;
    row2Text1Description?: string;
    row2Text1SubTagline?: string;
    row2Text1SubDescription?: string;
    row2Image3?: string;
    row2Image3Tagline?: string;
    row2Image3Heading?: string;
    row2Text2Heading?: string;
    row2Text2Description?: string;
    row2Text2SubTagline?: string;
    row2Text2SubDescription?: string;
  };
}

export const AboutMovement: React.FC<AboutMovementProps> = ({ content }) => {
  const data = {
    mainTitle: content?.mainTitle || "And then what?",
    row1Image1: content?.row1Image1 || "https://webinar.sajanshah.com/assets/mentor-portrait-DVhB0Q8D.jpeg",
    row1Tagline: content?.row1Tagline || "From Speaker to",
    row1Heading: content?.row1Heading || "Movement Builder",
    row1Description: content?.row1Description || "Sajan Shah is not just a speaker — he is a catalyst for global change, driving transformation at the individual, institutional, and societal level.",
    row1SubTagline: content?.row1SubTagline || "United First Initiative",
    row1SubDescription: content?.row1SubDescription || "Driving global impact aligned with UN Sustainable Development Goals (SDG 2030).",
    row1Image2: content?.row1Image2 || "https://webinar.sajanshah.com/assets/mentor-portrait-DVhB0Q8D.jpeg",
    row2Text1Heading: content?.row2Text1Heading || "From Learning to Execution",
    row2Text1Description: content?.row2Text1Description || "Most people know what to do. Very few actually do it. Sajan bridges that gap through action-driven frameworks and daily execution systems. Knowledge without execution is useless.",
    row2Text1SubTagline: content?.row2Text1SubTagline || "Live to Inspire Trust",
    row2Text1SubDescription: content?.row2Text1SubDescription || "Transforming communities through education, awareness, and massive youth empowerment.",
    row2Image3: content?.row2Image3 || "https://webinar.sajanshah.com/assets/mentor-portrait-DVhB0Q8D.jpeg",
    row2Image3Tagline: content?.row2Image3Tagline || "Global Stage",
    row2Image3Heading: content?.row2Image3Heading || "16+ Million Lives Impacted",
    row2Text2Heading: content?.row2Text2Heading || "Global Impact at Scale",
    row2Text2Description: content?.row2Text2Description || "Whether speaking to students, parents, institutions, or world leaders, the mission remains absolute: Break patterns. Build clarity. Create extraordinary results.",
    row2Text2SubTagline: content?.row2Text2SubTagline || "The Mission",
    row2Text2SubDescription: content?.row2Text2SubDescription || "Every talk, every workshop, every book — one singular aim: permanently shift the way people think, decide, and act."
  };

  return (
    <section className="py-32 bg-[#0a0a0a] text-white px-4 overflow-hidden">

      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="mb-24 text-center">
          <h2 className="text-5xl md:text-8xl font-light tracking-tight italic text-white">{data.mainTitle}</h2>
          <div className="w-16 h-1 bg-[#f26522] mx-auto mt-8"></div>
        </div>

        {/* Editorial Magazine Grid */}
        <div className="space-y-8">
          
          {/* Row 1: Image | Text | Image */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            
            {/* Image 1 - Left (Tall) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden group"
              style={{ aspectRatio: '3/4' }}
            >
              <img
                src={data.row1Image1}
                alt="Sajan Shah Speaking"
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </motion.div>

            {/* Text Block - Center */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="flex flex-col justify-end gap-8 py-8 px-4"
            >
              <div className="space-y-6">
                <p className="text-[#f26522] text-xs font-bold uppercase tracking-[0.4em]">{data.row1Tagline}</p>
                <h3 className="text-3xl md:text-4xl font-bold leading-tight">{data.row1Heading}</h3>
                <p className="text-gray-400 font-light leading-relaxed text-lg">
                  {data.row1Description}
                </p>
              </div>
              <div className="border-t border-gray-800 pt-8">
                <h4 className="text-[#f26522] text-xs font-bold uppercase tracking-widest mb-3">{data.row1SubTagline}</h4>
                <p className="text-gray-500 font-light text-sm leading-relaxed">
                  {data.row1SubDescription}
                </p>
              </div>
            </motion.div>

            {/* Image 2 - Right (Shorter) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative overflow-hidden group"
              style={{ aspectRatio: '4/3' }}
            >
              <img
                src={data.row1Image2}
                alt="Sajan Shah with Leader"
                className="w-full h-full object-cover object-top transition-all duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </motion.div>
          </div>

          {/* Row 2: Text | Image | Text */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

            {/* Text Block - Left */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-start gap-6 py-8 px-4"
            >
              <div className="space-y-4">
                <h4 className="text-white font-bold text-lg uppercase tracking-tighter">{data.row2Text1Heading}</h4>
                <p className="text-gray-400 font-light leading-relaxed">
                  {data.row2Text1Description}
                </p>
              </div>
              <div className="w-12 h-0.5 bg-[#f26522]"></div>
              <div className="space-y-4">
                <h4 className="text-[#f26522] text-xs font-bold uppercase tracking-widest">{data.row2Text1SubTagline}</h4>
                <p className="text-gray-500 font-light text-sm leading-relaxed">
                  {data.row2Text1SubDescription}
                </p>
              </div>
            </motion.div>

            {/* Image 3 - Center (Tall) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative overflow-hidden group"
              style={{ aspectRatio: '3/4' }}
            >
              <img
                src={data.row2Image3}
                alt="Sajan Shah on Stage"
                className="w-full h-full object-cover object-center transition-all duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <p className="text-white/60 text-xs uppercase tracking-widest">{data.row2Image3Tagline}</p>
                <p className="text-white font-bold text-lg leading-tight mt-1">{data.row2Image3Heading}</p>
              </div>
            </motion.div>

            {/* Text Block - Right */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col justify-start gap-6 py-8 px-4"
            >
              <div className="space-y-4">
                <h4 className="text-white font-bold text-lg uppercase tracking-tighter">{data.row2Text2Heading}</h4>
                <p className="text-gray-400 font-light leading-relaxed">
                  {data.row2Text2Description}
                </p>
              </div>
              <div className="w-12 h-0.5 bg-[#f26522]"></div>
              <div className="space-y-4">
                <h4 className="text-[#f26522] text-xs font-bold uppercase tracking-widest">{data.row2Text2SubTagline}</h4>
                <p className="text-gray-500 font-light text-sm leading-relaxed">
                  {data.row2Text2SubDescription}
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
