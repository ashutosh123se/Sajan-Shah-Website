'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { Save, ChevronDown, ChevronUp, RefreshCw, AlertCircle, Plus, Trash2, Users, Layers, Layout } from 'lucide-react';

interface Contributor {
  id: string;
  name: string;
  photoUrl: string;
  role: string;
  description: string;
  order: number;
}

interface Initiative {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl?: string;
  stats?: string;
  order: number;
  isActive: boolean;
}

interface PageSection {
  id: string;
  key: string;
  title: string;
  content: any;
  order: number;
  isActive: boolean;
  updatedAt: string;
}

const SECTION_LABELS: Record<string, string> = {
  hero: '🎤 Contributions Hero Banner',
  impact: '📈 Live Impact Metrics Dashboard',
  donate: '💰 Donate Call to Action Section',
  stories: '📚 Impact Case Stories',
  partnerships: '🤝 Partnership & Collaborations Models',
  volunteer: '📣 Volunteer Ambassador Program Section',
  philosophy: '💡 Leadership & Contribution Philosophy',
  download: '📥 Execution Quality Report Download Centre',
  partners: '🏢 Institutional Partners Wall logo',
  gallery: '🖼️ Visual Proof Marquee Gallery'
};

const FIELD_LABELS: Record<string, string> = {
  heading: 'Main Section Title',
  subHeading: 'Upper Subtitle Tag / Category Title',
  paragraph: 'Body Paragraph Description',
  buttonText: 'Action Button Label',
  quote: 'Philosophy Central Quote',
  boxQuote: 'Orange Box Popout Quote',
  pillars: 'Pillars List (JSON Array)',
  stats: 'Stats Cards List (JSON Array)',
  timelineTitle: 'Timeline Sidebar Title',
  timeline: 'Legacy Milestones Timeline (JSON Array)',
  stories: 'Impact Case Studies (JSON Array)',
  models: 'Partnership Cards (JSON Array)',
  reports: 'Verification PDF Downloads (JSON Array)',
  logoUrl: 'Partner Logos Banner Image',
  photos: 'Visual Gallery Slides (JSON Array)'
};

const getFieldLabel = (key: string) => {
  return FIELD_LABELS[key] || key.replace(/([A-Z])/g, ' $1').replace(/^\w/, c => c.toUpperCase());
};

