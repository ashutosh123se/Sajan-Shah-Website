import React from 'react';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

interface EventsHeroProps {
  content?: {
    heading?: string;
    subHeading?: string;
    paragraph?: string;
    buttonText?: string;
  };
}

export default function EventsHero({ content }: EventsHeroProps) {
  const heading = content?.heading || "Sajan Shah";
  const subHeading = content?.subHeading || "events calendar";
  const paragraph = content?.paragraph || "Create your own success story through the massive impact of a Sajan Shah event.";
  const buttonText = content?.buttonText || "View all events";

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-24 px-4 md:px-8 overflow-hidden">
      {/* Animated Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            repeatType: "mirror", 
            ease: "easeInOut" 
          }}
          className="w-full h-full"
        >
          <img 
            src="/EVENT.png" 
            alt="Event Background" 
            className="w-full h-full object-cover object-center opacity-60"
          />
        </motion.div>
        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto border-b border-white/10 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h1 className="text-5xl md:text-7xl font-black tracking-normal leading-[1.1] mb-8 text-white">
              {heading} <br />
              <span className="text-[#f26522]">{subHeading}</span>
            </h1>
          </div>
          <div className="max-w-xs">
            <p className="text-gray-300 mb-6 font-light">{paragraph}</p>
            <Button 
              onClick={() => {
                document.getElementById('events-calendar-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="rounded-full bg-white text-black hover:bg-[#f26522] hover:text-white font-bold px-8 transition-all duration-300"
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
