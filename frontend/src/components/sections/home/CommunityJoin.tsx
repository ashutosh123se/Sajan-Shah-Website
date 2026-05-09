'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
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
      const response = await api.post('/newsletter', formData);
      toast.success('Welcome to the Sajan Shah Community!');
      setFormData({ name: '', email: '', phone: '', whatsappOptIn: false });
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-brand-dark text-white border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight">
            Join Our Global Community
          </h2>
          <div className="w-24 h-1 bg-brand-orange mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 font-medium">
            Get exclusive content, early access to programs, and connect with thousands of learners
          </p>
        </div>
        
        {/* Lead Form */}
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="bg-white/5 border border-white/10 p-10 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-brand-orange uppercase tracking-widest mb-3">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 bg-brand-dark border border-white/20 rounded-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange text-white placeholder-gray-500 transition-all outline-none"
                  placeholder="ENTER YOUR FULL NAME"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-brand-orange uppercase tracking-widest mb-3">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 bg-brand-dark border border-white/20 rounded-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange text-white placeholder-gray-500 transition-all outline-none"
                  placeholder="YOUR.EMAIL@EXAMPLE.COM"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-brand-orange uppercase tracking-widest mb-3">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 bg-brand-dark border border-white/20 rounded-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange text-white placeholder-gray-500 transition-all outline-none"
                  placeholder="+91 98765 43210"
                />
              </div>

              {/* WhatsApp Opt-in */}
              <div className="flex items-center pt-8">
                <input
                  type="checkbox"
                  id="whatsappOptIn"
                  name="whatsappOptIn"
                  checked={formData.whatsappOptIn}
                  onChange={handleInputChange}
                  className="w-6 h-6 text-brand-orange bg-brand-dark border-white/20 rounded-none focus:ring-brand-orange accent-brand-orange cursor-pointer"
                />
                <label htmlFor="whatsappOptIn" className="ml-4 text-sm font-bold text-white uppercase tracking-wider cursor-pointer">
                  Send me updates on WhatsApp
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              size="lg"
              className="w-full py-6 text-xl"
            >
              {loading ? 'JOINING...' : 'JOIN COMMUNITY NOW'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
