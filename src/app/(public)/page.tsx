import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { SportsGrid } from "@/components/landing/SportsGrid";
import { SanghaSection } from "@/components/landing/SanghaSection";
import { WhyJoinSection } from "@/components/landing/WhyJoinSection";
import { ScheduleTimeline } from "@/components/landing/ScheduleTimeline";
import { TrainerProfiles } from "@/components/landing/TrainerProfiles";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <SportsGrid />
      <SanghaSection />
      <WhyJoinSection />
      <ScheduleTimeline />
      <TrainerProfiles />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTASection />
      <Footer />
    </main>
  );
}
