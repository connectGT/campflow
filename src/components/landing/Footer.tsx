"use client";

import { MapPin, Mail, Phone, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import { FOOTER, BRAND, REGISTRATION_STEPS } from "@/data/camp";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0a0b0d] border-t border-white/5 pt-20 pb-10 overflow-hidden">
      {/* Decorative Orbs */}
      <div className="orb w-[300px] h-[300px] bg-[#ffb4a9] bottom-0 left-0 opacity-20 filter blur-[100px]" />
      <div className="orb w-[300px] h-[300px] bg-[#aacae6] top-0 right-0 opacity-20 filter blur-[100px]" />

      <div className="max-w-7xl mx-auto px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-[#111316] font-black text-xl shrink-0"
                style={{ background: "linear-gradient(135deg, #ffb4a9, #ff5745)" }}
              >
                D
              </div>
              <div>
                <span className="font-display font-black text-white tracking-widest uppercase text-lg leading-none block">
                  Dheera
                </span>
                <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.2em]">
                  Sports Foundation
                </span>
              </div>
            </div>
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              {FOOTER.TAGLINE}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-text-subtle hover:text-primary transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href={`https://wa.me/${BRAND.WHATSAPP.replace(/[^0-9]/g, "")}`} className="w-10 h-10 rounded-full glass flex items-center justify-center text-text-subtle hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.885m8.538-17.096a12.062 12.062 0 00-8.54-3.525C6.182 1.164 1.18 6.162 1.18 12.802c0 2.115.552 4.183 1.602 6.002L.004 24l5.313-1.393a12.112 12.112 0 005.926 1.541h.005c6.64 0 11.644-5.002 11.644-11.64-.002-3.218-1.258-6.241-3.534-8.517"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="font-display font-bold text-white mb-6 uppercase tracking-wider text-sm">Explore</h4>
            <ul className="space-y-4">
              <li>
                <Link href="#sports" className="text-text-subtle hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <ArrowRight className="w-3 h-3 text-primary/50" />
                  Sports & Disciplines
                </Link>
              </li>
              <li>
                <Link href="#inclusions" className="text-text-subtle hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <ArrowRight className="w-3 h-3 text-primary/50" />
                  Fee & Inclusions
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-text-subtle hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <ArrowRight className="w-3 h-3 text-primary/50" />
                  Secure Registration
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-text-subtle hover:text-white transition-colors text-sm flex items-center gap-2">
                  <ExternalLink className="w-3 h-3 text-white/50" />
                  Staff Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-bold text-white mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full glass flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary mb-1">Our Facility</p>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {FOOTER.ADDRESS.split(', ')[0]}<br />
                    {FOOTER.ADDRESS.split(', ').slice(1).join(', ')}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full glass flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary mb-1">Call / WhatsApp</p>
                  <a href={`tel:${FOOTER.PHONE.replace(/[^0-9+]/g, "")}`} className="text-sm text-text-muted hover:text-primary transition-colors block">
                    {FOOTER.PHONE}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Copyright Banner */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-subtle text-center md:text-left leading-relaxed">
            {FOOTER.LEGAL_NOTE}
            <br className="hidden md:block" />
            <span className="mt-2 block md:inline md:mt-0">&copy; {currentYear} Dheera Sports Foundation. All rights reserved.</span>
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="text-xs text-text-subtle hover:text-white transition-colors uppercase tracking-wider font-semibold">Terms</Link>
            <Link href="#" className="text-xs text-text-subtle hover:text-white transition-colors uppercase tracking-wider font-semibold">Privacy</Link>
            <Link href="#" className="text-xs text-text-subtle hover:text-white transition-colors uppercase tracking-wider font-semibold">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
