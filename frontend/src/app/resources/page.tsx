'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import api from '@/lib/api';
import { MediaImage } from '@/components/common/MediaImage';

interface Resource {
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  fileUrl?: string;
  category: string;
  type: 'pdf' | 'video' | 'audio' | 'link';
  downloadCount?: number;
  isFree: boolean;
  price?: number;
  isActive: boolean;
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    price: '',
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchResources();
  }, [filters, currentPage]);

  const fetchResources = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '12',
        ...Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== '')),
      });
      
      const response = await api.get(`/resources?${params}`);
      setResources(response.data.data.resources || []);
    } catch (error) {
      console.error('Failed to fetch resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      pdf: 'bg-red-100 text-red-800',
      video: 'bg-blue-100 text-blue-800',
      audio: 'bg-green-100 text-green-800',
      link: 'bg-purple-100 text-purple-800',
    };

    return (
      <span className={`text-xs px-2 py-1 rounded-full ${colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'}`}>
        {type.toUpperCase()}
      </span>
    );
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      'study-guides': 'bg-orange-100 text-orange-800',
      'memory-techniques': 'bg-blue-100 text-blue-800',
      'practice-materials': 'bg-green-100 text-green-800',
      'research-papers': 'bg-purple-100 text-purple-800',
      'templates': 'bg-yellow-100 text-yellow-800',
    };

    return (
      <span className={`text-xs px-2 py-1 rounded-full ${colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'}`}>
        {category.replace('-', ' ').charAt(0).toUpperCase() + category.replace('-', ' ').slice(1)}
      </span>
    );
  };

  const formatPrice = (price?: number) => {
    if (!price) return 'FREE';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const handleDownload = async (resource: Resource) => {
    try {
      if (resource.fileUrl) {
        window.open(resource.fileUrl, '_blank', 'noopener,noreferrer');
      } else {
        // Handle premium resources
        alert('This resource requires premium membership to download.');
      }
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Learning Resources
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Download free guides, templates, and materials to accelerate your learning
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              <option value="study-guides">Study Guides</option>
              <option value="memory-techniques">Memory Techniques</option>
              <option value="practice-materials">Practice Materials</option>
              <option value="research-papers">Research Papers</option>
              <option value="templates">Templates</option>
            </select>

            <select
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="pdf">PDF</option>
              <option value="video">Video</option>
              <option value="audio">Audio</option>
              <option value="link">Link</option>
            </select>

            <select
              value={filters.price}
              onChange={(e) => setFilters(prev => ({ ...prev, price: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Prices</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>

            <Button
              onClick={() => window.location.href = '/member/dashboard'}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Access Premium
            </Button>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
                  <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : resources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {resources.map((resource) => (
                <div key={resource.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {/* Thumbnail */}
                  <div className="h-32 bg-gray-100">
                    {resource.thumbnailUrl ? (
                      <MediaImage
                        src={resource.thumbnailUrl}
                        alt={resource.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                        <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-2m-4 4l4 4m0 0l-4-4"/>
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    {/* Badges */}
                    <div className="flex gap-2 mb-3">
                      {getTypeBadge(resource.type)}
                      {getCategoryBadge(resource.category)}
                      {resource.isFree && (
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                          FREE
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {resource.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {resource.description}
                    </p>

                    {/* Price and Download Count */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-lg font-bold text-blue-600">
                        {formatPrice(resource.price)}
                      </div>
                      {resource.downloadCount && (
                        <div className="text-sm text-gray-500">
                          {resource.downloadCount} downloads
                        </div>
                      )}
                    </div>

                    {/* Download Button */}
                    <Button 
                      size="sm"
                      onClick={() => handleDownload(resource)}
                      className="w-full"
                    >
                      {resource.isFree ? 'Download Now' : 'Unlock Resource'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No resources found matching your criteria.</p>
            </div>
          )}

          {/* Pagination */}
          {resources.length > 0 && (
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
