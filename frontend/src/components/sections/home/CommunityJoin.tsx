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
    <section className="py-20 bg-[#111] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Global Community
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-gray-400">
            Get exclusive content, early access to programs, and connect with thousands of learners
          </p>
          
          {/* Lead Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white bg-opacity-80 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white bg-opacity-80 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white bg-opacity-80 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
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
                    className="w-4 h-4 text-[#f26522] bg-white bg-opacity-80 border-gray-700 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="whatsappOptIn" className="ml-2 text-sm text-gray-400">
                    Send me updates on WhatsApp
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-[#f26522] hover:bg-[#1a1a1a] disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                {loading ? 'Joining...' : 'Join Community'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
