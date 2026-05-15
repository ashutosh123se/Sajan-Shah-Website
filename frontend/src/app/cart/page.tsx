'use client';

import React from 'react';
import CartHero from '@/components/sections/cart/CartHero';
import CartItems from '@/components/sections/cart/CartItems';
import CartSummary from '@/components/sections/cart/CartSummary';
import CartCTA from '@/components/sections/cart/CartCTA';

export default function CartPage() {
  return (
    <div className="bg-black min-h-screen text-white relative">
      {/* Background Logo Watermark */}
      <div className="fixed inset-0 flex items-center justify-center opacity-[0.1] pointer-events-none select-none z-0 overflow-hidden">
        <div className="flex flex-col items-center transform -rotate-12 scale-[3.5] md:scale-[5]">
          <div className="flex items-baseline text-6xl tracking-tighter">
            <span className="font-light text-white uppercase">sajan</span>
            <span className="font-black text-white uppercase"><span className="text-[#f26522]">s</span>hah</span>
          </div>
          <div className="flex items-center mt-2 w-full">
            <div className="h-[1px] bg-[#f26522] flex-grow"></div>
            <span className="mx-4 text-[8px] text-white font-medium lowercase tracking-[0.2em] whitespace-nowrap">
              shift your story. shape your success.
            </span>
            <div className="h-[1px] bg-[#f26522] flex-grow"></div>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <CartHero />
        <CartItems />
        <CartSummary />
        <CartCTA />
      </div>
    </div>
  );
}
