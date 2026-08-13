/* ─────────────────────────────────────────────────────────────────────────────
   Impact.tsx
   Three animated stat cards that count up when the section enters the
   viewport. Uses Framer Motion's useInView and a custom useCounter hook.
   ───────────────────────────────────────────────────────────────────────────── */

"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { Users, TrendingUp, Target } from "lucide-react";

/* ── Individual stat data ── */
const STATS = [
  {
    id:        "founders",
    icon:      Users,
    /* Numeric target the counter animates to */
    value:     300,
    prefix:    "",
    suffix:    "+",
    label:     "Founders Supported",
    sublabel:  "across 32 countries",
    highlight: "300+",
  },
  {
    id:        "raised",
    icon:      TrendingUp,
    value:     50,
    prefix:    "$",
    suffix:    "M+",
    label:     "Raised by Alumni",
    sublabel:  "by program participants",
    highlight: "$50M+",
  },
  {
    id:        "target",
    icon:      Target,
    value:     133,
    prefix:    "",
    suffix:    "%",
    label:     "First Target Exceeded",
    sublabel:  "above initial program goal",
    highlight: "133%",
  },
] as const;

/* ────────────────────────────────────────────
   useCounter — animates a number from 0 → end
   over `duration` milliseconds using RAF.
   ──────────────────────────────────────────── */
function useCounter(end: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    let startTime: number | null = null;
    let rafId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed  = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      /* Ease-out cubic for a natural deceleration */
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * end));

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [active, end, duration]);

  return count;
}

/* ─────────────────────────────────────
   StatCard — individual animated card
   ───────────────────────────────────── */
interface StatCardProps {
  stat:  (typeof STATS)[number];
  delay: number;
  active: boolean;
}

function StatCard({ stat, delay, active }: StatCardProps) {
  /* Animate the numeric counter */
  const count = useCounter(stat.value, 1800, active);

  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="group relative flex flex-col items-center text-center
                 bg-[#112233] border border-[#E8B84B]/10 rounded-lg p-8 md:p-10
                 hover:border-[#E8B84B]/35 hover:bg-[#0f1e30]
                 transition-all duration-300 shadow-xl shadow-black/20"
    >
      {/* ── Subtle gold top accent line on hover ── */}
      <div
        className="absolute top-0 left-0 right-0 h-px rounded-t-lg
                   bg-gradient-to-r from-transparent via-[#E8B84B] to-transparent
                   opacity-0 group-hover:opacity-60 transition-opacity duration-300"
      />

      {/* ── Icon ── */}
      <div
        className="mb-5 w-14 h-14 rounded-full flex items-center justify-center
                   bg-[#E8B84B]/10 group-hover:bg-[#E8B84B]/18 transition-colors duration-300"
      >
        <Icon size={26} className="text-[#E8B84B]" strokeWidth={1.5} />
      </div>

      {/* ── Animated number ── */}
      <div className="font-playfair text-5xl md:text-6xl font-bold text-[#F5F0E8] mb-2
                      tabular-nums leading-none">
        {stat.prefix}{count}{stat.suffix}
      </div>

      {/* ── Stat label ── */}
      <p className="text-base font-semibold text-[#E8B84B] mb-1 font-inter">
        {stat.label}
      </p>

      {/* ── Sub-label ── */}
      <p className="text-sm text-[#DDD8CF]/70 font-inter">
        {stat.sublabel}
      </p>
    </motion.div>
  );
}

/* ─────────────────────────
   Impact section
   ───────────────────────── */
export default function Impact() {
  /* Trigger counters only once the section is visible */
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="py-24 md:py-32 bg-[#0D1B2A] border-t border-[#E8B84B]/8"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#E8B84B]
                        font-inter mb-3">
            By the Numbers
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#F5F0E8]">
            Impact That Speaks for Itself
          </h2>
        </motion.div>

        {/* ── Three stat cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STATS.map((stat, index) => (
            <StatCard
              key={stat.id}
              stat={stat}
              delay={index * 0.12}
              active={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
