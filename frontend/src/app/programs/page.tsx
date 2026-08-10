'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import api from '@/lib/api';
import { MediaImage } from '@/components/common/MediaImage';
import { useCart } from '@/hooks/useCart';

interface Program {
  id: string;
  title: string;
  slug: string;
  pitch: string;
  price: number;
  currency: string;
  thumbnailUrl?: string;
  targetAudience: string[];
  isFeatured: boolean;
  duration?: string;
  mode?: string;
  difficulty?: string;
}

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    difficulty: '',
    mode: '',
    priceRange: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const { addToCart } = useCart();

  useEffect(() => {
    fetchPrograms();
  }, [filters, currentPage, sortBy, sortOrder]);

  const fetchPrograms = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '12',
        sortBy,
        sortOrder,
        ...Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== '')),
      });
      
      const response = await api.get(`/programs?${params}`);
      setPrograms(response.data.data.programs || []);
    } catch (error) {
      console.error('Failed to fetch programs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const getDifficultyBadge = (difficulty?: string) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800',
    };

    return (
      <span className={`text-xs px-2 py-1 rounded-full ${colors[difficulty as keyof typeof colors] || 'bg-gray-100 text-gray-800'}`}>
        {difficulty ? difficulty.charAt(0).toUpperCase() + difficulty.slice(1) : ''}
      </span>
    );
  };

  const getModeBadge = (mode?: string) => {
    const colors = {
      online: 'bg-blue-100 text-blue-800',
      offline: 'bg-purple-100 text-purple-800',
      hybrid: 'bg-indigo-100 text-indigo-800',
    };

    return (
      <span className={`text-xs px-2 py-1 rounded-full ${colors[mode as keyof typeof colors] || 'bg-gray-100 text-gray-800'}`}>
        {mode ? mode.charAt(0).toUpperCase() + mode.slice(1) : ''}
      </span>
    );
  };

  const handleEnroll = async (program: Program) => {
    try {
      const response = await api.post(`/programs/${program.id}/enroll`);
      // Add to cart or redirect to payment
      if (program.price > 0) {
        addToCart({
          id: program.id,
          title: program.title,
          price: program.price,
          imageUrl: program.thumbnailUrl || '',
          category: 'program',
        });
      } else {
        // Free program - redirect to dashboard
        window.location.href = '/member/dashboard';
      }
    } catch (error: any) {
      console.error('Enrollment failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transform Your Learning
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Discover neuroscience-backed programs designed to unlock your full potential
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              <option value="memory">Memory Training</option>
              <option value="study-skills">Study Skills</option>
              <option value="professional">Professional Development</option>
              <option value="academic">Academic Excellence</option>
            </select>

            <select
              value={filters.difficulty}
              onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <select
              value={filters.mode}
              onChange={(e) => setFilters(prev => ({ ...prev, mode: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Modes</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="hybrid">Hybrid</option>
            </select>

            <select
              value={filters.priceRange}
              onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Prices</option>
              <option value="free">Free</option>
              <option value="0-1000">₹0 - ₹1,000</option>
              <option value="1000-5000">₹1,000 - ₹5,000</option>
              <option value="5000+">₹5,000+</option>
            </select>

            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [sort, order] = e.target.value.split('-');
                setSortBy(sort);
                setSortOrder(order as 'asc' | 'desc');
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="title-asc">Title: A-Z</option>
            </select>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : programs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {programs.map((program) => (
                <div key={program.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {/* Thumbnail */}
                  {program.thumbnailUrl && (
                    <div className="h-48 bg-gray-100">
                      <MediaImage
                        src={program.thumbnailUrl}
                        alt={program.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    {/* Badges */}
                    <div className="flex gap-2 mb-3">
                      {program.difficulty && getDifficultyBadge(program.difficulty)}
                      {program.mode && getModeBadge(program.mode)}
                      {program.isFeatured && (
                        <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {program.title}
                    </h3>

                    {/* Pitch */}
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {program.pitch}
                    </p>

                    {/* Duration */}
                    {program.duration && (
                      <div className="text-sm text-gray-500 mb-4">
                        Duration: {program.duration}
                      </div>
                    )}

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-blue-600">
                        {program.price === 0 ? 'FREE' : formatPrice(program.price)}
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => handleEnroll(program)}
                      >
                        Enroll Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No programs found matching your criteria.</p>
            </div>
          )}

          {/* Pagination */}
          {programs.length > 0 && (
            <div className="flex justify-center mt-12">
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
