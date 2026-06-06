'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const ContactInfo: React.FC = () => {
  return (
    <div className="lg:col-span-5 bg-black p-8 md:p-12 flex flex-col justify-center text-white border border-black rounded-sm shadow-xl min-h-[500px]">
      {/* Bookings & Support */}
      <div className="mb-12">
        <h3 className="text-[#f26522] text-xs font-bold uppercase tracking-[0.3em] mb-4">Bookings & Support</h3>
        <h4 className="text-2xl font-light mb-4">Start the Conversation</h4>
        <p className="text-gray-400 text-sm font-light mb-6">
          For event bookings, speaking inquiries, partnerships, or support:
        </p>
        <div className="space-y-1">
          <a href="mailto:support.ind@sajanshah.com" className="text-xl font-bold text-white hover:text-[#f26522] transition-colors">
            support.ind@sajanshah.com
          </a>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest">Response Time: Within 24-48 hours</p>
        </div>
      </div>

      {/* Direct Contact Team */}
      <div className="border-t border-white/10 pt-8">
        <h3 className="text-[#f26522] text-xs font-bold uppercase tracking-[0.3em] mb-6">Direct Contact Team</h3>
        <p className="text-gray-400 text-xs font-light mb-6 italic">For faster coordination and execution:</p>
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
            <span className="font-bold">Ritu</span>
            <span className="text-gray-300">+91 8511 363376</span>
          </div>
          <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
            <span className="font-bold">Rika</span>
            <span className="text-gray-300">+91 9426 861925</span>
          </div>
          <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
            <span className="font-bold">Mittal</span>
            <span className="text-gray-300">+91 7801986496</span>
          </div>
          <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
            <span className="font-bold">Ruthika</span>
            <span className="text-gray-300">+91 70439 53846</span>
          </div>
        </div>
      </div>
    </div>
  );
};
