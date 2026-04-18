import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-surface-container-low/50">
      {/* CTA Section */}
      <section className="py-24 px-6 text-center">
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 tracking-wide">
          Ready to <span className="gradient-text italic font-mono">Transform</span>?
        </h2>
        <p className="text-text-muted max-w-xl mx-auto mb-10 text-lg">
          Give your athlete the summer they&apos;ll never forget. Application takes less than 3 minutes.
        </p>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-text-primary rounded-none border border-secondary/30 px-8 py-4 font-mono font-bold tracking-widest uppercase text-lg transition-all shadow-lg shadow-primary/25"
        >
          Secure Your Spot
          <ArrowRight className="w-5 h-5 text-secondary" />
        </Link>
      </section>

      {/* Gradient divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />

      {/* Footer content */}
      <div className="py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display text-2xl font-bold gradient-text tracking-wide">
              M/s Dheera
            </p>
            <p className="text-sm font-mono uppercase tracking-widest text-text-muted mt-2">
              Sports Transformation Project
            </p>
          </div>

          <div className="flex gap-8 text-sm font-mono uppercase tracking-widest text-text-muted">
            <Link href="#features" className="hover:text-secondary transition-colors">
              Philosophy
            </Link>
            <Link href="#sports" className="hover:text-secondary transition-colors">
              Disciplines
            </Link>
            <Link href="/login" className="hover:text-secondary transition-colors">
              Portal
            </Link>
          </div>

          <p className="text-xs font-mono uppercase text-text-muted/60 tracking-wider">
            © {new Date().getFullYear()} Dheera. Built in India.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
