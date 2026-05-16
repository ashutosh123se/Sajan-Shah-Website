'use client';

import React from 'react';
import { useCart } from '@/hooks/useCart';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function CartSummary() {
  const { items, getTotalPrice } = useCart();

  if (items.length === 0) return null;

  const total = getTotalPrice();
  const tax = total * 0.18; // Assuming 18% GST
  const finalTotal = total + tax;

  return (
    <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto relative z-10 border-t border-white/5 mt-12">
      <div className="flex flex-col lg:flex-row justify-between gap-12">
        {/* Left: Info & Trust */}
        <div className="lg:max-w-md">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-brand-orange/10 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-brand-orange" />
            </div>
            <div>
              <h4 className="font-bold text-white">Secure Checkout</h4>
              <p className="text-sm text-gray-500">Your transaction is encrypted and secured by industry-leading providers.</p>
            </div>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            By proceeding to checkout, you agree to our <a href="/terms-of-service" className="text-white hover:text-brand-orange underline">Terms of Service</a> and <a href="/privacy-policy" className="text-white hover:text-brand-orange underline">Privacy Policy</a>.
          </p>
        </div>

        {/* Right: Price Details */}
        <div className="w-full lg:w-[400px] space-y-6">
          <div className="bg-[#111] p-8 rounded-3xl border border-white/5 space-y-4">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span className="text-white font-medium">₹{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-400 border-b border-white/5 pb-4">
              <span>Estimated Tax (GST 18%)</span>
              <span className="text-white font-medium">₹{tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-xl font-bold text-white uppercase tracking-wider">Total</span>
              <span className="text-3xl font-black text-brand-orange">₹{finalTotal.toLocaleString()}</span>
            </div>

            <button className="w-full mt-8 bg-white text-black hover:bg-brand-orange hover:text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center group">
              Proceed to Payment
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
