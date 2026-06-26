'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import api from '@/lib/api';
import toast from 'react-hot-toast';

interface EventsCTAProps {
  content?: {
    heading?: string;
    paragraph?: string;
    buttonText?: string;
  };
}

export default function EventsCTA({ content }: EventsCTAProps) {
  const heading = content?.heading || 'Invite Sajan Shah for an Event';
  const paragraph = content?.paragraph || 'Transform your organisation, school, or corporate team with a highly customized and impactful session by Sajan Shah.';
  const buttonText = content?.buttonText || 'Book Sajan For Your Event';

  const [formData, setFormData] = useState({
    organization: '',
    name: '',
    email: '',
    phone: '',
    eventType: 'Corporate Seminar',
    city: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.post('/contact', {
        name: formData.name,
        organization: formData.organization,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        eventType: formData.eventType,
        message: formData.message,
        formType: 'invite-sajan-to-speak',
      });
      toast.success('Your inquiry has been submitted. Our team will contact you soon.');
      setFormData({
        organization: '',
        name: '',
        email: '',
        phone: '',
        eventType: 'Corporate Seminar',
        city: '',
        message: '',
      });
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to submit inquiry. Please check your details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="book-sajan" className="py-32 relative overflow-hidden bg-[#ebebeb] text-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-16 items-center">
        <div className="relative w-full h-full flex items-center justify-start lg:-ml-24">
          <img
            src="/an Event.png"
            alt="Sajan Shah Event"
            className="w-[135%] h-auto max-h-[850px] object-contain object-left scale-110"
            style={{
              WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
            }}
          />
        </div>

        <div className="text-left flex flex-col justify-center">
          <h2
            className="text-5xl md:text-6xl font-black uppercase tracking-normal mb-6 leading-[1.1]"
            dangerouslySetInnerHTML={{ __html: heading.replace(/Event/i, '<span class="text-brand-orange">Event</span>').replace(/\bfor\b/i, 'for <br />') }}
          />
          <p className="text-lg text-gray-600 mb-10 max-w-xl">{paragraph}</p>

          <div className="w-full">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">Organisation Name</label>
                  <input name="organization" value={formData.organization} onChange={handleChange} type="text" required className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-brand-orange text-black transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">Contact Person</label>
                  <input name="name" value={formData.name} onChange={handleChange} type="text" required className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-brand-orange text-black transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">Email Address</label>
                  <input name="email" value={formData.email} onChange={handleChange} type="email" required className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-brand-orange text-black transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">Phone Number</label>
                  <input name="phone" value={formData.phone} onChange={handleChange} type="tel" required className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-brand-orange text-black transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">Event Type</label>
                  <select name="eventType" value={formData.eventType} onChange={handleChange} className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-brand-orange text-black transition-colors">
                    <option>Corporate Seminar</option>
                    <option>School/College Event</option>
                    <option>Public Talk</option>
                    <option>Private Workshop</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">Expected City / Location</label>
                  <input name="city" value={formData.city} onChange={handleChange} type="text" required className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-brand-orange text-black transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">Short Description / Objective</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows={4} required className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-brand-orange resize-none text-black transition-colors" />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full bg-brand-orange text-white hover:bg-black hover:text-white font-black uppercase tracking-widest py-4 text-sm rounded-xl transition-all disabled:opacity-70">
                {isSubmitting ? 'Submitting...' : buttonText}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
