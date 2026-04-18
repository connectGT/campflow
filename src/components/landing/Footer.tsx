import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative">
      {/* CTA Section */}
      <section className="py-24 px-6 text-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
          Ready to <span className="gradient-text">Get Started</span>?
        </h2>
        <p className="text-text-muted max-w-xl mx-auto mb-8">
          Give your child the summer they&apos;ll never forget. Registration takes less than 3 minutes.
        </p>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white rounded-xl px-8 py-4 font-semibold text-lg transition-all shadow-lg shadow-primary/25"
        >
          Register Now
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Gradient divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Footer content */}
      <div className="py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display text-xl font-bold gradient-text">
              CampFlow
            </p>
            <p className="text-xs text-text-muted mt-1">
              India&apos;s premier summer sports camp platform.
            </p>
          </div>

          <div className="flex gap-6 text-sm text-text-muted">
            <Link href="#features" className="hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#sports" className="hover:text-primary transition-colors">
              Sports
            </Link>
            <Link href="/login" className="hover:text-primary transition-colors">
              Sign In
            </Link>
          </div>

          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} CampFlow. Built in India, for India.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
