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
    <section className="py-20 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Headline */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Free Masterclass
            </h2>
            <p className="text-xl md:text-2xl mb-6 text-purple-100">
              Unlock Your Memory Potential in 90 Minutes
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 .895 3 2-1.343 2-3 2zm0 8c1.11 0 2.08.402 2.599-1M12 8V7l-8 5v3l8-2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Live Interactive Session</h3>
                  <p className="text-purple-100">Join Sajan Shah live</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Proven Techniques</h3>
                  <p className="text-purple-100">Science-backed methods</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7m0 0v7l9-11h-7z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Immediate Results</h3>
                  <p className="text-purple-100">Apply instantly</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Reserve Your Free Spot
              </h3>
              <p className="text-gray-600 mb-6">
                Limited seats available. Register now to secure your place in this exclusive masterclass.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                  placeholder="+91 98765 43210"
                />
              </div>

              {/* WhatsApp Opt-in */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="whatsappOptIn"
                  name="whatsappOptIn"
                  checked={formData.whatsappOptIn}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-purple-600 bg-white border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="whatsappOptIn" className="ml-2 text-sm text-gray-700">
                  Send me masterclass updates on WhatsApp
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white disabled:bg-purple-400"
              >
                {loading ? 'Registering...' : 'Get Instant Access'}
              </Button>
            </form>

            {/* Trust Indicators */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center text-sm text-gray-500">
                <p className="mb-2">🔒 100% Secure & Private</p>
                <p>📧 No spam, ever. Unsubscribe anytime.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
