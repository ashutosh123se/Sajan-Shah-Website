import React from 'react';
import { Button } from '@/components/ui/Button';

export default function EventsCTA() {
  return (
    <section id="book-sajan" className="py-32 relative overflow-hidden bg-white text-black">
      <div className="absolute inset-0 bg-brand-orange opacity-5"></div>
      <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10 text-center">
        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-normal mb-10 leading-[1.1]">Invite Sajan Shah for <br /> an <span className="text-brand-orange">Event</span></h2>
        <p className="text-xl text-gray-700 mb-16 max-w-2xl mx-auto">Transform your organisation, school, or corporate team with a highly customized and impactful session by Sajan Shah.</p>

        <div className="text-left max-w-3xl mx-auto w-full">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">Organisation Name</label>
                <input type="text" className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-brand-orange text-black" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">Contact Person</label>
                <input type="text" className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-brand-orange text-black" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">Email Address</label>
                <input type="email" className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-brand-orange text-black" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">Phone Number</label>
                <input type="tel" className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-brand-orange text-black" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">Event Type</label>
                <select className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-brand-orange text-black">
                  <option>Corporate Seminar</option>
                  <option>School/College Event</option>
                  <option>Public Talk</option>
                  <option>Private Workshop</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">Expected City / Location</label>
                <input type="text" className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-brand-orange text-black" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">Short Description / Objective</label>
              <textarea rows={4} className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-brand-orange resize-none text-black"></textarea>
            </div>

            <Button className="w-full bg-brand-orange text-white hover:bg-black hover:text-white font-black uppercase tracking-widest py-4 text-sm rounded-xl transition-all">
              Book Sajan For Your Event
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
