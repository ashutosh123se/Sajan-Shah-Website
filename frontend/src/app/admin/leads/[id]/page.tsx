'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import toast from 'react-hot-toast';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  source: string | null;
  status: string;
  data: any;
  createdAt: string;
  updatedAt?: string;
}

const FIELD_LABELS: Record<string, string> = {
  organization: 'Organization',
  city: 'City',
  eventType: 'Event Type',
  eventDate: 'Event Date',
  audience: 'Audience',
  message: 'Message',
  role: 'Role',
  quantity: 'Quantity',
  requirements: 'Requirements',
  subject: 'Subject',
};

function parseLeadData(data: any): Record<string, any> {
  if (!data) return {};
  if (typeof data === 'string') {
    try {
      const parsed = JSON.parse(data);
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
    } catch {
      return { notes: data };
    }
  }
  if (typeof data === 'object' && !Array.isArray(data)) return data;
  return {};
}

function formatLabel(key: string) {
  return FIELD_LABELS[key] || key.replace(/([A-Z])/g, ' $1').replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatValue(value: any): string {
  if (value == null || value === '') return '—';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (typeof value === 'object') return JSON.stringify(value, null, 2);
  return String(value);
}

function getStatusColor(status: string) {
  switch (status) {
    case 'NEW': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    case 'CONTACTED': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    case 'QUALIFIED': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    case 'CLOSED': return 'bg-green-500/10 text-green-400 border-green-500/20';
    default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  }
}

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    const fetchLead = async () => {
      setLoading(true);
      try {
        // Prefer single-lead endpoint; fall back to list if older API is running
        try {
          const response = await api.get(`/leads/${id}`);
          const found = response.data?.data?.lead;
          if (found && !cancelled) {
            setLead(found);
            return;
          }
        } catch {
          // fall through to list lookup
        }

        const listRes = await api.get('/leads');
        const found = (listRes.data?.data?.leads || []).find((item: Lead) => item.id === id);
        if (!cancelled) {
          if (found) {
            setLead(found);
          } else {
            setLead(null);
            toast.error('Failed to load lead details');
          }
        }
      } catch {
        if (!cancelled) {
          setLead(null);
          toast.error('Failed to load lead details');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchLead();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const updateStatus = async (status: string) => {
    if (!lead) return;
    try {
      await api.patch(`/leads/${lead.id}/status`, { status });
      setLead({ ...lead, status });
      toast.success('Status updated');
    } catch {
      toast.error('Failed to update status');
    }
  };

  const deleteLead = async () => {
    if (!lead || !confirm('Are you sure you want to delete this lead?')) return;
    try {
      await api.delete(`/leads/${lead.id}`);
      toast.success('Lead deleted');
      router.push('/admin/leads');
    } catch {
      toast.error('Failed to delete lead');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <img src="/loding.png" alt="Loading" className="animate-spin object-contain h-16 w-16 mx-auto" />
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="bg-[#141414] border border-white/10 p-8">
        <h1 className="text-2xl font-bold text-white mb-2">Lead not found</h1>
        <p className="text-gray-400 mb-6">This lead may have been deleted or the link is invalid.</p>
        <Link href="/admin/leads" className="text-[#f26522] hover:underline text-sm">
          ← Back to Leads
        </Link>
      </div>
    );
  }

  const extraFields = parseLeadData(lead.data);
  const extraEntries = Object.entries(extraFields).filter(([, value]) => value != null && value !== '');

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <Link href="/admin/leads" className="text-sm text-gray-400 hover:text-white transition-colors mb-3 inline-block">
            ← Back to Leads
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-white">{lead.name}</h1>
          <p className="text-gray-400 mt-2">Lead details and form submission</p>
        </div>
        <button
          onClick={deleteLead}
          className="px-4 py-2 text-sm border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
        >
          Delete Lead
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-[#141414] border border-white/10 p-6">
            <h2 className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-6">Contact Information</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <dt className="text-xs text-gray-500 mb-1">Full Name</dt>
                <dd className="text-white">{lead.name}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500 mb-1">Email</dt>
                <dd>
                  <a href={`mailto:${lead.email}`} className="text-[#f26522] hover:underline break-all">
                    {lead.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500 mb-1">Phone</dt>
                <dd className="text-white">
                  {lead.phone ? (
                    <a href={`tel:${lead.phone}`} className="hover:text-[#f26522] transition-colors">
                      {lead.phone}
                    </a>
                  ) : (
                    '—'
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500 mb-1">Source</dt>
                <dd>
                  <span className="text-xs bg-white/5 border border-white/10 px-2 py-1 uppercase tracking-tighter text-gray-300">
                    {(lead.source || 'Unknown').replace(/-/g, ' ')}
                  </span>
                </dd>
              </div>
            </dl>
          </section>

          <section className="bg-[#141414] border border-white/10 p-6">
            <h2 className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-6">Submission Details</h2>
            {extraEntries.length === 0 ? (
              <p className="text-gray-500 text-sm">No additional form details were submitted with this lead.</p>
            ) : (
              <dl className="space-y-5">
                {extraEntries.map(([key, value]) => {
                  const isLong = typeof value === 'string' && value.length > 80;
                  return (
                    <div key={key} className={isLong ? '' : 'grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4'}>
                      <dt className="text-xs text-gray-500">{formatLabel(key)}</dt>
                      <dd className={`text-white whitespace-pre-wrap break-words ${isLong ? 'mt-2 text-sm leading-relaxed' : 'sm:col-span-2'}`}>
                        {formatValue(value)}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            )}
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-[#141414] border border-white/10 p-6">
            <h2 className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-4">Status</h2>
            <select
              value={lead.status}
              onChange={(e) => updateStatus(e.target.value)}
              className={`w-full text-sm border px-3 py-2 bg-transparent outline-none cursor-pointer ${getStatusColor(lead.status)}`}
            >
              <option value="NEW" className="bg-[#141414]">NEW</option>
              <option value="CONTACTED" className="bg-[#141414]">CONTACTED</option>
              <option value="QUALIFIED" className="bg-[#141414]">QUALIFIED</option>
              <option value="CLOSED" className="bg-[#141414]">CLOSED</option>
            </select>
          </section>

          <section className="bg-[#141414] border border-white/10 p-6">
            <h2 className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-4">Timeline</h2>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-xs text-gray-500 mb-1">Submitted</p>
                <p className="text-white">
                  {new Date(lead.createdAt).toLocaleString('en-IN', {
                    timeZone: 'Asia/Kolkata',
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              {lead.updatedAt && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Last Updated</p>
                  <p className="text-white">
                    {new Date(lead.updatedAt).toLocaleString('en-IN', {
                      timeZone: 'Asia/Kolkata',
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
