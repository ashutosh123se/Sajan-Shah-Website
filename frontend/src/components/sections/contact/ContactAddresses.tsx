'use client';

import React from 'react';
import { MapPin, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export const ContactAddresses: React.FC = () => {
  const handleMapClick = (query: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, '_blank');
  };

  return (
    <section className="py-24 bg-[#fafafa] text-gray-900 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-light tracking-tight">Global <span className="font-bold">Presence</span></h2>
        </div>

        {/* Custom Grid Layout: 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:grid-rows-2">
          
          {/* Column 1: Head Office (Spans 2 rows) */}
          <motion.div
            whileHover={{ y: -5 }}
            onClick={() => handleMapClick('Sajan Shah Foundation Ahmedabad')}
            className="md:row-span-2 p-10 bg-white border border-[#f26522] shadow-sm flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center gap-3 mb-8 text-[#f26522]">
                <MapPin className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Head Office</span>
              </div>
              <h4 className="text-2xl font-bold mb-6">Sajan Shah Foundation</h4>
              <p className="text-gray-500 text-sm font-light leading-relaxed mb-8">
                8, Deepawali Centre, Opp. Old High Court, Income Tax Under Bridge, Ashram Road, Ahmedabad - 380014, Gujarat, India
              </p>
            </div>
            <div className="text-[#f26522] text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
              View on Maps <span className="text-lg">→</span>
            </div>
          </motion.div>

          {/* Column 2 - Top: Mumbai */}
          <motion.div
            whileHover={{ y: -5 }}
            onClick={() => handleMapClick('Mittal Towers Nariman Point Mumbai')}
            className="p-8 bg-white border border-gray-100 shadow-sm flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center gap-3 mb-6 text-[#f26522]">
                <Globe className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Mumbai</span>
              </div>
              <h4 className="text-xl font-bold mb-4">Live to Inspire</h4>
              <p className="text-gray-500 text-sm font-light leading-relaxed mb-6">
                88, 8th Floor, B Wing, Mittal Towers, Nariman Point, Mumbai - 400021
              </p>
            </div>
            <div className="text-[#f26522] text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
              View on Maps <span className="text-lg">→</span>
            </div>
          </motion.div>

          {/* Column 3 - Top: Delhi */}
          <motion.div
            whileHover={{ y: -5 }}
            onClick={() => handleMapClick('Ahimsa Vishwa Bharti Old Rajinder Nagar')}
            className="p-8 bg-white border border-gray-100 shadow-sm flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center gap-3 mb-6 text-[#f26522]">
                <Globe className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Delhi</span>
              </div>
              <h4 className="text-xl font-bold mb-4">Ahimsa Vishwa Bharti</h4>
              <p className="text-gray-500 text-sm font-light leading-relaxed mb-6">
                63/1, Old Rajinder Nagar, Near Karol Bagh Metro Station, New Delhi - 110060
              </p>
            </div>
            <div className="text-[#f26522] text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
              View on Maps <span className="text-lg">→</span>
            </div>
          </motion.div>

          {/* Column 2 - Bottom: New York */}
          <motion.div
            whileHover={{ y: -5 }}
            onClick={() => handleMapClick('218 Webster Avenue Brooklyn New York')}
            className="p-8 bg-white border border-gray-100 shadow-sm flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center gap-3 mb-6 text-[#f26522]">
                <Globe className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">New York</span>
              </div>
              <h4 className="text-xl font-bold mb-4">USA Office</h4>
              <p className="text-gray-500 text-sm font-light leading-relaxed mb-6">
                218 Webster Avenue, Brooklyn, New York - 11230, USA
              </p>
            </div>
            <div className="text-[#f26522] text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
              View on Maps <span className="text-lg">→</span>
            </div>
          </motion.div>

          {/* Column 3 - Bottom: Australia */}
          <motion.div
            whileHover={{ y: -5 }}
            onClick={() => handleMapClick('1A Launder Street Hawthorn Melbourne')}
            className="p-8 bg-white border border-gray-100 shadow-sm flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center gap-3 mb-6 text-[#f26522]">
                <Globe className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Australia</span>
              </div>
              <h4 className="text-xl font-bold mb-4">Melbourne Office</h4>
              <p className="text-gray-500 text-sm font-light leading-relaxed mb-6">
                1A Launder Street, Hawthorn, Melbourne, Victoria - 3122, Australia
              </p>
            </div>
            <div className="text-[#f26522] text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
              View on Maps <span className="text-lg">→</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
