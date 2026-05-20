'use client';

import React from 'react';
import { FileCheck } from 'lucide-react';

interface DownloadReport {
  title: string;
  size: string;
}

interface DownloadCentreProps {
  content?: {
    heading?: string;
    paragraph?: string;
    reports?: DownloadReport[];
  };
}

const DEFAULT_REPORTS: DownloadReport[] = [
  { title: "Annual Impact Report", size: "4.2 MB" },
  { title: "ESG Compliance Report", size: "2.1 MB" }
];

const COLORS = ["bg-[#f26522]", "bg-gray-700"];

export const DownloadCentre: React.FC<DownloadCentreProps> = ({ content }) => {
  const heading = content?.heading || "OUR EXECUTION REPORT";
  const paragraph = content?.paragraph || "We maintain absolute transparency in our social operations. Access our audit-ready impact reports and ESG compliance documents below. All data is verified by third-party auditors.";
  const reports = content?.reports || DEFAULT_REPORTS;

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-gray-900/50 to-black border border-gray-800 rounded-[3rem] p-12 md:p-20 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-2/3">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tighter">{heading}</h2>
            <p className="text-gray-400 font-light mb-10 max-w-2xl leading-relaxed">
              {paragraph}
            </p>
            <div className="flex flex-wrap gap-6">
              {reports.map((doc, idx) => (
                <button key={idx} className="flex items-center gap-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-5 rounded-2xl transition-all group cursor-pointer">
                  <span className={`w-10 h-10 rounded-lg ${COLORS[idx % COLORS.length]} flex items-center justify-center text-[10px] font-bold group-hover:scale-110 transition-transform`}>PDF</span>
                  <div className="text-left">
                    <div className="text-[10px] font-bold uppercase tracking-wider mb-1">{doc.title}</div>
                    <div className="text-[10px] text-gray-500 italic uppercase">Download ({doc.size})</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="lg:w-1/3">
            <div className="w-full aspect-[4/5] bg-gray-900 border border-gray-800 rounded-[2rem] flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#f26522]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-center relative z-10">
                <div className="text-[#f26522] mb-6">
                  <FileCheck size={80} />
                </div>
                <div className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.3em]">Execution Quality Verified</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
