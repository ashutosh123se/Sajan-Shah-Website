'use client';
import React from 'react';

export const BrandWriteUp: React.FC = () => {
  return (
    <section className="bg-[#0a0a0a]">
      <div className="flex flex-col lg:flex-row min-h-[750px]">
        {/* Left Text */}
        <div className="lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-10 leading-snug">
            Sajan Shah is one of the youngest motivational speakers in India, widely known as the Memory Man of India, and a globally recognized voice in human transformation.
          </h2>
          <div className="w-16 h-1 bg-[#f26522] mb-10"></div>
          
          <div className="space-y-6 text-gray-400 font-light text-lg md:text-xl leading-relaxed mb-12">
            <p>He is a 3-time TEDx speaker, a speaker at the World Parliament of Religions, and the author of 8 books, impacting over 16 million lives across students, parents, and professionals.</p>
            <p className="text-[#f26522] font-semibold text-2xl pt-6">But titles are not what define his work.</p>
            <p className="text-white font-medium text-2xl">Sajan Shah has dedicated his life to one core mission: to transform how people think, perform, and live by training the brain.</p>
            <p className="pt-4">In a world where people are told to stay motivated, work harder, and push more, very few are taught how to actually think, decide, and perform better. That’s where everything changes.</p>
            <p className="pt-6 font-medium text-white">By combining neuroscience with real-life application, he helps individuals rewire how they:</p>
            <ul className="space-y-3 pl-2">
              <li className="flex items-center"><span className="w-2 h-2 bg-[#f26522] mr-4 rounded-none"></span>think under pressure</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-[#f26522] mr-4 rounded-none"></span>respond to challenges</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-[#f26522] mr-4 rounded-none"></span>build focus and discipline</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-[#f26522] mr-4 rounded-none"></span>perform when it matters most</li>
            </ul>
          </div>
          
          <div className="border-t border-gray-800 pt-10">
            <p className="text-xl text-white font-light mb-8">
              You don’t need more motivation. <br/><span className="font-bold">You need a better operating system.</span>
            </p>
            <button className="bg-[#f26522] hover:bg-[#d95a1e] text-white px-10 py-5 font-bold transition-colors inline-block uppercase tracking-widest text-sm" onClick={() => window.location.href = '/about'}>
              Discover The Journey
            </button>
          </div>
        </div>

        {/* Right Image (Full Bleed) */}
        <div className="lg:w-1/2 relative min-h-[400px] bg-[#111] border-l border-gray-900">
          {/* Placeholder for actual image spanning the right side */}
          <div className="absolute inset-0 bg-gray-800">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-700 to-[#111] opacity-50"></div>
             <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-black text-4xl uppercase tracking-widest">
               Sajan Shah on Stage
             </div>
          </div>
          
          {/* Overlay Box matching "This is not theory" manifesto */}
          <div className="absolute bottom-12 right-12 left-12 lg:left-[-4rem] bg-[#151515] p-10 md:p-12 border border-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10">
            <h3 className="text-3xl font-black text-white mb-2 tracking-tighter uppercase">This is not theory.</h3>
            <h3 className="text-3xl font-black text-[#f26522] mb-8 tracking-tighter uppercase">This is applied brain transformation.</h3>
            
            <p className="text-gray-400 mb-8 font-light text-lg">From classrooms to global platforms, his work has consistently turned:</p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 text-sm font-bold text-white tracking-widest uppercase">
              <span className="border border-gray-700 bg-gray-900 px-5 py-3">Confusion → Clarity</span>
              <span className="border border-gray-700 bg-gray-900 px-5 py-3">Stress → Control</span>
              <span className="border border-gray-700 bg-gray-900 px-5 py-3">Potential → Performance</span>
            </div>
            
            <p className="text-gray-400 font-light mt-10 pt-8 border-t border-gray-800 leading-relaxed">
              He is also the founder of United First and Live to Inspire, driving large-scale impact and social change towards UN SDG 2030.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
