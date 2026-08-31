'use client';

import React, { useEffect, useState } from 'react';
import { Pencil, Save, X, ChevronDown, ChevronUp, Eye, EyeOff, RefreshCw, AlertCircle, Plus, Trash2 } from 'lucide-react';
import api from '@/lib/api';
import { ImageUploadField } from '@/components/admin/ImageUploadField';
import { VideoUploadField } from '@/components/admin/VideoUploadField';
import { isImageFieldKey } from '@/lib/adminImageUpload';
import { normalizeCmsContent, cmsContentEntries } from '@/lib/normalizeCmsContent';

interface Section {
  id: string;
  key: string;
  title: string;
  content: any;
  order: number;
  isActive: boolean;
  updatedAt: string;
}

const SECTION_LABELS: Record<string, string> = {
  hero: '🎤 Hero / Banner',
  logos: '🏢 Trusted By / Logos',
  message: '✉️ Personal Message',
  reasons: '💡 6 Reasons Section',
  catalog: '📚 Program Catalog',
  features: '⚡ Success Ecosystem',
};

const FIELD_LABELS: Record<string, string> = {
  // Hero Section
  heading: 'Main Heading Part 1 (Regular)',
  headingItalic: 'Main Heading Part 2 (Italic)',
  headingHighlight: 'Main Heading Part 3 (Highlighted in Orange)',
  videoUrl: 'Background Video (Optional)',
  gridImages: 'Background Image Grid',
  primaryButtonText: 'Primary Button Label',
  primaryButtonScrollTarget: 'Primary Button Link (e.g. /events#book-sajan)',
  secondaryButtonText: 'Secondary Button Label',
  secondaryButtonUrl: 'Secondary Button Link URL (e.g. https://webinar.sajanshah.com)',

  // Logos Section
  label: 'Section Label Text',
  logos: 'Company Logos List',
  name: 'Company/Logo Name',
  displayType: 'Display Style (text or tedx)',
  color: 'Text Color Code (Hex)',
  borderColor: 'Bottom Underline Color Code (Hex)',
  fontStyle: 'Font Weight Style (bold, black, italic)',
  primaryColor: 'TEDx Primary Color Code (Hex)',

  // Personal Message Section
  sectionLabel: 'Small Section Tagline',
  speakerName: 'Speaker Full Name',
  speakerImage: 'Speaker Portrait Image',
  signatureImage: 'Signature Image',
  signOffText: 'Sign Off Greeting',
  paragraphs: 'Body Text Paragraphs',
  pillars: 'Key Impact Words (Pillars)',

  // Reasons Section
  bigNumber: 'Featured Stat Number (e.g., 6)',
  highlightWord1: 'Highlighted Text 1 (Orange)',
  reasonsLabel1: 'Label text 1',
  highlightWord2: 'Highlighted Text 2 (Orange)',
  reasonsLabel2: 'Label text 2',
  reasons: 'Key Reasons List',
  number: 'Index Number',
  title: 'Item Title',
  description: 'Item Description',
  marqueeSectionLabel: 'Marquee Header Tagline',
  marqueeSectionTitle: 'Marquee Title',
  marqueeImages: 'Live Stage Images',
  marqueeEventName: 'Marquee Event Title Label',
  logoImage: 'Small Avatar Logo',

  // Catalog Section
  headingDim: 'Main Title Second Part (Dimmed)',
  subtext: 'Catalog Subtitle text',
  programs: 'Speaking Programs List',
  pitch: 'Program Description/Pitch',
  badges: 'Audience Tags (comma-separated, e.g., Youth, Parents)',
  img: 'Program Feature Image',
  link: 'Program Landing Page URL (e.g. https://teachers.sajanshah.com)',
  isFeatured: 'Display as Featured Program (Larger card)',

  // Features Section
  stats: 'Key Statistics Cards',
  value: 'Stat Value (e.g., 16M+)',
  features: 'Ecosystem Features Grid',
  icon: 'Lucide Icon Name (e.g., Download, PlayCircle, PhoneCall, FileText)',
  linkText: 'Action Link Label',
  ctaCardTitle: 'Right Call-to-Action Card Title',
  ctaCardDesc: 'Right Call-to-Action Card Description',
  ctaCardButtonText: 'Right Call-to-Action Button Label',
  whatsappNumber: 'WhatsApp Phone Number (with country code, e.g., 919876543210)'
};

const getFieldLabel = (key: string) => {
  return FIELD_LABELS[key] || key.replace(/([A-Z])/g, ' $1').replace(/^\w/, c => c.toUpperCase());
};

