'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import api from '@/lib/api';
import { DEFAULT_LEGAL_PAGES } from './legalDefaults';

interface LegalPageContentProps {
  slug: string;
  fallbackTitle: string;
}

const LEGAL_TABS = [
  { slug: 'privacy-policy', label: 'Privacy Policy', href: '/privacy-policy' },
  { slug: 'terms-of-service', label: 'Terms of Service', href: '/terms-of-service' },
  { slug: 'terms-and-conditions', label: 'Terms & Conditions', href: '/terms-and-conditions' },
  { slug: 'refund-policy', label: 'Refund Policy', href: '/refund-policy' },
  { slug: 'ai-policy', label: 'AI Policy', href: '/ai-policy' },
];

export function LegalPageContent({ slug, fallbackTitle }: LegalPageContentProps) {
  const pathname = usePathname();
  const defaultData = DEFAULT_LEGAL_PAGES[slug];
  const [title, setTitle] = useState(defaultData?.title || fallbackTitle);
  const [content, setContent] = useState(defaultData?.content || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadFromCms = async () => {
      try {
        const res = await api.get(`/legal/${slug}`);
        if (res.data?.success && res.data?.data?.legalPage) {
          const cmsData = res.data.data.legalPage;
          const trimmedContent = (cmsData.content || '').trim();
          // Use CMS content if it contains real content beyond the initial placeholder
          const isPlaceholder = trimmedContent.includes('Edit this page from Admin');
          if (trimmedContent && !isPlaceholder && isMounted) {
            if (cmsData.title) setTitle(cmsData.title);
            setContent(trimmedContent);
          }
        }
      } catch (e) {
        // Silently preserve built-in fallback content on network / CORS failures
        console.warn(`CMS legal page fetch failed for ${slug}, using local fallback.`);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadFromCms();

    return () => {
      isMounted = false;
    };
  }, [slug, fallbackTitle]);

  return (
    <main className="min-h-screen bg-[#fafaf8] pt-32 pb-24 px-4 relative selection:bg-[#f26522]/20 selection:text-black">
      {/* Background signature watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.03]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/sir sign.png" alt="" className="w-[640px] rotate-[-18deg] select-none" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-10 pb-6 border-b border-[#c8a96e]/40">
          <p className="text-xs font-bold tracking-[0.25em] text-[#f26522] uppercase mb-2">
            Sajan Shah Foundation • Governance &amp; Compliance
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            {title}
          </h1>
        </div>

        {/* Legal Tabs Navigation */}
        <nav aria-label="Legal document navigation" className="mb-10">
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-gray-100/80 rounded-2xl border border-gray-200/80 backdrop-blur-sm">
            {LEGAL_TABS.map((tab) => {
              const isActive = tab.slug === slug || pathname === tab.href;
              return (
                <Link
                  key={tab.slug}
                  href={tab.href}
                  className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-black text-white shadow-md shadow-black/10'
                      : 'text-gray-600 hover:text-black hover:bg-white/80'
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Content Box */}
        <article className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm border border-gray-100">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/loding.png" alt="Loading" className="animate-spin object-contain h-12 w-12" />
            </div>
          ) : (
            <div
              className="legal-public-content space-y-6 text-gray-700 text-[15px] leading-[1.9] max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}

          {/* Signatory Footer */}
          <div className="pt-12 mt-12 border-t border-gray-100 flex flex-col items-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sir sign.png" alt="Authorised Signature" className="h-16 object-contain mb-2 select-none" />
            <p className="text-xs uppercase tracking-widest text-gray-400">Authorised Signatory</p>
            <p className="text-sm font-bold text-gray-800">Sajan Shah Foundation</p>
          </div>
        </article>
      </div>

      <style jsx global>{`
        .legal-public-content h2 {
          font-size: 1.45rem;
          font-weight: 800;
          color: #111827;
          margin: 2rem 0 0.75rem;
          padding-bottom: 0.35rem;
          border-bottom: 1px solid #f3f4f6;
          letter-spacing: -0.015em;
        }
        .legal-public-content h2:first-of-type {
          margin-top: 0.5rem;
        }
        .legal-public-content h3 {
          font-size: 1.15rem;
          font-weight: 700;
          color: #1f2937;
          margin: 1.4rem 0 0.5rem;
        }
        .legal-public-content p {
          margin: 0.8rem 0;
          color: #374151;
        }
        .legal-public-content ul {
          list-style: disc;
          padding-left: 1.6rem;
          margin: 0.8rem 0;
          space-y: 0.4rem;
        }
        .legal-public-content ol {
          list-style: decimal;
          padding-left: 1.6rem;
          margin: 0.8rem 0;
          space-y: 0.4rem;
        }
        .legal-public-content li {
          margin-bottom: 0.35rem;
        }
        .legal-public-content a {
          color: #f26522;
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .legal-public-content a:hover {
          color: #d95a1e;
        }
        .legal-public-content strong {
          font-weight: 700;
          color: #111827;
        }
      `}</style>
    </main>
  );
}
