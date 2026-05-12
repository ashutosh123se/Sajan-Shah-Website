'use client';
import React, { useEffect, useRef, useState } from 'react';

const CountUp: React.FC<{ end: number; prefix?: string; suffix?: string; isIndianFormat?: boolean; isVisible: boolean }> = ({ end, prefix = '', suffix = '', isIndianFormat = false, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2500;
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

  const formattedNumber = isIndianFormat
    ? count.toLocaleString('en-IN')
    : count.toLocaleString('en-US');

  return (
    <span className="font-bold tracking-tighter text-white">
      {prefix}{formattedNumber}{suffix}
    </span>
  );
};

export const ImpactStatistics: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  const stats = [
    { value: 16, suffix: "M+", label: "Lives Transformed", desc: "Across 50+ countries globally" },
    { value: 968000, suffix: "+", isIndianFormat: true, label: "Social Impact", desc: "Dedicated humanitarian initiatives" },
    { value: 193000, suffix: "+", isIndianFormat: true, label: "Knowledge Spread", desc: "Readers of 8 life-changing books" },
    { value: 6800, suffix: "+", isIndianFormat: true, label: "Global Keynotes", desc: "High-impact stage experiences" },
    { value: 5000, suffix: "+", isIndianFormat: true, label: "Institutions", desc: "Schools & corporate partners" },
    { value: 138, suffix: "+", label: "Major Drives", desc: "Leading social change movements" }
  ];

  return (
    <section className="py-32 bg-black text-white relative overflow-hidden" ref={sectionRef}>
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#f26522]/5 rounded-full filter blur-[120px] -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Header Section */}
          <div className="lg:col-span-4">
            <p className="text-[#f26522] font-bold text-xs tracking-[0.5em] uppercase mb-6">Global Footprint</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-8 leading-[1.1] tracking-tight">
              Impact That <br /><span className="font-bold">Endures.</span>
            </h2>
            <div className="w-16 h-1 bg-[#f26522] mb-10"></div>
            <p className="text-gray-400 text-lg font-light leading-relaxed mb-12">
              Beyond the numbers lies a deeper story of human potential. For over two decades,
              Sajan Shah has been a catalyst for change, bridging the gap between average
              performance and extraordinary results.
            </p>
            <button className="group flex items-center gap-4 text-[#f26522] font-bold uppercase tracking-widest text-xs">
              <span>View Impact Report</span>
              <div className="w-8 h-px bg-[#f26522] transition-all duration-300 group-hover:w-12"></div>
            </button>
          </div>

          {/* Statistics Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
            {stats.map((stat, idx) => (
              <div key={idx} className="relative">
                <div className="text-4xl md:text-5xl lg:text-6xl mb-4">
                  <CountUp
                    end={stat.value}
                    suffix={stat.suffix}
                    isIndianFormat={stat.isIndianFormat}
                    isVisible={isVisible}
                  />
                </div>
                <h3 className="text-[#f26522] font-bold text-xs uppercase tracking-[0.2em] mb-3">
                  {stat.label}
                </h3>
                <p className="text-gray-500 text-sm font-light">
                  {stat.desc}
                </p>
                {/* Subtle Divider */}
                <div className="absolute -bottom-8 left-0 w-8 h-px bg-gray-900"></div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="mt-32 pt-16 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-xl md:text-2xl font-light text-gray-300">
            Ready to join the <span className="text-white font-medium">16 Million+</span> transformation journey?
          </p>
          <p className="text-xl md:text-2xl font-light text-gray-300">
            Every number is a <span className="text-white font-medium">Story</span> of change
          </p>
          <p className="text-xl md:text-2xl font-light text-gray-300">
            Every effort is a <span className="text-white font-medium">step towards</span> a better future.
          </p>
          <button className="bg-[#f26522] hover:bg-[#d95a1e] text-white px-12 py-5 font-bold uppercase tracking-widest text-xs transition-all shadow-2xl">
            join the Community
          </button>
        </div>

      </div>
    </section>
  );
};
