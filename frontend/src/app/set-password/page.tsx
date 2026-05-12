'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function SetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(true);
  const [userData, setUserData] = useState<{ email: string; name: string } | null>(null);

  useEffect(() => {
    if (!token) {
      toast.error('Invalid setup link');
      router.push('/login');
      return;
    }
    verifyToken();
  }, [token]);

  const verifyToken = async () => {
    try {
      const response = await api.get(`/auth/verify-password-token?token=${token}`);
      setUserData(response.data.data);
      setValidating(false);
    } catch (error) {
      toast.error('The link is invalid or has expired.');
      router.push('/login');
    }
  };

  const validatePassword = (pass: string) => {
    const hasUpper = /[A-Z]/.test(pass);
    const hasLower = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[@$!%*?&]/.test(pass);
    const isLongEnough = pass.length >= 8;

    return {
      hasUpper,
      hasLower,
      hasNumber,
      hasSpecial,
      isLongEnough,
      isValid: hasUpper && hasLower && hasNumber && hasSpecial && isLongEnough
    };
  };

  const passwordStatus = validatePassword(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordStatus.isValid) {
      toast.error('Password does not meet requirements');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/set-password', { token, password });
      toast.success('Password set successfully!');
      router.push('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to set password');
    } finally {
      setLoading(false);
    }
  };

  if (validating) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xs uppercase tracking-[0.4em] animate-pulse">Authenticating Secure Token...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white flex items-center justify-center p-4 py-32 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#f26522]/[0.03] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-white/[0.02] rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-12">
          <div className="text-3xl font-black tracking-tighter uppercase mb-4">
            Secure Your <span className="text-[#f26522]">Presence</span>
          </div>
          <p className="text-gray-500 text-xs uppercase tracking-[0.2em]">
            Account for: <span className="text-white">{userData?.email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white/[0.02] border border-white/5 p-8 md:p-12 backdrop-blur-xl">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-500">New Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 focus:outline-none focus:border-[#f26522]/50 transition-all text-sm tracking-widest"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-500">Confirm Password</label>
              <input 
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 focus:outline-none focus:border-[#f26522]/50 transition-all text-sm tracking-widest"
                required
              />
            </div>
          </div>

          {/* Validation Checklist */}
          <div className="grid grid-cols-1 gap-3 pt-4">
            <div className={`flex items-center gap-3 text-[9px] uppercase tracking-widest font-bold transition-colors ${passwordStatus.isLongEnough ? 'text-green-500' : 'text-gray-600'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${passwordStatus.isLongEnough ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-gray-800'}`}></div>
              Min 8 Characters
            </div>
            <div className={`flex items-center gap-3 text-[9px] uppercase tracking-widest font-bold transition-colors ${passwordStatus.hasUpper && passwordStatus.hasLower ? 'text-green-500' : 'text-gray-600'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${passwordStatus.hasUpper && passwordStatus.hasLower ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-gray-800'}`}></div>
              Upper & Lowercase
            </div>
            <div className={`flex items-center gap-3 text-[9px] uppercase tracking-widest font-bold transition-colors ${passwordStatus.hasNumber ? 'text-green-500' : 'text-gray-600'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${passwordStatus.hasNumber ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-gray-800'}`}></div>
              Number Required
            </div>
            <div className={`flex items-center gap-3 text-[9px] uppercase tracking-widest font-bold transition-colors ${passwordStatus.hasSpecial ? 'text-green-500' : 'text-gray-600'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${passwordStatus.hasSpecial ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-gray-800'}`}></div>
              Special Character
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading || !passwordStatus.isValid}
            className="w-full py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#f26522] hover:text-white transition-all disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-black shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            {loading ? 'Processing...' : 'Establish Identity'}
          </button>
        </form>

        <div className="mt-12 text-center">
          <p className="text-[9px] text-gray-600 uppercase tracking-widest leading-relaxed max-w-xs mx-auto">
            By setting your password, you agree to our premium security protocols and membership terms.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
