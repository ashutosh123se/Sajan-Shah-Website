'use client';
import React from 'react';
import { motion } from 'framer-motion';

export const VisualGallery: React.FC = () => {
  const photos = [
    { cat: "Social Impact", title: "United First Initiative", img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop" },
    { cat: "Education", title: "Neuroscience Workshops", img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop" },
    { cat: "Field Work", title: "Sustainable Tools Drive", img: "https://images.unsplash.com/photo-1526367790999-0150786486a2?q=80&w=2071&auto=format&fit=crop" },
    { cat: "Youth Forum", title: "Motivation & Growth", img: "https://images.unsplash.com/photo-1523580494863-6f30312248f5?q=80&w=2070&auto=format&fit=crop" },
    { cat: "Eco-Drive", title: "Plantable Pencils", img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" },
    { cat: "Community", title: "Legacy of Giving", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2040&auto=format&fit=crop" },
  ];

  // Double the array for infinite loop
  const duplicatedPhotos = [...photos, ...photos, ...photos];

  return (
    <section className="py-32 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 border-b border-gray-900 pb-12">
          <div>
            <h2 className="text-[#f26522] font-bold uppercase tracking-[0.3em] text-xs mb-4">Gallery Archive</h2>
            <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tighter uppercase leading-none">VISUAL <br /> PROOF</h3>
          </div>
          <p className="text-gray-500 font-light max-w-xs text-sm leading-relaxed italic">
            Capturing the raw essence of transformation on the field.
          </p>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative flex whitespace-nowrap overflow-hidden">
        <motion.div 
          className="flex gap-6 py-4"
          animate={{
            x: [0, -1920], // Adjust based on content width
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40, // Speed of scroll
              ease: "linear",
            },
          }}
        >
          {duplicatedPhotos.map((item, idx) => (
            <div 
              key={idx}
              className="relative w-[300px] md:w-[400px] h-[500px] md:h-[650px] rounded-[2.5rem] overflow-hidden flex-shrink-0 group shadow-2xl border border-gray-900"
            >
              <img 
                src={item.img} 
                alt={item.title} 
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" 
              />
              
              {/* Overlay inspired by reference image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-10">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-black transition-all">
                    <span className="text-white group-hover:text-black text-lg">👁</span>
                  </div>
                </div>
                
                <h4 className="text-white text-3xl font-black tracking-tighter uppercase leading-tight mb-2 group-hover:text-[#f26522] transition-colors">
                  {item.title}
                </h4>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                  {item.cat}
                </p>
                
                <div className="mt-8 pt-6 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-[10px] text-white uppercase tracking-[0.3em] font-medium">
                    Documentation Archive
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Gradient overlays for smooth fading edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
      </div>

      <div className="mt-20 flex justify-center">
        <div className="flex gap-2">
          <div className="w-8 h-1 bg-[#f26522] rounded-full"></div>
          <div className="w-2 h-1 bg-gray-800 rounded-full"></div>
          <div className="w-2 h-1 bg-gray-800 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};
