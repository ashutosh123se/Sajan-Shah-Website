'use client';
import React from 'react';

export const PartnershipModels: React.FC = () => {
  return (
    <section className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-[#f26522] font-bold uppercase tracking-[0.3em] text-sm mb-4">Collaborations</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tighter">Partnership Models</h3>
          <p className="text-gray-500 font-light max-w-2xl mx-auto italic">We work with schools, corporations, and NGOs to scale our social impact globally.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Academic", desc: "Neuroscience-backed workshops and student development programs.", type: "School Partners" },
            { title: "Corporate", desc: "Employee engagement and dedicated CSR initiatives.", type: "CSR Partners" },
            { title: "Social Organization", desc: "Collaborations for large-scale social welfare and advocacy.", type: "NGO Partners" },
          ].map((item, idx) => {
            const isHighlighted = idx === 2;
            return (
              <div key={idx} className={`p-10 border rounded-[2rem] transition-all duration-500 group cursor-pointer ${isHighlighted ? 'bg-[#f26522] border-[#f26522]' : 'bg-gray-900/30 border-gray-800 hover:bg-[#f26522]'}`}>
                <div className={`font-bold text-[10px] uppercase tracking-[0.3em] mb-4 ${isHighlighted ? 'text-white/70' : 'text-gray-500 group-hover:text-white/70'}`}>{item.type}</div>
                <h4 className="text-2xl font-bold text-white mb-4">{item.title}</h4>
                <p className={`font-light mb-8 leading-relaxed ${isHighlighted ? 'text-white/90' : 'text-gray-400 group-hover:text-white/80'}`}>{item.desc}</p>
                <button className={`font-bold text-xs uppercase tracking-widest border-b pb-1 transition-all ${isHighlighted ? 'text-white border-white' : 'text-[#f26522] border-[#f26522] group-hover:text-white group-hover:border-white'}`}>Partner With Us</button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
