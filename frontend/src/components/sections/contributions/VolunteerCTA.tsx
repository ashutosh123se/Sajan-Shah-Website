'use client';
import React, { useState } from 'react';
import { Check } from 'lucide-react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

interface VolunteerCTAProps {
  content?: {
    heading?: string;
    paragraph?: string;
    buttonText?: string;
  };
}

export const VolunteerCTA: React.FC<VolunteerCTAProps> = ({ content }) => {
  const heading = content?.heading || "BECOME AN AMBASSADOR";
  const paragraph = content?.paragraph || "We are looking for passionate individuals, CSR partners, and ESG advocates to join us in our mission to transform education and social welfare.";
  const buttonText = content?.buttonText || "Apply Now";

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    role: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const renderHeading = () => {
    if (heading.includes('<br') || heading.includes('\n')) {
      return <span dangerouslySetInnerHTML={{ __html: heading }} />;
    }
    return heading;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.role) {
      toast.error('Please fill all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post('/leads', {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        source: 'ambassador-volunteer',
        data: {
          organization: formData.organization.trim() || null,
          role: formData.role,
        },
      });

      toast.success('Application submitted successfully!');
      setFormData({ name: '', email: '', phone: '', organization: '', role: '' });
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-32 bg-black border-y border-gray-900">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-20 items-center">
        <div className="lg:w-1/2">
          <h2 className="text-[#f26522] font-bold uppercase tracking-[0.3em] text-sm mb-4">Join The Movement</h2>
          <h3 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter uppercase leading-none">
            {renderHeading()}
          </h3>
          <p className="text-gray-400 text-lg font-light leading-relaxed mb-10">
            {paragraph}
          </p>
          <div className="space-y-6">
            {[
              { t: "Volunteer Opportunities", d: "Contribute your time and skills on the field." },
              { t: "CSR Partnership", d: "Align your corporate social responsibility with us." },
              { t: "ESG Partnership", d: "Strategic environmental and social governance." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-[#f26522] flex-shrink-0 group-hover:bg-[#f26522] group-hover:text-white transition-all">
                  <Check size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">{item.t}</h4>
                  <p className="text-gray-500 text-sm">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-1/2 w-full">
          <form
            className="bg-[#0a0a0a] p-8 md:p-12 rounded-[2rem] border border-gray-800 space-y-4"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-6 py-4 bg-gray-900/50 border border-gray-800 rounded-xl focus:ring-1 focus:ring-[#f26522] outline-none text-white"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full px-6 py-4 bg-gray-900/50 border border-gray-800 rounded-xl focus:ring-1 focus:ring-[#f26522] outline-none text-white"
                required
              />
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full px-6 py-4 bg-gray-900/50 border border-gray-800 rounded-xl focus:ring-1 focus:ring-[#f26522] outline-none text-white"
              required
            />
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="Organization (Optional)"
              className="w-full px-6 py-4 bg-gray-900/50 border border-gray-800 rounded-xl focus:ring-1 focus:ring-[#f26522] outline-none text-white"
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-6 py-4 bg-gray-900/50 border border-gray-800 rounded-xl focus:ring-1 focus:ring-[#f26522] outline-none appearance-none text-gray-400"
              required
            >
              <option value="">Select Role</option>
              <option value="volunteer">Volunteer</option>
              <option value="csr">CSR Partner</option>
              <option value="esg">ESG Partner</option>
            </select>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#f26522] hover:bg-white hover:text-black text-white font-bold py-5 rounded-xl transition-all duration-300 uppercase tracking-widest text-xs disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : buttonText}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
