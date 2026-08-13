/* ─────────────────────────────────────────────────────────────────────────────
   Experience.tsx
   Vertical timeline of career milestones. Each item scroll-reveals with
   a staggered delay. Gold dot connectors with a vertical line thread.
   ───────────────────────────────────────────────────────────────────────────── */

"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

/* ── Timeline data ── */
const EXPERIENCES = [
  {
    id:       "treefrog",
    company:  "Treefrog Accelerator",
    role:     "International Program Manager",
    period:   "2023 – Present",
    summary:  "Built CERP from zero. Launched JumpSTART. Supported 300+ founders across 32 countries with mentorship, funding connections, and hands-on program delivery.",
    tags:     ["Accelerator", "International", "Founder Support"],
    current:  true,
  },
  {
    id:       "ibz",
    company:  "IBZ, Toronto Metropolitan University",
    role:     "Program Lead",
    period:   "2022 – 2023",
    summary:  "Grew a startup community to 132 active founders. Launched the RAISE investor-readiness program, connecting early-stage ventures with institutional capital.",
    tags:     ["University", "Community Building", "Investor Relations"],
    current:  false,
  },
  {
    id:       "miller",
    company:  "Miller Thomson LLP",
    role:     "Manager, Innovation & Projects",
    period:   "2018 – 2020",
    summary:  "Launched an AI-powered legal workspace that reduced document drafting time by 30%. Led cross-functional teams in digital transformation and process redesign.",
    tags:     ["Legal Tech", "AI", "Process Design"],
    current:  false,
  },
  {
    id:       "td",
    company:  "TD Innovation Lab",
    role:     "Digital Transformation Consultant",
    period:   "2018",
    summary:  "Partnered with TD's innovation teams to evaluate emerging fintech solutions and develop internal capability-building frameworks for digital adoption.",
    tags:     ["Fintech", "Digital Strategy", "Banking"],
    current:  false,
  },
] as const;

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-24 md:py-32 bg-[#0D1B2A] border-t border-[#E8B84B]/8"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#E8B84B]
                        font-inter mb-3">
            Career
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#F5F0E8]">
            Experience
          </h2>
        </motion.div>

        {/* ── Timeline container ── */}
        <div className="relative">
          {/* Vertical thread line */}
          <div
            className="absolute left-[19px] md:left-[23px] top-2 bottom-2
                       w-px bg-gradient-to-b from-[#E8B84B]/50 via-[#E8B84B]/20 to-transparent"
            aria-hidden="true"
          />

          {/* ── Individual timeline items ── */}
          <div className="space-y-10">
            {EXPERIENCES.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="relative flex gap-8 md:gap-10 group"
              >
                {/* ── Gold dot ── */}
                <div className="flex-shrink-0 relative z-10 mt-1">
                  <div
                    className={`
                      w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center
                      border-2 transition-all duration-300
                      ${exp.current
                        ? "bg-[#E8B84B] border-[#E8B84B] shadow-lg shadow-[#E8B84B]/25"
                        : "bg-[#0D1B2A] border-[#E8B84B]/40 group-hover:border-[#E8B84B]/80"
                      }
                    `}
                  >
                    <Briefcase
                      size={16}
                      className={exp.current ? "text-[#0D1B2A]" : "text-[#E8B84B]/70"}
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* "Current" badge */}
                  {exp.current && (
                    <span
                      className="absolute -top-1 -right-1 w-3 h-3 rounded-full
                                 bg-emerald-400 border-2 border-[#0D1B2A]"
                      title="Current role"
                    />
                  )}
                </div>

                {/* ── Content card ── */}
                <div
                  className="flex-1 bg-[#112233] border border-[#E8B84B]/10 rounded-lg p-6 md:p-8
                             hover:border-[#E8B84B]/30 hover:bg-[#0f1e30]
                             transition-all duration-300 shadow-lg shadow-black/15"
                >
                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-playfair text-xl md:text-2xl font-bold text-[#F5F0E8]">
                        {exp.role}
                      </h3>
                      <p className="text-[#E8B84B] font-inter font-medium text-sm mt-0.5">
                        {exp.company}
                      </p>
                    </div>

                    {/* Period pill */}
                    <span
                      className="flex-shrink-0 self-start px-3 py-1 text-xs font-medium
                                 rounded-full border border-[#E8B84B]/25 text-[#DDD8CF]/70
                                 font-inter bg-[#E8B84B]/5"
                    >
                      {exp.period}
                    </span>
                  </div>

                  {/* Summary */}
                  <p className="text-[#DDD8CF]/80 font-inter text-sm md:text-base leading-relaxed mb-4">
                    {exp.summary}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 text-xs font-inter text-[#E8B84B]/70
                                   bg-[#E8B84B]/8 rounded border border-[#E8B84B]/15"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
