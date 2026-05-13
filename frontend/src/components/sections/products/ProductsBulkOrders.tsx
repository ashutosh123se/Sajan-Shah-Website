'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const ProductsBulkOrders: React.FC = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-4xl perspective-1000">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full"
            >
              <a
                href="https://forms.gle/your-google-form-link"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative group transition-all duration-500 [transform-style:preserve-3d] hover:[transform:translateY(-5px)]"
              >
                {/* Background Shadow/Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#f26522] to-blue-600 rounded-[40px] blur opacity-10 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
 
                {/* Unified Content Card */}
                <div className="relative bg-gray-50 border border-gray-100 rounded-[40px] p-10 md:p-16 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 group-hover:border-[#f26522]/30 transition-colors">
                  
                  {/* Background Image - More visible */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src="/bulk order.png" 
                      alt="Bulk Orders Background" 
                      className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-gray-50/70 to-transparent"></div>
                  </div>
 
                  {/* Text Content */}
                  <div className="flex-1 text-left relative z-10">
                    <div className="inline-block px-4 py-1 bg-black text-white text-[10px] font-black tracking-widest uppercase rounded-full mb-6">
                      Institutional Support
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight uppercase group-hover:text-[#f26522] transition-colors">
                      Bulk Orders
                    </h2>
                    <div className="space-y-4 max-w-2xl">
                      <p className="text-gray-900 font-bold text-2xl leading-tight">
                        For schools, colleges, organizations, and large events
                      </p>
                      <p className="text-gray-500 text-lg leading-relaxed">
                        Get special pricing and structured delivery support tailored to your unique impact goals. Click here to fill the inquiry form.
                      </p>
                    </div>
                  </div>
 
                  {/* Icon/CTA Signal */}
                  <div className="flex flex-col items-center gap-4 relative z-10">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <svg className="w-10 h-10 text-[#f26522]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-black tracking-[0.3em] text-gray-400 uppercase">Open Form</span>
                  </div>
 
                  {/* Decorative Subtle Blobs */}
                  <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[120%] bg-[#f26522]/5 rounded-full blur-[100px] -z-10 group-hover:bg-[#f26522]/10 transition-colors"></div>
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
