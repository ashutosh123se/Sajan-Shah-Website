'use client';

import React, { useState, useEffect } from 'react';
import { ContributionsHero } from '@/components/sections/contributions/ContributionsHero';
import { InitiativeCards } from '@/components/sections/contributions/InitiativeCards';
import { ImpactDashboard } from '@/components/sections/contributions/ImpactDashboard';
import { DonateCTA } from '@/components/sections/contributions/DonateCTA';
import { ImpactStories } from '@/components/sections/contributions/ImpactStories';
import { PartnershipModels } from '@/components/sections/contributions/PartnershipModels';
import { VolunteerCTA } from '@/components/sections/contributions/VolunteerCTA';
import { LeadershipPhilosophy } from '@/components/sections/contributions/LeadershipPhilosophy';
import { DownloadCentre } from '@/components/sections/contributions/DownloadCentre';
import { PartnersWall } from '@/components/sections/contributions/PartnersWall';
import { VisualGallery } from '@/components/sections/contributions/VisualGallery';
import { ContributorsGrid } from '@/components/sections/contributions/ContributorsGrid';
import api from '@/lib/api';

export default function ContributionsPage() {
  const [sections, setSections] = useState<any[]>([]);
  const [initiatives, setInitiatives] = useState<any[]>([]);
  const [contributors, setContributors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sectionsRes, initiativesRes, contributorsRes] = await Promise.all([
          api.get('/contributions-page'),
          api.get('/initiatives'),
          api.get('/contributors')
        ]);

        if (sectionsRes.data.success) {
          setSections(sectionsRes.data.data.sections || []);
        }
        if (initiativesRes.data.success) {
          setInitiatives(initiativesRes.data.data.initiatives || []);
        }
        if (contributorsRes.data.success) {
          setContributors(contributorsRes.data.data.contributors || []);
        }
      } catch (error) {
        console.error('Failed to load contributions page data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getSection = (key: string) => {
    return sections.find(s => s.key === key)?.content;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/loding.png" alt="Loading" className="animate-spin object-contain h-32 w-32" />
        <div className="font-mono text-xs uppercase tracking-[0.3em]">Loading....</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      <ContributionsHero content={getSection('hero')} />
      <ContributorsGrid contributors={contributors} />
      <InitiativeCards initiatives={initiatives} />
      <ImpactDashboard content={getSection('impact')} />
      <DonateCTA content={getSection('donate')} />
      <ImpactStories content={getSection('stories')} />
      <PartnershipModels content={getSection('partnerships')} />
      <VolunteerCTA content={getSection('volunteer')} />
      <LeadershipPhilosophy content={getSection('philosophy')} />
      <DownloadCentre content={getSection('download')} />
      <PartnersWall content={getSection('partners')} />
      <VisualGallery content={getSection('gallery')} />
    </main>
  );
}
