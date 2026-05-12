'use client';

import React, { useState } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export const CommunityJoin: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsappOptIn: false,
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    try {
      await api.post('/newsletter', formData);
      toast.success('Welcome to the Sajan Shah Community!');
      setFormData({ name: '', email: '', phone: '', whatsappOptIn: false });
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-[#0a0a0a] text-white overflow-hidden relative">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f26522]/5 rounded-full filter blur-[120px] -z-0"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full filter blur-[100px] -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16">
            <p className="text-[#f26522] font-bold text-xs tracking-[0.5em] uppercase mb-4">Elite Access</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 tracking-tight">
              Join Our Global <span className="font-bold">Movement.</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
              Get exclusive cognitive insights, priority access to live transformations, and join a community of 16 million impact-makers.
            </p>
          </div>
          
          {/* Lead Form with Glassmorphism */}
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="bg-[#111] bg-opacity-50 backdrop-blur-xl border border-gray-800 p-8 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.4)] rounded-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-[0.2em]">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-0 py-3 bg-transparent border-b border-gray-800 focus:border-[#f26522] outline-none text-white transition-all placeholder-gray-700"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-[0.2em]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-0 py-3 bg-transparent border-b border-gray-800 focus:border-[#f26522] outline-none text-white transition-all placeholder-gray-700"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-[0.2em]">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-0 py-3 bg-transparent border-b border-gray-800 focus:border-[#f26522] outline-none text-white transition-all placeholder-gray-700"
                    placeholder="+91 00000 00000"
                  />
                </div>

                {/* WhatsApp Opt-in */}
                <div className="flex items-center">
                  <label className="flex items-center cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="whatsappOptIn"
                        name="whatsappOptIn"
                        checked={formData.whatsappOptIn}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className={`w-10 h-5 rounded-full transition-colors ${formData.whatsappOptIn ? 'bg-[#f26522]' : 'bg-gray-800'}`}></div>
                      <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${formData.whatsappOptIn ? 'translate-x-5' : ''}`}></div>
                    </div>
                    <span className="ml-4 text-xs text-gray-500 font-medium group-hover:text-gray-300 transition-colors">
                      Send me updates on WhatsApp
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#f26522] hover:bg-[#d95a1e] text-white py-5 font-bold text-xs uppercase tracking-[0.3em] transition-all shadow-[0_10px_30px_rgba(242,101,34,0.3)]"
              >
                {loading ? 'Processing...' : 'Join The Community'}
              </button>
              
              <p className="mt-6 text-center text-[10px] text-gray-600 font-medium tracking-widest uppercase">
                Zero Spam. Pure Transformation.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
