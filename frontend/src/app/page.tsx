import { HeroSlider } from '@/components/sections/home/HeroSlider';
import { IntroVideo } from '@/components/sections/home/IntroVideo';
import { BrandWriteUp } from '@/components/sections/home/BrandWriteUp';
import { StatsStrip } from '@/components/sections/home/StatsStrip';
import { FeaturedPrograms } from '@/components/sections/home/FeaturedPrograms';
import { UpcomingEvents } from '@/components/sections/home/UpcomingEvents';
import { Testimonials } from '@/components/sections/home/Testimonials';
import { SpeakerShowreel } from '@/components/sections/home/SpeakerShowreel';
import { MediaPress } from '@/components/sections/home/MediaPress';
import { FeaturedProducts } from '@/components/sections/home/FeaturedProducts';
import { CommunityJoin } from '@/components/sections/home/CommunityJoin';
import { FreeMasterclassFunnel } from '@/components/sections/home/FreeMasterclassFunnel';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSlider />
      <IntroVideo />
      <BrandWriteUp />
      <StatsStrip />
      <FeaturedPrograms />
      <UpcomingEvents />
      <Testimonials />
      <SpeakerShowreel />
      <MediaPress />
      <FeaturedProducts />
      <CommunityJoin />
      <FreeMasterclassFunnel />
    </div>
  );
}
