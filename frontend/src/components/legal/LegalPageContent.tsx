'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';

interface LegalPageContentProps {
  slug: string;
  fallbackTitle: string;
}

export function LegalPageContent({ slug, fallbackTitle }: LegalPageContentProps) {
  const [title, setTitle] = useState(fallbackTitle);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/legal/${slug}`);
        if (res.data.success && res.data.data?.legalPage) {
          setTitle(res.data.data.legalPage.title || fallbackTitle);
          setContent(res.data.data.legalPage.content || '');
        } else {
          setError('This page content is not available yet.');
        }
      } catch (e) {
        setError('Failed to load page content from CMS.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug, fallbackTitle]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fafaf8] pt-40 pb-20 px-4 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/loding.png" alt="Loading" className="animate-spin object-contain h-20 w-20" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafaf8] pt-40 pb-20 px-4 relative">
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.04]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/sir sign.png" alt="" className="w-[600px] rotate-[-20deg] select-none" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-10 pb-6 border-b border-[#c8a96e]">
          <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase mb-2">Sajan Shah Foundation</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h1>
        </div>

        {error ? (
          <p className="text-center text-gray-500">{error}</p>
        ) : (
          <div
            className="space-y-6 text-gray-700 text-[15px] leading-[1.9] prose prose-neutral max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </div>
    </main>
  );
}
