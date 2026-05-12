'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await register(name, email, password);
      if (result?.success) {
        router.push('/user');
      } else {
        setError(result?.error || 'Failed to register');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden">
      {/* Premium Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/images/premium_bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-gold-500/50 to-transparent"></div>
      
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
            Begin the Journey
          </h2>
          <p className="mt-2 text-xs text-gray-400 uppercase tracking-widest font-medium">
            Join the elite circle
          </p>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs uppercase tracking-widest py-3 px-4 text-center"
              >
                {error}
              </motion.div>
            )}
            
            <div className="space-y-1">
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 ml-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3.5 bg-white/[0.05] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-white/40 transition-all text-sm font-light tracking-wide"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 ml-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 bg-white/[0.05] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-white/40 transition-all text-sm font-light tracking-wide"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 ml-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 bg-white/[0.05] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-white/40 transition-all text-sm font-light tracking-wide"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-white text-black text-xs font-black uppercase tracking-[0.3em] hover:bg-gray-200 transition-all disabled:opacity-50 relative overflow-hidden group mt-4"
            >
              <span className="relative z-10">{isLoading ? 'Creating Identity...' : 'Initiate Registration'}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
              Already a member?{' '}
              <Link href="/login" className="text-white hover:underline font-bold transition-all ml-1">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Subtle Footer */}
        <div className="mt-8 text-center">
          <p className="text-[9px] uppercase tracking-[0.4em] text-gray-600 font-medium">
            SECURE ACCESS • ELITE PRIVACY
          </p>
        </div>
      </motion.div>
    </div>
  );
}

