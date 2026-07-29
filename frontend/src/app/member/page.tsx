'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';

interface MemberProfile {
  id: string;
  name: string;
  email?: string | null;
  tier: string;
}

interface EventItem {
  id: string;
  title: string;
  eventDate: string;
  city?: string;
  eventType?: string;
}

export default function MemberDashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<MemberProfile | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<EventItem[]>([]);
  const [memberCount, setMemberCount] = useState(0);
  const [webinarCount, setWebinarCount] = useState(0);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [membersRes, eventsRes] = await Promise.all([
          api.get('/members?limit=1'),
          api.get('/events?filter=upcoming'),
        ]);

        const allUpcoming = eventsRes.data?.data?.events || [];
        setUpcomingEvents(allUpcoming.slice(0, 3));
        setWebinarCount(allUpcoming.filter((e: EventItem) => (e.eventType || '').toLowerCase() === 'webinar').length);
        setMemberCount(membersRes.data?.data?.pagination?.total || 0);

        if (user?.email) {
          const profileRes = await api.get(`/members?search=${encodeURIComponent(user.email)}&limit=1`);
          const first = profileRes.data?.data?.members?.[0];
          if (first) setProfile(first);
        }
      } catch (error) {
        console.error('Failed to load member dashboard data', error);
      }
    };

    loadDashboard();
  }, [user?.email]);

  const resolvedTier = profile?.tier || 'Community';

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
          {resolvedTier} Tier
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#141414] p-6 border border-white/10 rounded-xl shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-4">Upcoming Events</h3>
          <p className="text-3xl font-bold text-white">{upcomingEvents.length}</p>
        </div>
        <div className="bg-[#141414] p-6 border border-white/10 rounded-xl shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-4">Upcoming Webinars</h3>
          <p className="text-3xl font-bold text-white">{webinarCount}</p>
        </div>
        <div className="bg-[#141414] p-6 border border-white/10 rounded-xl shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-4">Membership Tier</h3>
          <p className="text-3xl font-bold text-white">{resolvedTier}</p>
        </div>
        <div className="bg-[#141414] p-6 border border-white/10 rounded-xl shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-4">Community Members</h3>
          <p className="text-3xl font-bold text-white">{memberCount}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#141414] border border-white/10 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Upcoming Webinars</h2>
          <div className="space-y-4">
            {upcomingEvents.filter((e) => (e.eventType || '').toLowerCase() === 'webinar').slice(0, 3).map((event) => (
              <div key={event.id} className="p-4 bg-white/5 border border-white/5 rounded-lg">
                <h4 className="font-semibold text-white text-lg">{event.title}</h4>
                <p className="text-sm text-gray-400">
                  {new Date(event.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
            ))}
            {upcomingEvents.filter((e) => (e.eventType || '').toLowerCase() === 'webinar').length === 0 && (
              <p className="text-sm text-gray-400">No webinars scheduled right now.</p>
            )}
          </div>
        </div>

        <div className="bg-[#141414] border border-white/10 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Upcoming Events</h2>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="p-4 bg-white/5 border border-white/5 rounded-lg">
                <h4 className="font-semibold text-white">{event.title}</h4>
                <p className="text-sm text-gray-400 mt-1">
                  {new Date(event.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  {' • '}
                  {event.city || 'Online'}
                </p>
              </div>
            ))}
            {upcomingEvents.length === 0 && (
              <p className="text-sm text-gray-400">No upcoming events at the moment.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
