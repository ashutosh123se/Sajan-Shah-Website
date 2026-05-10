'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function AdminSettingsPage() {
  const { isSuperAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'website' | 'smtp' | 'payment' | 'social'>('website');

  const [websiteSettings, setWebsiteSettings] = useState({
    siteName: 'Sajan Shah',
    contactEmail: 'contact@sajanshah.com',
    logoUrl: '',
    bannerUrl: '',
  });

  const [smtpSettings, setSmtpSettings] = useState({
    host: 'smtp.gmail.com',
    port: '587',
    username: '',
    password: '',
  });

  const [paymentSettings, setPaymentSettings] = useState({
    gateway: 'Razorpay',
    apiKey: '',
    apiSecret: '',
    currency: 'INR',
  });

  const [socialLinks, setSocialLinks] = useState({
    facebook: 'https://facebook.com/sajanshah',
    instagram: 'https://instagram.com/sajanshah',
    linkedin: 'https://linkedin.com/in/sajanshah',
    twitter: '',
  });

  if (!isSuperAdmin) {
    return (
      <div className="p-8 text-center text-red-600">
        <h2 className="text-2xl font-bold">Access Denied</h2>
        <p>Only Super Admin can access system settings.</p>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast.success('Settings saved successfully');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow min-h-[80vh] flex flex-col md:flex-row overflow-hidden">
      {/* Settings Sidebar */}
      <div className="w-full md:w-64 bg-gray-50 border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-900 mb-6">System Settings</h1>
          <nav className="space-y-2">
            {[
              { id: 'website', label: 'Website Configuration' },
              { id: 'smtp', label: 'SMTP / Email' },
              { id: 'payment', label: 'Payment Gateway' },
              { id: 'social', label: 'Social Links' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1 p-8">
        <form onSubmit={handleSave} className="max-w-2xl">
          {activeTab === 'website' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 border-b pb-4">Website Configuration</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Site Name</label>
                <input type="text" value={websiteSettings.siteName} onChange={e => setWebsiteSettings({...websiteSettings, siteName: e.target.value})} className="mt-1 w-full p-2 border rounded-md" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                <input type="email" value={websiteSettings.contactEmail} onChange={e => setWebsiteSettings({...websiteSettings, contactEmail: e.target.value})} className="mt-1 w-full p-2 border rounded-md" />
              </div>
              
              <div className="pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo Upload</label>
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 bg-gray-100 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-xs text-gray-500">Logo</div>
                  <input type="text" placeholder="Or enter logo URL" value={websiteSettings.logoUrl} onChange={e => setWebsiteSettings({...websiteSettings, logoUrl: e.target.value})} className="flex-1 p-2 border rounded-md" />
                </div>
              </div>

              <div className="pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Banner Upload</label>
                <div className="flex items-center space-x-4">
                  <div className="h-20 w-40 bg-gray-100 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-xs text-gray-500">Banner</div>
                  <input type="text" placeholder="Or enter banner URL" value={websiteSettings.bannerUrl} onChange={e => setWebsiteSettings({...websiteSettings, bannerUrl: e.target.value})} className="flex-1 p-2 border rounded-md" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'smtp' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 border-b pb-4">SMTP Configuration</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">SMTP Host</label>
                  <input type="text" value={smtpSettings.host} onChange={e => setSmtpSettings({...smtpSettings, host: e.target.value})} className="mt-1 w-full p-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">SMTP Port</label>
                  <input type="text" value={smtpSettings.port} onChange={e => setSmtpSettings({...smtpSettings, port: e.target.value})} className="mt-1 w-full p-2 border rounded-md" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Username / Email</label>
                <input type="text" value={smtpSettings.username} onChange={e => setSmtpSettings({...smtpSettings, username: e.target.value})} className="mt-1 w-full p-2 border rounded-md" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" value={smtpSettings.password} onChange={e => setSmtpSettings({...smtpSettings, password: e.target.value})} className="mt-1 w-full p-2 border rounded-md" />
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 border-b pb-4">Payment Gateway</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Provider</label>
                <select value={paymentSettings.gateway} onChange={e => setPaymentSettings({...paymentSettings, gateway: e.target.value})} className="mt-1 w-full p-2 border rounded-md">
                  <option>Razorpay</option>
                  <option>Stripe</option>
                  <option>PayPal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Currency</label>
                <select value={paymentSettings.currency} onChange={e => setPaymentSettings({...paymentSettings, currency: e.target.value})} className="mt-1 w-full p-2 border rounded-md">
                  <option>INR</option>
                  <option>USD</option>
                  <option>EUR</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">API Key / Client ID</label>
                <input type="text" value={paymentSettings.apiKey} onChange={e => setPaymentSettings({...paymentSettings, apiKey: e.target.value})} className="mt-1 w-full p-2 border rounded-md" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">API Secret</label>
                <input type="password" value={paymentSettings.apiSecret} onChange={e => setPaymentSettings({...paymentSettings, apiSecret: e.target.value})} className="mt-1 w-full p-2 border rounded-md" />
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 border-b pb-4">Social Media Links</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Facebook URL</label>
                <input type="url" value={socialLinks.facebook} onChange={e => setSocialLinks({...socialLinks, facebook: e.target.value})} className="mt-1 w-full p-2 border rounded-md" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Instagram URL</label>
                <input type="url" value={socialLinks.instagram} onChange={e => setSocialLinks({...socialLinks, instagram: e.target.value})} className="mt-1 w-full p-2 border rounded-md" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
                <input type="url" value={socialLinks.linkedin} onChange={e => setSocialLinks({...socialLinks, linkedin: e.target.value})} className="mt-1 w-full p-2 border rounded-md" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Twitter / X URL</label>
                <input type="url" value={socialLinks.twitter} onChange={e => setSocialLinks({...socialLinks, twitter: e.target.value})} className="mt-1 w-full p-2 border rounded-md" />
              </div>
            </div>
          )}

          <div className="mt-10 pt-6 border-t">
            <Button type="submit" disabled={loading} className="bg-blue-600 px-8">
              {loading ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
