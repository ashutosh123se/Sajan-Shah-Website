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

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSlider />
      <SplitHero />
      <BrandWriteUp />
      <TransformationForm />
      <IntroVideo />
      <LogoStrip />
      <BooksSection />
      <Testimonials />
      <EventSchedule />
      <ImpactStatistics />
    </div>
  );
}


