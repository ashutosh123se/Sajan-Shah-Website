'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { HeroSlider } from '@/components/sections/home/HeroSlider';
import api from '@/lib/api';

const SplitHero = dynamic(
  () => import('@/components/sections/home/SplitHero').then((m) => m.SplitHero),
  { loading: () => <section className="min-h-[40vh] bg-black" /> }
);
const BrandWriteUp = dynamic(
  () => import('@/components/sections/home/BrandWriteUp').then((m) => m.BrandWriteUp),
  { loading: () => <section className="min-h-[30vh] bg-[#0a0a0a]" /> }
);
const TransformationForm = dynamic(
  () => import('@/components/sections/home/TransformationForm').then((m) => m.TransformationForm),
  { loading: () => <section className="min-h-[40vh] bg-black" /> }
);
const IntroVideo = dynamic(
  () => import('@/components/sections/home/IntroVideo').then((m) => m.IntroVideo),
  { loading: () => <section className="min-h-[50vh] bg-[#0a0a0a]" /> }
);
const LogoStrip = dynamic(
  () => import('@/components/sections/home/LogoStrip').then((m) => m.LogoStrip),
  { loading: () => <section className="min-h-[20vh] bg-black" /> }
);
const MediaPress = dynamic(
  () => import('@/components/sections/home/MediaPress').then((m) => m.MediaPress),
  { loading: () => <section className="min-h-[30vh] bg-[#0a0a0a]" /> }
);
const BooksSection = dynamic(
  () => import('@/components/sections/home/BooksSection').then((m) => m.BooksSection),
  { loading: () => <section className="min-h-[40vh] bg-[#0a0a0a]" /> }
);
const Testimonials = dynamic(
  () => import('@/components/sections/home/Testimonials').then((m) => m.Testimonials),
  { loading: () => <section className="min-h-[40vh] bg-black" /> }
);
const EventSchedule = dynamic(
  () => import('@/components/sections/home/EventSchedule').then((m) => m.EventSchedule),
  { loading: () => <section className="min-h-[40vh] bg-[#0a0a0a]" /> }
);
const TransformationStories = dynamic(
  () => import('@/components/sections/home/TransformationStories').then((m) => m.TransformationStories),
  { loading: () => <section className="min-h-[40vh] bg-black" /> }
);
const ImpactStatistics = dynamic(
  () => import('@/components/sections/home/ImpactStatistics').then((m) => m.ImpactStatistics),
  { loading: () => <section className="min-h-[30vh] bg-[#0a0a0a]" /> }
);

interface Section {
  key: string;
  content: any;
  isActive: boolean;
  order: number;
}

export default function Home() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const response = await api.get('/home-page');
        if (response.data.success) {
          setSections(response.data.data.sections || []);
        }
      } catch (error) {
        console.error('Failed to load homepage CMS sections:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHome();
  }, []);

  const getSection = (key: string) => {
    const section = sections.find((s) => s.key === key);
    if (!section || section.isActive === false) return undefined;
    return section.content;
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
    <div className="min-h-screen">
      <HeroSlider content={getSection('hero')} />
      <SplitHero content={getSection('split_hero')} />
      <BrandWriteUp content={getSection('brand_writeup')} />
      <TransformationForm content={getSection('transformation_form')} />
      <IntroVideo content={getSection('intro_video')} />
      <LogoStrip content={getSection('logo_strip')} />
      <MediaPress />
      <BooksSection />
      <Testimonials />
      <EventSchedule />
      <TransformationStories />
      <ImpactStatistics content={getSection('impact_statistics')} />
    </div>
  );
}