export default function AdminSpeakingPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchSections = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/speaking/all');
      if (response.data.success) {
        const rawSections = response.data.data.sections ?? [];
        setSections(
          rawSections
            .map((s: Section) => ({ ...s, content: normalizeCmsContent(s.content) }))
            .sort((a: Section, b: Section) => a.order - b.order)
        );
      } else {
        setError('Failed to load speaking sections');
      }
    } catch (e: any) {
      setError(`Failed to connect to backend: ${e.message}. Make sure the backend is running.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handleContentChange = (sectionId: string, field: string, value: any) => {
    setSections(prev => prev.map(s => {
      if (s.id === sectionId) {
        const content = normalizeCmsContent(s.content);
        return {
          ...s,
          content: { ...content, [field]: value }
        };
      }
      return s;
    }));
  };

  const handleArrayContentChange = (sectionId: string, field: string, index: number, subField: string | null, value: any) => {
    setSections(prev => prev.map(s => {
      if (s.id === sectionId) {
        const content = normalizeCmsContent(s.content);
        const newArray = [...(content[field] || [])];
        if (subField) {
          newArray[index] = { ...newArray[index], [subField]: value };
        } else {
          newArray[index] = value;
        }
        return {
          ...s,
          content: { ...content, [field]: newArray }
        };
      }
      return s;
    }));
  };

  const getDefaultArrayItem = (firstItem: any) => {
    if (typeof firstItem === 'object' && firstItem !== null) {
      const template: any = {};
      Object.entries(firstItem).forEach(([k, v]) => {
        if (Array.isArray(v)) {
          template[k] = [];
        } else if (typeof v === 'boolean') {
          template[k] = false;
        } else {
          template[k] = '';
        }
      });
      return template;
    }
    return '';
  };

  const addArrayItem = (sectionId: string, field: string, firstItem: any) => {
    const defaultValue = getDefaultArrayItem(firstItem);
    setSections(prev => prev.map(s => {
      if (s.id === sectionId) {
        const content = normalizeCmsContent(s.content);
        const newArray = [...(content[field] || []), defaultValue];
        return {
          ...s,
          content: { ...content, [field]: newArray }
        };
      }
      return s;
    }));
  };

  const removeArrayItem = (sectionId: string, field: string, index: number) => {
    setSections(prev => prev.map(s => {
      if (s.id === sectionId) {
        const content = normalizeCmsContent(s.content);
        const newArray = (content[field] || []).filter((_: any, i: number) => i !== index);
        return {
          ...s,
          content: { ...content, [field]: newArray }
        };
      }
      return s;
    }));
  };

  const saveSection = async (id: string) => {
    setSaving(id);
    const section = sections.find(s => s.id === id);
    if (!section) return;

    try {
      const response = await api.put(`/speaking/${id}`, {
        title: section.title,
        content: normalizeCmsContent(section.content),
        order: section.order,
        isActive: section.isActive,
      });

      if (response.data.success) {
        showToast(`"${SECTION_LABELS[section.key] || section.key}" saved successfully!`);
        fetchSections();
      } else {
        showToast(`Save failed: ${response.data.error || 'Unknown error'}`, 'error');
      }
    } catch (e: any) {
      showToast('Network error — is the backend running?', 'error');
    } finally {
      setSaving(null);
    }
  };

  const toggleActive = async (section: Section) => {
    try {
      const response = await api.put(`/speaking/${section.id}`, {
        isActive: !section.isActive,
      });
      if (response.data.success) {
        fetchSections();
        showToast(`Section ${!section.isActive ? 'activated' : 'deactivated'}`);
      } else {
        showToast('Failed to update status', 'error');
      }
    } catch {
      showToast('Network error', 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <img src="/loding.png" alt="Loading" className="animate-spin object-contain h-8 w-8 inline-block mx-auto" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <div className="p-8 max-w-5xl mx-auto">
        {/* Toast */}
        {toast && (
          <div className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-xl shadow-2xl font-semibold text-white text-sm transition-all border ${toast.type === 'success' ? 'bg-green-950 border-green-800 text-green-400' : 'bg-red-950 border-red-800 text-red-400'}`}>
            {toast.msg}
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-10 border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Speaking Page CMS</h1>
            <p className="text-zinc-400 mt-1 text-sm font-light">Modify text, change images, and toggle section visibility without writing code.</p>
          </div>
          <button
            onClick={fetchSections}
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white border border-zinc-800 px-4 py-2 rounded-lg bg-zinc-950 shadow-sm transition-all hover:bg-zinc-900"
          >
            <RefreshCw size={14} /> Refresh
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 p-5 bg-red-950/30 border border-red-900 rounded-2xl flex items-start gap-4">
            <AlertCircle className="text-red-400 mt-0.5 shrink-0" size={20} />
            <div>
              <p className="font-semibold text-red-300 text-sm mb-1">Could not load sections</p>
              <p className="text-red-400 text-sm">{error}</p>
              <p className="text-red-500 text-xs mt-2 font-mono">
                Quick fix: Run <code className="bg-red-950/50 px-1 rounded border border-red-900">node src/scripts/seedSpeakingPage.js</code> in the backend folder
              </p>
            </div>
          </div>
        )}

        {/* Sections List */}
        <div className="space-y-6">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`border rounded-2xl overflow-hidden transition-all bg-zinc-950 shadow-lg ${section.isActive ? 'border-zinc-800' : 'border-zinc-900 opacity-60'}`}
            >
              {/* Section Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-zinc-900/40 border-b border-zinc-900">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setExpanded(expanded === section.id ? null : section.id)}
                    className="text-zinc-400 hover:text-white p-1 transition-colors"
                  >
                    {expanded === section.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  <div>
                    <span className="font-bold text-white text-base">{SECTION_LABELS[section.key] || section.key}</span>
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${section.isActive ? 'bg-green-950/80 text-green-400 border-green-800' : 'bg-zinc-800 text-zinc-500 border-zinc-700'}`}>
                    {section.isActive ? 'Active' : 'Hidden'}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">Visible</label>
                    <input
                      type="checkbox"
                      checked={section.isActive}
                      onChange={(e) => {
                        const active = e.target.checked;
                        setSections(prev => prev.map(s => s.id === section.id ? { ...s, isActive: active } : s));
                      }}
                      className="w-4 h-4 rounded border-zinc-700 bg-zinc-950 text-[#f26522] focus:ring-[#f26522] focus:ring-offset-black"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">Order</label>
                    <input
                      type="number"
                      value={section.order}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        setSections(prev => prev.map(s => s.id === section.id ? { ...s, order: val } : s));
                      }}
                      className="w-14 bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-sm text-center font-semibold text-white focus:border-[#f26522] focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={() => saveSection(section.id)}
                    disabled={saving === section.id}
                    className="flex items-center gap-2 bg-[#f26522] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#d95a1e] transition-colors disabled:opacity-60 shadow-md"
                  >
                    <Save size={13} /> {saving === section.id ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              {expanded === section.id && (
                <div className="p-6 bg-zinc-950 space-y-6">
                  {/* Section Title field */}
                  <div className="space-y-1 pb-4 border-b border-zinc-900">
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">Internal Section Name</label>
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSections(prev => prev.map(s => s.id === section.id ? { ...s, title: val } : s));
                      }}
                      className="w-full max-w-md border border-zinc-800 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f26522]/30 bg-zinc-900 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {cmsContentEntries(section.content).map(([key, value]: [string, any]) => {
                      // 1. Array-based fields
                      if (Array.isArray(value)) {
                        const firstItem = value[0];
                        return (
                          <div key={key} className="col-span-2 space-y-4 bg-zinc-900/30 p-6 rounded-2xl border border-zinc-900">
                            <div className="flex justify-between items-center border-b border-zinc-850 pb-3">
                              <label className="text-sm font-bold text-[#f26522] uppercase tracking-widest">
                                {getFieldLabel(key)}
                              </label>
                              <button
                                onClick={() => addArrayItem(section.id, key, firstItem)}
                                className="flex items-center gap-1 text-[11px] font-bold bg-zinc-900 text-zinc-350 border border-zinc-800 px-3 py-1.5 rounded-lg shadow-sm hover:bg-zinc-800 hover:text-white transition-colors"
                              >
                                <Plus size={12} /> Add Item
                              </button>
                            </div>

                            <div className="space-y-4">
                              {value.map((item, idx) => (
                                <div key={idx} className="flex gap-4 items-start bg-zinc-900 p-4 rounded-xl border border-zinc-800/80 shadow-sm relative group">
                                  <div className="flex-1 space-y-4">
                                    {typeof item === 'object' && item !== null ? (
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {Object.keys(item).map((subKey) => {
                                          const subValue = item[subKey];

                                          // Boolean in array item
                                          if (typeof subValue === 'boolean') {
                                            return (
                                              <div key={subKey} className="flex items-center gap-2 pt-2 col-span-1">
                                                <input
                                                  type="checkbox"
                                                  checked={subValue}
                                                  onChange={(e) => handleArrayContentChange(section.id, key, idx, subKey, e.target.checked)}
                                                  className="w-4 h-4 rounded border-zinc-700 bg-zinc-950 text-[#f26522] focus:ring-[#f26522]"
                                                />
                                                <label className="text-xs font-bold text-zinc-400 uppercase">{getFieldLabel(subKey)}</label>
                                              </div>
                                            );
                                          }

                                          // Nested array in array item
                                          if (Array.isArray(subValue)) {
                                            return (
                                              <div key={subKey} className="space-y-1 col-span-2">
                                                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{getFieldLabel(subKey)}</label>
                                                <input
                                                  type="text"
                                                  value={subValue.join(', ')}
                                                  onChange={(e) => {
                                                    const arr = e.target.value.split(',').map(x => x.trim()).filter(Boolean);
                                                    handleArrayContentChange(section.id, key, idx, subKey, arr);
                                                  }}
                                                  className="w-full border border-zinc-800 bg-zinc-950 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f26522]/30 text-white"
                                                />
                                              </div>
                                            );
                                          }

                                          // Normal field in array item
                                          const isSubImage = isImageFieldKey(subKey);
                                          const isSubLongText = !isSubImage && subValue?.toString().length > 80;
                                          return (
                                            <div key={subKey} className={isSubLongText || isSubImage ? 'space-y-1 col-span-2' : 'space-y-1 col-span-1'}>
                                              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{getFieldLabel(subKey)}</label>
                                              {isSubImage ? (
                                                <ImageUploadField
                                                  label=""
                                                  value={subValue || ''}
                                                  folder="speaking"
                                                  onChange={(url) => handleArrayContentChange(section.id, key, idx, subKey, url)}
                                                />
                                              ) : isSubLongText ? (
                                                <textarea
                                                  value={subValue}
                                                  onChange={(e) => handleArrayContentChange(section.id, key, idx, subKey, e.target.value)}
                                                  className="w-full border border-zinc-800 bg-zinc-950 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f26522]/30 text-white"
                                                  rows={2}
                                                />
                                              ) : (
                                                <input
                                                  type="text"
                                                  value={subValue}
                                                  onChange={(e) => handleArrayContentChange(section.id, key, idx, subKey, e.target.value)}
                                                  className="w-full border border-zinc-800 bg-zinc-950 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f26522]/30 text-white"
                                                />
                                              )}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    ) : isImageFieldKey(key) ? (
                                      <ImageUploadField
                                        label="Image"
                                        value={item || ''}
                                        folder="speaking"
                                        onChange={(url) => handleArrayContentChange(section.id, key, idx, null, url)}
                                      />
                                    ) : (
                                      // Primitive value in array (e.g. list of strings)
                                      <div className="w-full space-y-1">
                                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Item Text</label>
                                        <textarea
                                          value={item}
                                          onChange={(e) => handleArrayContentChange(section.id, key, idx, null, e.target.value)}
                                          className="w-full border border-zinc-800 bg-zinc-950 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f26522]/30 text-white"
                                          rows={2}
                                        />
                                      </div>
                                    )}
                                  </div>
                                  <button
                                    onClick={() => removeArrayItem(section.id, key, idx)}
                                    className="text-zinc-500 hover:text-red-400 p-2 hover:bg-red-950/20 rounded-lg shrink-0 self-center transition-colors"
                                    title="Delete item"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }

                      // 2. Boolean-based top-level fields
                      if (typeof value === 'boolean') {
                        return (
                          <div key={key} className="flex items-center gap-2 col-span-1 pt-4">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) => handleContentChange(section.id, key, e.target.checked)}
                              className="w-4 h-4 rounded border-zinc-700 bg-zinc-950 text-[#f26522] focus:ring-[#f26522]"
                            />
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                              {getFieldLabel(key)}
                            </label>
                          </div>
                        );
                      }

                      // 3. String-based top-level fields
                      const isImage = isImageFieldKey(key);
                      const isVideo = key.toLowerCase().includes('video');
                      const isLongText = !isImage && !isVideo && value?.toString().length > 60;

                      return (
                        <div key={key} className={isLongText || isImage || isVideo ? 'col-span-2 space-y-1' : 'space-y-1'}>
                          <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">
                            {getFieldLabel(key)}
                          </label>
                          {isVideo ? (
                            <VideoUploadField
                              label=""
                              value={value || ''}
                              folder="speaking"
                              onChange={(url) => handleContentChange(section.id, key, url)}
                            />
                          ) : isImage ? (
                            <ImageUploadField
                              label=""
                              value={value || ''}
                              folder="speaking"
                              onChange={(url) => handleContentChange(section.id, key, url)}
                            />
                          ) : isLongText ? (
                            <textarea
                              value={value}
                              onChange={(e) => handleContentChange(section.id, key, e.target.value)}
                              className="w-full border border-zinc-800 bg-zinc-950 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#f26522]/30 text-white placeholder-zinc-700"
                              rows={3}
                            />
                          ) : (
                            <input
                              type="text"
                              value={value}
                              onChange={(e) => handleContentChange(section.id, key, e.target.value)}
                              className="w-full border border-zinc-800 bg-zinc-950 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f26522]/30 text-white"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
