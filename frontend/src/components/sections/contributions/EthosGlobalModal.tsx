import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Scale, Globe, Building, Video, Activity, Users, Leaf, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface EthosGlobalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EthosGlobalModal: React.FC<EthosGlobalModalProps> = ({ isOpen, onClose }) => {
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
                    <Scale size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white uppercase tracking-wide">Ethos Global Advisory</h2>
                    <p className="text-xs text-[#f26522] font-bold tracking-widest uppercase">ESG | CSR | Sustainability</p>
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
                    src="https://images.unsplash.com/photo-1454165833767-0275ef20356e?q=80&w=2070&auto=format&fit=crop" 
                    alt="Sustainable Corporate Ecosystems" 
                    className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-black/40"></div>
                  
                  <div className="relative z-10 px-8 py-16 flex flex-col items-center text-center max-w-4xl mx-auto mt-10">
                    <div className="inline-block px-4 py-1.5 border border-[#f26522]/50 text-white bg-[#f26522]/20 backdrop-blur-md rounded-full text-xs font-bold tracking-widest uppercase mb-6">
                      A Live to Inspire Charitable Trust Vision
                    </div>
                    
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight uppercase">
                      BUILDING RESPONSIBLE <span className="text-[#f26522]">BUSINESSES</span> <br/>FOR A BETTER TOMORROW
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 font-bold uppercase tracking-widest mb-6">
                      ESG • CSR • IMPACT • SUSTAINABILITY • GOVERNANCE
                    </p>
                    
                    <p className="text-xl md:text-2xl text-[#f26522] font-bold italic mb-10 max-w-3xl">
                      “The Future Will Not Belong Only To Profitable Companies. It Will Belong To Responsible Companies.”
                    </p>

                    <div className="flex flex-wrap justify-center gap-6 mb-10">
                      <div className="bg-[#0a0a0a]/80 backdrop-blur-sm border border-[#1f2937] rounded-2xl p-4 flex flex-col items-center min-w-[160px]">
                        <span className="text-3xl font-black text-white">93</span>
                        <span className="text-xs text-[#9ca3af] uppercase tracking-wider font-semibold mt-1">Social Drives</span>
                      </div>
                      <div className="bg-[#0a0a0a]/80 backdrop-blur-sm border border-[#1f2937] rounded-2xl p-4 flex flex-col items-center min-w-[160px]">
                        <span className="text-3xl font-black text-white">15</span>
                        <span className="text-xs text-[#9ca3af] uppercase tracking-wider font-semibold mt-1">States</span>
                      </div>
                      <div className="bg-[#0a0a0a]/80 backdrop-blur-sm border border-[#1f2937] rounded-2xl p-4 flex flex-col items-center min-w-[160px]">
                        <span className="text-3xl font-black text-white">9M+</span>
                        <span className="text-xs text-[#9ca3af] uppercase tracking-wider font-semibold mt-1">Lives Impacted</span>
                      </div>
                    </div>

                    <Link 
                      href="/contact"
                      onClick={onClose}
                      className="px-10 py-5 bg-[#f26522] hover:bg-orange-600 text-white font-black text-lg uppercase tracking-wider rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_10px_40px_rgba(242,101,34,0.4)]"
                    >
                      Connect With Us
                    </Link>
                  </div>
                </div>

                <div className="p-6 md:p-12 lg:p-16 flex flex-col gap-20">
                  
                  {/* ABOUT ETHOS GLOBAL ADVISORY */}
                  <div className="bg-[#050505] p-8 md:p-12 rounded-[40px] border border-[#1f2937] flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1">
                      <h3 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase tracking-tight">
                        About <span className="text-[#f26522]">Ethos Global</span> Advisory
                      </h3>
                      <p className="text-[#9ca3af] text-lg mb-6 leading-relaxed">
                        Ethos Global Advisory is a future-focused ESG and CSR advisory company helping organizations build responsible, sustainable, and impact-driven business ecosystems.
                      </p>
                      <p className="text-white font-medium mb-4">Today, businesses are no longer judged only by <span className="text-[#f26522]">Revenue, Growth, and Profitability</span>.</p>
                      <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-[#1f2937] mb-6">
                        <h4 className="text-white font-bold mb-3 uppercase text-sm">They are also judged by:</h4>
                        <ul className="grid grid-cols-2 gap-3">
                          <li className="flex items-center gap-2 text-[#9ca3af]"><CheckCircle size={16} className="text-[#f26522]" /> Environmental responsibility</li>
                          <li className="flex items-center gap-2 text-[#9ca3af]"><CheckCircle size={16} className="text-[#f26522]" /> Ethical leadership</li>
                          <li className="flex items-center gap-2 text-[#9ca3af]"><CheckCircle size={16} className="text-[#f26522]" /> Social impact</li>
                          <li className="flex items-center gap-2 text-[#9ca3af]"><CheckCircle size={16} className="text-[#f26522]" /> Governance transparency</li>
                          <li className="flex items-center gap-2 text-[#9ca3af]"><CheckCircle size={16} className="text-[#f26522]" /> Sustainability commitment</li>
                        </ul>
                      </div>
                      <p className="text-[#f26522] font-bold text-lg italic">
                        "Because the future belongs to organizations that create both: Profit AND Purpose."
                      </p>
                    </div>
                    <div className="flex-1 aspect-square rounded-[30px] overflow-hidden border border-[#1f2937] relative">
                      <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" alt="ESG Consulting" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent"></div>
                    </div>
                  </div>

                  {/* THE VISION BEHIND ETHOS GLOBAL ADVISORY */}
                  <div className="bg-[#0a0a0a] border border-[#1f2937] p-8 md:p-12 rounded-[40px] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#f26522]/10 blur-[100px] rounded-full"></div>
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-8 uppercase tracking-tight relative z-10 text-center">
                      The <span className="text-[#f26522]">Vision</span> Behind It
                    </h3>
                    
                    <blockquote className="border-l-4 border-[#f26522] pl-6 py-2 mb-10 text-2xl md:text-3xl font-bold text-white italic bg-[#050505] p-6 rounded-r-2xl mx-auto max-w-4xl text-center">
                      “Business growth without responsibility is temporary. Impact-driven leadership creates lasting legacy.”
                    </blockquote>

                    <p className="text-center text-[#9ca3af] text-lg max-w-3xl mx-auto mb-10">
                      After executing large-scale social initiatives across India and interacting with millions of lives at ground level, Sajan Shah recognized one reality: The next generation of successful organizations will not be built only on financial performance.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                      {["Trust", "Ethics", "Sustainability", "Humanity", "Accountability"].map((val, idx) => (
                        <div key={idx} className="px-6 py-3 bg-[#050505] border border-[#f26522]/30 rounded-full text-white font-bold tracking-wider uppercase">
                          {val}
                        </div>
                      ))}
                    </div>
                    <p className="text-center text-[#f26522] font-black uppercase tracking-widest text-xl">
                      Bridging the gap between Corporate Growth and Social Responsibility.
                    </p>
                  </div>

                  {/* UNITED FIRST – THE BIGGER VISION */}
                  <div className="bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-[#1f2937] p-8 md:p-12 rounded-[40px] text-center shadow-[0_0_40px_rgba(242,101,34,0.1)]">
                    <div className="w-20 h-20 bg-[#000000] rounded-2xl flex items-center justify-center border border-[#f26522] mx-auto mb-6">
                      <Globe size={40} className="text-[#f26522]" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase tracking-tight">
                      United First – <span className="text-[#f26522]">The Bigger Vision</span>
                    </h3>
                    <p className="text-2xl text-white font-light mb-8 max-w-4xl mx-auto">
                      One of the World’s Biggest Social Consortiums Working on UNSDG 2030 Solutions.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                      {["Climate Action", "Education", "Health & Well-being", "Sustainability", "Responsible Leadership", "Community Empowerment"].map((area, idx) => (
                        <div key={idx} className="bg-[#000000] border border-[#1f2937] p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                          <Leaf className="text-[#9ca3af] mb-2" size={20} />
                          <span className="text-sm text-white font-bold uppercase">{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* WHAT ESG REALLY MEANS */}
                  <div>
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-10 uppercase tracking-tight text-center">
                      What <span className="text-[#f26522]">ESG</span> Really Means
                    </h3>
                    <p className="text-center text-[#9ca3af] mb-10 max-w-2xl mx-auto">
                      A global framework used to measure how responsibly organizations operate.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* E */}
                      <div className="bg-[#050505] border border-[#1f2937] p-8 rounded-[40px] hover:border-[#f26522] transition-colors relative overflow-hidden group">
                        <div className="absolute -right-10 -top-10 text-[150px] font-black text-[#1f2937]/30 group-hover:text-[#f26522]/10 transition-colors">E</div>
                        <div className="relative z-10">
                          <h4 className="text-2xl font-black text-white mb-2 uppercase">Environmental</h4>
                          <p className="text-[#f26522] text-sm font-bold uppercase tracking-wider mb-6">How businesses impact nature.</p>
                          <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-[#9ca3af]">✓ Carbon emissions</li>
                            <li className="flex items-center gap-3 text-[#9ca3af]">✓ Sustainability</li>
                            <li className="flex items-center gap-3 text-[#9ca3af]">✓ Waste management</li>
                            <li className="flex items-center gap-3 text-[#9ca3af]">✓ Climate responsibility</li>
                            <li className="flex items-center gap-3 text-[#9ca3af]">✓ Resource efficiency</li>
                          </ul>
                        </div>
                      </div>

                      {/* S */}
                      <div className="bg-[#050505] border border-[#1f2937] p-8 rounded-[40px] hover:border-[#f26522] transition-colors relative overflow-hidden group">
                        <div className="absolute -right-10 -top-10 text-[150px] font-black text-[#1f2937]/30 group-hover:text-[#f26522]/10 transition-colors">S</div>
                        <div className="relative z-10">
                          <h4 className="text-2xl font-black text-white mb-2 uppercase">Social</h4>
                          <p className="text-[#f26522] text-sm font-bold uppercase tracking-wider mb-6">How organizations treat people.</p>
                          <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-[#9ca3af]">✓ Employee well-being</li>
                            <li className="flex items-center gap-3 text-[#9ca3af]">✓ Diversity & inclusion</li>
                            <li className="flex items-center gap-3 text-[#9ca3af]">✓ Workplace culture</li>
                            <li className="flex items-center gap-3 text-[#9ca3af]">✓ Community impact</li>
                            <li className="flex items-center gap-3 text-[#9ca3af]">✓ Human rights</li>
                          </ul>
                        </div>
                      </div>

                      {/* G */}
                      <div className="bg-[#050505] border border-[#1f2937] p-8 rounded-[40px] hover:border-[#f26522] transition-colors relative overflow-hidden group">
                        <div className="absolute -right-10 -top-10 text-[150px] font-black text-[#1f2937]/30 group-hover:text-[#f26522]/10 transition-colors">G</div>
                        <div className="relative z-10">
                          <h4 className="text-2xl font-black text-white mb-2 uppercase">Governance</h4>
                          <p className="text-[#f26522] text-sm font-bold uppercase tracking-wider mb-6">How ethically organizations are managed.</p>
                          <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-[#9ca3af]">✓ Leadership transparency</li>
                            <li className="flex items-center gap-3 text-[#9ca3af]">✓ Accountability</li>
                            <li className="flex items-center gap-3 text-[#9ca3af]">✓ Ethics</li>
                            <li className="flex items-center gap-3 text-[#9ca3af]">✓ Compliance</li>
                            <li className="flex items-center gap-3 text-[#9ca3af]">✓ Governance systems</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* WHY ESG IS THE FUTURE & INDIA'S TRANSFORMATION */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-[#0a0a0a] border border-[#1f2937] p-8 rounded-3xl">
                      <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight">Why ESG Is The Future</h3>
                      <p className="text-[#9ca3af] mb-4">Governments, investors, and consumers now expect organizations to demonstrate Transparency, Responsibility, Ethical operations, and Long-term sustainability.</p>
                      <p className="text-[#f26522] font-black uppercase text-lg mt-6">ESG is no longer optional. It is becoming the global business standard.</p>
                    </div>
                    <div className="bg-[#0a0a0a] border border-[#1f2937] p-8 rounded-3xl border-l-4 border-l-[#f26522]">
                      <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight">India’s ESG Transformation</h3>
                      <p className="text-[#9ca3af] mb-4">India has already entered the ESG era. SEBI introduced <strong className="text-white">BRSR – Business Responsibility & Sustainability Reporting</strong>.</p>
                      <p className="text-[#9ca3af]">Top listed companies are now required to report ESG metrics, environmental impact, and social responsibility data.</p>
                    </div>
                  </div>

                  {/* WHAT WE OFFER & WHY WE ARE DIFFERENT */}
                  <div className="bg-[#050505] p-8 md:p-12 rounded-[40px] border border-[#1f2937]">
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-10 uppercase tracking-tight text-center">
                      What <span className="text-[#f26522]">We Offer</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                      {[
                        "ESG Consulting & Strategy",
                        "CSR Planning & Execution",
                        "Sustainability Reporting & BRSR",
                        "ESG Measurement & Readiness",
                        "Corporate ESG Workshops",
                        "Impact Communication",
                        "Social Impact Program Design",
                        "UNSDG-Aligned Strategy"
                      ].map((offer, idx) => (
                        <div key={idx} className="bg-[#0a0a0a] border border-[#1f2937] p-6 rounded-2xl flex items-center justify-center text-center hover:border-[#f26522] transition-colors cursor-default">
                          <span className="text-white font-bold">{offer}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-[#000000] border border-[#f26522]/50 p-8 rounded-[30px] text-center max-w-4xl mx-auto shadow-[0_0_30px_rgba(242,101,34,0.1)]">
                      <h4 className="text-2xl font-black text-white mb-4 uppercase">Why Ethos Global Advisory Is Different</h4>
                      <p className="text-xl text-[#9ca3af] italic mb-6">Most organizations speak about impact. <strong className="text-[#f26522]">We execute impact.</strong></p>
                      <p className="text-gray-300">
                        We combine Corporate strategy, Ground-level execution, ESG understanding, Social impact expertise, Sustainability vision, and Humanity-centered leadership.
                      </p>
                      <p className="text-white font-bold mt-4 uppercase">
                        Our strength comes from real execution across India — not just presentations and reports.
                      </p>
                    </div>
                  </div>

                  {/* REEL / VIDEO SECTION */}
                  <div className="text-center">
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tight">
                      Watch The <span className="text-[#f26522]">Future Of Responsible Leadership</span>
                    </h3>
                    <p className="text-xl text-[#9ca3af] italic mb-10">“The Companies That Will Lead Tomorrow Are Creating Impact Today.”</p>
                    
                    <div className="w-full max-w-4xl mx-auto aspect-video bg-[#0a0a0a] border border-[#1f2937] rounded-3xl overflow-hidden relative flex items-center justify-center group cursor-pointer mb-8">
                      {/* Placeholder for actual Video/Reel */}
                      <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" alt="Corporate Responsibility Video" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                      <div className="w-20 h-20 rounded-full bg-[#000000]/80 backdrop-blur-md flex items-center justify-center border border-[#f26522] z-10 group-hover:bg-[#f26522] transition-colors">
                        <Video size={32} className="text-white" />
                      </div>
                    </div>
                  </div>

                  {/* PHOTO GALLERY SECTION */}
                  <div className="bg-[#050505] p-8 md:p-12 rounded-[40px] border border-[#1f2937]">
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-10 uppercase tracking-tight text-center">
                      Building Business <span className="text-[#f26522]">With Responsibility</span>
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {/* Using placeholders for gallery */}
                      <div className="aspect-square rounded-2xl bg-[#0a0a0a] border border-[#1f2937] overflow-hidden"><img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 grayscale hover:grayscale-0"/></div>
                      <div className="aspect-square rounded-2xl bg-[#0a0a0a] border border-[#1f2937] overflow-hidden"><img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop" alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 grayscale hover:grayscale-0"/></div>
                      <div className="aspect-square rounded-2xl bg-[#0a0a0a] border border-[#1f2937] overflow-hidden"><img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2069&auto=format&fit=crop" alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 grayscale hover:grayscale-0"/></div>
                      <div className="aspect-square rounded-2xl bg-[#0a0a0a] border border-[#1f2937] overflow-hidden"><img src="https://images.unsplash.com/photo-1542744094-24638ea0b34e?q=80&w=2070&auto=format&fit=crop" alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 grayscale hover:grayscale-0"/></div>
                    </div>
                  </div>

                  {/* PARTNERS & CALL TO ACTION */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="bg-[#0a0a0a] border border-[#1f2937] p-8 md:p-12 rounded-[40px]">
                      <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight">Who We Work With</h3>
                      <ul className="grid grid-cols-2 gap-4">
                        <li className="flex items-center gap-3 text-[#9ca3af]"><Building size={16} className="text-[#f26522]" /> Corporates</li>
                        <li className="flex items-center gap-3 text-[#9ca3af]"><Building size={16} className="text-[#f26522]" /> Startups</li>
                        <li className="flex items-center gap-3 text-[#9ca3af]"><Building size={16} className="text-[#f26522]" /> Ed. Institutions</li>
                        <li className="flex items-center gap-3 text-[#9ca3af]"><Building size={16} className="text-[#f26522]" /> NGOs</li>
                        <li className="flex items-center gap-3 text-[#9ca3af]"><Building size={16} className="text-[#f26522]" /> Govt Bodies</li>
                        <li className="flex items-center gap-3 text-[#9ca3af]"><Building size={16} className="text-[#f26522]" /> CSR Teams</li>
                        <li className="flex items-center gap-3 text-[#9ca3af]"><Building size={16} className="text-[#f26522]" /> Investors</li>
                        <li className="flex items-center gap-3 text-[#9ca3af]"><Building size={16} className="text-[#f26522]" /> Sustainability Orgs</li>
                      </ul>
                    </div>
                    
                    <div className="bg-[#050505] border border-[#f26522] p-8 md:p-12 rounded-[40px] flex flex-col justify-center text-center shadow-[0_0_30px_rgba(242,101,34,0.15)]">
                      <h3 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase tracking-tight">The Future Is ESG-Driven.</h3>
                      <p className="text-[#9ca3af] mb-8 font-light">Partner with Ethos Global Advisory to build responsible systems, measurable impact, and sustainable growth. Is your organization ready for it?</p>
                      <Link 
                        href="/contact"
                        onClick={onClose}
                        className="px-8 py-4 bg-[#f26522] text-white hover:bg-orange-600 font-black uppercase tracking-wider rounded-full transition-colors self-center"
                      >
                        Schedule a Consultation
                      </Link>
                    </div>
                  </div>

                  {/* CONNECT WITH US & CLOSING */}
                  <div className="border-t border-[#1f2937] pt-12 pb-8 flex flex-col items-center text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">Ethos Global Advisory</h3>
                    <p className="text-[#f26522] font-semibold text-sm uppercase tracking-widest mb-8">ESG | CSR | Sustainability | Impact Consulting</p>
                    
                    <div className="flex gap-4 mb-12">
                      <a href="#" className="w-10 h-10 rounded-full bg-[#0a0a0a] border border-[#1f2937] flex items-center justify-center text-[#9ca3af] hover:text-white hover:border-[#f26522] transition-colors font-bold text-xs">IG</a>
                      <a href="#" className="w-10 h-10 rounded-full bg-[#0a0a0a] border border-[#1f2937] flex items-center justify-center text-[#9ca3af] hover:text-white hover:border-[#f26522] transition-colors font-bold text-xs">YT</a>
                      <a href="#" className="w-10 h-10 rounded-full bg-[#0a0a0a] border border-[#1f2937] flex items-center justify-center text-[#9ca3af] hover:text-white hover:border-[#f26522] transition-colors font-bold text-xs">IN</a>
                      <a href="#" className="w-10 h-10 rounded-full bg-[#0a0a0a] border border-[#1f2937] flex items-center justify-center text-[#9ca3af] hover:text-white hover:border-[#f26522] transition-colors font-bold text-xs">FB</a>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4 text-xl md:text-2xl text-[#9ca3af] font-light italic leading-relaxed">
                      <p>“The greatest businesses of the future will not only generate revenue.</p>
                      <p>They will generate responsibility, trust, and impact.”</p>
                      <p className="text-white font-bold not-italic mt-6 uppercase tracking-widest text-sm">The Future Is Built By Responsible Leadership.</p>
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
