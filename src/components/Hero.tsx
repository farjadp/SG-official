/* ─────────────────────────────────────────────────────────────────────────────
   Hero.tsx
   Full-viewport hero section. Deep navy background with a radial gold
   warm-glow on the right side. Framer Motion staggered entrance animation.
   ───────────────────────────────────────────────────────────────────────────── */

"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

/* ── Shared Framer Motion variants for stagger entrance ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
} as const satisfies import("framer-motion").Variants;

const itemVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" as const } },
} satisfies import("framer-motion").Variants;

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden
                 bg-[#0D1B2A]"
    >
      {/* ── Radial warm-gold glow (right side) — pure CSS, no blobs ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Right-side warm gold radial gradient */}
        <div
          className="absolute top-0 right-0 w-[55%] h-full"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 100% 50%, rgba(232,184,75,0.10) 0%, transparent 65%)",
          }}
        />
        {/* Subtle top-left cool accent for depth */}
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{
            background: "radial-gradient(circle, #4A90D9 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Thin gold horizontal rule at very top of section ── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E8B84B]/30 to-transparent" />

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* ── Small pre-label ── */}
          <motion.p
            variants={itemVariants}
            className="mb-4 text-sm font-semibold tracking-[0.2em] uppercase text-[#E8B84B]
                       font-inter"
          >
            Sisi Gong
          </motion.p>

          {/* ── Main headline ── */}
          <motion.h1
            variants={itemVariants}
            className="font-playfair text-5xl sm:text-6xl md:text-7xl font-bold
                       text-[#F5F0E8] leading-[1.08] mb-6"
          >
            Building the Systems{" "}
            <span className="text-[#E8B84B]">That Help</span>{" "}
            Founders Thrive
          </motion.h1>

          {/* ── Sub-headline / role tags ── */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-[#DDD8CF] font-inter font-light mb-10
                       tracking-wide"
          >
            Program Manager&nbsp;&middot;&nbsp;Ecosystem Builder&nbsp;&middot;&nbsp;Founder Advocate
          </motion.p>

          {/* ── CTA buttons ── */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4"
          >
            {/* Primary CTA */}
            <a
              href="#contact"
              id="hero-cta-primary"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-sm
                         bg-[#E8B84B] text-[#0D1B2A] font-semibold text-sm tracking-wide
                         hover:bg-[#C99A30] transition-all duration-200
                         shadow-lg shadow-[#E8B84B]/20 hover:shadow-[#E8B84B]/30
                         active:scale-[0.98]"
            >
              Let&apos;s Connect
            </a>

            {/* Secondary CTA */}
            <a
              href="#about"
              id="hero-cta-secondary"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-sm
                         border border-[#F5F0E8]/25 text-[#F5F0E8] font-semibold text-sm tracking-wide
                         hover:border-[#E8B84B]/60 hover:text-[#E8B84B]
                         transition-all duration-200 active:scale-[0.98]"
            >
              My Work
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Animated scroll indicator ── */}
      <motion.a
        href="#impact"
        aria-label="Scroll down to impact section"
        className="absolute bottom-10 left-1/2 -translate-x-1/2
                   flex flex-col items-center gap-1 text-[#DDD8CF]/50
                   hover:text-[#E8B84B] transition-colors duration-200"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={18} strokeWidth={1.5} />
        </motion.div>
        <span className="text-xs font-inter tracking-[0.1em] uppercase">
          Scroll
        </span>
      </motion.a>
    </section>
  );
}
