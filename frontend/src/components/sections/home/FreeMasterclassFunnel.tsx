'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export const FreeMasterclassFunnel: React.FC = () => {
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
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    try {
      const response = await api.post('/newsletter', {
        ...formData,
        source: 'masterclass-funnel',
      });
      
      toast.success('Registration successful! Check your email for masterclass details.');
      setFormData({ name: '', email: '', phone: '', whatsappOptIn: false });
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-brand-orange text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Headline */}
          <div className="text-center lg:text-left">
            <h2 className="text-5xl md:text-6xl font-black mb-6 uppercase tracking-tight text-white drop-shadow-lg">
              Free Masterclass
            </h2>
            <div className="w-24 h-2 bg-brand-dark mx-auto lg:mx-0 mb-8"></div>
            <p className="text-2xl md:text-3xl mb-10 font-bold text-white uppercase tracking-wide leading-snug">
              Unlock Your Memory Potential in 90 Minutes
            </p>
            <div className="space-y-8">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-brand-dark flex-shrink-0 flex items-center justify-center border-4 border-white">
                  <svg className="w-8 h-8 text-brand-orange" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 .895 3 2-1.343 2-3 2zm0 8c1.11 0 2.08.402 2.599-1M12 8V7l-8 5v3l8-2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-widest text-brand-dark drop-shadow-sm">Live Session</h3>
                  <p className="text-white font-bold text-lg mt-1">Join Sajan Shah live online</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-brand-dark flex-shrink-0 flex items-center justify-center border-4 border-white">
                  <svg className="w-8 h-8 text-brand-orange" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-widest text-brand-dark drop-shadow-sm">Proven Techniques</h3>
                  <p className="text-white font-bold text-lg mt-1">Science-backed memory methods</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-brand-dark flex-shrink-0 flex items-center justify-center border-4 border-white">
                  <svg className="w-8 h-8 text-brand-orange" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7m0 0v7l9-11h-7z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-widest text-brand-dark drop-shadow-sm">Immediate Results</h3>
                  <p className="text-white font-bold text-lg mt-1">Apply strategies instantly</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-brand-dark p-10 md:p-14 border-4 border-white shadow-2xl relative">
            <div className="absolute -top-6 -right-6 bg-white text-brand-dark font-black uppercase tracking-widest px-6 py-3 border-4 border-brand-dark shadow-xl transform rotate-3">
              Limited Seats!
            </div>
            
            <div className="text-center mb-10">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tight">
                Reserve Your Spot
              </h3>
              <p className="text-gray-400 font-bold text-lg uppercase tracking-wider">
                Register now to secure your place.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="w-full px-6 py-4 bg-white border-none rounded-none focus:ring-4 focus:ring-brand-orange text-brand-dark font-bold placeholder-gray-400 outline-none"
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
                  className="w-full px-6 py-4 bg-white border-none rounded-none focus:ring-4 focus:ring-brand-orange text-brand-dark font-bold placeholder-gray-400 outline-none"
                  placeholder="YOUR.EMAIL@EXAMPLE.COM"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-brand-orange uppercase tracking-widest mb-3">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 bg-white border-none rounded-none focus:ring-4 focus:ring-brand-orange text-brand-dark font-bold placeholder-gray-400 outline-none"
                  placeholder="+91 98765 43210"
                />
              </div>

              {/* WhatsApp Opt-in */}
              <div className="flex items-center pt-4">
                <input
                  type="checkbox"
                  id="whatsappOptIn"
                  name="whatsappOptIn"
                  checked={formData.whatsappOptIn}
                  onChange={handleInputChange}
                  className="w-6 h-6 text-brand-orange bg-white border-none rounded-none focus:ring-brand-orange accent-brand-orange cursor-pointer"
                />
                <label htmlFor="whatsappOptIn" className="ml-4 text-sm font-bold text-white uppercase tracking-wider cursor-pointer">
                  Send me masterclass updates on WhatsApp
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full py-6 text-xl bg-brand-orange hover:bg-white hover:text-brand-dark border-4 border-transparent hover:border-brand-dark transition-all duration-300"
              >
                {loading ? 'REGISTERING...' : 'GET INSTANT ACCESS'}
              </Button>
            </form>

            {/* Trust Indicators */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <div className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest space-y-2">
                <p>🔒 100% Secure & Private</p>
                <p>📧 No spam, ever. Unsubscribe anytime.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
