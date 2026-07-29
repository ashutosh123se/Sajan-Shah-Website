'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import { ImageUploadField } from '@/components/admin/ImageUploadField';

interface PressArticle {
  id: string;
  title: string;
  source: string;
  thumbnail: string;
  url: string;
  date: string;
  isActive: boolean;
}

export default function PressAdmin() {
  const [articles, setArticles] = useState<PressArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<PressArticle | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    source: '',
    thumbnail: '',
    url: '',
    date: new Date().toISOString().split('T')[0],
    isActive: true,
  });

  const fetchArticles = async () => {
    try {
      const res = await api.get('/press/admin/all');
      if (res.data.success) {
        setArticles(res.data.data.articles || []);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleOpenModal = (article?: PressArticle) => {
    if (article) {
      setEditingArticle(article);
      setFormData({
        title: article.title,
        source: article.source,
        thumbnail: article.thumbnail,
        url: article.url,
        date: new Date(article.date).toISOString().split('T')[0],
        isActive: article.isActive,
      });
    } else {
      setEditingArticle(null);
      setFormData({
        title: '',
        source: '',
        thumbnail: '',
        url: '',
        date: new Date().toISOString().split('T')[0],
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingArticle(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.thumbnail) {
      alert('Please upload an article image.');
      return;
    }
    try {
      if (editingArticle) {
        await api.put(`/press/${editingArticle.id}`, formData);
      } else {
        await api.post('/press', formData);
      }
      fetchArticles();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Failed to save article.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      await api.delete(`/press/${id}`);
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Failed to delete article.');
    }
  };

  if (loading) {
    return <div className="p-8 text-white text-center">Loading articles...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Media & Press</h1>
          <p className="text-gray-400 max-w-2xl">
            Manage press stories shown on the homepage Media &amp; Press grid, and outlet names (Source)
            used in the scrolling “As Featured In” logo strip. Toggle Active to show/hide on the live site.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-[#f26522] hover:bg-[#d95a1e] text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Article
        </button>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div key={article.id} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
            <div className="h-48 bg-gray-900 relative">
              <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover" />
              {!article.isActive && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white font-bold px-3 py-1 bg-red-500 rounded text-sm">INACTIVE</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="text-sm text-[#f26522] font-semibold mb-1">{article.source}</div>
              <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{article.title}</h3>
              <div className="text-sm text-gray-400 mb-4">{new Date(article.date).toLocaleDateString()}</div>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  View Link
                </a>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenModal(article)}
                    className="p-2 text-blue-400 hover:bg-blue-400/10 rounded transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {articles.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500">
            No press articles found. Create one to get started.
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gray-900 rounded-xl max-w-2xl w-full border border-gray-700 overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold text-white">
                  {editingArticle ? 'Edit Article' : 'Add New Article'}
                </h2>
                <button onClick={handleCloseModal} className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:border-[#f26522]"
                    placeholder="Article Title"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Source (e.g. Times of India)</label>
                    <input
                      type="text"
                      required
                      value={formData.source}
                      onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                      className="w-full bg-gray-800 border border-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:border-[#f26522]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-gray-800 border border-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:border-[#f26522]"
                    />
                  </div>
                </div>

                <div>
                  <ImageUploadField
                    label="Article Image"
                    value={formData.thumbnail}
                    folder="press"
                    required
                    onChange={(thumbnail) => setFormData({ ...formData, thumbnail })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Article URL</label>
                  <input
                    type="url"
                    required
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:border-[#f26522]"
                    placeholder="https://..."
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 rounded bg-gray-800 border-gray-700 text-[#f26522] focus:ring-[#f26522]"
                  />
                  <label htmlFor="isActive" className="text-white text-sm">
                    Active (Show on website)
                  </label>
                </div>

                <div className="pt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-2 text-gray-400 hover:text-white font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#f26522] hover:bg-[#d95a1e] text-white px-6 py-2 rounded font-medium transition-colors"
                  >
                    {editingArticle ? 'Save Changes' : 'Create Article'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
