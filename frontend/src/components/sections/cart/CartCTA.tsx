import React from 'react';
import { Button } from '@/components/ui/Button';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function CartCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-orange opacity-5"></div>
      <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight uppercase">
          Expand Your <span className="text-brand-orange">Journey</span>
        </h2>
        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
          Need guidance choosing the right path? Our team is here to help you select the most impactful programs for your specific goals.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/contact">
            <Button className="rounded-full bg-white text-black hover:bg-brand-orange hover:text-white font-bold px-10 py-6 text-base group">
              Consult with Experts
              <ArrowUpRight className="ml-2 w-5 h-5 group-hover:rotate-45 transition-transform" />
            </Button>
          </Link>
          <Link href="/products#categories" className="text-white hover:text-brand-orange font-bold text-sm uppercase tracking-widest transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  );
}
