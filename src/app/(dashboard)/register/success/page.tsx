"use client";

import Link from "next/link";
import { CheckCircle2, Calendar, Phone, Share2 } from "lucide-react";
import { motion } from "framer-motion";

export default function RegisterSuccessPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-6">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle2 className="w-12 h-12 text-secondary" />
        </motion.div>

        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
          Registration <span className="gradient-text">Under Review</span>
        </h1>
        <p className="text-text-muted text-lg mb-12">
          Welcome to the Dheera Sports family! We have received your payment screenshot and registration details. Please stay tuned while our team verifies your seat.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="glass p-6 rounded-2xl text-left">
            <Calendar className="w-6 h-6 text-primary mb-3" />
            <h3 className="font-bold mb-1">What's Next?</h3>
            <p className="text-sm text-text-muted">You'll receive a detailed orientation schedule on WhatsApp within 24 hours.</p>
          </div>
          <div className="glass p-6 rounded-2xl text-left">
            <Phone className="w-6 h-6 text-secondary mb-3" />
            <h3 className="font-bold mb-1">Support</h3>
            <p className="text-sm text-text-muted">Need help? Message our support desk anytime at +91 98765 43210.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard" className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-xl font-semibold transition-colors">
            Go to Dashboard
          </Link>
          <button 
            onClick={() => {
              const shareData = {
                title: 'Dheera Sports Summer Camp',
                text: 'I just registered for the Dheera Sports Summer Camp! Join me for an amazing summer of sports and fun.',
                url: window.location.origin
              };
              if (navigator.share) {
                navigator.share(shareData);
              } else {
                navigator.clipboard.writeText(shareData.url);
                alert("Link copied to clipboard! Share it with your friends.");
              }
            }}
            className="flex items-center justify-center gap-2 border border-glass-border hover:bg-surface text-text-primary px-8 py-3 rounded-xl font-semibold transition-colors"
          >
            Share with Friends <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
