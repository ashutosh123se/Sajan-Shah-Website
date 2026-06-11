import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PenTool, Leaf, Heart, Sprout, Globe, Users, Building, Video, Image as ImageIcon, MapPin, Phone, Mail, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

interface PlantablePencilsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlantablePencilsModal: React.FC<PlantablePencilsModalProps> = ({ isOpen, onClose }) => {
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
                    <PenTool size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white uppercase tracking-wide">Plantable Pencils Drive</h2>
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
                    src="/Our Core Initiatives/Plantable Pencils Drive cover.jpeg" 
                    alt="Plantable Pencils" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/70 to-black/40"></div>
                  
                  <div className="relative z-10 px-8 py-16 flex flex-col items-center text-center max-w-4xl mx-auto">
                    <div className="inline-block px-4 py-1.5 border border-[#f26522]/50 text-white bg-[#f26522]/20 backdrop-blur-md rounded-full text-xs font-bold tracking-widest uppercase mb-6">
                      By Live to Inspire Charitable Trust
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-tight uppercase">
                      Plantable Pencil <br/><span className="text-[#f26522]">Distribution Drive</span>
                    </h1>
                    
                    <p className="text-xl md:text-3xl text-[#f26522] font-bold italic mb-10 max-w-3xl">
                      "A Small Pencil In A Child's Hand Can Become A Tree For The Nation."
                    </p>

                    <div className="flex flex-wrap justify-center gap-6 mb-10">
                      <div className="bg-[#0a0a0a]/80 backdrop-blur-sm border border-[#1f2937] rounded-2xl p-4 flex flex-col items-center">
                        <span className="text-3xl font-black text-white">10,00,000+</span>
                        <span className="text-xs text-[#9ca3af] uppercase tracking-wider font-semibold">Pencils Distributed Yearly</span>
                      </div>
                      <div className="bg-[#0a0a0a]/80 backdrop-blur-sm border border-[#1f2937] rounded-2xl p-4 flex flex-col items-center">
                        <span className="text-3xl font-black text-white">500+</span>
                        <span className="text-xs text-[#9ca3af] uppercase tracking-wider font-semibold">Schools Reached</span>
                      </div>
                      <div className="bg-[#0a0a0a]/80 backdrop-blur-sm border border-[#1f2937] rounded-2xl p-4 flex flex-col items-center">
                        <span className="text-3xl font-black text-white">80+</span>
                        <span className="text-xs text-[#9ca3af] uppercase tracking-wider font-semibold">Corporate Partners</span>
                      </div>
                    </div>

                    <p className="text-[#9ca3af] font-semibold uppercase tracking-widest mb-8 flex items-center gap-2">
                      <Globe size={18} className="text-[#f26522]" /> Supporting UNSDG 13 – Climate Action
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
                  
                  {/* THE IDEA THAT GROWS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-[#050505] p-8 md:p-12 rounded-[40px] border border-[#1f2937]">
                    <div>
                      <h3 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase tracking-tight">
                        The Idea That <span className="text-[#f26522]">Grows</span> After Writing
                      </h3>
                      <div className="space-y-4 text-[#9ca3af] text-lg font-light leading-relaxed">
                        <p>Most pencils end up in dustbins.</p>
                        <p>But this pencil begins a new life after its purpose is complete.</p>
                        <p>The Plantable Pencil Distribution Drive is not just an environmental campaign. It is a movement to create emotionally responsible and environmentally conscious future generations.</p>
                        <p>Every plantable pencil contains seeds at its end. Once the pencil becomes too small to use, students plant it into soil — and it grows into herbs, flowers, or vegetables.</p>
                      </div>
                    </div>
                    <div className="bg-[#0a0a0a] border border-[#1f2937] p-8 rounded-3xl">
                      <h4 className="text-white font-bold mb-4 uppercase tracking-wider">A simple classroom object becomes:</h4>
                      <ul className="space-y-4">
                        <li className="flex items-center gap-3 text-[#9ca3af]"><Sprout className="text-[#f26522]" size={20} /> A lesson in sustainability</li>
                        <li className="flex items-center gap-3 text-[#9ca3af]"><Heart className="text-[#f26522]" size={20} /> A symbol of hope</li>
                        <li className="flex items-center gap-3 text-[#9ca3af]"><Globe className="text-[#f26522]" size={20} /> A seed of climate action</li>
                        <li className="flex items-center gap-3 text-[#9ca3af]"><Leaf className="text-[#f26522]" size={20} /> A practical experience of responsibility</li>
                      </ul>
                    </div>
                  </div>

                  {/* WHY SAJAN SHAH EXECUTES THIS */}
                  <div className="bg-[#0a0a0a] border border-[#1f2937] p-8 md:p-12 rounded-[40px] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#f26522]/10 blur-[100px] rounded-full"></div>
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-8 uppercase tracking-tight relative z-10">
                      Why <span className="text-[#f26522]">Sajan Shah</span> Executes This Initiative
                    </h3>
                    <div className="text-[#9ca3af] text-lg font-light leading-relaxed space-y-6 relative z-10">
                      <p>Sajan Shah believes that real education is not only about marks and careers. It is about creating human beings who care for society, humanity, and the planet.</p>
                      <p>After interacting with millions of students across India, one concern became clear: Today's children are growing disconnected from nature. Climate change, pollution, rising temperatures, and environmental destruction are no longer future problems — they are present realities.</p>
                      
