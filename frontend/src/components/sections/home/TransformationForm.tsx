'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import api from '@/lib/api';

interface TransformationFormProps {
  content?: {
    tagline?: string;
    title?: string;
    description?: string;
    email?: string;
    phone?: string;
  };
}

export const TransformationForm: React.FC<TransformationFormProps> = ({ content }) => {
  const [formData, setFormData] = useState({
    name: '', org: '', email: '', phone: '', startDate: '', endDate: '', location: '', info: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const tagline = content?.tagline || "Booking & Inquiries";
  const title = content?.title || "Start Your <br /><span class=\"font-bold\">Transformation Conversation.</span>";
  const description = content?.description || "Tell us about your event, audience, or requirement. Let’s design an experience that drives real impact, not just motivation.";
  const email = content?.email || "info@sajanshah.com";
  const phone = content?.phone || "+91 8511363376";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/contact', {
        name: formData.name,
        organization: formData.org,
        email: formData.email,
        phone: formData.phone,
        city: formData.location,
        message: formData.info || 'Homepage transformation inquiry',
        formType: 'homepage-transformation',
      });
      toast.success('Inquiry submitted successfully');
      setFormData({ name: '', org: '', email: '', phone: '', startDate: '', endDate: '', location: '', info: '' });
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to submit inquiry');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-[#0a0a0a] py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#f26522]/5 rounded-full filter blur-[150px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          <div className="lg:w-2/5">
            <p className="text-[#f26522] font-bold text-sm tracking-[0.3em] uppercase mb-6">{tagline}</p>
            <h2
              className="text-4xl md:text-5xl font-light text-white mb-8 leading-[1.2] tracking-tight"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-10">
              {description}
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-white group">
                <div className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center group-hover:border-[#f26522] group-hover:bg-[#f26522] transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Email Us</p>
                  <p className="text-lg font-light">{email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-white group">
                <div className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center group-hover:border-[#f26522] group-hover:bg-[#f26522] transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Call Us</p>
                  <p className="text-lg font-light">{phone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-3/5 w-full bg-[#111] p-8 md:p-12 border border-gray-900 rounded-sm shadow-2xl relative">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Full Name *</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-0 py-3 bg-transparent border-b border-gray-800 text-white placeholder-gray-700 focus:border-[#f26522] outline-none transition-all duration-300" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Organization</label>
                  <input type="text" name="org" value={formData.org} onChange={handleChange} className="w-full px-0 py-3 bg-transparent border-b border-gray-800 text-white placeholder-gray-700 focus:border-[#f26522] outline-none transition-all duration-300" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Email Address *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-0 py-3 bg-transparent border-b border-gray-800 text-white placeholder-gray-700 focus:border-[#f26522] outline-none transition-all duration-300" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Phone Number *</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-0 py-3 bg-transparent border-b border-gray-800 text-white placeholder-gray-700 focus:border-[#f26522] outline-none transition-all duration-300" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Event Details & Inquiry</label>
                <textarea name="info" rows={4} value={formData.info} onChange={handleChange} className="w-full px-0 py-3 bg-transparent border-b border-gray-800 text-white placeholder-gray-700 focus:border-[#f26522] outline-none transition-all duration-300 resize-none"></textarea>
              </div>

              <div className="pt-6">
                <button type="submit" disabled={submitting} className="w-full bg-[#f26522] hover:bg-[#d95a1e] text-white font-bold py-5 px-12 transition-all duration-300 inline-block tracking-widest uppercase text-xs shadow-[0_10px_20px_rgba(242,101,34,0.2)] disabled:opacity-60">
                  {submitting ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