export default function AdminContributorsPage() {
  const { isSuperAdmin, isAdmin, isEditor } = useAuth();
  const [activeTab, setActiveTab] = useState<'contributors' | 'initiatives' | 'sections'>('contributors');

  // Loading States
  const [loading, setLoading] = useState(true);

  // Tab 1: Contributors State
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [isContribModalOpen, setIsContribModalOpen] = useState(false);
  const [editingContrib, setEditingContrib] = useState<Contributor | null>(null);
  const [contribFormData, setContribFormData] = useState({
    name: '',
    photoUrl: '',
    role: '',
    description: '',
    order: 0,
  });

  // Tab 2: Initiatives State
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [isInitModalOpen, setIsInitModalOpen] = useState(false);
  const [editingInit, setEditingInit] = useState<Initiative | null>(null);
  const [initFormData, setInitFormData] = useState({
    title: '',
    slug: '',
    description: '',
    imageUrl: '',
    stats: '',
    order: 0,
    isActive: true,
  });

  // Tab 3: Page Sections State
  const [sections, setSections] = useState<PageSection[]>([]);
  const [savingSectionId, setSavingSectionId] = useState<string | null>(null);
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>(null);
  const [errorSections, setErrorSections] = useState<string | null>(null);

  // Dynamic Array Helper Functions (Prevents JSON editing for non-IT users)
  const handleArrayFieldChange = (sectionId: string, parentKey: string, index: number, fieldName: string | null, newValue: any) => {
    setSections(prev => prev.map(s => {
      if (s.id === sectionId) {
        const currentList = [...(s.content[parentKey] || [])];
        if (fieldName === null) {
          currentList[index] = newValue;
        } else {
          currentList[index] = { ...currentList[index], [fieldName]: newValue };
        }
        return {
          ...s,
          content: { ...s.content, [parentKey]: currentList }
        };
      }
      return s;
    }));
  };

  const handleAddArrayItem = (sectionId: string, parentKey: string, defaultValue: any) => {
    setSections(prev => prev.map(s => {
      if (s.id === sectionId) {
        const currentList = [...(s.content[parentKey] || [])];
        currentList.push(defaultValue);
        return {
          ...s,
          content: { ...s.content, [parentKey]: currentList }
        };
      }
      return s;
    }));
  };

  const handleRemoveArrayItem = (sectionId: string, parentKey: string, index: number) => {
    setSections(prev => prev.map(s => {
      if (s.id === sectionId) {
        const currentList = (s.content[parentKey] || []).filter((_: any, i: number) => i !== index);
        return {
          ...s,
          content: { ...s.content, [parentKey]: currentList }
        };
      }
      return s;
    }));
  };

  const hasAccess = isSuperAdmin || isAdmin || isEditor;

  useEffect(() => {
    if (!hasAccess) return;
    loadTabData();
  }, [hasAccess, activeTab]);

  const loadTabData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'contributors') {
        await fetchContributors();
      } else if (activeTab === 'initiatives') {
        await fetchInitiatives();
      } else {
        await fetchSections();
      }
    } catch (e) {
      console.error('Error loading tab data:', e);
    } finally {
      setLoading(false);
    }
  };

  // --- 👥 Contributors CRUD Operations ---
  const fetchContributors = async () => {
    const response = await api.get('/contributors');
    setContributors(response.data.data.contributors || []);
  };

  const handleContribDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contributor?')) return;
    try {
      await api.delete(`/contributors/${id}`);
      toast.success('Contributor deleted successfully');
      fetchContributors();
    } catch (error) {
      toast.error('Failed to delete contributor');
    }
  };

  const handleContribSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingContrib) {
        await api.put(`/contributors/${editingContrib.id}`, contribFormData);
        toast.success('Contributor updated');
      } else {
        await api.post('/contributors', contribFormData);
        toast.success('Contributor created');
      }
      setIsContribModalOpen(false);
      fetchContributors();
    } catch (error) {
      toast.error('Failed to save contributor');
    }
  };

  const openContribModal = (contrib?: Contributor) => {
    if (contrib) {
      setEditingContrib(contrib);
      setContribFormData({
        name: contrib.name,
        photoUrl: contrib.photoUrl,
        role: contrib.role,
        description: contrib.description,
        order: contrib.order,
      });
    } else {
      setEditingContrib(null);
      setContribFormData({
        name: '',
        photoUrl: '',
        role: '',
        description: '',
        order: contributors.length + 1,
      });
    }
    setIsContribModalOpen(true);
  };

  // --- 💡 Initiatives CRUD Operations ---
  const fetchInitiatives = async () => {
    const response = await api.get('/initiatives');
    if (response.data.success) {
      setInitiatives(response.data.data.initiatives || []);
    }
  };

  const handleInitDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this initiative?')) return;
    try {
      await api.delete(`/initiatives/${id}`);
      toast.success('Initiative deleted successfully');
      fetchInitiatives();
    } catch (error) {
      toast.error('Failed to delete initiative');
    }
  };

  const handleInitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const slugVal = initFormData.slug || initFormData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const payload = {
        title: initFormData.title,
        slug: slugVal,
        description: initFormData.description,
        imageUrl: initFormData.imageUrl || 'https://via.placeholder.com/800x600',
        stats: initFormData.stats || null,
        order: Number(initFormData.order) || 0,
        isActive: initFormData.isActive,
      };

      if (editingInit) {
        await api.put(`/initiatives/${editingInit.id}`, payload);
        toast.success('Initiative updated');
      } else {
        await api.post('/initiatives', payload);
        toast.success('Initiative created');
      }
      setIsInitModalOpen(false);
      fetchInitiatives();
    } catch (error) {
      toast.error('Failed to save initiative');
    }
  };

  const openInitModal = (init?: Initiative) => {
    if (init) {
      setEditingInit(init);
      setInitFormData({
        title: init.title,
        slug: init.slug,
        description: init.description || '',
        imageUrl: init.imageUrl || '',
        stats: init.stats || '',
        order: init.order || 0,
        isActive: init.isActive,
      });
    } else {
      setEditingInit(null);
      setInitFormData({
        title: '',
        slug: '',
        description: '',
        imageUrl: '',
        stats: '',
        order: initiatives.length + 1,
        isActive: true,
      });
    }
    setIsInitModalOpen(true);
  };

  // --- 🎨 Page Sections CRUD Operations ---
  const fetchSections = async () => {
    setErrorSections(null);
    const response = await api.get('/contributions-page/all');
    if (response.data.success) {
      setSections(response.data.data.sections ?? []);
    } else {
      setErrorSections('Failed to load sections');
    }
  };

  const handleSectionContentChange = (sectionId: string, field: string, value: any) => {
    setSections(prev => prev.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          content: { ...s.content, [field]: value }
        };
      }
      return s;
    }));
  };

  const saveSection = async (id: string) => {
    setSavingSectionId(id);
    const section = sections.find(s => s.id === id);
    if (!section) return;

    try {
      const response = await api.put(`/contributions-page/${id}`, {
        title: section.title,
        content: section.content,
        order: section.order,
        isActive: section.isActive,
      });

      if (response.data.success) {
        toast.success(`"${SECTION_LABELS[section.key] || section.key}" section saved!`);
        fetchSections();
      } else {
        toast.error(`Save failed: ${response.data.error || 'Unknown error'}`);
      }
    } catch (e: any) {
      toast.error('Network error - is backend running?');
    } finally {
      setSavingSectionId(null);
    }
  };

  if (!hasAccess) return <div className="p-8 text-center text-red-650 font-bold">Access Denied</div>;

  return (
    <div className="space-y-8 min-h-screen bg-black text-white pb-20 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Contributors & Contributions</h1>
          <p className="text-zinc-400 text-sm mt-1">Manage team members, core social initiatives, and page copy sections.</p>
        </div>

        {/* Tab Toggle Switch */}
        <div className="flex bg-zinc-900 p-1 rounded-xl border border-zinc-800 shrink-0">
          <button
            onClick={() => setActiveTab('contributors')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${activeTab === 'contributors' ? 'bg-[#f26522] text-white shadow-md' : 'text-zinc-400 hover:text-white'}`}
          >
            <Users size={14} /> Team Contributors
          </button>
          <button
            onClick={() => setActiveTab('initiatives')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${activeTab === 'initiatives' ? 'bg-[#f26522] text-white shadow-md' : 'text-zinc-400 hover:text-white'}`}
          >
            <Layers size={14} /> Social Initiatives
          </button>
          <button
            onClick={() => setActiveTab('sections')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${activeTab === 'sections' ? 'bg-[#f26522] text-white shadow-md' : 'text-zinc-400 hover:text-white'}`}
          >
            <Layout size={14} /> Page Layout Copy
          </button>
        </div>
      </div>

      {/* --- TAB 1: TEAM CONTRIBUTORS --- */}
      {activeTab === 'contributors' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-zinc-950 p-4 border border-zinc-900 rounded-xl">
            <span className="text-zinc-400 text-sm">Add or edit profile cards for team members and contributors.</span>
            <Button onClick={() => openContribModal()} className="bg-white text-black hover:bg-gray-200 rounded-lg px-5 py-2 font-semibold">
              Add Contributor
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full py-16 text-center text-zinc-500 flex items-center justify-center gap-2">
                <img src="/loding.png" alt="Loading" className="animate-spin object-contain h-8 w-8 inline-block mr-3" /> Loading contributors...
              </div>
            ) : contributors.length > 0 ? (
              contributors.sort((a,b) => a.order - b.order).map(contrib => (
                <div key={contrib.id} className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl flex flex-col hover:border-zinc-800 transition-all shadow-md">
                  <div className="flex gap-4 mb-4">
                    <img src={contrib.photoUrl || "https://via.placeholder.com/150"} alt={contrib.name} className="w-16 h-16 object-cover rounded-lg border border-zinc-800 shrink-0" />
                    <div>
                      <h3 className="text-lg font-bold text-white mb-0.5">{contrib.name}</h3>
                      <p className="text-xs text-brand-orange font-bold uppercase tracking-wide">{contrib.role}</p>
                    </div>
                  </div>

                  <p className="text-zinc-400 text-sm line-clamp-3 mb-6 flex-grow">{contrib.description}</p>

                  <div className="flex gap-3 pt-4 border-t border-zinc-900 mt-auto">
                    <Button variant="outline" className="flex-1 rounded-lg border-zinc-850 text-zinc-300 hover:bg-zinc-900 hover:text-white text-xs" onClick={() => openContribModal(contrib)}>
                      Edit Profile
                    </Button>
                    <Button variant="outline" className="flex-1 rounded-lg border-zinc-850 text-red-400 hover:text-red-300 hover:bg-red-950/20 text-xs" onClick={() => handleContribDelete(contrib.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center border border-zinc-900 bg-zinc-950 rounded-2xl">
                <p className="text-zinc-400 text-base mb-4">No contributors found in the database</p>
                <Button onClick={() => openContribModal()} className="bg-white text-black hover:bg-gray-200 rounded-lg">Add Contributor</Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- TAB 2: CORE INITIATIVES --- */}
      {activeTab === 'initiatives' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-zinc-950 p-4 border border-zinc-900 rounded-xl">
            <span className="text-zinc-400 text-sm">Add or edit social initiatives displayed on the contributions page.</span>
            <Button onClick={() => openInitModal()} className="bg-white text-black hover:bg-gray-200 rounded-lg px-5 py-2 font-semibold">
              Create Initiative
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {loading ? (
              <div className="col-span-full py-16 text-center text-zinc-500 flex items-center justify-center gap-2">
                <img src="/loding.png" alt="Loading" className="animate-spin object-contain h-8 w-8 inline-block mr-3" /> Loading initiatives...
              </div>
            ) : initiatives.length > 0 ? (
              initiatives.map((init) => (
                <div key={init.id} className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl flex flex-col hover:border-zinc-800 transition-all shadow-md">
                  <div className="flex gap-4 mb-4">
                    {init.imageUrl && (
                      <img src={init.imageUrl} alt={init.title} className="w-16 h-16 object-cover rounded-lg border border-zinc-800 shrink-0" />
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{init.title}</h3>
                      {init.stats && (
                        <p className="text-xs text-[#f26522] font-bold uppercase tracking-wide">Impact: {init.stats}</p>
                      )}
                    </div>
                  </div>

                  <p className="text-zinc-400 text-sm line-clamp-3 mb-6 flex-grow">{init.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-zinc-900 text-xs">
                    <div>
                      <p className="uppercase tracking-wider text-zinc-500 mb-1">Display Order</p>
                      <p className="font-semibold text-white"># {init.order}</p>
                    </div>
                    <div>
                      <p className="uppercase tracking-wider text-zinc-500 mb-1">Status</p>
                      <p className={`font-semibold ${init.isActive ? 'text-green-400' : 'text-red-400'}`}>
                        {init.isActive ? 'Active (Visible)' : 'Hidden (Draft)'}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-zinc-900 mt-auto">
                    <Button variant="outline" className="flex-1 rounded-lg border-zinc-850 text-zinc-300 hover:bg-zinc-900 hover:text-white text-xs" onClick={() => openInitModal(init)}>
                      Edit Info
                    </Button>
                    <Button variant="outline" className="flex-1 rounded-lg border-zinc-850 text-red-400 hover:text-red-300 hover:bg-red-950/20 text-xs" onClick={() => handleInitDelete(init.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center border border-zinc-900 bg-zinc-950 rounded-2xl">
                <p className="text-zinc-400 text-base mb-4">No initiatives found in the database</p>
                <Button onClick={() => openInitModal()} className="bg-white text-black hover:bg-gray-200 rounded-lg">Create Initiative</Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- TAB 3: PAGE SECTIONS COPY --- */}
      {activeTab === 'sections' && (
        <div className="space-y-6">
          {errorSections && (
            <div className="p-5 bg-red-950/30 border border-red-900 rounded-2xl flex items-start gap-4">
              <AlertCircle className="text-red-400 mt-0.5 shrink-0" size={20} />
              <div>
                <p className="font-semibold text-red-300 text-sm mb-1">Could not load sections</p>
                <p className="text-red-400 text-sm">{errorSections}</p>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {loading ? (
              <div className="py-16 text-center text-zinc-500 flex items-center justify-center gap-2">
                <img src="/loding.png" alt="Loading" className="animate-spin object-contain h-8 w-8 inline-block mr-3" /> Loading sections...
              </div>
            ) : sections.map((section) => (
              <div
                key={section.id}
                className={`border rounded-2xl overflow-hidden transition-all bg-zinc-950 shadow-lg ${section.isActive ? 'border-zinc-800' : 'border-zinc-900 opacity-60'}`}
              >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-zinc-900/40 border-b border-zinc-900">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setExpandedSectionId(expandedSectionId === section.id ? null : section.id)}
                      className="text-zinc-400 hover:text-white p-1 transition-colors border-none bg-transparent cursor-pointer"
                    >
                      {expandedSectionId === section.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
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
                      disabled={savingSectionId === section.id}
                      className="flex items-center gap-2 bg-[#f26522] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#d95a1e] transition-colors disabled:opacity-60 shadow-md cursor-pointer border-none"
                    >
                      <Save size={13} /> {savingSectionId === section.id ? 'Saving...' : 'Save Section'}
                    </button>
                  </div>
                </div>

                {/* Form fields */}
                {expandedSectionId === section.id && (
                  <div className="p-6 bg-zinc-950 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(section.content || {}).map(([key, value]: [string, any]) => {
                        const isArrayOrObject = typeof value === 'object';
                        const isLongText = value && !isArrayOrObject && value.toString().length > 60;
                        const isImage = key.toLowerCase().includes('image') || key.toLowerCase().includes('url') || (value && !isArrayOrObject && (value.toString().startsWith('/') || value.toString().startsWith('http')));

                        if (isArrayOrObject) {
                          if (key === 'stats') {
                            return (
                              <div key={key} className="col-span-2 space-y-4 border-t border-zinc-900 pt-6">
                                <div className="flex justify-between items-center">
                                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Metrics Statistics Cards</h4>
                                  <button
                                    type="button"
                                    onClick={() => handleAddArrayItem(section.id, key, { label: '', value: '', trend: '' })}
                                    className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1 rounded-lg border-none cursor-pointer"
                                  >
                                    + Add Stat
                                  </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {(value || []).map((item: any, idx: number) => (
                                    <div key={idx} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 space-y-3 relative group">
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveArrayItem(section.id, key, idx)}
                                        className="absolute top-2 right-2 text-zinc-500 hover:text-red-400 bg-transparent border-none cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                      <div>
                                        <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Label</label>
                                        <input
                                          type="text"
                                          value={item.label || ''}
                                          onChange={(e) => handleArrayFieldChange(section.id, key, idx, 'label', e.target.value)}
                                          className="w-full bg-zinc-950 border border-zinc-800 text-white rounded p-2 text-xs focus:ring-1 focus:ring-[#f26522] outline-none"
                                        />
                                      </div>
                                      <div className="grid grid-cols-2 gap-3">
                                        <div>
                                          <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Value</label>
                                          <input
                                            type="text"
                                            value={item.value || ''}
                                            onChange={(e) => handleArrayFieldChange(section.id, key, idx, 'value', e.target.value)}
                                            className="w-full bg-zinc-950 border border-zinc-800 text-white rounded p-2 text-xs focus:ring-1 focus:ring-[#f26522] outline-none"
                                          />
                                        </div>
                                        <div>
                                          <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Trend</label>
                                          <input
                                            type="text"
                                            value={item.trend || ''}
                                            onChange={(e) => handleArrayFieldChange(section.id, key, idx, 'trend', e.target.value)}
                                            className="w-full bg-zinc-950 border border-zinc-800 text-white rounded p-2 text-xs focus:ring-1 focus:ring-[#f26522] outline-none"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          }

                          if (key === 'timeline') {
                            return (
                              <div key={key} className="col-span-2 space-y-4 border-t border-zinc-900 pt-6">
                                <div className="flex justify-between items-center">
                                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Legacy Timeline Milestones</h4>
                                  <button
                                    type="button"
                                    onClick={() => handleAddArrayItem(section.id, key, { year: '', title: '', event: '' })}
                                    className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1 rounded-lg border-none cursor-pointer"
                                  >
                                    + Add Milestone
                                  </button>
                                </div>
                                <div className="space-y-3">
                                  {(value || []).map((item: any, idx: number) => (
                                    <div key={idx} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex gap-4 items-start relative group">
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveArrayItem(section.id, key, idx)}
                                        className="absolute top-2 right-2 text-zinc-500 hover:text-red-400 bg-transparent border-none cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                      <div className="w-24">
                                        <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block mb-1">Year</label>
                                        <input
                                          type="text"
                                          value={item.year || ''}
                                          onChange={(e) => handleArrayFieldChange(section.id, key, idx, 'year', e.target.value)}
                                          className="w-full bg-zinc-950 border border-zinc-800 text-white rounded p-2 text-xs text-center font-bold focus:ring-1 focus:ring-[#f26522] outline-none"
                                        />
                                      </div>
                                      <div className="flex-1 space-y-2">
                                        <div>
                                          <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block mb-1">Milestone Title</label>
                                          <input
                                            type="text"
                                            value={item.title || ''}
                                            onChange={(e) => handleArrayFieldChange(section.id, key, idx, 'title', e.target.value)}
                                            className="w-full bg-zinc-950 border border-zinc-800 text-white rounded p-2 text-xs focus:ring-1 focus:ring-[#f26522] outline-none"
                                          />
                                        </div>
                                        <div>
                                          <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block mb-1">Description</label>
                                          <textarea
                                            value={item.event || ''}
                                            onChange={(e) => handleArrayFieldChange(section.id, key, idx, 'event', e.target.value)}
                                            className="w-full bg-zinc-950 border border-zinc-800 text-white rounded p-2 text-xs focus:ring-1 focus:ring-[#f26522] outline-none"
                                            rows={2}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          }

                          if (key === 'stories') {
                            return (
                              <div key={key} className="col-span-2 space-y-4 border-t border-zinc-900 pt-6">
                                <div className="flex justify-between items-center">
                                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Impact Case Stories</h4>
                                  <button
                                    type="button"
                                    onClick={() => handleAddArrayItem(section.id, key, { title: '', excerpt: '', imageUrl: '' })}
                                    className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1 rounded-lg border-none cursor-pointer"
                                  >
                                    + Add Story
                                  </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {(value || []).map((item: any, idx: number) => (
                                    <div key={idx} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 space-y-3 relative group">
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveArrayItem(section.id, key, idx)}
                                        className="absolute top-2 right-2 text-zinc-500 hover:text-red-400 bg-transparent border-none cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                      <div>
                                        <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Story Title</label>
                                        <input
                                          type="text"
                                          value={item.title || ''}
                                          onChange={(e) => handleArrayFieldChange(section.id, key, idx, 'title', e.target.value)}
                                          className="w-full bg-zinc-950 border border-zinc-800 text-white rounded p-2 text-xs focus:ring-1 focus:ring-[#f26522] outline-none"
                                        />
                                      </div>
                                      <div>
                                        <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Excerpt / Summary</label>
                                        <textarea
                                          value={item.excerpt || ''}
                                          onChange={(e) => handleArrayFieldChange(section.id, key, idx, 'excerpt', e.target.value)}
                                          className="w-full bg-zinc-950 border border-zinc-800 text-white rounded p-2 text-xs focus:ring-1 focus:ring-[#f26522] outline-none"
                                          rows={2}
                                        />
                                      </div>
                                      <div className="flex gap-2 items-center">
                                        <div className="flex-1">
                                          <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Image URL</label>
                                          <input
                                            type="text"
                                            value={item.imageUrl || ''}
                                            onChange={(e) => handleArrayFieldChange(section.id, key, idx, 'imageUrl', e.target.value)}
                                            className="w-full bg-zinc-950 border border-zinc-800 text-white rounded p-2 text-xs focus:ring-1 focus:ring-[#f26522] outline-none"
                                          />
                                        </div>
                                        {item.imageUrl && (
                                          <div className="w-12 h-12 border border-zinc-800 rounded-lg overflow-hidden shrink-0 mt-4 bg-zinc-950 shadow-md">
                                            <img src={item.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          }

                          if (key === 'models') {
                            return (
                              <div key={key} className="col-span-2 space-y-4 border-t border-zinc-900 pt-6">
                                <div className="flex justify-between items-center">
                                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Partnership Cards</h4>
                                  <button
                                    type="button"
                                    onClick={() => handleAddArrayItem(section.id, key, { title: '', desc: '', type: '' })}
                                    className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1 rounded-lg border-none cursor-pointer"
                                  >
                                    + Add Card
                                  </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  {(value || []).map((item: any, idx: number) => (
                                    <div key={idx} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 space-y-3 relative group">
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveArrayItem(section.id, key, idx)}
                                        className="absolute top-2 right-2 text-zinc-500 hover:text-red-400 bg-transparent border-none cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                      <div>
                                        <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Partner Category</label>
                                        <input
                                          type="text"
                                          value={item.type || ''}
                                          onChange={(e) => handleArrayFieldChange(section.id, key, idx, 'type', e.target.value)}
                                          className="w-full bg-zinc-950 border border-zinc-800 text-white rounded p-2 text-xs focus:ring-1 focus:ring-[#f26522] outline-none"
                                        />
                                      </div>
                                      <div>
                                        <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Title</label>
                                        <input
                                          type="text"
                                          value={item.title || ''}
                                          onChange={(e) => handleArrayFieldChange(section.id, key, idx, 'title', e.target.value)}
                                          className="w-full bg-zinc-950 border border-zinc-800 text-white rounded p-2 text-xs focus:ring-1 focus:ring-[#f26522] outline-none"
                                        />
                                      </div>
                                      <div>
                                        <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Description</label>
                                        <textarea
                                          value={item.desc || ''}
                                          onChange={(e) => handleArrayFieldChange(section.id, key, idx, 'desc', e.target.value)}
                                          className="w-full bg-zinc-950 border border-zinc-800 text-white rounded p-2 text-xs focus:ring-1 focus:ring-[#f26522] outline-none"
                                          rows={2}
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          }

                          if (key === 'pillars') {
                            return (
                              <div key={key} className="col-span-2 space-y-4 border-t border-zinc-900 pt-6">
                                <div className="flex justify-between items-center">
                                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Core Pillars List</h4>
                                  <button
                                    type="button"
                                    onClick={() => handleAddArrayItem(section.id, key, '')}
                                    className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1 rounded-lg border-none cursor-pointer"
                                  >
                                    + Add Pillar
                                  </button>
                                </div>
                                <div className="space-y-2">
                                  {(value || []).map((item: any, idx: number) => (
                                    <div key={idx} className="flex gap-2 items-center">
                                      <input
                                        type="text"
                                        value={item || ''}
                                        onChange={(e) => handleArrayFieldChange(section.id, key, idx, null, e.target.value)}
                                        className="flex-1 bg-zinc-950 border border-zinc-800 text-white rounded px-4 py-2 text-xs focus:ring-1 focus:ring-[#f26522] outline-none"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveArrayItem(section.id, key, idx)}
                                        className="text-zinc-500 hover:text-red-400 bg-transparent border-none cursor-pointer"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          }

                          if (key === 'reports') {
                            return (
                              <div key={key} className="col-span-2 space-y-4 border-t border-zinc-900 pt-6">
                                <div className="flex justify-between items-center">
                                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Execution PDF Reports</h4>
                                  <button
                                    type="button"
                                    onClick={() => handleAddArrayItem(section.id, key, { title: '', size: '' })}
                                    className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1 rounded-lg border-none cursor-pointer"
                                  >
                                    + Add Report
                                  </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {(value || []).map((item: any, idx: number) => (
                                    <div key={idx} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 space-y-3 relative group">
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveArrayItem(section.id, key, idx)}
                                        className="absolute top-2 right-2 text-zinc-500 hover:text-red-400 bg-transparent border-none cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                      <div>
                                        <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Report Title</label>
                                        <input
                                          type="text"
                                          value={item.title || ''}
                                          onChange={(e) => handleArrayFieldChange(section.id, key, idx, 'title', e.target.value)}
                                          className="w-full bg-zinc-950 border border-zinc-800 text-white rounded p-2 text-xs focus:ring-1 focus:ring-[#f26522] outline-none"
                                        />
                                      </div>
                                      <div>
                                        <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">File Size Tag</label>
                                        <input
                                          type="text"
                                          value={item.size || ''}
                                          onChange={(e) => handleArrayFieldChange(section.id, key, idx, 'size', e.target.value)}
                                          className="w-full bg-zinc-950 border border-zinc-800 text-white rounded p-2 text-xs focus:ring-1 focus:ring-[#f26522] outline-none"
                                          placeholder="e.g. 4.2 MB"
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          }

                          if (key === 'photos') {
                            return (
                              <div key={key} className="col-span-2 space-y-4 border-t border-zinc-900 pt-6">
                                <div className="flex justify-between items-center">
                                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Visual Gallery Photos</h4>
                                  <button
                                    type="button"
                                    onClick={() => handleAddArrayItem(section.id, key, { cat: '', title: '', imageUrl: '' })}
                                    className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1 rounded-lg border-none cursor-pointer"
                                  >
                                    + Add Slide
                                  </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {(value || []).map((item: any, idx: number) => (
                                    <div key={idx} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 space-y-3 relative group">
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveArrayItem(section.id, key, idx)}
                                        className="absolute top-2 right-2 text-zinc-500 hover:text-red-400 bg-transparent border-none cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                      <div>
                                        <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Category</label>
                                        <input
                                          type="text"
                                          value={item.cat || ''}
                                          onChange={(e) => handleArrayFieldChange(section.id, key, idx, 'cat', e.target.value)}
                                          className="w-full bg-zinc-950 border border-zinc-800 text-white rounded p-2 text-xs focus:ring-1 focus:ring-[#f26522] outline-none"
                                        />
                                      </div>
                                      <div>
                                        <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Title</label>
                                        <input
                                          type="text"
                                          value={item.title || ''}
                                          onChange={(e) => handleArrayFieldChange(section.id, key, idx, 'title', e.target.value)}
                                          className="w-full bg-zinc-950 border border-zinc-800 text-white rounded p-2 text-xs focus:ring-1 focus:ring-[#f26522] outline-none"
                                        />
                                      </div>
                                      <div className="flex gap-2 items-center">
                                        <div className="flex-1">
                                          <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Image URL</label>
                                          <input
                                            type="text"
                                            value={item.imageUrl || ''}
                                            onChange={(e) => handleArrayFieldChange(section.id, key, idx, 'imageUrl', e.target.value)}
                                            className="w-full bg-zinc-950 border border-zinc-800 text-white rounded p-2 text-xs focus:ring-1 focus:ring-[#f26522] outline-none"
                                          />
                                        </div>
                                        {item.imageUrl && (
                                          <div className="w-12 h-12 border border-zinc-800 rounded-lg overflow-hidden shrink-0 mt-4 bg-zinc-950 shadow-md">
                                            <img src={item.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }

                        return (
                          <div key={key} className={isLongText ? 'col-span-2 space-y-1' : 'space-y-1'}>
                            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">
                              {getFieldLabel(key)}
                            </label>
                            {isLongText ? (
                              <textarea
                                value={value || ''}
                                onChange={(e) => handleSectionContentChange(section.id, key, e.target.value)}
                                className="w-full border border-zinc-800 bg-zinc-950 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#f26522]/30 text-white placeholder-zinc-700 font-sans"
                                rows={3}
                              />
                            ) : (
                              <div className="flex gap-4 items-center">
                                <input
                                  type="text"
                                  value={value || ''}
                                  onChange={(e) => handleSectionContentChange(section.id, key, e.target.value)}
                                  className="flex-1 border border-zinc-800 bg-zinc-950 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f26522]/30 text-white font-sans"
                                />
                                {isImage && value && (
                                  <div className="w-12 h-12 border border-zinc-800 rounded-lg overflow-hidden shrink-0 bg-zinc-900 shadow-md">
                                    <img src={value} alt="Preview" className="w-full h-full object-cover" />
                                  </div>
                                )}
                              </div>
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
      )}

      {/* --- Create/Edit Contributor Modal --- */}
      {isContribModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-[#121212] border border-zinc-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
            <div className="sticky top-0 bg-[#121212] p-6 border-b border-zinc-800 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-white tracking-tight">{editingContrib ? 'Edit Contributor Profile' : 'Add New Contributor'}</h2>
              <button onClick={() => setIsContribModalOpen(false)} className="text-zinc-400 hover:text-white transition-colors border-none bg-transparent cursor-pointer">✕</button>
            </div>
            
            <form onSubmit={handleContribSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">Full Name</label>
                  <input type="text" required value={contribFormData.name} onChange={(e) => setContribFormData({...contribFormData, name: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f26522]/30" />
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">Role/Title</label>
                  <input type="text" required value={contribFormData.role} onChange={(e) => setContribFormData({...contribFormData, role: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f26522]/30" placeholder="e.g. Trustee / Social Worker" />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">Photo URL</label>
                  <input type="text" required value={contribFormData.photoUrl} onChange={(e) => setContribFormData({...contribFormData, photoUrl: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f26522]/30" placeholder="e.g. /images/team/member.jpg" />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">Profile Description</label>
                  <textarea required value={contribFormData.description} onChange={(e) => setContribFormData({...contribFormData, description: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f26522]/30" rows={4}></textarea>
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">Display Order</label>
                  <input type="number" required value={contribFormData.order} onChange={(e) => setContribFormData({...contribFormData, order: Number(e.target.value)})} className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f26522]/30" />
                </div>
              </div>

              <div className="pt-8 flex justify-end gap-4 border-t border-zinc-900">
                <Button type="button" variant="outline" onClick={() => setIsContribModalOpen(false)} className="rounded-lg border-zinc-850 text-white hover:bg-zinc-900">Cancel</Button>
                <Button type="submit" className="rounded-lg bg-[#f26522] text-white hover:bg-[#d95a1e]">Save Contributor</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- Create/Edit Initiative Modal --- */}
      {isInitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-[#121212] border border-zinc-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
            <div className="sticky top-0 bg-[#121212] p-6 border-b border-zinc-800 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-white tracking-tight">{editingInit ? 'Edit Initiative Details' : 'Create New Social Initiative'}</h2>
              <button onClick={() => setIsInitModalOpen(false)} className="text-zinc-400 hover:text-white transition-colors border-none bg-transparent cursor-pointer">✕</button>
            </div>
            
            <form onSubmit={handleInitSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">Initiative Title</label>
                  <input type="text" required value={initFormData.title} onChange={(e) => setInitFormData({...initFormData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')})} className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f26522]/30" />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">Description</label>
                  <textarea required value={initFormData.description} onChange={(e) => setInitFormData({...initFormData, description: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f26522]/30" rows={4}></textarea>
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">Impact Stats Text</label>
                  <input type="text" value={initFormData.stats} onChange={(e) => setInitFormData({...initFormData, stats: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f26522]/30" placeholder="e.g. 5,000+ Students" />
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">Image Banner URL</label>
                  <input type="text" value={initFormData.imageUrl} onChange={(e) => setInitFormData({...initFormData, imageUrl: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f26522]/30" placeholder="e.g. /images/initiative.jpg" />
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">Display Order</label>
                  <input type="number" required value={initFormData.order} onChange={(e) => setInitFormData({...initFormData, order: Number(e.target.value)})} className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f26522]/30" />
                </div>

                <div className="flex items-center space-x-2 pt-8">
                  <input type="checkbox" checked={initFormData.isActive} onChange={(e) => setInitFormData({...initFormData, isActive: e.target.checked})} className="w-4 h-4 rounded border-zinc-700 bg-zinc-950 text-[#f26522] focus:ring-[#f26522]" />
                  <span className="text-sm text-zinc-300">Active (Visible on page)</span>
                </div>
              </div>

              <div className="pt-8 flex justify-end gap-4 border-t border-zinc-900">
                <Button type="button" variant="outline" onClick={() => setIsInitModalOpen(false)} className="rounded-lg border-zinc-850 text-white hover:bg-zinc-900">Cancel</Button>
                <Button type="submit" className="rounded-lg bg-[#f26522] text-white hover:bg-[#d95a1e]">Save Initiative</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
