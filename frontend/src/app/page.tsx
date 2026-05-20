'use client';

import React, { useEffect, useState } from 'react';
import { HeroSlider } from '@/components/sections/home/HeroSlider';
import { SplitHero } from '@/components/sections/home/SplitHero';
import { BrandWriteUp } from '@/components/sections/home/BrandWriteUp';
import { TransformationForm } from '@/components/sections/home/TransformationForm';
import { IntroVideo } from '@/components/sections/home/IntroVideo';
import { LogoStrip } from '@/components/sections/home/LogoStrip';
import { BooksSection } from '@/components/sections/home/BooksSection';
import { Testimonials } from '@/components/sections/home/Testimonials';
import { EventSchedule } from '@/components/sections/home/EventSchedule';
import { ImpactStatistics } from '@/components/sections/home/ImpactStatistics';
import api from '@/lib/api';

interface Section {
  key: string;
  content: any;
  isActive: boolean;
}

export default function Home() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await api.get('/home-page');
        if (response.data.success) {
          setSections(response.data.data.sections);
        }
      } catch (error) {
        console.error('Error fetching home page sections:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  const getSection = (key: string) => {
    const sec = sections.find(s => s.key === key);
    return sec?.isActive ? sec.content : null;
  };

  const isSectionActive = (key: string) => {
    const sec = sections.find(s => s.key === key);
    return sec ? sec.isActive : true; // default to active if not seeded/fetched yet
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#f26522] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {isSectionActive('hero') && <HeroSlider content={getSection('hero')} />}
      {isSectionActive('split_hero') && <SplitHero content={getSection('split_hero')} />}
      {isSectionActive('brand_writeup') && <BrandWriteUp content={getSection('brand_writeup')} />}
      {isSectionActive('transformation_form') && <TransformationForm content={getSection('transformation_form')} />}
      {isSectionActive('intro_video') && <IntroVideo content={getSection('intro_video')} />}
      {isSectionActive('logo_strip') && <LogoStrip content={getSection('logo_strip')} />}
      
      {/* Books and Event sections left as is since they are already dynamic via other pages/controllers */}
      <BooksSection />
      <Testimonials />
      <EventSchedule />

      {isSectionActive('impact_statistics') && <ImpactStatistics content={getSection('impact_statistics')} />}
    </div>
  );
}
