import { HeroTicker, Hero, Stats, AboutPreview, ServicesOverview, Testimonials, CTABanner } from "./Home";

export default function HomePage() {
  return (
    <div className="bg-background">
      <Hero />
      <HeroTicker />
      <AboutPreview />
      <ServicesOverview />
      <Stats />
      <Testimonials />
      <CTABanner />
    </div>
  );
}