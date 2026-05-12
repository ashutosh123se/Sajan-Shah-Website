'use client';
import React from 'react';

export const BrandWriteUp: React.FC = () => {
  return (
    <section className="relative min-h-[850px] lg:min-h-[1000px] bg-black overflow-hidden flex items-center">
      {/* Background Image - Full Bleed with Narrative Fade */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/sajan sir.png" 
          alt="Sajan Shah Live on Stage" 
          className="w-full h-full object-cover opacity-90"
        />
        {/* Deep Gradient for Text Legibility - Fading from Black on the left to Transparent on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
        {/* Bottom fade to blend with next section */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left: Article/Story Content - Positioned over the faded area */}
          <div className="lg:w-7/12 py-24">
            <div className="space-y-6 text-white/90 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              <h2 className="text-white/20 text-7xl md:text-8xl font-black absolute -top-12 -left-4 select-none -z-10 tracking-tighter">
                SAJAN
              </h2>
              
              <p className="font-medium text-white text-xl md:text-2xl leading-snug">
                Sajan Shah has made it his life's work to demystify the 
                human potential process, reframe what it is to "win" and 
                help people embrace new skills that empower 
                confidence, overcome fears and instantaneous impact 
                bottom line results.
              </p>

              <p>
                Every person in every business has something to achieve.
              </p>

              <p>
                Helping people to truly understand how they can 
                positively impact on the decision-making process, drive 
                results AND maintain integrity, empowers people to 
                realize more of their untapped potential.
              </p>

              <p className="italic text-[#f26522] font-medium border-l-2 border-[#f26522] pl-6 py-2">
                He is by no means your typical motivational speaker.
              </p>

              <p>
                Sajan's famous for not just "talking" about the strategies, but 
                showing your audience "Exactly" how to use them.
              </p>

              <p>
                By teaching the exact word choices to increase influence and 
                persuasion, audiences walk away with a new perception of 
                their own capability.
              </p>

              <p>
                Just imagine the increased confidence from knowing "Exactly 
                What To Do" and with an insatiable hunger to put the new 
                learnings into action.
              </p>

              <p>
                Having delivered over 2,500 presentations, in over 800 
                different industries, spanning over 50 countries and five 
                continents, you have the confidence of working with a 
                seasoned professional with an enviable track record and a 
                genuine human that is committed to adding massive value to 
                your event.
              </p>

              <div className="pt-10">
                <button className="bg-[#f26522] hover:bg-[#d95a1e] text-white px-12 py-5 font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_0_30px_rgba(242,101,34,0.3)]">
                  Learn more about Sajan Shah
                </button>
              </div>
            </div>
          </div>

          {/* Right: Empty spacer to allow the background image of Sajan to be visible */}
          <div className="lg:w-5/12 hidden lg:block"></div>

        </div>
      </div>
    </section>
  );
};
