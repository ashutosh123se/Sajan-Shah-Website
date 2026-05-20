'use client';

import React from 'react';

interface PartnershipModel {
  title: string;
  desc: string;
  type: string;
}

interface PartnershipModelsProps {
  content?: {
    heading?: string;
    subHeading?: string;
    paragraph?: string;
    models?: PartnershipModel[];
  };
}

const DEFAULT_MODELS: PartnershipModel[] = [
  { title: "Academic", desc: "Neuroscience-backed workshops and student development programs.", type: "School Partners" },
  { title: "Corporate", desc: "Employee engagement and dedicated CSR initiatives.", type: "CSR Partners" },
  { title: "Institutional", desc: "Collaborations for large-scale social welfare and advocacy.", type: "NGO Partners" }
];

export const PartnershipModels: React.FC<PartnershipModelsProps> = ({ content }) => {
  const heading = content?.heading || "Partnership Models";
  const subHeading = content?.subHeading || "Collaborations";
  const paragraph = content?.paragraph || "We work with schools, corporations, and NGOs to scale our social impact globally.";
  const models = content?.models || DEFAULT_MODELS;

  return (
    <section className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-[#f26522] font-bold uppercase tracking-[0.3em] text-sm mb-4">{subHeading}</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tighter">{heading}</h3>
          <p className="text-gray-500 font-light max-w-2xl mx-auto italic">{paragraph}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {models.map((item, idx) => (
            <div key={idx} className="p-10 bg-gray-900/30 border border-gray-800 rounded-[2rem] hover:bg-[#f26522] transition-all duration-500 group cursor-pointer">
              <div className="text-gray-500 font-bold text-[10px] uppercase tracking-[0.3em] mb-4 group-hover:text-white/70">{item.type}</div>
              <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-white">{item.title}</h4>
              <p className="text-gray-400 font-light group-hover:text-white/80 mb-8 leading-relaxed">{item.desc}</p>
              <button className="text-[#f26522] font-bold text-xs uppercase tracking-widest group-hover:text-white border-b border-[#f26522] group-hover:border-white pb-1 transition-all bg-transparent border-t-0 border-l-0 border-r-0 cursor-pointer">
                Partner With Us
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
