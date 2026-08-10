'use client';

import { useEffect, useState } from 'react';
import { HeroSlider } from '@/components/sections/home/HeroSlider';
import { SplitHero } from '@/components/sections/home/SplitHero';
import { BrandWriteUp } from '@/components/sections/home/BrandWriteUp';
import { TransformationForm } from '@/components/sections/home/TransformationForm';
import { IntroVideo } from '@/components/sections/home/IntroVideo';
import { LogoStrip } from '@/components/sections/home/LogoStrip';
import { BooksSection } from '@/components/sections/home/BooksSection';
import { Testimonials } from '@/components/sections/home/Testimonials';
import { EventSchedule } from '@/components/sections/home/EventSchedule';
import { TransformationStories } from '@/components/sections/home/TransformationStories';
import { ImpactStatistics } from '@/components/sections/home/ImpactStatistics';
import api from '@/lib/api';
import { normalizeCmsContent } from '@/lib/normalizeCmsContent';
import { normalizeHomeHeroContent } from '@/lib/homeHeroDefaults';

interface Section {
  key: string;
  content: any;
  isActive?: boolean;
}

export default function Home() {
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await api.get('/home-page');
        if (response.data?.success) {
          const rows = (response.data.data.sections || []).map((s: Section) => ({
            ...s,
            content: normalizeCmsContent(s.content),
          }));
          setSections(rows);
        }
      } catch (error) {
        console.error('Error fetching homepage sections:', error);
      }
    };
    fetchSections();
  }, []);

  const getSection = (key: string) => sections.find((s) => s.key === key)?.content;

  const heroContent = normalizeHomeHeroContent(getSection('hero'));
  const digitalEmpire = getSection('digital_empire');

  return (
    <div className="min-h-screen">
      <HeroSlider content={heroContent} />
      <SplitHero />
      <BrandWriteUp />
      <TransformationForm />
      <IntroVideo />
      <LogoStrip />
      <BooksSection />
      <Testimonials />
      <EventSchedule content={digitalEmpire} />
      <TransformationStories />
      <ImpactStatistics />
    </div>
  );
}
