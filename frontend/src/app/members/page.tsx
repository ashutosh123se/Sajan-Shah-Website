'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import api from '@/lib/api';
import { MediaImage } from '@/components/common/MediaImage';

interface Member {
  id: string;
  name: string;
  photoUrl?: string;
  bio?: string;
  achievements?: string[];
  tier?: string;
  joinedAt: string;
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    tier: '',
    search: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, [filters, currentPage]);

  const fetchMembers = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '12',
        ...Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== '')),
      });
      
      const response = await api.get(`/members?${params}`);
      setMembers(response.data.data.members || []);
      setHasNextPage(Boolean(response.data.data.pagination?.hasNextPage));
    } catch (error) {
      console.error('Failed to fetch members:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTierBadge = (tier?: string) => {
    const colors = {
      bronze: 'bg-amber-100 text-amber-800',
      silver: 'bg-gray-100 text-gray-800',
      gold: 'bg-yellow-100 text-yellow-800',
      platinum: 'bg-purple-100 text-purple-800',
      diamond: 'bg-blue-100 text-blue-800',
    };

    return (
      <span className={`text-xs px-2 py-1 rounded-full ${colors[tier as keyof typeof colors] || 'bg-gray-100 text-gray-800'}`}>
        {tier ? tier.charAt(0).toUpperCase() + tier.slice(1) : ''}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    whyJoin: '',
  });

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await api.post('/members/apply', applicationData);
      alert('Application submitted successfully! We will review and get back to you.');
      setApplicationData({
        name: '',
        email: '',
        phone: '',
        bio: '',
        whyJoin: '',
      });
      setShowApplicationForm(false);
    } catch (error) {
      console.error('Application failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white selection:bg-white selection:text-black">
      {/* Hero Section */}
      <section className="py-32 bg-[#0C0C0C] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter">
              OUR <span className="text-gray-500">MEMBERS</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
              Join an elite community of high-performers and visionaries.
            </p>
            <div className="mt-12">
              <Button
                size="lg"
                onClick={() => setShowApplicationForm(true)}
                className="bg-white text-black hover:bg-gray-200 px-10 py-6 rounded-none font-bold uppercase tracking-widest text-sm transition-all duration-300"
              >
                Apply for Membership
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="bg-[#141414] border border-white/10 p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto rounded-none shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white tracking-tight">
                MEMBERSHIP <span className="text-gray-500">APPLICATION</span>
              </h2>
              <button
                onClick={() => setShowApplicationForm(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleApplicationSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={applicationData.name}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={applicationData.email}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={applicationData.phone}
                  onChange={(e) => setApplicationData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                  Bio / Introduction
                </label>
                <textarea
                  rows={4}
                  value={applicationData.bio}
                  onChange={(e) => setApplicationData(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                  Why Do You Want To Join?
                </label>
                <textarea
                  required
                  rows={4}
                  value={applicationData.whyJoin}
                  onChange={(e) => setApplicationData(prev => ({ ...prev, whyJoin: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors resize-none"
                  placeholder="Tell us why you want to become a member..."
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1 bg-white text-black hover:bg-gray-200 rounded-none h-14 font-bold uppercase tracking-widest">
                  Submit Application
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowApplicationForm(false)}
                  className="bg-transparent text-white border-white/20 hover:bg-white/5 rounded-none h-14 px-8"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filters Section */}
      <section className="py-12 bg-[#0C0C0C] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="SEARCH MEMBERS..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white focus:outline-none focus:border-white transition-colors uppercase tracking-widest text-sm"
              />
            </div>

            <div className="w-full md:w-64">
              <select
                value={filters.tier}
                onChange={(e) => setFilters(prev => ({ ...prev, tier: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white focus:outline-none focus:border-white transition-colors uppercase tracking-widest text-sm appearance-none"
              >
                <option value="">ALL TIERS</option>
                <option value="bronze">BRONZE</option>
                <option value="silver">SILVER</option>
                <option value="gold">GOLD</option>
                <option value="platinum">PLATINUM</option>
                <option value="diamond">DIAMOND</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Members Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="bg-[#141414] border border-white/10 p-8 animate-pulse">
                  <div className="w-32 h-32 bg-white/5 rounded-full mx-auto mb-8"></div>
                  <div className="h-6 bg-white/5 mb-4"></div>
                  <div className="h-4 bg-white/5 w-3/4 mx-auto"></div>
                </div>
              ))}
            </div>
          ) : members.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
              {members.map((member) => (
                <div key={member.id} className="group bg-[#141414] border border-white/10 p-10 text-center hover:border-white transition-all duration-500 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 -rotate-45 translate-x-12 -translate-y-12 transition-transform group-hover:translate-x-10 group-hover:-translate-y-10"></div>
                  
                  {/* Photo */}
                  <div className="relative mb-8">
                    {member.photoUrl ? (
                      <MediaImage
                        src={member.photoUrl}
                        alt={member.name}
                        className="w-32 h-32 rounded-full mx-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-500 border-2 border-white/10 group-hover:border-white"
                      />
                    ) : (
                      <div className="w-32 h-32 bg-white/5 rounded-full mx-auto flex items-center justify-center border-2 border-white/10 group-hover:border-white transition-colors">
                        <span className="text-4xl text-gray-500 font-bold">
                          {member.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Name and Tier */}
                  <h3 className="text-xl font-bold text-white mb-4 tracking-tight uppercase">
                    {member.name}
                  </h3>
                  
                  {member.tier && (
                    <div className="mb-6">
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 border border-white/20 text-gray-400 group-hover:text-white group-hover:border-white transition-all">
                        {member.tier}
                      </span>
                    </div>
                  )}

                  {/* Bio */}
                  {member.bio && (
                    <p className="text-gray-500 text-sm mb-8 line-clamp-3 font-light leading-relaxed group-hover:text-gray-300 transition-colors">
                      {member.bio}
                    </p>
                  )}

                  {/* Join Date */}
                  <div className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">
                    EST. {formatDate(member.joinedAt)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border-2 border-dashed border-white/5">
              <p className="text-gray-500 uppercase tracking-widest font-bold">No members found matching your criteria.</p>
            </div>
          )}

          {/* Pagination */}
          {members.length > 0 && (
            <div className="flex justify-center mt-24">
              <div className="flex space-x-4">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="w-14 h-14 flex items-center justify-center border border-white/10 text-white disabled:opacity-20 hover:bg-white hover:text-black transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={!hasNextPage}
                  className="w-14 h-14 flex items-center justify-center border border-white/10 text-white hover:bg-white hover:text-black transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