                      <blockquote className="border-l-4 border-[#f26522] pl-6 py-2 my-8 text-2xl md:text-3xl font-bold text-white italic bg-[#050505] p-6 rounded-r-2xl">
                        "If we want to change the future of the planet, we must first change the habits of children."
                      </blockquote>
                      
                      <p className="font-semibold text-white">The Plantable Pencil Drive was started to:</p>
                      <ul className="list-disc list-inside space-y-2 pl-4 text-[#9ca3af]">
                        <li>Create environmental awareness from an early age</li>
                        <li>Build responsibility and compassion among students</li>
                        <li>Teach sustainability through action, not theory</li>
                        <li>Inspire children to become climate-conscious leaders</li>
                        <li>Connect education with humanity and environmental impact</li>
                      </ul>
                      
                      <div className="bg-[#050505] p-6 rounded-2xl mt-8 border border-[#1f2937]">
                        <p className="text-[#f26522] font-medium italic text-xl">
                          This initiative is not about distributing pencils. It is about planting responsibility into young minds. Because when a child plants a seed, they also plant awareness, care, and hope.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* WHY THIS DRIVE MATTERS */}
                  <div>
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase tracking-tight text-center">
                      Why This <span className="text-[#f26522]">Drive Matters</span>
                    </h3>
                    <p className="text-center text-[#9ca3af] mb-12 max-w-2xl mx-auto text-lg">Today's children are growing up in a world facing Climate change, Pollution, Deforestation, Rising temperatures, and Environmental imbalance.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-[#0a0a0a] border border-[#1f2937] p-8 rounded-3xl">
                        <p className="text-xl text-white font-light leading-relaxed mb-6">
                          Children do not become responsible citizens only through textbooks. <strong className="text-[#f26522]">They become responsible through experiences.</strong>
                        </p>
                        <p className="text-lg text-[#9ca3af] italic border-l-2 border-[#f26522] pl-4">One small pencil can change a child's thinking forever.</p>
                      </div>
                      <div className="bg-[#0a0a0a] border border-[#1f2937] p-8 rounded-3xl">
                        <h4 className="text-white font-bold mb-4">This initiative teaches students:</h4>
                        <ul className="space-y-3">
                          <li className="flex items-center gap-3 text-[#9ca3af]"><span className="text-[#f26522]">✓</span> To respect nature</li>
                          <li className="flex items-center gap-3 text-[#9ca3af]"><span className="text-[#f26522]">✓</span> To reduce waste</li>
                          <li className="flex items-center gap-3 text-[#9ca3af]"><span className="text-[#f26522]">✓</span> To understand sustainability</li>
                          <li className="flex items-center gap-3 text-[#9ca3af]"><span className="text-[#f26522]">✓</span> To care for living things</li>
                          <li className="flex items-center gap-3 text-[#9ca3af]"><span className="text-[#f26522]">✓</span> To contribute toward a greener Earth</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* HOW STUDENTS BENEFIT */}
                  <div className="bg-[#050505] p-8 md:p-12 rounded-[40px] border border-[#1f2937]">
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-10 uppercase tracking-tight text-center">
                      How Students <span className="text-[#f26522]">Benefit</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        { title: "Environmental Awareness", desc: "Students understand sustainability through practical action." },
                        { title: "Emotional Connection", desc: "Children learn patience, compassion, and responsibility while nurturing plants." },
                        { title: "Hands-On Learning", desc: "Students experience seed germination and plant growth in real life." },
                        { title: "Eco-Friendly Habits", desc: "Young minds learn recycling, reuse, and sustainable living naturally." },
                        { title: "Healthier Environment", desc: "More greenery creates cleaner and more positive surroundings." }
                      ].map((item, i) => (
                        <div key={i} className="bg-[#0a0a0a] border border-[#1f2937] p-6 rounded-2xl hover:border-[#f26522] transition-colors">
                          <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                          <p className="text-[#9ca3af] font-light">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* THE MOST POWERFUL PART */}
                  <div className="bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-[#1f2937] p-8 md:p-12 rounded-[40px] text-center shadow-[0_0_40px_rgba(242,101,34,0.1)]">
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase tracking-tight">
                      The Most <span className="text-[#f26522]">Powerful</span> Part
                    </h3>
                    <p className="text-2xl text-white font-light mb-8">
                      The cost of one plantable pencil is hardly <strong className="text-[#f26522] font-black text-4xl">₹3.5 ONLY</strong>
                    </p>
                    <p className="text-[#9ca3af] text-lg mb-10">Less than the price of a small snack. But its impact can last for years.</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                      <div className="flex flex-col items-center justify-center p-6 bg-[#000000] rounded-2xl border border-[#1f2937]">
                        <span className="text-3xl font-black text-white mb-2">1</span>
                        <span className="text-sm text-[#f26522] uppercase font-bold tracking-wider">Pencil</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-6 bg-[#000000] rounded-2xl border border-[#1f2937]">
                        <span className="text-3xl font-black text-white mb-2">1</span>
                        <span className="text-sm text-[#f26522] uppercase font-bold tracking-wider">Child</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-6 bg-[#000000] rounded-2xl border border-[#1f2937]">
                        <span className="text-3xl font-black text-white mb-2">1</span>
                        <span className="text-sm text-[#f26522] uppercase font-bold tracking-wider">Plant</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-6 bg-[#000000] rounded-2xl border border-[#1f2937]">
                        <span className="text-3xl font-black text-white mb-2">1</span>
                        <span className="text-sm text-[#f26522] uppercase font-bold tracking-wider">Better Future</span>
                      </div>
                    </div>
                    
                    <p className="text-xl text-white font-medium mb-8">Your contribution can help a child learn environmental responsibility, a school become greener, and a future generation protect the Earth.</p>
                  </div>

                  {/* REEL / VIDEO SECTION */}
                  <div className="text-center">
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tight">
                      Watch The <span className="text-[#f26522]">Movement</span> In Action
                    </h3>
                    <p className="text-xl text-[#9ca3af] italic mb-10">"When Education Meets Humanity, The Planet Wins."</p>
                    
                    <div className="w-full max-w-sm mx-auto aspect-[9/16] bg-[#111] border border-[#1f2937] rounded-3xl overflow-hidden relative group mb-8 flex items-center justify-center">
                      <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]"></div>
                      <iframe
                        src="https://www.instagram.com/p/CubsaaQxCML/embed/?hidecaption=true"
                        className="absolute inset-0 w-[110%] h-[110%] -top-[5%] -left-[5%] border-0 pointer-events-auto"
                        scrolling="no"
                        allowtransparency="true"
                        allow="encrypted-media"
                      />
                    </div>
                  </div>

                  {/* PHOTO GALLERY SECTION */}
                  <div className="bg-[#050505] p-8 md:p-12 rounded-[40px] border border-[#1f2937]">
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-10 uppercase tracking-tight text-center">
                      Moments Of <span className="text-[#f26522]">Impact</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="aspect-square rounded-2xl bg-[#0a0a0a] border border-[#1f2937] overflow-hidden"><img src="/Our Core Initiatives/Plantable Pencils Drive1.jpeg" alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 grayscale hover:grayscale-0"/></div>
                      <div className="aspect-square rounded-2xl bg-[#0a0a0a] border border-[#1f2937] overflow-hidden"><img src="/Our Core Initiatives/Plantable Pencils Drive2.jpeg" alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 grayscale hover:grayscale-0"/></div>
                      <div className="aspect-square rounded-2xl bg-[#0a0a0a] border border-[#1f2937] overflow-hidden"><img src="/Our Core Initiatives/Plantable Pencils Drive3.jpeg" alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 grayscale hover:grayscale-0"/></div>
                    </div>
                  </div>

                  {/* PARTNERS & CALL TO ACTION */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="bg-[#0a0a0a] border border-[#1f2937] p-8 md:p-12 rounded-[40px]">
                      <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight">Who Can Partner With Us?</h3>
                      <ul className="grid grid-cols-2 gap-4">
                        <li className="flex items-center gap-3 text-[#9ca3af]"><Building size={16} className="text-[#f26522]" /> Schools</li>
                        <li className="flex items-center gap-3 text-[#9ca3af]"><Building size={16} className="text-[#f26522]" /> Colleges</li>
                        <li className="flex items-center gap-3 text-[#9ca3af]"><Building size={16} className="text-[#f26522]" /> Corporate CSR</li>
                        <li className="flex items-center gap-3 text-[#9ca3af]"><Building size={16} className="text-[#f26522]" /> NGOs</li>
                        <li className="flex items-center gap-3 text-[#9ca3af]"><Building size={16} className="text-[#f26522]" /> Educational Inst.</li>
                        <li className="flex items-center gap-3 text-[#9ca3af]"><Building size={16} className="text-[#f26522]" /> Social Orgs</li>
                      </ul>
                    </div>
                    
                    <div className="bg-[#050505] border border-[#f26522] p-8 md:p-12 rounded-[40px] flex flex-col justify-center text-center shadow-[0_0_30px_rgba(242,101,34,0.15)]">
                      <h3 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase tracking-tight">Be The Reason A Child Plants Hope.</h3>
                      <p className="text-[#9ca3af] mb-8 font-light">Your support can help us distribute millions more plantable pencils across India. Together, let us transform classrooms into climate action centers.</p>
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
                      <p>"We did not inherit this Earth from our ancestors.</p>
                      <p>We are borrowing it from our children."</p>
                      <p className="text-white font-bold not-italic mt-4">Let's Give Them A Greener Tomorrow.</p>
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
