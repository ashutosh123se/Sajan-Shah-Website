'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { usePathname } from 'next/navigation';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { getTotalItems, openCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '/about' },
    { name: 'SPEAKING', href: '/speaking' },
    { name: 'PRODUCTS', href: '/products' },
    { name: 'EVENTS', href: '/events' },
    { name: 'CONTRIBUTIONS', href: '/contributions' },
    { name: 'CONTACT', href: '/contact' },
  ];

  const adminNavigation = [
    { name: 'ADMIN', href: '/admin' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <nav className="bg-[#0a0a0a] fixed top-0 w-full z-50 transition-all duration-500 ease-in-out border-b border-gray-900 shadow-2xl">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 ${isScrolled ? 'py-4 md:py-6' : 'pt-6 pb-6'}`}>

          {/* Top Branding Section */}
          <div className={`flex justify-center items-center w-full relative transition-all duration-500 overflow-hidden ${isScrolled ? 'h-0 mb-0 opacity-0' : 'h-24 md:h-28 mb-6 opacity-100'}`}>
            
            {/* Center Brand: Sajan Shah */}
            <Link href="/" className="flex flex-col items-center group">
              <div className="flex items-baseline text-4xl md:text-5xl tracking-tight">
                <span className="font-light text-white uppercase">sajan</span>
                <span className="font-light text-white uppercase"><span className="text-[#f26522]">s</span>hah</span>
              </div>
              <div className="flex items-center mt-1">
                <div className="h-[2px] bg-[#f26522] w-12 md:w-20"></div>
                <span className="ml-3 text-[10px] md:text-xs text-gray-400 font-medium lowercase tracking-tight">
                  shift your story. shape your success.
                </span>
              </div>
            </Link>

            {/* Right Brand (Absolute Positioned for alignment) */}
            <div className="hidden lg:flex flex-col items-start leading-[0.85] absolute right-24 xl:right-32 top-1/2 transform -translate-y-1/2 opacity-90">
               <div className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase whitespace-nowrap">
                 Neuroscience Drives
               </div>
               <div className="text-xl md:text-2xl font-black text-[#f26522] tracking-tighter uppercase whitespace-nowrap flex items-start">
                 Driven Success<span className="text-[10px] ml-0.5 mt-0.5 font-bold">™</span>
               </div>
            </div>

            {/* Cart & Auth (Absolute right) */}
            <div className="hidden md:flex absolute right-0 items-center space-x-6 bottom-0">
              <Link href="/cart" className="relative text-white hover:text-[#f26522] transition-colors">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#f26522] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-xs text-gray-400 font-medium">Welcome, {user?.name?.split(' ')[0]}</span>
                  <button onClick={logout} className="text-xs text-white hover:text-[#f26522] uppercase tracking-widest font-bold transition-colors">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link href="/login" className="text-xs text-white hover:text-[#f26522] uppercase tracking-widest font-bold transition-colors">
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Links Section */}
          <div className="flex justify-between items-center">

            {/* Mobile menu button (Left aligned on mobile) */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white hover:text-[#f26522] p-2">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Desktop Navigation (Centered) */}
            <div className="hidden md:flex w-full justify-center space-x-12 lg:space-x-20">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-xs uppercase tracking-widest font-bold transition-colors ${isActive(item.href) ? 'text-[#f26522]' : 'text-white hover:text-[#f26522]'}`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Admin Links */}
              {isAuthenticated && (user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') && (
                <>
                  {adminNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`text-xs uppercase tracking-widest font-bold transition-colors ${isActive(item.href) ? 'text-[#f26522]' : 'text-gray-500 hover:text-white'}`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </>
              )}
            </div>

            {/* Mobile Cart Icon (Right aligned on mobile) */}
            <div className="md:hidden flex items-center">
              <Link href="/cart" className="relative text-white hover:text-[#f26522] p-2">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {getTotalItems() > 0 && (
                  <span className="absolute top-0 right-0 bg-[#f26522] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            </div>

          </div>
        </div>
      </nav>

      {/* Global Fullscreen Menu (Triggers from both main navbar mobile button and floating scroll button) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[55] bg-black/95 backdrop-blur-xl flex items-center justify-center">
          <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-8 text-white hover:text-[#f26522]">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className="flex flex-col items-center space-y-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-2xl md:text-4xl font-bold tracking-widest uppercase transition-colors ${isActive(item.href) ? 'text-[#f26522]' : 'text-white hover:text-[#f26522]'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div className="w-24 h-1 bg-gray-800 my-8"></div>

            {isAuthenticated ? (
              <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="text-xl text-gray-500 hover:text-white uppercase tracking-widest font-bold">
                Logout
              </button>
            ) : (
              <div className="flex space-x-6">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-xl text-white hover:text-[#f26522] uppercase tracking-widest font-bold">
                  Login
                </Link>
                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="text-xl text-[#f26522] hover:text-white uppercase tracking-widest font-bold">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
