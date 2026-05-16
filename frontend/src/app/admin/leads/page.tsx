'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/Button';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  source: string | null;
  status: string;
  data: any;
  createdAt: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      const response = await api.get('/leads');
      setLeads(response.data?.data?.leads || []);
    } catch (error) {
      toast.error('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.patch(`/leads/${id}/status`, { status });
      toast.success('Status updated');
      fetchLeads();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      await api.delete(`/leads/${id}`);
      toast.success('Lead deleted');
      fetchLeads();
    } catch (error) {
      toast.error('Failed to delete lead');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'CONTACTED': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'QUALIFIED': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'CLOSED': return 'bg-green-500/10 text-green-500 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads Management</h1>
          <p className="text-gray-400 mt-2">Manage and track potential customers from all forms.</p>
        </div>
      </div>

      <div className="bg-[#141414] border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-4 text-xs uppercase tracking-wider font-bold text-gray-400">Name / Contact</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider font-bold text-gray-400">Source</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider font-bold text-gray-400">Status</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider font-bold text-gray-400">Date</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider font-bold text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {(leads?.length || 0) === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No leads found.
                  </td>
                </tr>
              ) : (
                leads?.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white">{lead.name}</div>
                      <div className="text-xs text-gray-400">{lead.email}</div>
                      {lead.phone && <div className="text-xs text-gray-500">{lead.phone}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs bg-white/5 border border-white/10 px-2 py-1 uppercase tracking-tighter">
                        {lead.source || 'Unknown'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value)}
                        className={`text-xs border px-2 py-1 bg-transparent outline-none cursor-pointer ${getStatusColor(lead.status)}`}
                      >
                        <option value="NEW" className="bg-[#141414]">NEW</option>
                        <option value="CONTACTED" className="bg-[#141414]">CONTACTED</option>
                        <option value="QUALIFIED" className="bg-[#141414]">QUALIFIED</option>
                        <option value="CLOSED" className="bg-[#141414]">CLOSED</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => {
                            alert(JSON.stringify(lead.data, null, 2));
                          }}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                          title="View Data"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteLead(lead.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
