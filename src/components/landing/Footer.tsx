import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer>
      {/* CTA Banner */}
      <section className="bg-primary py-20 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-white/70 text-xs font-black uppercase tracking-[0.2em] mb-3">
              Limited to 120 seats
            </p>
            <h2 className="font-sans font-black uppercase text-4xl md:text-5xl text-white tracking-tight leading-none">
              Ready to <br />Transform?
            </h2>
          </div>
          <Link href="/register">
            <div className="bg-white text-primary font-black text-sm uppercase tracking-[0.1em] px-8 py-4 flex items-center gap-2 hover:bg-white/90 transition-colors">
              Secure Your Spot
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </section>

      {/* Footer Body */}
      <div className="bg-surface py-16 px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary flex items-center justify-center text-white font-black text-sm">
                D
              </div>
              <div>
                <p className="font-black uppercase text-white text-sm tracking-widest">Dheera</p>
                <p className="text-text-muted text-xs uppercase tracking-wider">Sports Foundation</p>
              </div>
            </div>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs italic">
              "Forging Olympic Dreams. Awakening Conscious Spirits."
            </p>
            <p className="text-text-muted text-xs mt-4">Section 8 Non-Profit · Est. 2025</p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-black uppercase text-white text-xs tracking-[0.2em] mb-6">Contact Us</h4>
            <div className="space-y-3">
              <a href="tel:+919074063030" className="flex items-center gap-3 text-text-muted hover:text-primary transition-colors text-sm">
                <Phone className="w-4 h-4 text-primary shrink-0" /> +91-9074063030
              </a>
              <a href="mailto:muktabhinav@gmail.com" className="flex items-center gap-3 text-text-muted hover:text-primary transition-colors text-sm">
                <Mail className="w-4 h-4 text-primary shrink-0" /> muktabhinav@gmail.com
              </a>
              <div className="flex items-start gap-3 text-text-muted text-sm">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                Shivpuri Link Road, Gwalior, MP
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-black uppercase text-white text-xs tracking-[0.2em] mb-6">Quick Links</h4>
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
                  className="block text-text-muted hover:text-primary transition-colors text-sm font-medium uppercase tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-xs uppercase tracking-wider">
            © {new Date().getFullYear()} M/s Dheera Sports Foundation. Built in India.
          </p>
          <Link
            href="/login"
            className="text-text-muted hover:text-primary transition-colors text-xs uppercase tracking-wider"
          >
            Admin Portal →
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
