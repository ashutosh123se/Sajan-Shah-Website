'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import api from '@/lib/api';
import toast from 'react-hot-toast';

interface LegalPage {
  id: string;
  slug: string;
  title: string;
  content: string;
  updatedAt: string;
}

/** If content is plain text (no HTML tags), wrap paragraphs for the editor. */
function normalizeEditorContent(content: string) {
  const trimmed = (content || '').trim();
  if (!trimmed) return '';
  if (/<[a-z][\s\S]*>/i.test(trimmed)) return trimmed;
  return trimmed
    .split(/\n{2,}/)
    .map((block) => `<p>${block.replace(/\n/g, '<br>')}</p>`)
    .join('');
}

export default function AdminLegalPage() {
  const { isSuperAdmin, isAdmin } = useAuth();
  const [pages, setPages] = useState<LegalPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState<LegalPage | null>(null);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isSuperAdmin || isAdmin) {
      fetchPages();
    }
  }, [isSuperAdmin, isAdmin]);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const response = await api.get('/legal');
      setPages(response.data.data.legalPages || []);
    } catch (error) {
      console.error('Failed to fetch legal pages:', error);
      toast.error('Failed to load legal pages');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (page: LegalPage) => {
    setEditingPage(page);
    setFormData({
      title: page.title,
      content: normalizeEditorContent(page.content),
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage) return;

    const plainText = formData.content.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
    if (!formData.title.trim() || !plainText) {
      toast.error('Title and content are required');
      return;
    }

    setSaving(true);
    try {
      await api.put(`/legal/${editingPage.slug}`, formData);
      toast.success('Legal page updated');
      setEditingPage(null);
      fetchPages();
    } catch (error) {
      toast.error('Failed to save legal page');
    } finally {
      setSaving(false);
    }
  };

  if (!isSuperAdmin && !isAdmin) {
    return (
      <div className="p-8 text-center text-red-600">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p>Only admins can edit legal pages.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Legal Pages</h1>
        <p className="text-zinc-400 text-sm mt-1">Edit privacy policy, terms of service, and terms &amp; conditions stored in the database.</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-zinc-400">Loading legal pages...</div>
      ) : (
        <div className="space-y-4">
          {pages.map((page) => (
            <div key={page.id} className="bg-[#141414] border border-white/10 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-white font-semibold">{page.title}</h3>
                <p className="text-zinc-500 text-sm">/{page.slug}</p>
                <p className="text-zinc-600 text-xs mt-1">Last updated: {new Date(page.updatedAt).toLocaleString()}</p>
              </div>
              <Button variant="outline" onClick={() => handleEdit(page)}>Edit Content</Button>
            </div>
          ))}
          {pages.length === 0 && (
            <p className="text-zinc-400">No legal pages found. Run the database seed to create default pages.</p>
          )}
        </div>
      )}

      {editingPage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <form onSubmit={handleSave} className="bg-[#141414] border border-white/10 p-6 md:p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl">
            <h2 className="text-xl font-bold text-white mb-1">Edit {editingPage.title}</h2>
            <p className="text-zinc-500 text-sm mb-6">
              Write and format with the toolbar — no HTML code needed. Changes appear on /{editingPage.slug}.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Page Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f26522]/30"
                  required
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Page Content</label>
                <RichTextEditor
                  value={formData.content}
                  onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
                  placeholder="Write your legal page content here…"
                  minHeight="420px"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button type="submit" disabled={saving} className="bg-[#f26522] text-white">
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button type="button" variant="outline" onClick={() => setEditingPage(null)}>Cancel</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
