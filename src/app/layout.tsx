import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CampFlow — Summer Camp Registration",
    template: "%s | CampFlow",
  },
  description:
    "Register your child for the best summer sports camps across India. Cricket, swimming, football, basketball, tennis, and badminton — all in one place.",
  keywords: [
    "summer camp",
    "sports camp",
    "kids registration",
    "India",
    "cricket camp",
    "swimming camp",
  ],
  openGraph: {
    title: "CampFlow — Summer Camp Registration",
    description:
      "Register your child for the best summer sports camps across India.",
    type: "website",
    locale: "en_IN",
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
      className={`${inter.variable} ${jetbrainsMono.variable} ${syne.variable} dark`}
    >
      <body className="min-h-screen bg-background text-text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
