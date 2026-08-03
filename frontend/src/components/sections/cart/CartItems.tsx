'use client';

import React from 'react';
import { useCart } from '@/hooks/useCart';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function CartItems() {
  const { items, updateItemQuantity, removeFromCart } = useCart();

  if (items.length === 0) {
    return (
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto text-center">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-gray-600">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold">Your cart is empty</h2>
          <p className="text-gray-400 max-w-sm mx-auto">
            It looks like you haven't added anything to your cart yet. Explore our programs and start your journey today.
          </p>
          <Link 
            href="/products#categories" 
            className="bg-white text-black hover:bg-brand-orange hover:text-white px-8 py-3 rounded-full font-bold transition-all"
          >
            Explore Programs
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 gap-8">
        {items.map((item) => (
          <div 
            key={item.product.id} 
            className="flex flex-col md:flex-row items-center gap-6 p-6 bg-[#111] rounded-2xl border border-white/5 hover:border-brand-orange/30 transition-all group"
          >
            {/* Product Image */}
            <div className="w-full md:w-40 aspect-square rounded-xl overflow-hidden bg-black/50 border border-white/10 shrink-0">
              <img 
                src={item.product.imageUrl || '/placeholder-product.jpg'} 
                alt={item.product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Product Info */}
            <div className="flex-grow text-center md:text-left">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-orange mb-2 block">
                {item.product.category}
              </span>
              <h3 className="text-xl md:text-2xl font-bold mb-2">{item.product.title}</h3>
              <p className="text-gray-500 text-sm line-clamp-1">Experience transformation through neuroscience-backed methods.</p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-4 bg-black/40 p-2 rounded-full border border-white/5">
              <button 
                onClick={() => updateItemQuantity(item.product.id, item.quantity - 1)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-bold">{item.quantity}</span>
              <button 
                onClick={() => updateItemQuantity(item.product.id, item.quantity + 1)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Price & Remove */}
            <div className="flex flex-col items-center md:items-end justify-between min-w-[120px]">
              <div className="text-2xl font-black text-white">
                ₹{(item.product.price * item.quantity).toLocaleString()}
              </div>
              <button 
                onClick={() => removeFromCart(item.product.id)}
                className="mt-4 text-gray-500 hover:text-red-500 transition-colors flex items-center text-sm font-bold uppercase tracking-wider"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
