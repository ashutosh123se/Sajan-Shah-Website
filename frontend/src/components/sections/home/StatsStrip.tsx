'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

export const StatsStrip: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const stats: Stat[] = [
    { value: '200000', label: 'Students Impacted', suffix: '+' },
    { value: '500', label: 'Events Conducted', suffix: '+' },
    { value: '10', label: 'Years of Experience', suffix: '+' },
    { value: '30', label: 'Countries Reached', suffix: '+' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const CountUp: React.FC<{ end: number; suffix?: string }> = ({ end, suffix = '' }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      const duration = 2000; // 2 seconds
      const increment = end / (duration / 16); // 60 fps
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

    return (
      <span className="text-3xl md:text-4xl font-bold text-blue-600">
        {count.toLocaleString()}{suffix}
      </span>
    );
  };

  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16" ref={statsRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="text-white">
              <div className="mb-2">
                <CountUp 
                  end={parseInt(stat.value)} 
                  suffix={stat.suffix} 
                />
              </div>
              <div className="text-lg md:text-xl font-medium text-blue-100">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        
        {/* Impact Statement */}
        <div className="mt-12 text-center">
          <p className="text-xl md:text-2xl font-semibold text-white max-w-3xl mx-auto">
            Transforming Education Through Science and Innovation
          </p>
        </div>
      </div>
    </section>
  );
};
