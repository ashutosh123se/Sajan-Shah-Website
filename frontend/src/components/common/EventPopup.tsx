'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface Banner {
  id: string;
  title: string;
  imageUrl: string;
  linkUrl?: string;
  isActive: boolean;
}

export default function EventPopup() {
  const [banner, setBanner] = useState<Banner | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchActiveBanner();
  }, []);

  const fetchActiveBanner = async () => {
    try {
      const response = await api.get('/banners/active');
      if (response.data?.data?.banner) {
        setBanner(response.data.data.banner);
        // Immediate appearance for better impact as requested
        setTimeout(() => setIsVisible(true), 500);
      }
    } catch (error) {
      console.error('Failed to fetch banner:', error);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const handleClick = () => {
    if (banner?.linkUrl) {
      router.push(banner.linkUrl);
      handleDismiss();
    }
  };

  if (!isVisible || !banner) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-300">
      <div 
        className="relative max-w-2xl w-full bg-[#141414] border border-white/10 shadow-2xl animate-in zoom-in-95 duration-300"
        style={{ borderRadius: '0px' }}
      >
        <button
          onClick={handleDismiss}
          className="absolute -top-4 -right-4 z-10 p-2 bg-white text-black hover:bg-gray-200 transition-colors shadow-lg"
          style={{ borderRadius: '0px' }}
          aria-label="Close popup"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div 
          className="cursor-pointer group relative overflow-hidden"
          onClick={handleClick}
        >
          <img 
            src={banner.imageUrl} 
            alt={banner.title}
            className="w-full h-auto object-cover max-h-[70vh] group-hover:scale-105 transition-transform duration-500"
          />
          
          {banner.linkUrl && (
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
              <h3 className="text-white text-2xl font-bold tracking-tight mb-2">
                {banner.title}
              </h3>
              <span className="inline-flex items-center text-white/90 text-sm uppercase tracking-wider font-semibold group-hover:text-white">
                Learn More
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
