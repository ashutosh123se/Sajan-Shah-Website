'use client';
import React from 'react';

export const LogoStrip: React.FC = () => {
  const logos = ["Forbes", "TEDx", "Times of India", "BBC", "CNN", "Economic Times", "Fortune", "Hindustan Times"];

  return (
    <section className="bg-black pt-24 pb-0 overflow-hidden">
      {/* Logos Section - Infinite Scroll Style */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 overflow-hidden">
        <h2 className="text-center text-xs md:text-sm text-gray-600 uppercase tracking-[0.4em] font-bold mb-16">Recognized Globally & Trusted by Millions</h2>
        
        <div className="relative group overflow-hidden">
          {/* Faded edges overlay */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10"></div>

          <div className="flex animate-scroll whitespace-nowrap hover:pause">
            {[...logos, ...logos].map((logo, idx) => (
              <div 
                key={idx} 
                className="text-2xl md:text-4xl font-black text-gray-700 mx-10 md:mx-16 uppercase tracking-tighter transition-all duration-500 hover:text-[#f26522] cursor-default"
                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.05)' }}
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subscribe Banner - Cinematic Inset */}
      <div id="newsletter-section" className="w-full bg-[#0a0a0a] py-24 lg:py-32 border-t border-gray-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24 relative z-10">
          
          {/* Left: Premium Visual Composition */}
          <div className="lg:w-1/2 relative h-80 w-full flex items-center justify-center lg:justify-start">
             {/* Glowing light behind the visual */}
             <div className="absolute top-1/2 left-1/2 lg:left-1/3 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#f26522]/10 rounded-full filter blur-[80px]"></div>
             
             <div className="relative group">
                {/* Visual Representation of knowledge cards */}
                <div className="w-48 h-64 md:w-56 md:h-72 bg-[#111] border border-gray-800 shadow-[30px_30px_60px_rgba(0,0,0,0.8)] transform -rotate-12 transition-transform group-hover:-rotate-6 duration-700 z-20 flex flex-col justify-between p-6 rounded-sm">
                  <div className="h-4 w-full bg-[#f26522]"></div>
                  <div className="text-white text-xs font-bold mt-4 uppercase tracking-widest">Neuroscience</div>
                  <div className="flex-1 mt-6 space-y-3">
                    <div className="h-2 bg-gray-800 w-full"></div>
                    <div className="h-2 bg-gray-800 w-5/6"></div>
                    <div className="h-2 bg-gray-800 w-4/6"></div>
                  </div>
                </div>
                <div className="absolute top-0 left-12 w-48 h-64 md:w-56 md:h-72 bg-[#151515] border border-gray-800 shadow-[30px_30px_60px_rgba(0,0,0,0.8)] transform rotate-12 transition-transform group-hover:rotate-6 duration-700 z-10 flex flex-col justify-between p-6 rounded-sm">
                  <div className="h-4 w-full bg-white/10"></div>
                  <div className="text-gray-400 text-xs font-bold mt-4 uppercase tracking-widest">Strategies</div>
                  <div className="flex-1 mt-6 space-y-3">
                    <div className="h-2 bg-gray-800/50 w-full"></div>
                    <div className="h-2 bg-gray-800/50 w-3/4"></div>
                  </div>
                </div>
             </div>
          </div>

          {/* Right: Persuasive Call to Action */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-10 leading-[1.2] tracking-tight italic">
              "Master your <span className="font-bold">mind</span>. Master your <span className="font-bold text-[#f26522]">performance</span>."
            </h2>
            <p className="text-gray-400 text-lg mb-12 font-light leading-relaxed max-w-xl">
              Get weekly neuroscience-backed insights and strategies directly from Sajan Shah. No fluff, just pure transformation.
            </p>
            
            <form 
              className="flex flex-col gap-4 w-full max-w-lg mx-auto lg:mx-0" 
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as any;
                const name = form.fullName.value;
                const phone = form.phone.value;
                const email = form.email.value;
                if (!email || !name || !phone) return;
                try {
                  const api = (await import('@/lib/api')).default;
                  const toast = (await import('react-hot-toast')).default;
                  await api.post('/newsletter', { name, phone, email, source: 'logo-strip-subscribe' });
                  toast.success('Welcome aboard!');
                  form.fullName.value = '';
                  form.phone.value = '';
                  form.email.value = '';
                } catch (err) {
                  const toast = (await import('react-hot-toast')).default;
                  toast.error('Failed to subscribe');
                }
              }}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="text" 
                  name="fullName"
                  placeholder="Your full name" 
                  className="px-6 py-5 bg-[#151515] border border-gray-800 text-white outline-none w-full sm:flex-1 text-sm md:text-base font-light focus:border-[#f26522] transition-colors" 
                  required 
                />
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Phone number" 
                  className="px-6 py-5 bg-[#151515] border border-gray-800 text-white outline-none w-full sm:flex-1 text-sm md:text-base font-light focus:border-[#f26522] transition-colors" 
                  required 
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Your email address" 
                  className="px-6 py-5 bg-[#151515] border border-gray-800 text-white outline-none w-full sm:flex-1 text-sm md:text-base font-light focus:border-[#f26522] transition-colors" 
                  required 
                />
                <button 
                  type="submit" 
                  className="bg-[#f26522] hover:bg-[#d95a1e] text-white px-10 py-5 font-bold tracking-[0.2em] uppercase text-xs transition-all duration-300 shadow-[0_10px_20px_rgba(242,101,34,0.2)]"
                >
                  Join Now
                </button>
              </div>
            </form>
            <p className="text-[10px] text-gray-600 mt-6 uppercase tracking-widest font-bold">Join 100k+ subscribers on the journey.</p>
          </div>
          
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
