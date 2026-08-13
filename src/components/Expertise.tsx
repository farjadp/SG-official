/* ─────────────────────────────────────────────────────────────────────────────
   Expertise.tsx
   Pill / tag layout for areas of expertise. Grouped into categories with
   a subtle hover lift on each pill. Scroll-reveal on the container.
   ───────────────────────────────────────────────────────────────────────────── */

"use client";

import { motion } from "framer-motion";

/* ── Expertise areas grouped by theme ── */
const EXPERTISE_GROUPS = [
  {
    category: "Program Operations",
    skills: [
      "Incubator & Accelerator Programs",
      "Founder Support & Mentorship",
      "Grant & Budget Management",
    ],
  },
  {
    category: "Ecosystem & Relationships",
    skills: [
      "Stakeholder Relations",
      "IP Commercialization",
      "Investor Readiness Programs",
    ],
  },
  {
    category: "Tools & Data",
    skills: [
      "CRM & Program Data (HubSpot)",
      "Airtable Workflow Design",
      "Impact Measurement & Reporting",
    ],
  },
] as const;

/* ── Framer Motion container → children stagger ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const pillVariants = {
  hidden:  { opacity: 0, scale: 0.88, y: 10 },
  visible: { opacity: 1, scale: 1,    y: 0,
             transition: { duration: 0.4, ease: "easeOut" as const } },
} satisfies import("framer-motion").Variants;

export default function Expertise() {
  return (
    <section
      id="expertise"
      className="py-24 md:py-32 bg-[#0a1622] border-t border-[#E8B84B]/8"
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
            Skills
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#F5F0E8]">
            Areas of Expertise
          </h2>
        </motion.div>

        {/* ── Grouped skill categories ── */}
        <div className="space-y-10">
          {EXPERTISE_GROUPS.map((group, groupIdx) => (
            <div key={group.category}>
              {/* Category label */}
              <motion.p
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: groupIdx * 0.08 }}
                className="text-xs font-semibold tracking-[0.15em] uppercase
                           text-[#DDD8CF]/50 font-inter mb-4"
              >
                {group.category}
              </motion.p>

              {/* Pills row */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="flex flex-wrap gap-3"
              >
                {group.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={pillVariants}
                    className="group relative px-5 py-2.5 text-sm font-medium
                               font-inter text-[#F5F0E8] rounded-full
                               border border-[#E8B84B]/25 bg-[#112233]
                               hover:border-[#E8B84B]/70 hover:bg-[#E8B84B]/8
                               hover:text-[#E8B84B] hover:-translate-y-0.5
                               transition-all duration-200 cursor-default
                               shadow-sm shadow-black/20"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>

              {/* Divider (not after last group) */}
              {groupIdx < EXPERTISE_GROUPS.length - 1 && (
                <div className="mt-10 h-px bg-[#E8B84B]/8" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
