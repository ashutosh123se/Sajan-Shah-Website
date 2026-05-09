'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const { user, isAuthenticated, isAdmin, isSuperAdmin, isEditor, isShopManager } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (!isAdmin && !isEditor && !isShopManager) {
      router.push('/');
      return;
    }
  }, [isAuthenticated, isAdmin, isEditor, isShopManager, router]);

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
      title: 'Users',
      href: '/admin/users',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 4.354a4 4 0 110 8 4 4 0 018-8 4 4 0 018-8zM12 16a4 4 0 110 8 4 4 0 018-8 4 4 0 018-8zM3 20h6a2 2 0 002-2v-2a2 2 0 00-2-2H5a2 2 0 00-2 2v2a2 2 0 002 2h6a2 2 0 002-2v-2a2 2 0 00-2-2z"/>
        </svg>
      ),
      roles: ['SUPER_ADMIN'],
    },
    {
      title: 'Programs',
      href: '/admin/programs',
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
      title: 'Products',
      href: '/admin/products',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 11V7a4 4 0 00-8 0v4a4 4 0 008 0m-4 10a4 4 0 008 0m-4-10V7a4 4 0 008 0v4a4 4 0 00-8 0z"/>
        </svg>
      ),
      roles: ['SUPER_ADMIN', 'ADMIN', 'SHOP_MANAGER'],
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
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 4.354a4 4 0 110 8 4 4 0 018-8 4 4 0 018-8zM12 16a4 4 0 110 8 4 4 0 018-8 4 4 0 018-8zM3 20h6a2 2 0 002-2v-2a2 2 0 00-2-2H5a2 2 0 00-2 2v2a2 2 0 002 2h6a2 2 0 002-2v-2a2 2 0 00-2-2z"/>
        </svg>
      ),
      roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'],
    },
    {
      title: 'Newsletter',
      href: '/admin/newsletter',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      ),
      roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'],
    },
    {
      title: 'Contact Messages',
      href: '/admin/contact',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      ),
      roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'],
    },
    {
      title: 'Contributors',
      href: '/admin/contributors',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48v11.52C2 20.52 6.48 22 12s4.48-1.48 10-1.48S2 17.52 2 12zm0 18c1.11 0 2.08.402 2.599-1M12 8V7l-8 5v3l8-2z"/>
        </svg>
      ),
      roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'],
    },
    {
      title: 'Initiatives',
      href: '/admin/initiatives',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13 10V3L4 14h7v7m0 0v7l9-11h-7z"/>
        </svg>
      ),
      roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'],
    },
    {
      title: 'Testimonials',
      href: '/admin/testimonials',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'],
    },
    {
      title: 'Legal Pages',
      href: '/admin/legal',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2z"/>
        </svg>
      ),
      roles: ['SUPER_ADMIN'],
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

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Admin Panel
            </h2>
            
            {/* User Info */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Logged in as:</p>
              <p className="font-semibold text-gray-900">{user.name}</p>
              <p className="text-sm text-blue-600">{user.role}</p>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {filteredSidebarItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    window.location.pathname === item.href
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.title}</span>
                </a>
              ))}
            </nav>

            {/* Logout */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/')}
                className="w-full"
              >
                Back to Site
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="p-8">
            <div className="bg-white rounded-lg shadow p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Welcome to Admin Dashboard
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Quick Stats */}
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    Total Users
                  </h3>
                  <p className="text-3xl font-bold text-blue-600">
                    2,456
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">
                    Total Programs
                  </h3>
                  <p className="text-3xl font-bold text-green-600">
                    48
                  </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">
                    Total Orders
                  </h3>
                  <p className="text-3xl font-bold text-purple-600">
                    1,234
                  </p>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-900 mb-2">
                    Total Revenue
                  </h3>
                  <p className="text-3xl font-bold text-orange-600">
                    ₹8.5L
                  </p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Recent Activity
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="space-y-3">
                    {[
                      'New user registration: John Doe',
                      'New order: #12345',
                      'Program enrollment: Memory Mastery',
                      'Contact form submission: Inquiry about corporate training',
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 text-sm">
                        <span className="text-gray-500">
                          {new Date().toLocaleTimeString()}
                        </span>
                        <span className="text-gray-700">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
