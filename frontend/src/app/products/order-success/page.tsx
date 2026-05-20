'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

function OrderSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'SS-ORDER-PENDING';
  const method = searchParams.get('method') || 'RAZORPAY';

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white pt-48 pb-32 px-4 relative overflow-hidden flex items-center justify-center">
      {/* Background Watermark */}
      <div className="fixed inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none select-none z-0 overflow-hidden">
        <div className="flex flex-col items-center transform -rotate-12 scale-[3.5] md:scale-[5]">
          <div className="flex items-baseline text-6xl tracking-tighter">
            <span className="font-light text-white uppercase">sajan</span>
            <span className="font-black text-white uppercase"><span className="text-[#f26522]">s</span>hah</span>
          </div>
        </div>
      </div>

      <div className="max-w-xl w-full bg-white/[0.02] border border-white/10 p-10 md:p-14 backdrop-blur-md relative z-10 text-center rounded-[30px] shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
        {/* Animated Checkmark SVG Container */}
        <div className="flex justify-center mb-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-24 h-24 rounded-full bg-[#f26522]/10 border border-[#f26522]/20 flex items-center justify-center shadow-[0_0_50px_rgba(242,101,34,0.2)]"
          >
            <svg className="w-12 h-12 text-[#f26522]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </motion.div>
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4 leading-none"
        >
          ORDER PLACED!
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-[#f26522] font-bold text-xs tracking-[0.3em] uppercase mb-10"
        >
          Shift your story. Shape your success.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/[0.03] border border-white/5 p-6 rounded-2xl mb-12 space-y-4 text-left font-light text-sm text-gray-400"
        >
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Order Reference</span>
            <span className="font-mono text-white text-xs select-all bg-white/5 px-3 py-1 rounded">{orderId}</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Payment Method</span>
            <span className="text-white text-xs uppercase font-bold tracking-wider">{method === 'COD' ? 'Cash On Delivery' : 'Razorpay Gateway'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Status</span>
            <span className="text-green-500 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
              Confirmed
            </span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button 
            onClick={() => router.push('/user')} 
            className="flex-1 py-5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/[0.05] transition-all rounded-none"
          >
            My Dashboard
          </button>
          <button 
            onClick={() => router.push('/products')} 
            className="flex-1 py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-gray-200 transition-all rounded-none shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
          >
            Continue Store
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#0C0C0C] text-white">Loading order summary...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
