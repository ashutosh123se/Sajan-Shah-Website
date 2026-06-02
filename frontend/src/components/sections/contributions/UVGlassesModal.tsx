import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Glasses, Eye, Heart, Shield, Globe, Building, Video, Wind, Activity } from 'lucide-react';
import Link from 'next/link';

interface UVGlassesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UVGlassesModal: React.FC<UVGlassesModalProps> = ({ isOpen, onClose }) => {
  return (
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
              className="relative w-full max-w-5xl max-h-[90vh] bg-[#000000] backdrop-blur-3xl border border-[#1f2937] rounded-[30px] shadow-[0_0_80px_rgba(242,101,34,0.3)] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header (Fixed) */}
              <div className="flex items-center justify-between p-6 border-b border-[#1f2937] bg-[#050505] z-20 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f26522] to-orange-700 flex items-center justify-center">
                    <Glasses size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white uppercase tracking-wide">UV Glasses & Mask Drive</h2>
                    <p className="text-xs text-[#f26522] font-bold tracking-widest uppercase">A United First Initiative</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-[#9ca3af] hover:text-white bg-[#0a0a0a] hover:bg-[#1f2937] rounded-full p-2 transition-all border border-[#1f2937]"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="overflow-y-auto relative z-10 flex flex-col [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden bg-[#000000]">
                
                {/* HERO SECTION */}
                <div className="relative w-full min-h-[500px] flex items-center justify-center shrink-0">
                  <img 
                    src="/Our Core Initiatives/UV Glasses Drive cover.jpeg" 
                    alt="UV Glasses & Mask Distribution" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-black/40"></div>
                  
                  <div className="relative z-10 px-8 py-16 flex flex-col items-center text-center max-w-4xl mx-auto mt-10">
                    <div className="inline-block px-4 py-1.5 border border-[#f26522]/50 text-white bg-[#f26522]/20 backdrop-blur-md rounded-full text-xs font-bold tracking-widest uppercase mb-6">
                      By Live to Inspire Charitable Trust
                    </div>
                    
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight uppercase">
                      UV Glasses & Mask <br/><span className="text-[#f26522]">Distribution Drive</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 font-bold uppercase tracking-widest mb-6">
                      For The Safety & Dignity of Safai Karmacharis
                    </p>
                    
                    <p className="text-xl md:text-2xl text-[#f26522] font-bold italic mb-10 max-w-3xl">
                      “The Hands That Keep Our Cities Clean Deserve Protection, Respect, and Care.”
                    </p>

                    <div className="flex flex-wrap justify-center gap-6 mb-10">
                      <div className="bg-[#0a0a0a]/80 backdrop-blur-sm border border-[#1f2937] rounded-2xl p-4 flex flex-col items-center min-w-[160px]">
                        <span className="text-3xl font-black text-white">50,000+</span>
                        <span className="text-xs text-[#9ca3af] uppercase tracking-wider font-semibold mt-1">UV Glasses/Year</span>
                      </div>
                      <div className="bg-[#0a0a0a]/80 backdrop-blur-sm border border-[#1f2937] rounded-2xl p-4 flex flex-col items-center min-w-[160px]">
                        <span className="text-3xl font-black text-white">50,000+</span>
                        <span className="text-xs text-[#9ca3af] uppercase tracking-wider font-semibold mt-1">Masks/Year</span>
                      </div>
                      <div className="bg-[#0a0a0a]/80 backdrop-blur-sm border border-[#1f2937] rounded-2xl p-4 flex flex-col items-center min-w-[160px]">
                        <span className="text-3xl font-black text-white">15+</span>
                        <span className="text-xs text-[#9ca3af] uppercase tracking-wider font-semibold mt-1">Cities Impacted</span>
                      </div>
                    </div>

                    <p className="text-[#9ca3af] font-semibold uppercase tracking-widest mb-8 flex items-center gap-2">
                      <Globe size={18} className="text-[#f26522]" /> Supporting UNSDG 3 & UNSDG 13
                    </p>

                    <Link 
                      href="/donate"
                      onClick={onClose}
                      className="px-10 py-5 bg-[#f26522] hover:bg-orange-600 text-white font-black text-lg uppercase tracking-wider rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_10px_40px_rgba(242,101,34,0.4)]"
                    >
                      Donate Now
                    </Link>
                  </div>
                </div>

                <div className="p-6 md:p-12 lg:p-16 flex flex-col gap-20">
                  
                  {/* THEY PROTECT OUR CITIES */}
                  <div className="bg-[#050505] p-8 md:p-12 rounded-[40px] border border-[#1f2937]">
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase tracking-tight text-center">
                      They Protect Our Cities Every Day.<br/>
                      <span className="text-[#f26522]">Who Protects Them?</span>
                    </h3>
                    <p className="text-center text-[#9ca3af] text-lg mb-10 max-w-3xl mx-auto">
                      Every morning before most people wake up, thousands of Safai Karmacharis step out to clean our roads, streets, public spaces, and surroundings.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                      <div className="bg-[#0a0a0a] border border-[#1f2937] p-8 rounded-3xl">
                        <h4 className="text-white font-bold mb-4">They work in:</h4>
                        <ul className="space-y-3">
                          <li className="flex items-center gap-3 text-[#9ca3af]"><span className="text-[#f26522]">⚠️</span> Extreme sunlight</li>
                          <li className="flex items-center gap-3 text-[#9ca3af]"><span className="text-[#f26522]">⚠️</span> Dust-filled environments</li>
                          <li className="flex items-center gap-3 text-[#9ca3af]"><span className="text-[#f26522]">⚠️</span> Pollution</li>
                          <li className="flex items-center gap-3 text-[#9ca3af]"><span className="text-[#f26522]">⚠️</span> Harmful waste exposure</li>
                          <li className="flex items-center gap-3 text-[#9ca3af]"><span className="text-[#f26522]">⚠️</span> Smoke and toxic particles</li>
                        </ul>
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="text-xl text-white font-light leading-relaxed mb-6">
                          Yet many frontline sanitation workers continue working without proper safety equipment.
                        </p>
                        <p className="text-[#9ca3af] text-lg leading-relaxed">
                          The UV Glass & Mask Distribution Drive is an initiative created to protect the health, dignity, and well-being of the people who silently protect our cities every single day.
                        </p>
                        <p className="text-2xl font-bold text-[#f26522] mt-6 italic">
                          Because cleanliness workers are not invisible workers. They are frontline heroes.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* WHY SAJAN SHAH EXECUTES THIS INITIATIVE */}
                  <div className="bg-[#0a0a0a] border border-[#1f2937] p-8 md:p-12 rounded-[40px] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#f26522]/10 blur-[100px] rounded-full"></div>
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-8 uppercase tracking-tight relative z-10">
                      Why <span className="text-[#f26522]">Sajan Shah</span> Executes This Initiative
                    </h3>
                    <div className="text-[#9ca3af] text-lg font-light leading-relaxed space-y-6 relative z-10">
                      <p>Sajan Shah believes that humanity begins when society starts respecting the people who work silently behind the scenes.</p>
                      <p>After observing the difficult working conditions of Safai Karmacharis across multiple cities, one reality became impossible to ignore: The people who protect public health are often forced to risk their own health daily.</p>
                      
                      <div className="bg-[#050505] p-6 rounded-2xl border border-[#1f2937]">
                        <p className="text-white mb-2">Continuous exposure to <strong className="text-[#f26522]">harmful UV rays, dust particles, pollution, waste chemicals, smoke, and germs</strong> creates serious long-term risks for their eyes and respiratory system.</p>
                      </div>

                      <blockquote className="border-l-4 border-[#f26522] pl-6 py-2 my-8 text-2xl md:text-3xl font-bold text-white italic bg-[#050505] p-6 rounded-r-2xl">
                        "Real social impact is not only about motivation through words. It is about protecting the people who serve humanity every day."
                      </blockquote>
                      
                      <p className="font-semibold text-white">This initiative was started to:</p>
                      <ul className="list-disc list-inside space-y-2 pl-4 text-[#9ca3af]">
                        <li>Protect sanitation workers from avoidable health risks</li>
                        <li>Promote workplace safety and dignity</li>
                        <li>Create awareness about frontline worker welfare</li>
                        <li>Encourage humanity-oriented social responsibility</li>
                        <li>Ensure that those who clean our environment are themselves protected</li>
                      </ul>
                      
                      <p className="text-2xl font-bold text-white mt-8">
                        This drive is not just distribution. <span className="text-[#f26522]">It is respect in action.</span>
                      </p>
                    </div>
                  </div>

                  {/* WHY GLASSES AND MASKS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* UV Glasses */}
                    <div className="bg-[#0a0a0a] border border-[#1f2937] p-8 rounded-[40px] hover:border-[#f26522] transition-colors">
                      <div className="w-16 h-16 bg-[#050505] rounded-2xl flex items-center justify-center mb-6 border border-[#1f2937]">
                        <Eye className="text-[#f26522]" size={32} />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight">Why UV Glasses Are Important</h3>
                      <p className="text-[#9ca3af] mb-6">Safai Karmacharis spend long hours outdoors exposed to harmful conditions.</p>
                      <h4 className="text-white font-semibold mb-4">UV Protection Glasses Help:</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3 text-[#9ca3af]"><span className="text-[#f26522] mt-1">✓</span> Protect eyes from harmful ultraviolet (UV) rays</li>
                        <li className="flex items-start gap-3 text-[#9ca3af]"><span className="text-[#f26522] mt-1">✓</span> Reduce irritation caused by dust and smoke</li>
                        <li className="flex items-start gap-3 text-[#9ca3af]"><span className="text-[#f26522] mt-1">✓</span> Prevent eye infections and long-term eye damage</li>
                        <li className="flex items-start gap-3 text-[#9ca3af]"><span className="text-[#f26522] mt-1">✓</span> Improve visibility and comfort during work</li>
                        <li className="flex items-start gap-3 text-[#9ca3af]"><span className="text-[#f26522] mt-1">✓</span> Reduce strain caused by continuous outdoor exposure</li>
                      </ul>
                    </div>

                    {/* Masks */}
                    <div className="bg-[#0a0a0a] border border-[#1f2937] p-8 rounded-[40px] hover:border-[#f26522] transition-colors">
                      <div className="w-16 h-16 bg-[#050505] rounded-2xl flex items-center justify-center mb-6 border border-[#1f2937]">
                        <Wind className="text-[#f26522]" size={32} />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight">Why Mask Distribution Is Important</h3>
                      <p className="text-[#9ca3af] mb-6">Sanitation workers continuously inhale polluted air and harmful particles while cleaning roads and waste areas.</p>
                      <h4 className="text-white font-semibold mb-4">Protective Masks Help:</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3 text-[#9ca3af]"><span className="text-[#f26522] mt-1">✓</span> Prevent inhalation of dust and harmful particles</li>
                        <li className="flex items-start gap-3 text-[#9ca3af]"><span className="text-[#f26522] mt-1">✓</span> Reduce respiratory infections and breathing issues</li>
                        <li className="flex items-start gap-3 text-[#9ca3af]"><span className="text-[#f26522] mt-1">✓</span> Protect against germs, smoke, and pollution</li>
                        <li className="flex items-start gap-3 text-[#9ca3af]"><span className="text-[#f26522] mt-1">✓</span> Improve breathing safety while working</li>
                        <li className="flex items-start gap-3 text-[#9ca3af]"><span className="text-[#f26522] mt-1">✓</span> Create healthier and safer working conditions</li>
                      </ul>
                    </div>
                  </div>

                  {/* HOW SAFETY EQUIPMENT BENEFITS */}
                  <div className="bg-[#050505] p-8 md:p-12 rounded-[40px] border border-[#1f2937]">
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-10 uppercase tracking-tight text-center">
                      How Safety Equipment <span className="text-[#f26522]">Benefits</span> Safai Karmacharis
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        { title: "Better Eye Protection", desc: "Protects workers from harmful sunlight, dust, and irritation." },
                        { title: "Improved Breathing Safety", desc: "Reduces exposure to harmful particles and polluted air." },
                        { title: "Reduced Health Risks", desc: "Helps prevent infections, allergies, and respiratory illnesses." },
                        { title: "Increased Comfort", desc: "Allows workers to perform duties more safely and confidently." },
                        { title: "Dignity & Respect", desc: "Shows care and appreciation for frontline sanitation workers." },
                        { title: "Safety Awareness", desc: "Encourages regular use of protective equipment." }
                      ].map((item, i) => (
                        <div key={i} className="bg-[#0a0a0a] border border-[#1f2937] p-6 rounded-2xl hover:border-[#f26522] transition-colors">
                          <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                          <p className="text-[#9ca3af] font-light">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* LONG TERM IMPACT / MOST POWERFUL PART */}
                  <div className="bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-[#1f2937] p-8 md:p-12 rounded-[40px] text-center shadow-[0_0_40px_rgba(242,101,34,0.1)]">
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase tracking-tight">
                      Long-Term <span className="text-[#f26522]">Impact</span>
                    </h3>
                    <p className="text-2xl text-white font-light mb-4">
                      Cost of One UV Glass: <strong className="text-[#f26522] font-black text-4xl">₹50 ONLY</strong>
                    </p>
                    <p className="text-[#9ca3af] text-lg mb-10">Protection Duration: Up To 6 Months. A small contribution can provide months of protection for a worker serving society every day.</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                      <div className="flex flex-col items-center justify-center p-6 bg-[#000000] rounded-2xl border border-[#1f2937]">
                        <span className="text-3xl font-black text-white mb-2">1</span>
                        <span className="text-sm text-[#f26522] uppercase font-bold tracking-wider text-center">Protective<br/>Glass</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-6 bg-[#000000] rounded-2xl border border-[#1f2937]">
                        <span className="text-3xl font-black text-white mb-2"><Eye size={28}/></span>
                        <span className="text-sm text-[#f26522] uppercase font-bold tracking-wider text-center">Prevent Eye<br/>Damage</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-6 bg-[#000000] rounded-2xl border border-[#1f2937]">
                        <span className="text-3xl font-black text-white mb-2"><Activity size={28}/></span>
                        <span className="text-sm text-[#f26522] uppercase font-bold tracking-wider text-center">Reduce<br/>Health Risks</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-6 bg-[#000000] rounded-2xl border border-[#1f2937]">
                        <span className="text-3xl font-black text-white mb-2"><Shield size={28}/></span>
                        <span className="text-sm text-[#f26522] uppercase font-bold tracking-wider text-center">Protect With<br/>Dignity</span>
                      </div>
                    </div>
                  </div>

                  {/* SUPPORTING UNSDGS */}
                  <div>
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-10 uppercase tracking-tight text-center">
                      Supporting <span className="text-[#f26522]">UNSDGs</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-[#050505] border border-[#1f2937] p-8 rounded-3xl">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-16 h-16 bg-[#f26522]/20 rounded-xl flex items-center justify-center text-[#f26522] font-black text-2xl border border-[#f26522]/30">3</div>
                          <div>
                            <h4 className="text-white font-bold text-xl uppercase">Good Health & Well-Being</h4>
                          </div>
                        </div>
                        <p className="text-white font-medium mb-4">This initiative promotes:</p>
                        <ul className="space-y-3">
                          <li className="flex items-center gap-3 text-[#9ca3af]"><span className="text-[#f26522]">✓</span> Better workplace health</li>
                          <li className="flex items-center gap-3 text-[#9ca3af]"><span className="text-[#f26522]">✓</span> Safer working conditions</li>
                          <li className="flex items-center gap-3 text-[#9ca3af]"><span className="text-[#f26522]">✓</span> Protection from respiratory and eye risks</li>
                        </ul>
                      </div>
                      <div className="bg-[#050505] border border-[#1f2937] p-8 rounded-3xl">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-16 h-16 bg-[#f26522]/20 rounded-xl flex items-center justify-center text-[#f26522] font-black text-2xl border border-[#f26522]/30">13</div>
                          <div>
                            <h4 className="text-white font-bold text-xl uppercase">Climate Action</h4>
                          </div>
                        </div>
                        <p className="text-white font-medium mb-4">This drive creates awareness about:</p>
                        <ul className="space-y-3">
                          <li className="flex items-center gap-3 text-[#9ca3af]"><span className="text-[#f26522]">✓</span> Pollution & Environmental responsibility</li>
                          <li className="flex items-center gap-3 text-[#9ca3af]"><span className="text-[#f26522]">✓</span> Cleaner surroundings</li>
                          <li className="flex items-center gap-3 text-[#9ca3af]"><span className="text-[#f26522]">✓</span> Community-driven sustainability</li>
                        </ul>
                        <p className="text-[#f26522] font-bold mt-6 italic text-sm">Protecting the people who clean our environment is also climate responsibility.</p>
                      </div>
                    </div>
                  </div>

                  {/* REEL / VIDEO SECTION */}
                  <div className="text-center">
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tight">
                      Watch The <span className="text-[#f26522]">Humanity Drive</span> In Action
                    </h3>
                    <p className="text-xl text-[#9ca3af] italic mb-10">"The People Who Clean Our Cities Deserve To Breathe Safely."</p>
                    
                    <div className="w-full max-w-sm mx-auto aspect-[9/16] bg-[#111] border border-[#1f2937] rounded-3xl overflow-hidden relative group mb-8 flex items-center justify-center">
                      <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]"></div>
                      <iframe
                        src="https://www.instagram.com/p/C7TFMy3pQBt/embed/?hidecaption=true"
                        className="absolute inset-0 w-[110%] h-[110%] -top-[5%] -left-[5%] border-0 pointer-events-auto"
                        scrolling="no"
                        allowTransparency={true}
                        allow="encrypted-media"
                      />
                    </div>
                  </div>

                  {/* PHOTO GALLERY SECTION */}
                  <div className="bg-[#050505] p-8 md:p-12 rounded-[40px] border border-[#1f2937]">
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-10 uppercase tracking-tight text-center">
                      Moments Of <span className="text-[#f26522]">Humanity & Respect</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="aspect-square rounded-2xl bg-[#0a0a0a] border border-[#1f2937] overflow-hidden"><img src="/Our Core Initiatives/UV Glasses Drive 1.jpeg" alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 grayscale hover:grayscale-0"/></div>
                      <div className="aspect-square rounded-2xl bg-[#0a0a0a] border border-[#1f2937] overflow-hidden"><img src="/Our Core Initiatives/UV Glasses Drive2.jpeg" alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 grayscale hover:grayscale-0"/></div>
                    </div>
                  </div>

                  {/* PARTNERS & CALL TO ACTION */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="bg-[#0a0a0a] border border-[#1f2937] p-8 md:p-12 rounded-[40px]">
                      <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight">Who Can Partner With Us?</h3>
                      <ul className="grid grid-cols-2 gap-4">
                        <li className="flex items-center gap-3 text-[#9ca3af]"><Building size={16} className="text-[#f26522]" /> Corporate CSR</li>
                        <li className="flex items-center gap-3 text-[#9ca3af]"><Building size={16} className="text-[#f26522]" /> Municipal Corps</li>
                        <li className="flex items-center gap-3 text-[#9ca3af]"><Building size={16} className="text-[#f26522]" /> NGOs</li>
                        <li className="flex items-center gap-3 text-[#9ca3af]"><Building size={16} className="text-[#f26522]" /> Social Orgs</li>
                        <li className="flex items-center gap-3 text-[#9ca3af]"><Building size={16} className="text-[#f26522]" /> Educational Inst.</li>
                        <li className="flex items-center gap-3 text-[#9ca3af]"><Building size={16} className="text-[#f26522]" /> Community Grps</li>
                      </ul>
                    </div>
                    
                    <div className="bg-[#050505] border border-[#f26522] p-8 md:p-12 rounded-[40px] flex flex-col justify-center text-center shadow-[0_0_30px_rgba(242,101,34,0.15)]">
                      <h3 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase tracking-tight">Protect The People Who Protect Our Cities.</h3>
                      <p className="text-[#9ca3af] mb-8 font-light">Your contribution can help thousands of Safai Karmacharis work with greater safety, dignity, and confidence. Together, we can build cleaner cities and a more humane society.</p>
                      <Link 
                        href="/donate"
                        onClick={onClose}
                        className="px-8 py-4 bg-[#f26522] text-white hover:bg-orange-600 font-black uppercase tracking-wider rounded-full transition-colors self-center"
                      >
                        Donate Now
                      </Link>
                    </div>
                  </div>

                  {/* CONNECT WITH US & CLOSING */}
                  <div className="border-t border-[#1f2937] pt-12 pb-8 flex flex-col items-center text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">Live to Inspire Charitable Trust</h3>
                    <p className="text-[#f26522] font-semibold text-sm uppercase tracking-widest mb-8">A United First Initiative</p>
                    
                    <div className="flex gap-4 mb-12">
                      <a href="https://www.instagram.com/sajan_shahh/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#0a0a0a] border border-[#1f2937] flex items-center justify-center text-[#9ca3af] hover:text-white hover:border-[#f26522] transition-colors font-bold text-xs">IG</a>
                      <a href="https://www.youtube.com/@SajanShah" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#0a0a0a] border border-[#1f2937] flex items-center justify-center text-[#9ca3af] hover:text-white hover:border-[#f26522] transition-colors font-bold text-xs">YT</a>
                      <a href="https://www.linkedin.com/in/sajan-shah-7840244a/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#0a0a0a] border border-[#1f2937] flex items-center justify-center text-[#9ca3af] hover:text-white hover:border-[#f26522] transition-colors font-bold text-xs">IN</a>
                      <a href="https://www.facebook.com/SajanShahPage" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#0a0a0a] border border-[#1f2937] flex items-center justify-center text-[#9ca3af] hover:text-white hover:border-[#f26522] transition-colors font-bold text-xs">FB</a>
                    </div>

                    <div className="max-w-2xl mx-auto space-y-2 text-xl md:text-2xl text-[#9ca3af] font-light italic leading-relaxed">
                      <p>"A society is not judged by how it treats the powerful.</p>
                      <p>It is judged by how it protects the people who serve silently."</p>
                      <p className="text-white font-bold not-italic mt-4">Let's Stand For Humanity.</p>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
