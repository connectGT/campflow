import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import { QueryProvider } from "@/components/providers/QueryProvider";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CampFlow — Modern Summer Camp Registration",
    template: "%s | CampFlow",
  },
  description:
    "Register your child for pro-level summer sports camps across India. Cricket, swimming, football, basketball, tennis, and badminton — all-inclusive package at ₹12,000.",
  keywords: [
    "summer camp india",
    "sports training for kids",
    "cricket coaching",
    "swimming lessons",
    "campflow registration",
  ],
  authors: [{ name: "CampFlow" }],
  openGraph: {
    title: "CampFlow — Summer Camp Registration",
    description: "Multi-sport training, NSNIS coaches, and all-inclusive packages.",
    url: "https://campflow.me",
    siteName: "CampFlow",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CampFlow — Summer Camp Simplified",
    description: "Register for top-tier sports camps in minutes.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${manrope.variable} dark`}
    >
      <body className="min-h-screen bg-background text-text-primary font-sans antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
