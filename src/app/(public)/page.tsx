import Link from "next/link";
import { ArrowRight, Zap, Shield, Trophy } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Background orbs */}
        <div className="orb w-96 h-96 bg-primary -top-48 -left-48" />
        <div className="orb w-80 h-80 bg-secondary -bottom-40 -right-40" />
        <div className="orb w-64 h-64 bg-primary/50 top-1/3 right-1/4" />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-text-muted mb-8">
            <Zap className="w-4 h-4 text-secondary" />
            <span>Registrations open for Summer 2025</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight mb-6">
            Where Champions{" "}
            <span className="gradient-text">Begin</span>
          </h1>

          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            India&apos;s most exciting summer sports camp. Cricket, swimming,
            football, basketball, tennis, and badminton — all for just{" "}
            <span className="text-secondary font-mono font-bold">₹12,000</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white rounded-xl px-8 py-4 font-semibold text-lg transition-all shadow-lg shadow-primary/25"
            >
              Register Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center gap-2 border border-glass-border hover:border-primary bg-transparent text-text-primary rounded-xl px-8 py-4 font-semibold text-lg transition-all"
            >
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 max-w-lg mx-auto">
            <div>
              <p className="font-display text-3xl md:text-4xl font-bold text-primary">500+</p>
              <p className="text-sm text-text-muted mt-1">Registrations</p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-4xl font-bold text-secondary">6</p>
              <p className="text-sm text-text-muted mt-1">Sports</p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-4xl font-bold text-primary">12+</p>
              <p className="text-sm text-text-muted mt-1">Cities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-16">
            Why Parents <span className="gradient-text">Choose Us</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass rounded-2xl p-8 glow-primary">
              <Shield className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-display text-xl font-semibold mb-3">
                Safe & Certified
              </h3>
              <p className="text-text-muted leading-relaxed">
                All trainers are NSNIS-certified. Camps are insured and
                follow strict child safety protocols.
              </p>
            </div>

            <div className="glass rounded-2xl p-8">
              <Trophy className="w-10 h-10 text-secondary mb-4" />
              <h3 className="font-display text-xl font-semibold mb-3">
                Pro-Level Coaching
              </h3>
              <p className="text-text-muted leading-relaxed">
                Former national-level athletes coach your children. Small
                batch sizes ensure personal attention.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 glow-secondary">
              <Zap className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-display text-xl font-semibold mb-3">
                3 Sports, 1 Price
              </h3>
              <p className="text-text-muted leading-relaxed">
                Pick any 3 sports from our roster. One flat fee of ₹12,000
                covers everything — equipment, coaching, and nutrition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-glass-border py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-display text-lg font-semibold gradient-text mb-2">
            CampFlow
          </p>
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} CampFlow. Built in India, for India.
          </p>
        </div>
      </footer>
    </main>
  );
}
