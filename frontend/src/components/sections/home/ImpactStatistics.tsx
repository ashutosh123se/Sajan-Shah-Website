'use client';
import React, { useEffect, useRef, useState } from 'react';

// CountUp Component specifically built for ImpactStatistics
const CountUp: React.FC<{ end: number; prefix?: string; suffix?: string; isIndianFormat?: boolean; isVisible: boolean }> = ({ end, prefix = '', suffix = '', isIndianFormat = false, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2500; // 2.5 seconds
    const increment = end / (duration / 16); 
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, end]);

  // Format the number
  const formattedNumber = isIndianFormat 
    ? count.toLocaleString('en-IN') 
    : count.toLocaleString('en-US');

  return (
    <span className="font-black tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
      {prefix}{formattedNumber}{suffix}
    </span>
  );
};

export const ImpactStatistics: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const stats = [
    { value: 16, suffix: "M+", isIndianFormat: false, label: "Lives Impacted" },
    { value: 968000, suffix: "+", isIndianFormat: true, label: "Lives Impacted Through Social Work" },
    { value: 193000, suffix: "+", isIndianFormat: true, label: "Books Read" },
    { value: 6800, suffix: "+", isIndianFormat: true, label: "Sessions Delivered" },
    { value: 5000, suffix: "+", isIndianFormat: true, label: "Schools & Institutions" },
    { value: 138, suffix: "+", isIndianFormat: false, label: "Social Drives Led" }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#0a0a0a] text-white relative overflow-hidden" ref={sectionRef}>
      
      {/* Immersive Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#f26522]/20 via-[#0a0a0a] to-[#0a0a0a]"></div>
      
      {/* Subtle Grid Lines (as requested by the user) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-light mb-4 tracking-wide text-white">Impact That <span className="font-bold text-[#f26522]">Speaks</span></h2>
          <div className="w-16 h-1 bg-[#f26522] mx-auto mb-6"></div>
          <p className="text-xl text-gray-400 font-light tracking-wide uppercase text-sm">Not just numbers. Real lives. Real transformation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mb-20">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="group relative bg-[#111]/80 backdrop-blur-xl p-10 rounded-none border border-gray-800/50 hover:border-[#f26522]/50 transition-all duration-500 overflow-hidden"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#f26522]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 text-center">
                <div className="text-5xl md:text-6xl mb-4 text-white">
                  <CountUp 
                    end={stat.value} 
                    suffix={stat.suffix} 
                    isIndianFormat={stat.isIndianFormat} 
                    isVisible={isVisible} 
                  />
                </div>
                <div className="text-sm md:text-base text-[#f26522] font-bold uppercase tracking-widest leading-relaxed">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center border-t border-gray-800 pt-16 max-w-3xl mx-auto">
          <p className="text-3xl font-light mb-4 text-white">Every number is a story of change.</p>
          <p className="text-lg text-gray-500 mb-10 font-light">Every effort is a step towards a better future.</p>
          <button className="bg-[#f26522] text-white hover:bg-[#d95a1e] px-10 py-5 font-bold uppercase tracking-widest text-sm shadow-[0_10px_30px_rgba(242,101,34,0.3)] transition-all duration-300 hover:-translate-y-1">
            Be a Part of the Impact
          </button>
        </div>
      </div>
    </section>
  );
};
