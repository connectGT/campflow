import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer>
      {/* CTA Banner */}
      <section className="py-20 px-8 relative overflow-hidden" style={{ background: "#1a1c1f" }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(ellipse at 60% 50%, #ff5745 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-8"
          style={{
            backgroundImage: "radial-gradient(ellipse at 20% 50%, #aacae6 0%, transparent 60%)",
          }}
        />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div>
            <p className="section-label mb-3">Limited to 120 seats</p>
            <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl text-text-primary tracking-tight leading-none">
              Ready to{" "}
              <br />
              <span className="gradient-text">Transform?</span>
            </h2>
          </div>
          <Link href="/register">
            <div className="btn-primary text-sm px-10 py-5">
              Secure Your Spot
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </section>

      {/* Footer Body */}
      <div
        className="py-16 px-8"
        style={{
          background: "#0c0e11",
          borderTop: "1px solid rgba(255, 218, 213, 0.06)",
        }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#111316] font-black text-sm"
                style={{ background: "linear-gradient(135deg, #ffb4a9, #ff5745)" }}
              >
                D
              </div>
              <div>
                <p className="font-display font-black uppercase text-text-primary text-sm tracking-widest">
                  Dheera
                </p>
                <p className="text-text-subtle text-xs uppercase tracking-wider">Sports Foundation</p>
              </div>
            </div>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs italic font-medium">
              &ldquo;Forging Olympic Dreams. Awakening Conscious Spirits.&rdquo;
            </p>
            <p className="text-text-subtle text-xs mt-4 font-medium">Section 8 Non-Profit · Est. 2025</p>
            <p className="text-text-subtle text-xs mt-8 uppercase tracking-widest opacity-50">
              © {new Date().getFullYear()} Dheera Sports Foundation
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold uppercase text-text-primary text-xs tracking-[0.18em] mb-6">
              Contact Us
            </h4>
            <div className="space-y-4">
              <a
                href="tel:+919074063030"
                className="flex items-center gap-3 text-text-muted hover:text-primary transition-colors text-sm font-medium group"
              >
                <Phone className="w-4 h-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                +91-9074063030
              </a>
              <a
                href="mailto:muktabhinav@gmail.com"
                className="flex items-center gap-3 text-text-muted hover:text-primary transition-colors text-sm font-medium group"
              >
                <Mail className="w-4 h-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                muktabhinav@gmail.com
              </a>
              <div className="flex items-start gap-3 text-text-muted text-sm font-medium">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                Shivpuri Link Road, Gwalior, MP
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-bold uppercase text-text-primary text-xs tracking-[0.18em] mb-6">
              Quick Links
            </h4>
            <div className="space-y-3">
              {[
                { label: "Why Choose Us", href: "#features" },
                { label: "Sports Offered", href: "#sports" },
                { label: "Daily Schedule", href: "#" },
                { label: "Apply Now", href: "/register" },
                { label: "Parent Portal", href: "/login" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-text-muted hover:text-primary transition-colors text-sm font-medium hover:translate-x-1 transition-transform duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="max-w-6xl mx-auto mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: "1px solid rgba(255, 218, 213, 0.06)" }}
        >
          <p className="text-text-subtle text-xs uppercase tracking-wider">
            Built in India with 🤍
          </p>
          <Link
            href="/login"
            className="text-text-subtle hover:text-primary transition-colors text-xs uppercase tracking-wider font-medium"
          >
            Admin Portal →
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
