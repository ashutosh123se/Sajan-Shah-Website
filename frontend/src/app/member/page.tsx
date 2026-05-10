'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function MemberDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Member <span className="text-gray-500">Privileges</span>
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Welcome, {user?.name}. You have access to exclusive member resources.
          </p>
        </div>
        <div className="bg-white text-black px-4 py-2 font-bold uppercase tracking-widest text-xs">
          Gold Tier
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#141414] p-6 border border-white/10 rounded-xl shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-4">Webinars Access</h3>
          <p className="text-3xl font-bold text-white">Unlimited</p>
        </div>
        <div className="bg-[#141414] p-6 border border-white/10 rounded-xl shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-4">Course Discount</h3>
          <p className="text-3xl font-bold text-white">25% OFF</p>
        </div>
        <div className="bg-[#141414] p-6 border border-white/10 rounded-xl shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-4">Priority Support</h3>
          <p className="text-3xl font-bold text-white">Active</p>
        </div>
        <div className="bg-[#141414] p-6 border border-white/10 rounded-xl shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-4">Community Rank</h3>
          <p className="text-3xl font-bold text-white">#12</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#141414] border border-white/10 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Exclusive Webinars</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                <div>
                  <h4 className="font-semibold text-white text-lg">Mastering Influence {i}</h4>
                  <p className="text-sm text-gray-400">Available until June 30, 2026</p>
                </div>
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#141414] border border-white/10 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Upcoming Events</h2>
          <div className="space-y-4">
            <div className="p-4 bg-white/5 border border-white/5 rounded-lg">
              <h4 className="font-semibold text-white">Annual Membership Meetup</h4>
              <p className="text-sm text-gray-400 mt-1">July 15, 2026 • Mumbai, India</p>
              <button className="mt-4 text-xs font-bold uppercase tracking-widest text-white border-b border-white/20 pb-1 hover:border-white transition-colors">
                Reserve Seat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
