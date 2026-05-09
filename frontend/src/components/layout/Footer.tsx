'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Programs', href: '/programs' },
        { name: 'Products', href: '/products' },
        { name: 'Events', href: '/events' },
        { name: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Members Portal', href: '/members' },
        { name: 'Contributions', href: '/contributions' },
        { name: 'Blog', href: '/blog' },
        { name: 'Resources', href: '/resources' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/legal/privacy-policy' },
        { name: 'Terms & Conditions', href: '/legal/terms-and-conditions' },
        { name: 'Refund Policy', href: '/legal/refund-policy' },
        { name: 'Shipping Policy', href: '/legal/shipping-policy' },
      ],
    },
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://facebook.com/sajanshah',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v8.385c0-.939-.006-3.723-.006-3.723s-2.437-.3-3.723-.3c-3.723 0-6.25 2.527-6.25 6.25v3.723H0v8.385h3.099v8.385h6.25v-8.385h4.174l.666-8.385H9.449V12.073z"/>
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/sajanshah',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 00-2.152-2.715 10.054 10.054 0 01-3.123 1.184c-.045-.01-.09-.015-.135-.015a4.958 4.958 0 004.158 4.636 9.9 9.9 0 01-6.114-2.107 4.958 4.958 0 004.158 4.636 9.871 9.871 0 01-6.114 2.107 10.054 10.054 0 01-3.123-1.184 4.958 4.958 0 00-2.152 2.715 10 10 0 01-2.825-.775 4.958 4.958 0 004.158 4.636 9.9 9.9 0 01-6.114 2.107 10.054 10.054 0 01-3.123-1.184 4.958 4.958 0 00-2.152 2.715 10 10 0 01-2.825-.775 4.958 4.958 0 004.158 4.636 9.9 9.9 0 01-6.114 2.107 10.054 10.054 0 01-3.123-1.184 4.958 4.958 0 00-2.152 2.715 10 10 0 01-2.825-.775z"/>
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/sajanshah',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-1.846 1.445-1.846 1.694v2.912h-3.545c-.031-.796-.042-3.525-.042-5.525h3.545v-1.236c0-3.588 2.341-5.584 5.588-5.584 1.584 0 2.916.126 3.316.264v2.938h-1.867c-.363 0-.655.295-.655.658v1.888h2.487l-.397 2.938h-2.09v8.385z"/>
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/sajanshah',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.771 1.691 0 0 1.082.842 1.082 2.067 0 0-.84.135-2.187.135-2.187 0 0-1.089-.738-2.015-1.691-2.015zm0 3.839c-2.167 0-3.92 1.755-3.92 3.92 0 2.167 1.753 3.92 3.92 3.92 2.167 0 3.92-1.753 3.92-3.92 0-2.167-1.753-3.92-3.92-3.92zm0-6.002c-3.204 0-3.584-.012-4.85-.07-3.252-.148-4.771-1.691-4.771-1.691 0 0-1.082-.842-1.082-2.067 0 0 .84-.135 2.187-.135 2.187 0 0 1.089.738 2.015 1.691 2.015zm0 3.839c2.167 0 3.92-1.755 3.92-3.92 0-2.167-1.753-3.92-3.92-3.92-2.167 0-3.92 1.753-3.92 3.92 0 2.167 1.753 3.92 3.92 3.92z"/>
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Sajan Shah</h3>
            <p className="text-gray-300 text-sm mb-4">
              Memory Man of India • Global Youth Speaker • Neuroscience-Backed Educator
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Sajan Shah. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/legal/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy
              </Link>
              <Link href="/legal/terms-and-conditions" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
