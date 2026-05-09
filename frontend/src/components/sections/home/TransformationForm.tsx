'use client';
import React, { useState } from 'react';

export const TransformationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '', org: '', email: '', phone: '', startDate: '', endDate: '', location: '', info: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <section className="bg-[#0a0a0a]">
      <div className="flex flex-col lg:flex-row min-h-[600px]">
        {/* Left Side - Orange */}
        <div className="lg:w-1/2 bg-[#f26522] p-12 lg:p-24 flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-xl mx-auto tracking-wide">
            Start Your Transformation Conversation
          </h2>
          <p className="text-lg md:text-xl text-white mt-8 font-medium leading-relaxed max-w-lg mx-auto">
            Tell us about your event, audience, or requirement, and let’s design an experience that drives real impact, not just motivation.
          </p>
          <div className="mt-12 bg-black/10 p-6 border-l-4 border-white max-w-lg mx-auto text-left w-full shadow-inner">
            <p className="text-lg font-bold text-white">
              Trusted by 16M+ lives impacted, global platforms, and institutions across India.
            </p>
          </div>
        </div>
        
        {/* Right Side - Black Form */}
        <div className="lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center bg-[#0a0a0a]">
          <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input type="text" name="name" placeholder="Full name *" required onChange={handleChange} className="w-full px-5 py-4 bg-[#151515] border border-[#222] text-white placeholder-gray-500 focus:border-[#f26522] focus:bg-[#1a1a1a] outline-none transition-colors" />
              <input type="text" name="org" placeholder="Organization" onChange={handleChange} className="w-full px-5 py-4 bg-[#151515] border border-[#222] text-white placeholder-gray-500 focus:border-[#f26522] focus:bg-[#1a1a1a] outline-none transition-colors" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input type="email" name="email" placeholder="Email address *" required onChange={handleChange} className="w-full px-5 py-4 bg-[#151515] border border-[#222] text-white placeholder-gray-500 focus:border-[#f26522] focus:bg-[#1a1a1a] outline-none transition-colors" />
              <input type="tel" name="phone" placeholder="Telephone number *" required onChange={handleChange} className="w-full px-5 py-4 bg-[#151515] border border-[#222] text-white placeholder-gray-500 focus:border-[#f26522] focus:bg-[#1a1a1a] outline-none transition-colors" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input type="text" name="startDate" placeholder="Event start date" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => !e.target.value && (e.target.type = 'text')} onChange={handleChange} className="w-full px-5 py-4 bg-[#151515] border border-[#222] text-white placeholder-gray-500 focus:border-[#f26522] focus:bg-[#1a1a1a] outline-none transition-colors" />
              <input type="text" name="endDate" placeholder="Event end date" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => !e.target.value && (e.target.type = 'text')} onChange={handleChange} className="w-full px-5 py-4 bg-[#151515] border border-[#222] text-white placeholder-gray-500 focus:border-[#f26522] focus:bg-[#1a1a1a] outline-none transition-colors" />
            </div>
            <div className="mb-4">
              <input type="text" name="location" placeholder="Event location" onChange={handleChange} className="w-full px-5 py-4 bg-[#151515] border border-[#222] text-white placeholder-gray-500 focus:border-[#f26522] focus:bg-[#1a1a1a] outline-none transition-colors" />
            </div>
            <div className="mb-8">
              <textarea name="info" rows={5} placeholder="Any additional information?" onChange={handleChange} className="w-full px-5 py-4 bg-[#151515] border border-[#222] text-white placeholder-gray-500 focus:border-[#f26522] focus:bg-[#1a1a1a] outline-none transition-colors resize-none"></textarea>
            </div>
            
            <button type="submit" className="bg-[#f26522] hover:bg-[#d95a1e] text-white font-bold py-4 px-12 transition-colors inline-block tracking-wide">
              Send
            </button>
            <p className="text-xs font-semibold text-gray-600 mt-6 uppercase tracking-widest">
              From high-energy keynotes to deep transformation sessions.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
