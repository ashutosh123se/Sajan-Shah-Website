'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function MemberLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isSubscriber, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (!isAuthenticated) {
        router.push('/login');
        return;
      }
      if (!isSubscriber && !isAdmin) {
        router.push('/user');
        return;
      }
    }
  }, [isAuthenticated, isSubscriber, isAdmin, router, mounted]);

  const sidebarItems = [
    {
      title: 'Member Portal',
      href: '/member',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: 'Exclusive Content',
      href: '/member/content',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4 20.777 5.168 21 6.751 21h8.5C16.832 21 17.5 21s2.168-.223 2.5-1.247V6.253C19 5.477 17.832 5 16.25 5s-2.168.477-2.5 1.253z" />
        </svg>
      ),
    },
    {
      title: 'Community',
      href: '/member/community',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 005.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'My Profile',
      href: '/user',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ];

  if (!mounted || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0C0C0C]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white flex font-sans selection:bg-white selection:text-black">
      {/* Sidebar */}
      <div className="w-64 bg-[#141414] border-r border-white/10 min-h-screen flex flex-col">
        <div className="p-6 flex-1">
          <h2 className="text-2xl font-extrabold text-white tracking-tight mb-8">
            Member<span className="text-gray-500">Hub</span>
          </h2>
          
          {/* User Info */}
          <div className="mb-8 p-4 bg-white/5 border border-white/10">
            <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Logged in as</p>
            <p className="font-semibold text-white truncate">{user.name}</p>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-tighter">Member</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 transition-all duration-200 border-l-2 ${
                    isActive
                      ? 'bg-white/10 text-white border-white'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white border-transparent'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium tracking-wide">{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        
        {/* Logout */}
        <div className="p-6 border-t border-white/10">
          <Button
            variant="outline"
            onClick={() => router.push('/')}
            className="w-full bg-transparent text-white border-white/20 hover:bg-white hover:text-black rounded-none transition-all duration-300"
          >
            Back to Site
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-h-screen overflow-y-auto bg-[#0C0C0C]">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
