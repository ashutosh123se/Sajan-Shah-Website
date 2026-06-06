'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BulkOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BulkOrderModal: React.FC<BulkOrderModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    quantity: '',
    requirements: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Auto close after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ fullName: '', organization: '', email: '', phone: '', quantity: '', requirements: '' });
        onClose();
      }, 3000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto overflow-x-hidden">
          {/* Overlay with strong blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#020817]/60 backdrop-blur-xl transition-all"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0 }}
            className="relative w-full max-w-3xl my-auto"
          >
            {/* Glowing effect behind modal */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#f26522]/30 to-blue-600/30 rounded-[35px] blur-xl opacity-50" />
            
            {/* Modal Body with Frosted Glass Effect */}
            <div className="relative bg-[#050505]/95 backdrop-blur-3xl border border-gray-800 rounded-[30px] shadow-2xl overflow-hidden p-8 sm:p-12">
              
              {/* Background Logo Watermark */}
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none select-none flex items-center justify-center overflow-hidden z-0">
                <div className="flex flex-col items-center transform -rotate-12">
                  <div className="flex items-baseline text-6xl sm:text-7xl tracking-tighter whitespace-nowrap">
                    <span className="font-light text-white uppercase">sajan</span>
                    <span className="font-black text-white uppercase"><span className="text-[#f26522]">s</span>hah</span>
                  </div>
                  <div className="flex items-center mt-2 w-[90%] mx-auto">
                    <div className="h-[1px] bg-[#f26522] flex-grow"></div>
                    <span className="mx-4 text-[10px] sm:text-xs text-white font-medium lowercase tracking-[0.2em] whitespace-nowrap">
                      shift your story. shape your success.
                    </span>
                    <div className="h-[1px] bg-[#f26522] flex-grow"></div>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-[#f26522] hover:text-[#f26522] transition-all z-20 group"
              >
                <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-10">
                  <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-3">
                    Bulk Order Inquiry
                  </h3>
                  <p className="text-gray-400 font-light text-sm sm:text-base">
                    Fill the details and our team will contact you soon.
                  </p>
                </div>

                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-[#f26522]/20 border border-[#f26522] flex items-center justify-center mb-6">
                      <svg className="w-10 h-10 text-[#f26522]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">Inquiry Submitted Successfully</h4>
                    <p className="text-gray-400">Our institutional team will reach out within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Full Name */}
                      <div className="relative group">
                        <input
                          type="text"
                          name="fullName"
                          id="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="peer w-full bg-white/5 border border-white/10 text-white rounded-xl px-5 pt-7 pb-3 outline-none focus:border-[#f26522] focus:bg-white/10 transition-all placeholder-transparent"
                          placeholder="Full Name"
                        />
                        <label 
                          htmlFor="fullName" 
                          className="absolute left-5 top-5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#f26522] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-400"
                        >
                          Full Name
                        </label>
                      </div>

                      {/* Organization Name */}
                      <div className="relative group">
                        <input
                          type="text"
                          name="organization"
                          id="organization"
                          value={formData.organization}
                          onChange={handleChange}
                          required
                          className="peer w-full bg-white/5 border border-white/10 text-white rounded-xl px-5 pt-7 pb-3 outline-none focus:border-[#f26522] focus:bg-white/10 transition-all placeholder-transparent"
                          placeholder="Organization Name"
                        />
                        <label 
                          htmlFor="organization" 
                          className="absolute left-5 top-5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#f26522] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-400"
                        >
                          Organization Name
                        </label>
                      </div>

                      {/* Email Address */}
                      <div className="relative group">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="peer w-full bg-white/5 border border-white/10 text-white rounded-xl px-5 pt-7 pb-3 outline-none focus:border-[#f26522] focus:bg-white/10 transition-all placeholder-transparent"
                          placeholder="Email Address"
                        />
                        <label 
                          htmlFor="email" 
                          className="absolute left-5 top-5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#f26522] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-400"
                        >
                          Email Address
                        </label>
                      </div>

                      {/* Phone Number */}
                      <div className="relative group">
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="peer w-full bg-white/5 border border-white/10 text-white rounded-xl px-5 pt-7 pb-3 outline-none focus:border-[#f26522] focus:bg-white/10 transition-all placeholder-transparent"
                          placeholder="Phone Number"
                        />
                        <label 
                          htmlFor="phone" 
                          className="absolute left-5 top-5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#f26522] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-400"
                        >
                          Phone Number
                        </label>
                      </div>
                    </div>

                    {/* Required Quantity */}
                    <div className="relative group">
                      <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        min="1"
                        className="peer w-full bg-white/5 border border-white/10 text-white rounded-xl px-5 pt-7 pb-3 outline-none focus:border-[#f26522] focus:bg-white/10 transition-all placeholder-transparent"
                        placeholder="Required Quantity"
                      />
                      <label 
                        htmlFor="quantity" 
                        className="absolute left-5 top-5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#f26522] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-400"
                      >
                        Required Quantity
                      </label>
                    </div>

                    {/* Additional Requirements */}
                    <div className="relative group">
                      <textarea
                        name="requirements"
                        id="requirements"
                        value={formData.requirements}
                        onChange={handleChange}
                        rows={4}
                        className="peer w-full bg-white/5 border border-white/10 text-white rounded-xl px-5 pt-7 pb-3 outline-none focus:border-[#f26522] focus:bg-white/10 transition-all placeholder-transparent resize-none"
                        placeholder="Additional Requirements"
                      />
                      <label 
                        htmlFor="requirements" 
                        className="absolute left-5 top-5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#f26522] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-400"
                      >
                        Additional Requirements
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#f26522] hover:bg-[#d95a1e] text-white font-bold py-5 rounded-xl uppercase tracking-widest text-sm transition-all duration-300 shadow-[0_10px_20px_rgba(242,101,34,0.3)] hover:shadow-[0_15px_30px_rgba(242,101,34,0.4)] disabled:opacity-70 flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <img src="/loding.png" alt="Loading" className="animate-spin object-contain h-10 w-10 inline-block" />
                      ) : (
                        "Submit Inquiry"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
