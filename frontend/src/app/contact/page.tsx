'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ContactHero } from '@/components/sections/contact/ContactHero';
import { ContactForm } from '@/components/sections/contact/ContactForm';
import { ContactInfo } from '@/components/sections/contact/ContactInfo';
import { ContactAddresses } from '@/components/sections/contact/ContactAddresses';

// Custom Social Icons
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const YoutubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.4 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.46-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon></svg>
);
const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

export default function ContactPage() {
  const socialLinks = [
    { icon: <InstagramIcon />, href: 'https://www.instagram.com/sajan_shahh/', label: 'Instagram' },
    { icon: <YoutubeIcon />, href: 'https://www.youtube.com/@SajanShah', label: 'YouTube' },
    { icon: <LinkedinIcon />, href: 'https://www.linkedin.com/in/sajan-shah-7840244a/', label: 'LinkedIn' },
    { icon: <FacebookIcon />, href: 'https://www.facebook.com/SajanShahPage', label: 'Facebook' },
    { icon: <TwitterIcon />, href: 'https://x.com/sajanofficial', label: 'X' },
  ];

  return (
    <div className="min-h-screen bg-white text-[#0a0a0a] selection:bg-[#f26522]/30">
      
      {/* 1. Cinematic Hero Section */}
      <div className="bg-[#0a0a0a] text-white">
        <ContactHero />
      </div>

      {/* 2. Main Content Grid (Split Form & Support) */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>

      {/* 3. Detailed Addresses Section (Downside to both) */}
      <ContactAddresses />

      {/* 4. Social & Final Positioning (Bottom) */}
      <section className="py-24 bg-white text-center px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-20">
            <h3 className="text-[#f26522] text-xs font-bold uppercase tracking-[0.4em] mb-10">Follow & Connect</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 bg-[#f26522] text-white flex items-center justify-center rounded-sm hover:bg-[#d95a1e] transition-colors"
                >
                  <div className="scale-90">
                    {social.icon}
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          <div className="relative inline-block py-12 border-t border-gray-100 w-full">
            <h3 className="text-2xl md:text-3xl italic font-light text-gray-400 leading-relaxed mb-8">
              "You don't reach out for information. <br className="hidden md:block" />
              You reach out for <span className="text-[#0a0a0a] font-bold">transformation."</span>
            </h3>
            <div className="w-20 h-1 bg-[#f26522] mx-auto"></div>
          </div>
        </div>
      </section>

    </div>
  );
}
