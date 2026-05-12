'use client';

import React from 'react';

export default function MyEventsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-4xl font-black text-white tracking-tighter uppercase">My Events</h1>
        <p className="text-gray-400 mt-2 text-lg">View your upcoming and past event registrations.</p>
      </div>

      <div className="bg-[#141414] border border-white/10 p-24 text-center">
        <p className="text-gray-500 font-bold uppercase tracking-widest italic">No events registered yet.</p>
      </div>
    </div>
  );
}
