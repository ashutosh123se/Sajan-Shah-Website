'use client';
import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Users, 
  PenTool, 
  Glasses, 
  GraduationCap, 
  MapPin,
  Clock,
  ArrowUpRight
} from 'lucide-react';

const CountUp = ({ value }: { value: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const target = parseInt(value.replace(/\D/g, ''));
  
  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = target;
      const duration = 2000;
      
      const timer = setInterval(() => {
        start += Math.ceil(end / 100);
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 20);
      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return <span ref={ref}>{count}{value.includes('K') ? 'K' : ''}{value.includes('+') ? '+' : ''}</span>;
};

export const ImpactDashboard: React.FC = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
  }, []);

  const stats = [
    { label: "Students Supported", value: "200K+", icon: <Users size={24} />, trend: "+12% this year" },
    { label: "Pencils Distributed", value: "500K+", icon: <PenTool size={24} />, trend: "Goal: 1M" },
    { label: "UV Glasses Delivered", value: "50K+", icon: <Glasses size={24} />, trend: "Active drive" },
    { label: "Teachers Trained", value: "10K+", icon: <GraduationCap size={24} />, trend: "Nationwide" },
    { label: "Regions Impacted", value: "15+", icon: <MapPin size={24} />, trend: "3 Countries" },
  ];

  return (
    <section className="py-32 bg-[#050505] overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f26522]/5 blur-[150px] rounded-full -mr-64 -mt-64"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-24">
          
          <div className="lg:w-2/3">
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-[1px] bg-[#f26522]"></div>
                <h2 className="text-[#f26522] font-bold uppercase tracking-[0.4em] text-xs">Live Analytics</h2>
              </div>
              <h3 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter leading-none mb-6">
                MEASURABLE <br /> <span className="text-gray-700">CONTRIBUTIONS.</span>
              </h3>
              <div className="flex items-center gap-2 text-gray-500 text-xs font-medium uppercase tracking-widest">
                <Clock size={12} className="text-green-500 animate-pulse" />
                Data updated: {currentDate}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats.map((stat, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5, borderColor: '#f2652233' }}
                  className="p-8 bg-black/40 border border-gray-900 rounded-[2rem] backdrop-blur-xl group cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-8">
                    <div className="p-3 bg-gray-900/50 rounded-2xl text-[#f26522] group-hover:bg-[#f26522] group-hover:text-white transition-all duration-500">
                      {stat.icon}
                    </div>
                    <ArrowUpRight size={16} className="text-gray-800 group-hover:text-[#f26522] transition-colors" />
                  </div>
                  
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tighter">
                    <CountUp value={stat.value} />
                  </div>
                  <div className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-4">{stat.label}</div>
                  <div className="text-[10px] text-gray-600 font-medium uppercase tracking-widest border-t border-gray-900 pt-4 group-hover:text-gray-400 transition-colors">
                    {stat.trend}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="sticky top-32">
              <h3 className="text-xl font-bold text-white mb-12 border-b border-gray-900 pb-6 uppercase tracking-widest flex items-center justify-between">
                Legacy Timeline
                <span className="text-[10px] text-gray-500 font-normal tracking-normal italic">Scroll to explore</span>
              </h3>
              
              <div className="space-y-12 relative">
                <div className="absolute left-[11px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-[#f26522] via-gray-900 to-transparent"></div>
                {[
                  { year: "2016", title: "Foundation", event: "Launch of United First Initiative with a vision for UN SDGs." },
                  { year: "2018", title: "Milestone", event: "Successfully impacted 100,000+ students across various regions." },
                  { year: "2020", title: "Crisis Response", event: "Nationwide mask and essential drive during the pandemic." },
                  { year: "2022", title: "Global Reach", event: "Expansion into international youth leadership programs." },
                  { year: "2024", title: "Future Ready", event: "Integration of Neuroscience tools in digital learning apps." },
                ].map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="pl-12 relative group"
                  >
                    <div className="absolute left-0 top-1.5 w-[23px] h-[23px] rounded-full bg-black border-2 border-gray-800 group-hover:border-[#f26522] transition-colors flex items-center justify-center z-10">
                      <div className="w-2 h-2 rounded-full bg-gray-800 group-hover:bg-[#f26522] transition-all scale-50 group-hover:scale-100"></div>
                    </div>
                    <div className="text-[#f26522] font-black text-sm mb-1 uppercase tracking-widest">{item.year}</div>
                    <div className="text-white font-bold text-xs uppercase mb-2 tracking-wider group-hover:text-[#f26522] transition-colors">{item.title}</div>
                    <div className="text-gray-500 font-light text-sm leading-relaxed group-hover:text-gray-300 transition-colors">{item.event}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
