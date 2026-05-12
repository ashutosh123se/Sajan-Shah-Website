'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await login(email, password);
      if (result?.success) {
        toast.success('Welcome back!');
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        const role = userData.role;
        
        if (['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'SHOP_MANAGER'].includes(role)) {
          router.push('/admin');
        } else if (role === 'SUBSCRIBER') {
          router.push('/member');
        } else {
          router.push('/');
        }
      } else {
        toast.error(result?.error || 'Invalid credentials');
      }
    } catch (err: any) {
      toast.error(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden bg-black">
      {/* Premium Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
      >
        <img 
          src="/login-bg.png" 
          alt="Background" 
          className="w-full h-full object-cover opacity-40 grayscale-[0.5]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-transparent"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/">
            <h1 className="text-4xl font-black text-white tracking-tighter cursor-pointer uppercase mb-2">
              Sajan<span className="text-gray-500">Shah</span>
            </h1>
          </Link>
          <div className="h-px w-12 bg-white/30 mx-auto mb-6"></div>
          <h2 className="text-2xl font-light text-white tracking-[0.2em] uppercase">
            The Inner Sanctum
          </h2>
          <p className="mt-2 text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold">
            Authorization Required
          </p>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 ml-1">
                Identity (Email)
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-600 group-focus-within:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-4 pl-12 bg-white/[0.05] border border-white/10 text-white placeholder-gray-700 focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all text-sm font-light tracking-wide"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">
                  Access Code (Password)
                </label>
                <Link href="/forgot-password" size="sm" className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                  Recovery?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-600 group-focus-within:text-white transition-colors">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-4 pl-12 pr-12 bg-white/[0.05] border border-white/10 text-white placeholder-gray-700 focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all text-sm font-light tracking-wide"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-600 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-3 w-3 bg-white/5 border-white/10 rounded-none text-black focus:ring-0"
              />
              <label htmlFor="remember-me" className="ml-2 block text-[10px] uppercase tracking-widest text-gray-500 font-medium">
                Maintain session
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] hover:bg-gray-200 transition-all disabled:opacity-50 relative overflow-hidden group flex items-center justify-center gap-2"
            >
              <span className="relative z-10">{isLoading ? 'Processing...' : 'Grant Access'}</span>
              {!isLoading && <ArrowRight className="w-3 h-3 relative z-10 group-hover:translate-x-1 transition-transform" />}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
              New to the community?{' '}
              <Link href="/signup" className="text-white hover:underline font-bold transition-all ml-1">
                Initiate Account
              </Link>
            </p>
          </div>
        </div>

        {/* Subtle Footer */}
        <div className="mt-8 text-center">
          <p className="text-[9px] uppercase tracking-[0.4em] text-gray-600 font-medium">
            © 2024 SAJAN SHAH • ELITE PERFORMANCE
          </p>
        </div>
      </motion.div>
    </div>
  );
}

