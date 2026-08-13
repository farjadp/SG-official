/* ─────────────────────────────────────────────────────────────────────────────
   layout.tsx — Root App Router layout
   Loads Google Fonts (Playfair Display + Inter), sets site-wide metadata,
   and wraps every page in the global HTML shell.
   ───────────────────────────────────────────────────────────────────────────── */

import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

/* ── Serif font for headings ── */
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

/* ── Sans-serif font for body text ── */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

/* ── SEO / Open-Graph metadata ── */
export const metadata: Metadata = {
  title: "Sisi Gong — Startup Ecosystem Builder & Program Manager",
  description:
    "Sisi Gong designs and runs programs that connect founders to what they actually need — mentorship, funding, community, and real hands-on support. 300+ founders supported across 32 countries.",
  keywords: [
    "Sisi Gong",
    "startup ecosystem",
    "program manager",
    "accelerator",
    "founder support",
    "Treefrog Accelerator",
  ],
  authors: [{ name: "Sisi Gong" }],
  openGraph: {
    title: "Sisi Gong — Startup Ecosystem Builder",
    description: "Building the systems that help founders thrive.",
    type: "website",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sisi Gong — Startup Ecosystem Builder",
    description: "Building the systems that help founders thrive.",
  },
};

/* ── Root layout ── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
