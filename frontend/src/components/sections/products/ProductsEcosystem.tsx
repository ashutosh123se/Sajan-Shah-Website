'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const ProductsEcosystem: React.FC = () => {
  return (
    <section className="relative z-0 py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left Side Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <div className="w-16 h-1 bg-[#f26522] mb-8"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
              As a growing transformation ecosystem, the best way to access Sajan Shah’s products is through trusted platforms like Flipkart, Amazon, and official programs.
            </h2>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                Whether you’re an individual looking to grow, or an organization planning large-scale impact, 
                these products are designed for real execution, not passive consumption.
              </p>
              <p>
                If you’re looking for bulk orders, institutional programs, or customized solutions, 
                we offer tailored packages based on your requirements.
              </p>
              <div className="pt-6">
                <p className="font-bold text-gray-900 mb-2">For bulk inquiries or partnerships:</p>
                <a href="mailto:support.ind@sajanshah.com" className="text-[#f26522] font-black text-xl hover:underline underline-offset-4">
                   support.ind@sajanshah.com
                </a>
              </div>
            </div>
          </motion.div>
 
          {/* Right Side Content - Visual/Featured Stat */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative z-10 bg-gray-50 p-12 md:p-16 rounded-[40px] border border-gray-100 shadow-[40px_40px_80px_rgba(0,0,0,0.05)]">
              <div className="text-6xl md:text-8xl font-black text-gray-900/5 absolute top-4 left-8 pointer-events-none select-none">
                IMPACT
              </div>
              <h3 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-none">
                10,00,000+
              </h3>
              <p className="text-2xl md:text-3xl font-light text-gray-500 leading-tight">
                transformations delivered across books, courses, and learning systems
              </p>
              
              <div className="mt-12 flex gap-4">
                <div className="w-3 h-3 rounded-full bg-[#f26522]"></div>
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
              </div>
            </div>
            
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#f26522]/5 rounded-full blur-3xl -z-10"></div>
          </motion.div>
 
        </div>
      </div>
    </section>
  );
};
