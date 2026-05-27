'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isCustomer } = useAuth();
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
      if (!isCustomer) {
        // Allow others but primarily for customer
      }
    }
  }, [isAuthenticated, isCustomer, router, mounted]);

  const sidebarItems = [
    {
      title: 'My Profile',
      href: '/user',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      title: 'My Orders',
      href: '/user/orders',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      title: 'My Events',
      href: '/user/events',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Settings',
      href: '/user/settings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 00-1.063.403 2.317-1.436A2.317 2.317 0 005.47 4.549l-.847-.552-.846-.552a1.724 1.724 0 00-1.063.403 2.317-1.436 2.467 2.467 0 003.35-.847l.846.552.846.552a1.724 1.724 0 001.063-.403 2.317-1.436z" />
        </svg>
      ),
    },
  ];

  if (!mounted || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0C0C0C]">
        <div className="text-center">
          <img src="/loding.png" alt="Loading" className="animate-spin object-contain h-12 w-12 mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[176px] lg:pt-[196px] min-h-screen bg-[#0C0C0C] text-white flex font-sans selection:bg-white selection:text-black">
      {/* Sidebar */}
      <div className="w-64 bg-[#141414] border-r border-white/10 h-[calc(100vh-176px)] lg:h-[calc(100vh-196px)] sticky top-[176px] lg:top-[196px] flex flex-col">
        <div className="p-6 flex-1 overflow-y-auto no-scrollbar">
          <h2 className="text-2xl font-extrabold text-white tracking-tight mb-8">
            User<span className="text-gray-500">Dashboard</span>
          </h2>
          
          {/* User Info */}
          <div className="mb-8 p-4 bg-white/5 border border-white/10">
            <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Logged in as</p>
            <p className="font-semibold text-white truncate">{user.name}</p>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-tighter">User</p>
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
      <div className="flex-1 bg-[#0C0C0C]">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
