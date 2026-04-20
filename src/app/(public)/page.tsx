import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { SportsGrid } from "@/components/landing/SportsGrid";
import { SanghaSection } from "@/components/landing/SanghaSection";
import { WhyJoinSection } from "@/components/landing/WhyJoinSection";
import { ScheduleTimeline } from "@/components/landing/ScheduleTimeline";
import { TrainerProfiles } from "@/components/landing/TrainerProfiles";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen relative">
      <Navbar />
      <div id="hero"><Hero /></div>
      <Features />
      <SportsGrid />
      <SanghaSection />
      <WhyJoinSection />
      <div id="schedule"><ScheduleTimeline /></div>
      <div id="coaches"><TrainerProfiles /></div>
      <Pricing />

      <div id="faq"><FAQ /></div>
      <CTASection />
      <Footer />
    </main>
  );
}

