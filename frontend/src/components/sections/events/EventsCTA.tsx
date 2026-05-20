import React from 'react';
import { Button } from '@/components/ui/Button';

export default function EventsCTA() {
  return (
    <section id="book-sajan" className="py-32 relative overflow-hidden bg-[#ebebeb] text-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-16 items-center">
        {/* Left Side: Image */}
        <div className="relative w-full h-full flex items-center justify-start lg:-ml-24">
          <img src="/an Event.png" alt="Sajan Shah Event" className="w-[135%] h-auto max-h-[850px] object-contain object-left scale-110" />
        </div>

        {/* Right Side: Content & Form */}
        <div className="text-left flex flex-col justify-center">
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-normal mb-6 leading-[1.1]">Invite Sajan Shah for <br /> an <span className="text-brand-orange">Event</span></h2>
          <p className="text-lg text-gray-600 mb-10 max-w-xl">Transform your organisation, school, or corporate team with a highly customized and impactful session by Sajan Shah.</p>

          <div className="w-full">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">Organisation Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-brand-orange text-black transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">Contact Person</label>
                  <input type="text" className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-brand-orange text-black transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">Email Address</label>
                  <input type="email" className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-brand-orange text-black transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">Phone Number</label>
                  <input type="tel" className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-brand-orange text-black transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">Event Type</label>
                  <select className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-brand-orange text-black transition-colors">
                    <option>Corporate Seminar</option>
                    <option>School/College Event</option>
                    <option>Public Talk</option>
                    <option>Private Workshop</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">Expected City / Location</label>
                  <input type="text" className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-brand-orange text-black transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">Short Description / Objective</label>
                <textarea rows={4} className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-brand-orange resize-none text-black transition-colors"></textarea>
              </div>

              <Button className="w-full bg-brand-orange text-white hover:bg-black hover:text-white font-black uppercase tracking-widest py-4 text-sm rounded-xl transition-all">
                Book Sajan For Your Event
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
