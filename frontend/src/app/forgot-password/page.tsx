'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call since backend endpoint is not yet implemented
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      toast.success('Recovery email sent!');
    } catch (err: any) {
      toast.error(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start pt-60 pb-12 overflow-hidden bg-black selection:bg-[#f26522]/30">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/login-bg.png" 
          alt="Background" 
          className="w-full h-full object-cover opacity-60 grayscale-[0.5]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-[#f26522]/10"></div>
      </div>

      {/* Decorative Light Rays */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f26522]/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="py-8 md:py-0">
          {/* Logo & Header */}
          <div className="text-center mb-10">
            <Link href="/" className="inline-block mb-6">
              <h1 className="text-3xl md:text-4xl font-light tracking-tighter text-white">
                sajan<span className="font-bold text-[#f26522]">shah</span>
              </h1>
              <div className="w-12 h-1 bg-[#f26522] mx-auto mt-1"></div>
            </Link>
            <h2 className="text-2xl font-bold text-white mb-2">Password Recovery</h2>
            <p className="text-gray-500 text-sm font-light">
              {isSubmitted 
                ? "Check your email for recovery instructions." 
                : "Enter your email to receive a recovery link."}
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 ml-1">
                  Identity (Email)
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#f26522] transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-xl focus:outline-none focus:border-[#f26522] focus:bg-white/10 transition-all text-white placeholder:text-gray-700"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#f26522] hover:bg-[#d95a1e] text-white font-bold py-4 rounded-xl shadow-[0_10px_20px_rgba(242,101,34,0.2)] transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  {isLoading ? 'Sending Request...' : (
                    <>
                      Send Recovery Link <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          ) : (
            <div className="pt-2">
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Sign In
                </motion.button>
              </Link>
            </div>
          )}

          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm font-light">
              Remember your password?{' '}
              <Link href="/login" className="text-white font-bold hover:text-[#f26522] transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Branding */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-[10px] uppercase tracking-[0.3em] font-medium">
            Transform Your Thinking. Transform Your Life.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
