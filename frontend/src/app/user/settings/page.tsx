'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';

export default function UserSettingsPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Account Settings</h1>
        <p className="text-gray-400 mt-2 text-lg">Manage your profile and security preferences.</p>
      </div>

      <div className="bg-[#141414] border border-white/10 p-8 space-y-8 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs text-gray-500 uppercase tracking-widest font-bold">Full Name</label>
            <input type="text" defaultValue={user?.name} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-white outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-gray-500 uppercase tracking-widest font-bold">Email Address</label>
            <input type="email" disabled defaultValue={user?.email} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-gray-500 cursor-not-allowed outline-none" />
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex justify-end">
          <Button className="bg-white text-black rounded-none px-8 font-black uppercase tracking-widest">Update Profile</Button>
        </div>
      </div>
    </div>
  );
}
