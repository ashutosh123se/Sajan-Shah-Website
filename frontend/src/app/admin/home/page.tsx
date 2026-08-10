'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';
import { ImageUploadField } from '@/components/admin/ImageUploadField';
import { isImageFieldKey } from '@/lib/adminImageUpload';
import { normalizeCmsContent, cmsContentEntries } from '@/lib/normalizeCmsContent';
import { HeroSlidesEditor } from '@/components/admin/HeroSlidesEditor';
import { normalizeHomeHeroContent } from '@/lib/homeHeroDefaults';

interface Section {
  id: string;
  key: string;
  title: string;
  content: any;
  order: number;
  isActive: boolean;
}

export default function HomeManagementPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const response = await api.get('/home-page/all');
      if (response.data.success) {
        const rows = (response.data.data.sections || []).map((s: Section) => {
          const content = normalizeCmsContent(s.content);
          return {
            ...s,
            content: s.key === 'hero' ? normalizeHomeHeroContent(content) : content,
          };
        });
        setSections(rows);
      }
    } catch (error) {
      console.error('Error fetching sections:', error);
      toast.error('Failed to load homepage sections');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSection = async (id: string) => {
    setSaving(id);
    const section = sections.find(s => s.id === id);
    if (!section) return;

    try {
      const content =
        section.key === 'hero'
          ? normalizeHomeHeroContent(normalizeCmsContent(section.content))
          : normalizeCmsContent(section.content);
      const response = await api.put(`/home-page/${id}`, {
        title: section.title,
        content,
        order: section.order,
        isActive: section.isActive
      });
      if (response.data.success) {
        toast.success('Section updated successfully');
        if (section.key === 'hero') {
          setSections((prev) =>
            prev.map((s) => (s.id === id ? { ...s, content } : s))
          );
        }
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update section');
    } finally {
      setSaving(null);
    }
  };

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
        const newArray = [...(s.content[field] || [])];
        if (subField) {
          // Convert numeric fields if relevant
          let parsedValue = value;
          if (subField === 'value' || subField === 'order' || subField === 'id') {
            const num = parseFloat(value);
            if (!isNaN(num)) parsedValue = num;
          } else if (subField === 'isIndianFormat') {
            parsedValue = value === 'true' || value === true;
          }
          newArray[index] = { ...newArray[index], [subField]: parsedValue };
        } else {
          newArray[index] = value;
        }
        return {
          ...s,
          content: { ...s.content, [field]: newArray }
        };
      }
      return s;
    }));
  };

  const addArrayItem = (sectionId: string, field: string, defaultValue: any) => {
    setSections(prev => prev.map(s => {
      if (s.id === sectionId) {
        const newArray = [...(s.content[field] || []), defaultValue];
        return {
          ...s,
          content: { ...s.content, [field]: newArray }
        };
      }
      return s;
    }));
  };

  const removeArrayItem = (sectionId: string, field: string, index: number) => {
    setSections(prev => prev.map(s => {
      if (s.id === sectionId) {
        const newArray = (s.content[field] || []).filter((_: any, i: number) => i !== index);
        return {
          ...s,
          content: { ...s.content, [field]: newArray }
        };
      }
      return s;
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <img src="/loding.png" alt="Loading" className="animate-spin object-contain h-16 w-16 mx-auto" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Home Page Management</h1>
          <p className="text-gray-400 mt-2">Update content and visibility of Home Page sections.</p>
        </div>
      </div>

      <div className="space-y-12">
        {sections.map((section) => (
          <div key={section.id} className="bg-[#141414] border border-white/10 overflow-hidden shadow-xl">
            <div className="p-6 bg-white/5 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <span className="bg-[#f26522] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                  {section.key}
                </span>
                <h2 className="text-xl font-bold">{section.title}</h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 mr-4">
                  <label className="text-xs text-gray-400 uppercase">Visible</label>
                  <input 
                    type="checkbox" 
                    checked={section.isActive}
                    onChange={(e) => {
                      const active = e.target.checked;
                      setSections(prev => prev.map(s => s.id === section.id ? { ...s, isActive: active } : s));
                    }}
                    className="w-4 h-4 rounded bg-black border-white/20 text-[#f26522] focus:ring-[#f26522]"
                  />
                </div>
                <div className="flex items-center gap-2 mr-4">
                  <label className="text-xs text-gray-400 uppercase">Order</label>
                  <input 
                    type="number" 
                    value={section.order}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setSections(prev => prev.map(s => s.id === section.id ? { ...s, order: val } : s));
                    }}
                    className="w-16 bg-black border border-white/20 rounded px-2 py-1 text-sm text-center"
                  />
                </div>
                <Button 
                  onClick={() => handleUpdateSection(section.id)}
                  disabled={saving === section.id}
                  className="bg-white text-black hover:bg-[#f26522] hover:text-white rounded-none h-9 px-6 font-bold"
                >
                  {saving === section.id ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {section.key === 'hero' ? (
                <HeroSlidesEditor
                  value={section.content}
                  onChange={(next) => {
                    setSections((prev) =>
                      prev.map((s) => (s.id === section.id ? { ...s, content: next } : s))
                    );
                  }}
                />
              ) : (
              cmsContentEntries(section.content).map(([key, value]: [string, any]) => {
                if (Array.isArray(value)) {
                  // Custom defaults depending on the key name
                  let defaultNewItem: any = '';
                  if (key === 'slides') {
                    defaultNewItem = { id: Date.now(), headline: '', subheadline: '', ctaText: '', ctaLink: '', video: '', image: '', order: 1, isActive: true };
                  } else if (key === 'cards') {
                    defaultNewItem = { title: '', image: '', desc: '', ctaText: '', ctaLink: '' };
                  } else if (key === 'stats') {
                    defaultNewItem = { value: 0, suffix: '', label: '', desc: '', isIndianFormat: false };
                  } else if (typeof value[0] === 'object') {
                    defaultNewItem = {};
                  }

                  return (
                    <div key={key} className="col-span-2 space-y-4">
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <label className="text-sm font-bold text-[#f26522] uppercase tracking-widest">{key.replace(/([A-Z])/g, ' $1')}</label>
                        <Button 
                          onClick={() => addArrayItem(section.id, key, defaultNewItem)}
                          className="h-7 px-3 text-[10px] bg-white/5 hover:bg-white/10 rounded-none border border-white/10"
                        >
                          + Add Item
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {value.map((item, idx) => (
                          <div key={idx} className="flex gap-4 items-start bg-white/5 p-4 border border-white/5">
                            <div className="flex-1 space-y-3">
                              {typeof item === 'object' ? (
                                Object.keys(item).map(subKey => {
                                  const isBoolean = typeof item[subKey] === 'boolean';
                                  const isImage = isImageFieldKey(subKey);
                                  return (
                                    <div key={subKey} className="space-y-1">
                                      <label className="text-[10px] text-gray-500 uppercase">{subKey}</label>
                                      {isBoolean ? (
                                        <div className="flex items-center gap-2">
                                          <input 
                                            type="checkbox"
                                            checked={item[subKey]}
                                            onChange={(e) => handleArrayContentChange(section.id, key, idx, subKey, e.target.checked)}
                                            className="w-4 h-4 rounded bg-black border-white/20 text-[#f26522]"
                                          />
                                          <span className="text-xs text-gray-400">Yes / True</span>
                                        </div>
                                      ) : isImage ? (
                                        <ImageUploadField
                                          label=""
                                          value={item[subKey] || ''}
                                          folder="home"
                                          onChange={(url) => handleArrayContentChange(section.id, key, idx, subKey, url)}
                                        />
                                      ) : (
                                        <textarea 
                                          value={item[subKey] !== undefined ? item[subKey].toString() : ''}
                                          onChange={(e) => handleArrayContentChange(section.id, key, idx, subKey, e.target.value)}
                                          className="w-full bg-black border border-white/10 p-3 text-sm focus:border-[#f26522] transition-colors resize-none"
                                          rows={2}
                                        />
                                      )}
                                    </div>
                                  );
                                })
                              ) : isImageFieldKey(key) ? (
                                <ImageUploadField
                                  label=""
                                  value={item !== undefined ? item.toString() : ''}
                                  folder="home"
                                  onChange={(url) => handleArrayContentChange(section.id, key, idx, null, url)}
                                />
                              ) : (
                                <textarea 
                                  value={item !== undefined ? item.toString() : ''}
                                  onChange={(e) => handleArrayContentChange(section.id, key, idx, null, e.target.value)}
                                  className="w-full bg-black border border-white/10 p-3 text-sm focus:border-[#f26522] transition-colors resize-none"
                                  rows={2}
                                />
                              )}
                            </div>
                            <Button 
                              onClick={() => removeArrayItem(section.id, key, idx)}
                              className="h-8 w-8 p-0 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-none flex items-center justify-center border border-red-500/20"
                            >
                              &times;
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                const isImage = isImageFieldKey(key);
                const isLongText = !isImage && value.toString().length > 50;

                return (
                  <div key={key} className={isLongText || isImage ? 'col-span-2 space-y-2' : 'space-y-2'}>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </label>
                    {isImage ? (
                      <ImageUploadField
                        label=""
                        value={value || ''}
                        folder="home"
                        onChange={(url) => handleContentChange(section.id, key, url)}
                      />
                    ) : isLongText ? (
                      <textarea 
                        value={value}
                        onChange={(e) => handleContentChange(section.id, key, e.target.value)}
                        className="w-full bg-black border border-white/10 p-4 text-sm focus:border-[#f26522] transition-colors min-h-[100px]"
                      />
                    ) : (
                      <input 
                        type="text" 
                        value={value}
                        onChange={(e) => handleContentChange(section.id, key, e.target.value)}
                        className="w-full bg-black border border-white/10 p-3 text-sm focus:border-[#f26522] transition-colors"
                      />
                    )}
                  </div>
                );
              })
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
