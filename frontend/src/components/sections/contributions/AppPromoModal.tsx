import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, Maximize2, Minimize2 } from 'lucide-react';

interface AppPromoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppPromoModal: React.FC<AppPromoModalProps> = ({ isOpen, onClose }) => {
  const images = [
    "/APP/app3.webp",
    "/APP/app2.webp",
    "/APP/app.webp",
    "/APP/app4.webp",
    "/APP/app5.webp"
  ];

  // Horizontal gallery doesn't need auto-play state
  const [isQrExpanded, setIsQrExpanded] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Main Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#020817]/60 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
              onClick={onClose}
            >
              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-4xl max-h-[90vh] bg-[#050505]/60 backdrop-blur-3xl border border-gray-800 rounded-[30px] shadow-[0_0_80px_rgba(242,101,34,0.1)] flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header (Fixed) */}
                <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-[#050505]/20 backdrop-blur-md z-20 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f26522] to-orange-600 flex items-center justify-center">
                      <Smartphone size={20} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white uppercase tracking-wide">Sajan Shah App</h2>
                      <p className="text-xs text-[#f26522] font-bold tracking-widest uppercase">The Mind in Your Pocket</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-2 transition-all"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Scrollable Body */}
                <div className="overflow-y-auto p-6 md:p-10 relative z-10 flex flex-col gap-12 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

                  {/* 1. Description */}
                  <div className="text-gray-300 text-[15px] leading-relaxed space-y-6">
                    <p className="text-lg text-white font-medium">
                      <strong className="text-[#f26522]">Introducing the Sajan Shah app</strong> – your ultimate companion for unlocking potential and achieving success.
                    </p>
                    <p>
                      Sajan Shah is known as The Memory Man of India, Youth Peace Ambassador and is a Global Leader. He has impacted over 15 million lives in 14 years. With speaker of World Religion Parliament impact your daily routine and become the best version of your desire through this application.
                    </p>
                    <p>
                      Sajan Shah application is one stop solution and a self-help application which helps to achieve high standards of vision for which he has developed this life changing application for aspiring success seekers to gain life time transformation. Specially designed for students, parents, families and corporates, this comprehensive platform redefines self-learning, boosts productivity, and empowers goal setting with its versatile suite of tools.
                    </p>
                    <p>
                      Embark on a transformative journey with Sajan Shah's exclusive videos and courses, meticulously designed to inspire, educate, and elevate your skills across various domains. Gain insights from Sajan Shah, a renowned expert, as he imparts wisdom and strategies for personal and professional growth.
                    </p>
                    <p>
                      Maximize your efficiency and organization through the intuitive to-do planner, meticulously crafted to help you structure tasks, prioritize objectives, and track progress effortlessly. Seamlessly integrate your learning and productivity goals into a cohesive plan for continuous advancement.
                    </p>

                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl my-8">
                      <ul className="space-y-4">
                        <li className="flex gap-3"><span className="text-[#f26522]">✦</span> <div><strong className="text-white">Strategic Goal Planning:</strong> Seamlessly map out both short-term aspirations and long-term ambitions, empowering you to chart a path towards success.</div></li>
                        <li className="flex gap-3"><span className="text-[#f26522]">✦</span> <div><strong className="text-white">Life-Enhancing Courses:</strong> Access a treasure trove of courses curated to elevate and refine various facets of your life.</div></li>
                        <li className="flex gap-3"><span className="text-[#f26522]">✦</span> <div><strong className="text-white">Empathy and Global Impact:</strong> Engage in innovative UNSDG initiatives, fostering empathy and contributing to meaningful global change.</div></li>
                        <li className="flex gap-3"><span className="text-[#f26522]">✦</span> <div><strong className="text-white">Direct Access to Sajan Shah:</strong> Immerse yourself in direct interaction with renowned life-coach Sajan Shah. Through interactive features, quotes contribution, questioning module, and easy feedback.</div></li>
                        <li className="flex gap-3"><span className="text-[#f26522]">✦</span> <div><strong className="text-white">Tailored Daily Routines:</strong> Craft and optimize your daily schedule effortlessly using our intuitive to-do list.</div></li>
                        <li className="flex gap-3"><span className="text-[#f26522]">✦</span> <div><strong className="text-white">Sajan Shah's Exclusive Products:</strong> Explore an array of exceptional products and merchandise curated by Sajan Shah.</div></li>
                        <li className="flex gap-3"><span className="text-[#f26522]">✦</span> <div><strong className="text-white">Innovative Rewards System & Leaderboards:</strong> Experience a rewarding journey where users ascend the ranks and earn badges.</div></li>
                      </ul>
                    </div>

                    <p>
                      Whether it's mastering new skills, enhancing productivity, or setting and achieving ambitious goals, the Sajan Shah app offers a dynamic and adaptable platform to facilitate your growth journey. Empower yourself with the knowledge, tools, and guidance necessary to thrive in today's competitive landscape.
                    </p>
                    <p className="text-white text-lg border-l-4 border-[#f26522] pl-4 italic">
                      Unlock your potential, boost productivity, and realize your aspirations with the Sajan Shah app – where learning meets empowerment, and success becomes a reality.
                    </p>
                  </div>

                  {/* 2. Middle: App Images Gallery */}
                  <div className="w-full relative">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 text-center">App Preview</h3>
                    <div className="w-full flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                      {images.map((src, idx) => (
                        <div key={idx} className="shrink-0 snap-center w-[60%] sm:w-[40%] md:w-[30%] lg:w-[25%] aspect-[9/16] bg-black/40 border border-white/10 rounded-2xl overflow-hidden relative group">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none" />
                          <img
                            src={src}
                            alt={`App Screenshot ${idx + 1}`}
                            className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500 relative z-20"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. End: Video */}
                  <div className="w-full relative">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 text-center">Promo Video</h3>
                    <div className="relative w-full aspect-video bg-black/40 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                      <iframe
                        src="https://drive.google.com/file/d/1gpc5iO--EIejYrYK3jo06hIjZySa1eTW/preview"
                        title="Sajan Shah App Promo"
                        className="w-full h-full border-0"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>

                  {/* 4. QR Code */}
                  <div className="w-full flex flex-col items-center pt-8 border-t border-white/10 pb-8">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Scan to Install</h3>
                    <div
                      className="relative group cursor-pointer bg-white p-3 rounded-2xl hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(242,101,34,0.15)]"
                      onClick={() => setIsQrExpanded(true)}
                    >
                      <div className="absolute inset-0 bg-[#f26522]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                      <img src="/app QR.jpeg" alt="App QR Code" className="w-40 h-40 object-cover rounded-xl relative z-10" />
                      <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 backdrop-blur-sm rounded-xl transition-all">
                        <div className="flex items-center gap-2 text-white font-bold text-xs uppercase bg-[#f26522] px-3 py-1.5 rounded-lg">
                          <Maximize2 size={14} /> Enlarge
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* QR Code Expanded Lightbox */}
      <AnimatePresence>
        {isQrExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setIsQrExpanded(false)}
          >
            <div className="absolute top-8 right-8 text-white/50 hover:text-white">
              <Minimize2 size={32} />
            </div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white p-6 rounded-3xl shadow-[0_0_100px_rgba(242,101,34,0.3)] max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img src="/app QR.jpeg" alt="Enlarged QR Code" className="w-full h-auto rounded-2xl" />
              <p className="text-center text-black font-bold uppercase tracking-widest mt-6 text-sm">Scan to Install App</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
