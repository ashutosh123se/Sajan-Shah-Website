'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isSuperAdmin, isAdmin, isEditor, isShopManager } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (!isAuthenticated) {
        if (!localStorage.getItem('accessToken')) {
          router.push('/login');
        }
        return;
      }
      if (!isSuperAdmin && !isAdmin && !isEditor && !isShopManager) {
        router.push('/');
        return;
      }
    }
  }, [isAuthenticated, isSuperAdmin, isAdmin, isEditor, isShopManager, router, mounted]);

  const sidebarItems = [
    {
      title: 'Dashboard',
      href: '/admin',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V3h-8v10z"/>
        </svg>
      ),
      roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'SHOP_MANAGER'],
    },
    {
      title: 'Banners',
      href: '/admin/banner',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'],
    },
    {
      title: 'Users & Roles',
      href: '/admin/users',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 4.354a4 4 0 110 8 4 4 0 018-8 4 4 0 018-8zM12 16a4 4 0 110 8 4 4 0 018-8 4 4 0 018-8zM3 20h6a2 2 0 002-2v-2a2 2 0 00-2-2H5a2 2 0 00-2 2v2a2 2 0 002 2h6a2 2 0 002-2v-2a2 2 0 00-2-2z"/>
        </svg>
      ),
      roles: ['SUPER_ADMIN'],
    },
    {
      title: 'Speaking Page',
      href: '/admin/speaking',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4 20.777 5.168 21 6.751 21h8.5C16.832 21 17.5 21s2.168-.223 2.5-1.247V6.253C19 5.477 17.832 5 16.25 5s-2.168.477-2.5 1.253z"/>
        </svg>
      ),
      roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'],
    },
    {
      title: 'Events',
      href: '/admin/events',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
      ),
      roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'],
    },
    {
      title: 'Media & Press',
      href: '/admin/press',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'],
    },
    {
      title: 'Products',
      href: '/admin/products',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 11V7a4 4 0 00-8 0v4a4 4 0 008 0m-4 10a4 4 0 008 0m-4-10V7a4 4 0 008 0v4a4 4 0 00-8 0z"/>
        </svg>
      ),
      roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'SHOP_MANAGER'],
    },
    {
      title: 'Orders',
      href: '/admin/orders',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 00-2 2h2a2 2 0 002-2V7a2 2 0 00-2-2H9z"/>
        </svg>
      ),
      roles: ['SUPER_ADMIN', 'ADMIN', 'SHOP_MANAGER'],
    },
    {
      title: 'Members',
      href: '/admin/members',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 005.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'],
    },
    {
      title: 'Contributors',
      href: '/admin/contributors',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      roles: ['SUPER_ADMIN', 'ADMIN'],
    },
    {
      title: 'Testimonials',
      href: '/admin/testimonials',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'],
    },
    {
      title: 'Legal Pages',
      href: '/admin/legal',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      roles: ['SUPER_ADMIN', 'ADMIN'],
    },
    {
      title: 'Leads',
      href: '/admin/leads',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 005.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      roles: ['SUPER_ADMIN', 'ADMIN'],
    },
    {
      title: 'About Page',
      href: '/admin/about',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'],
    },
    {
      title: 'Home Page',
      href: '/admin/home',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'],
    },
    {
      title: 'Settings',
      href: '/admin/settings',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 00-1.063.403 2.317-1.436A2.317 2.317 0 005.47 4.549l-.847-.552-.846-.552a1.724 1.724 0 00-1.063.403 2.317-1.436 2.467 2.467 0 003.35-.847l.846.552.846.552a1.724 1.724 0 001.063-.403 2.317-1.436z"/>
        </svg>
      ),
      roles: ['SUPER_ADMIN'],
    },
  ];

  const hasAccess = (roles: string[]) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  const filteredSidebarItems = sidebarItems.filter(item => hasAccess(item.roles));

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
            Admin<span className="text-gray-500">Panel</span>
          </h2>
          
          {/* User Info */}
          <div className="mb-8 p-4 bg-white/5 border border-white/10">
            <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Logged in as</p>
            <p className="font-semibold text-white truncate">{user.name}</p>
            <p className="text-xs text-gray-400 mt-1">{user.role.replace('_', ' ')}</p>
          </div>
 
          {/* Navigation */}
          <nav className="space-y-1">
            {filteredSidebarItems.map((item) => {
              const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
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
