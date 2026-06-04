'use client';
import React from 'react';
import { FileCheck } from 'lucide-react';

interface DownloadCentreProps {
  content?: any;
}

export const DownloadCentre: React.FC<DownloadCentreProps> = ({ content }) => {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-gray-900/50 to-black border border-gray-800 rounded-[3rem] p-12 md:p-20 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-2/3">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tighter">OUR EXECUTION REPORT</h2>
            <p className="text-gray-400 font-light mb-10 max-w-2xl leading-relaxed">
              We maintain absolute transparency in our social operations. Access our audit-ready impact reports and ESG compliance documents below. All data is verified by third-party auditors.
            </p>
            <div className="flex flex-wrap gap-6">
              {[
                { t: "Annual Impact Report", s: "4.2 MB", c: "bg-[#f26522]", file: "/Live to Inspire.pdf" },
                { t: "ESG Compliance Report", s: "2.1 MB", c: "bg-gray-700", file: "#" }
              ].map((doc, idx) => (
                <a key={idx} href={doc.file} download className="flex items-center gap-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-5 rounded-2xl transition-all group cursor-pointer w-full sm:w-auto">
                  <span className={`w-10 h-10 rounded-lg ${doc.c} flex items-center justify-center text-[10px] font-bold group-hover:scale-110 transition-transform shrink-0`}>PDF</span>
                  <div className="text-left">
                    <div className="text-[10px] font-bold uppercase tracking-wider mb-1">{doc.t}</div>
                    <div className="text-[10px] text-gray-500 italic uppercase">Download ({doc.s})</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="lg:w-1/3">
            <div className="w-full aspect-[4/5] bg-gray-900 border border-gray-800 rounded-[2rem] flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 z-0">
                <img src="/PDF.png" alt="Execution Quality Verified" className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#f26522]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 pointer-events-none"></div>
              <div className="text-center absolute bottom-8 left-0 right-0 z-20">
                <div className="text-[10px] text-white/90 uppercase font-bold tracking-[0.3em] drop-shadow-md">Execution Quality Verified</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
