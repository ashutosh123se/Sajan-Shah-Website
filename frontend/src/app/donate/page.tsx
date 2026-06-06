'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Briefcase, Leaf, ShieldCheck, Lock, Play } from 'lucide-react';

export default function DonatePage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  const [isVideoActive, setIsVideoActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoClick = () => {
    if (!isVideoActive && videoRef.current) {
      setIsVideoActive(true);
      const video = videoRef.current;
      video.currentTime = 0;
      video.muted = false;
      video.loop = false;
      video.play().catch(() => { });
    }
  };

  return (
    <div className="bg-[#faf9f6] min-h-screen font-sans selection:bg-[#1b4b36] selection:text-white">

      {/* 1. Hero Section - Added mt-[240px] to ensure it clears the tall navigation bar safely */}
      <section className="relative w-full min-h-[85vh] flex items-center pt-[240px] pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 w-full flex flex-col-reverse lg:flex-row items-center gap-16 z-10 relative">

          {/* Left Text Content */}
          <div className="w-full lg:w-3/5">
            <motion.div {...fadeIn}>

              <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] mb-8 tracking-tight">
                9+ Million Lives <span className="text-[#f2b022]">United by Compassion and Action</span> Across India
              </h1>

              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-12 max-w-2xl font-light">
                United First in association with Live to Inspire Charitable Trust, delivers people-first, SDG-aligned social impact across 15 States, 2 UTs, and 230+ cities, working as a trusted CSR & ESG partner to 167+ companies alongside 280+ collaborators, as an 80G certified NGO driving measurable, lasting change.
              </p>

              <div className="flex flex-wrap gap-12 md:gap-24 pt-8 border-t border-gray-200/60">
                <div>
                  <div className="text-4xl md:text-5xl font-black text-[#1b4b36] mb-2 tracking-tight">9M+</div>
                  <div className="text-xs md:text-sm text-gray-500 uppercase tracking-[0.2em] font-semibold">Lives Impacted</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-[#1b4b36] mb-2 tracking-tight">230+</div>
                  <div className="text-xs md:text-sm text-gray-500 uppercase tracking-[0.2em] font-semibold">Cities Reached</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-[#1b4b36] mb-2 tracking-tight">15</div>
                  <div className="text-xs md:text-sm text-gray-500 uppercase tracking-[0.2em] font-semibold">States</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Image Content - Large, directly on background, no box */}
          <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative w-full max-w-lg flex items-center justify-center"
            >
              <img
                src="/live to bg.jpeg"
                alt="Live To Inspire Logo"
                className="w-full h-auto object-contain mix-blend-multiply scale-110"
              />
            </motion.div>
          </div>

        </div>
      </section>

      {/* 2. The Power of Youth */}
      <section className="py-32 max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <motion.div {...fadeIn} className="w-full lg:w-1/2">
            <div className="inline-block px-4 py-1.5 border border-[#f2b022]/30 text-[#f2b022] rounded-full text-xs font-bold tracking-widest uppercase mb-6 bg-[#f2b022]/5">
              Our Story
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 tracking-tight">
              The Power of <br /><span className="text-[#1b4b36]">Youth</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-600 font-light leading-relaxed">
              <p>
                Live to Inspire Charitable Trust was founded in 2019 with a clear and heartfelt purpose: to create meaningful change by advancing the 17 United Nations Sustainable Development Goals (UN SDGs) 2030, with India as the starting point.
              </p>
              <p>
                To scale this vision, we established United First, a global social consortium created to unite the world on one common platform for change. United First serves as a bridge connecting organisations, teams, and individuals working relentlessly across diverse causes.
              </p>
              <p>
                At the heart of this movement lies our belief in the power of youth. With over 40% of India's population being young, we see the youth not as future leaders, but as present-day catalysts of change.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="grid grid-cols-2 gap-4 h-[600px]">
              <div className="col-span-2 row-span-1 rounded-[30px] overflow-hidden shadow-lg group">
                <img src="/live 1.jpg" alt="Youth engaging" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="col-span-1 rounded-[30px] overflow-hidden shadow-lg group">
                <img src="/live 2.jpg" alt="Volunteers organizing" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="col-span-1 rounded-[30px] overflow-hidden shadow-lg group">
                <img src="/live 3.jpg" alt="Community help" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Rooted in Community */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row-reverse gap-20 items-center">
          <motion.div {...fadeIn} className="w-full lg:w-1/2">
            <div className="inline-block px-4 py-1.5 border border-[#1b4b36]/30 text-[#1b4b36] rounded-full text-xs font-bold tracking-widest uppercase mb-6 bg-[#1b4b36]/5">
              On-Ground Impact
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 tracking-tight">
              Rooted in <br /><span className="text-[#f2b022]">Community</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-600 font-light leading-relaxed">
              <p>
                Real impact happens where people live, learn, and grow. Our programs reach into the heart of communities working alongside local leaders, educators, and families to create change that is felt, not just measured.
              </p>
              <p>
                From classrooms in rural villages to urban neighborhoods, we believe transformation begins with trust, dignity, and a shared commitment to building better futures together.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="rounded-[40px] overflow-hidden shadow-2xl h-[600px] relative group">
              <div className="absolute inset-0 bg-[#1b4b36]/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <img src="/Social Work/13.jpeg" alt="Community groundwork" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. Video Section */}
      <section className="py-32 bg-[#112a1e] text-white relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#1b4b36] rounded-full blur-[120px] opacity-30 -translate-y-1/2 translate-x-1/3"></div>

        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <motion.div {...fadeIn}>
            <div className="inline-block px-4 py-1.5 border border-[#f2b022]/30 text-[#f2b022] rounded-full text-xs font-bold tracking-widest uppercase mb-6 bg-[#f2b022]/10">
              Watch Our Journey
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-16 tracking-tight">
              See The <span className="text-[#f2b022]">Impact</span>
            </h2>
            <div
              className="relative w-full aspect-video bg-black border border-white/10 rounded-[40px] overflow-hidden shadow-2xl ring-4 ring-[#1b4b36]/30 cursor-pointer"
              onClick={handleVideoClick}
            >
              <video
                ref={videoRef}
                src="/impact-video.mp4"
                autoPlay
                muted
                loop
                playsInline
                controls={isVideoActive}
                className={`w-full h-full object-cover transition-all duration-700 ${!isVideoActive ? 'grayscale' : 'grayscale-0'
                  }`}
              />
              {!isVideoActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/15 transition-colors duration-500">
                  <div className="w-24 h-24 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/25 shadow-2xl hover:scale-110 transition-transform duration-300">
                    <Play className="text-white ml-1" size={40} fill="white" />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. Numbers That Inspire */}
      <section className="py-32 max-w-7xl mx-auto px-4 text-center">
        <motion.div {...fadeIn} className="mb-20">
          <div className="inline-block px-4 py-1.5 border border-[#1b4b36]/30 text-[#1b4b36] rounded-full text-xs font-bold tracking-widest uppercase mb-6 bg-[#1b4b36]/5">
            Our Impact
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 tracking-tight">
            Numbers That <span className="text-[#1b4b36]">Inspire</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Every number reflects a life impacted, a community strengthened, and progress toward a more humane and sustainable future driven by United First in association with Live to Inspire Charitable Trust.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { number: "9M+", title: "Lives Impacted", desc: "Students, parents, teachers, and communities empowered through education, awareness, and action." },
            { number: "230+", title: "Cities Reached", desc: "Pan-India presence delivering people-first social impact at scale." },
            { number: "168+", title: "CSR Partners", desc: "Companies collaborating with us to drive meaningful, compliant, and measurable change." },
            { number: "73+", title: "ESG Collaborations", desc: "Organizations supported in building ethical, sustainable, and SDG-aligned ESG initiatives." }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-[32px] p-10 shadow-xl shadow-[#1b4b36]/5 hover:-translate-y-2 transition-transform duration-300 border border-gray-100/50"
            >
              <div className="text-6xl font-black text-[#f2b022] mb-6 tracking-tighter">{stat.number}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{stat.title}</h3>
              <p className="text-base text-gray-500 leading-relaxed font-light">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. Our Pillars */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-20">
          <motion.div {...fadeIn} className="w-full lg:w-5/12 lg:sticky lg:top-40 self-start">
            <div className="inline-block px-4 py-1.5 border border-[#f2b022]/30 text-[#f2b022] rounded-full text-xs font-bold tracking-widest uppercase mb-6 bg-[#f2b022]/5">
              Our Mission
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-[1.1] tracking-tight">
              Where Humanity Meets <br /><span className="text-[#f2b022]">Meaningful Action</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-600 font-light leading-relaxed">
              <p>
                At Live to Inspire Charitable Trust, founded by Sajan Shah, Jayesh Shah, and Vinit Shah, we believe real change begins when people are seen, heard, and empowered.
              </p>
              <p>
                Our mission is to unlock human potential through learning, emotional strength, dignity, and opportunity, so communities can shape their own sustainable futures.
              </p>
              <p>
                Through United First, we are uniting the world on one stage, creating a common platform for collective change.
              </p>
            </div>
          </motion.div>

          <div className="w-full lg:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <BookOpen className="text-[#1b4b36]" size={28} strokeWidth={1.5} />,
                title: "Season of Learning",
                desc: "Empowering 8+ million students, teachers, and parents through education, values, and emotional strength to build confident, future-ready generations."
              },
              {
                icon: <Briefcase className="text-[#1b4b36]" size={28} strokeWidth={1.5} />,
                title: "CSR-Driven Impact",
                desc: "Partnering with 168+ companies to transform corporate responsibility into meaningful, on-ground change that communities truly experience."
              },
              {
                icon: <Users className="text-[#1b4b36]" size={28} strokeWidth={1.5} />,
                title: "Social Internship for SDGs",
                desc: "Over 2,300+ students participate annually in an online internship program designed to build real-world skills while driving measurable global impact aligned with the Sustainable Development Goals (SDGs)."
              },
              {
                icon: <Leaf className="text-[#1b4b36]" size={28} strokeWidth={1.5} />,
                title: "ESG for Tomorrow",
                desc: "Supporting 73+ companies in building ethical, sustainable, and measurable ESG initiatives aligned with the UN SDGs 2030."
              }
            ].map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#faf9f6] rounded-[32px] p-10 hover:-translate-y-2 transition-transform duration-300 shadow-xl shadow-[#1b4b36]/5 border border-white"
              >
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 border border-gray-100">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{pillar.title}</h3>
                <p className="text-base text-gray-600 leading-relaxed font-light">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Donate Section (Razorpay style) */}
      <section className="py-32 bg-[#faf9f6] border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div {...fadeIn} className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 border border-[#1b4b36]/30 text-[#1b4b36] rounded-full text-xs font-bold tracking-widest uppercase mb-6 bg-[#1b4b36]/5">
              Support The Cause
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
              Make a <span className="text-[#f2b022]">Difference</span> Today
            </h2>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
              Your contribution directly funds education, health, and sustainable development initiatives. All donations are eligible for an 80G tax exemption receipt.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[40px] p-8 md:p-16 shadow-2xl shadow-[#1b4b36]/10 border border-gray-100 max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Select Amount</h3>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {['₹ 500', '₹ 1,000', '₹ 2,000', '₹ 5,000'].map((amt, i) => (
                    <button key={i} className={`py-5 rounded-2xl font-bold border transition-all text-lg ${i === 1 ? 'bg-[#1b4b36] text-white border-[#1b4b36] shadow-xl shadow-[#1b4b36]/20' : 'bg-[#faf9f6] text-gray-900 border-transparent hover:border-[#f2b022] hover:bg-white'}`}>
                      {amt}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xl">₹</span>
                  <input type="number" placeholder="Custom Amount" className="w-full bg-[#faf9f6] border border-transparent text-gray-900 rounded-2xl pl-12 pr-6 py-5 outline-none focus:bg-white focus:border-[#f2b022] focus:ring-4 focus:ring-[#f2b022]/10 transition-all font-medium text-lg placeholder-gray-400" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Your Details</h3>
                <form className="space-y-5">
                  <input type="text" placeholder="Full Name" required className="w-full bg-[#faf9f6] border border-transparent text-gray-900 rounded-2xl px-6 py-5 outline-none focus:bg-white focus:border-[#f2b022] focus:ring-4 focus:ring-[#f2b022]/10 transition-all font-medium text-lg placeholder-gray-400" />
                  <input type="email" placeholder="Email Address" required className="w-full bg-[#faf9f6] border border-transparent text-gray-900 rounded-2xl px-6 py-5 outline-none focus:bg-white focus:border-[#f2b022] focus:ring-4 focus:ring-[#f2b022]/10 transition-all font-medium text-lg placeholder-gray-400" />
                  <input type="text" placeholder="PAN Number (for 80G receipt)" required className="w-full bg-[#faf9f6] border border-transparent text-gray-900 rounded-2xl px-6 py-5 outline-none focus:bg-white focus:border-[#f2b022] focus:ring-4 focus:ring-[#f2b022]/10 transition-all uppercase font-medium text-lg placeholder-gray-400" />

                  {/* Razorpay checkout button */}
                  <button type="button" className="w-full bg-[#f2b022] hover:bg-[#e0a01a] text-gray-900 font-black text-lg py-5 rounded-2xl transition-all shadow-xl shadow-[#f2b022]/30 mt-6 flex items-center justify-center gap-3">
                    <Lock size={20} strokeWidth={2.5} /> Pay Securely via Razorpay
                  </button>
                </form>
                <div className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-500 font-semibold uppercase tracking-wider">
                  <span className="flex items-center gap-2"><Lock size={16} className="text-[#1b4b36]" /> SSL Secure</span>
                  <span className="flex items-center gap-2"><ShieldCheck size={18} className="text-[#1b4b36]" /> 80G Certified</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
