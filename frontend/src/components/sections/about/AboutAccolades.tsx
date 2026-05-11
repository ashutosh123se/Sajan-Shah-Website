'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const AboutAccolades: React.FC = () => {
  const accolades = [
    "India's Youngest Motivational Speaker with global impact",
    "Known as the Memory Man of India for brain mastery",
    "Speaker at the World Parliament of Religions",
    "3-Time TEDx Speaker delivering high-impact ideas",
    "Suryadatta National Awardee for Best Motivational Speaker",
    "Honored with 30 Under 30 Nationwide Award by BusinessMint",
    "Author of 8 Transformational Books",
    "Impacted over 16+ Million Lives globally",
    "Founder of United First Initiative (UN SDG 2030)",
    "Founder of Live to Inspire Charitable Trust",
    "Delivered sessions across 5000+ educational institutions",
    "Conducted 6800+ high-impact transformational sessions"
  ];

  return (
    <section className="py-20 bg-[#111111] text-white px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* Left Side: Heading + Trophy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-5/12 flex flex-col items-start gap-8"
          >
            <h2 className="text-3xl md:text-4xl font-light italic leading-tight text-white">
              A few noteworthy<br />
              <span className="font-semibold">accolades include:</span>
            </h2>

            {/* Trophy Award Image */}
            <div className="flex items-start justify-start w-full">
              <img
                src="/image.png"
                alt="Award Trophy"
                className="w-48 md:w-64 object-contain"
              />
            </div>
          </motion.div>

          {/* Right Side: Checklist */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-7/12"
          >
            <div className="space-y-5">
              {accolades.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06 }}
                  className="flex items-start gap-4 group"
                >
                  {/* Orange checkmark */}
                  <span className="text-[#f26522] text-xl font-bold mt-0.5 shrink-0">✓</span>
                  <p className="text-gray-300 text-base font-light leading-relaxed group-hover:text-white transition-colors duration-300">
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
