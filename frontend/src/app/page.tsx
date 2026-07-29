import dynamic from 'next/dynamic';
import { HeroSlider } from '@/components/sections/home/HeroSlider';

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

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSlider />
      <SplitHero />
      <BrandWriteUp />
      <TransformationForm />
      <IntroVideo />
      <LogoStrip />
      <MediaPress />
      <BooksSection />
      <Testimonials />
      <EventSchedule />
      <TransformationStories />
      <ImpactStatistics />
    </div>
  );
}
