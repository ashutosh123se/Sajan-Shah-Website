'use client';
import React from 'react';
import { Check } from 'lucide-react';

export const VolunteerCTA: React.FC = () => {
  return (
    <section className="py-32 bg-black border-y border-gray-900">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-20 items-center">
        <div className="lg:w-1/2">
          <h2 className="text-[#f26522] font-bold uppercase tracking-[0.3em] text-sm mb-4">Join The Movement</h2>
          <h3 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter uppercase leading-none">BECOME AN <br /> AMBASSADOR</h3>
          <p className="text-gray-400 text-lg font-light leading-relaxed mb-10">
            We are looking for passionate individuals, CSR partners, and ESG advocates to join us in our mission to transform education and social welfare.
          </p>
          <div className="space-y-6">
            {[
              { t: "Volunteer Opportunities", d: "Contribute your time and skills on the field." },
              { t: "CSR Partnership", d: "Align your corporate social responsibility with us." },
              { t: "ESG Partnership", d: "Strategic environmental and social governance." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-[#f26522] flex-shrink-0 group-hover:bg-[#f26522] group-hover:text-white transition-all">
                  <Check size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">{item.t}</h4>
                  <p className="text-gray-500 text-sm">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-1/2 w-full">
          <form className="bg-[#0a0a0a] p-8 md:p-12 rounded-[2rem] border border-gray-800 space-y-4" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Your Name" className="w-full px-6 py-4 bg-gray-900/50 border border-gray-800 rounded-xl focus:ring-1 focus:ring-[#f26522] outline-none text-white" required />
              <input type="email" placeholder="Email Address" className="w-full px-6 py-4 bg-gray-900/50 border border-gray-800 rounded-xl focus:ring-1 focus:ring-[#f26522] outline-none text-white" required />
            </div>
            <input type="tel" placeholder="Phone Number" className="w-full px-6 py-4 bg-gray-900/50 border border-gray-800 rounded-xl focus:ring-1 focus:ring-[#f26522] outline-none text-white" required />
            <input type="text" placeholder="Organization (Optional)" className="w-full px-6 py-4 bg-gray-900/50 border border-gray-800 rounded-xl focus:ring-1 focus:ring-[#f26522] outline-none text-white" />
            <select className="w-full px-6 py-4 bg-gray-900/50 border border-gray-800 rounded-xl focus:ring-1 focus:ring-[#f26522] outline-none appearance-none text-gray-400" required>
              <option value="">Select Role</option>
              <option value="volunteer">Volunteer</option>
              <option value="csr">CSR Partner</option>
              <option value="esg">ESG Partner</option>
            </select>
            <button type="submit" className="w-full bg-[#f26522] hover:bg-white hover:text-black text-white font-bold py-5 rounded-xl transition-all duration-300 uppercase tracking-widest text-xs">
              Apply Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
