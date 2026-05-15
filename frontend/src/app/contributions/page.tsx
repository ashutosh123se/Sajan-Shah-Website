'use client';

import React from 'react';
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

export default function ContributionsPage() {
  return (
    <main className="min-h-screen bg-black">
      <ContributionsHero />
      <InitiativeCards />
      <ImpactDashboard />
      <DonateCTA />
      <ImpactStories />
      <PartnershipModels />
      <VolunteerCTA />
      <LeadershipPhilosophy />
      <DownloadCentre />
      <PartnersWall />
      <VisualGallery />
    </main>
  );
}
