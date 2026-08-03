'use client';

import React, { useState } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    honeypot: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.honeypot) {
      toast.error('Form submission failed');
      return;
    }

    setLoading(true);

    try {
      await api.post('/contact', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      });

      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        honeypot: '',
      });
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:col-span-7">
      <div className="mb-10 text-gray-700">
        <p className="text-lg font-light leading-relaxed mb-8">
          Whether you’re looking to host a transformational session, collaborate, or seek support,
          you’re at the right place.
          <br></br>
        </p>
        <p>  This is not just a contact page.</p>
        <b>This is where meaningful transformation begins.</b>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input type="text" name="honeypot" value={formData.honeypot} onChange={handleInputChange} className="hidden" tabIndex={-1} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Full name *"
              className="w-full bg-white border border-gray-200 p-4 focus:outline-none focus:border-[#f26522] transition-colors text-gray-900 placeholder:text-gray-400"
            />
          </div>
          <div>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Organization"
              className="w-full bg-white border border-gray-200 p-4 focus:outline-none focus:border-[#f26522] transition-colors text-gray-900 placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Email address *"
              className="w-full bg-white border border-gray-200 p-4 focus:outline-none focus:border-[#f26522] transition-colors text-gray-900 placeholder:text-gray-400"
            />
          </div>
          <div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone number"
              className="w-full bg-white border border-gray-200 p-4 focus:outline-none focus:border-[#f26522] transition-colors text-gray-900 placeholder:text-gray-400"
            />
          </div>
        </div>

        <div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={4}
            placeholder="Your message *"
            className="w-full bg-white border border-gray-200 p-4 focus:outline-none focus:border-[#f26522] transition-colors resize-none text-gray-900 placeholder:text-gray-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-10 py-4 font-bold text-white transition-all duration-200 bg-[#f26522] hover:bg-[#d95a1e] uppercase tracking-wider text-sm rounded-sm disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};
