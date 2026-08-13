/* ─────────────────────────────────────────────────────────────────────────────
   About.tsx
   Personal bio with a circle avatar (gold-bordered placeholder) and
   a scroll-reveal animation. Light-cream background to create a section
   contrast break from the dark navy.
   ───────────────────────────────────────────────────────────────────────────── */

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="py-24 md:py-32 bg-[#0a1622] border-t border-[#E8B84B]/8"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* ── Section label ── */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold tracking-[0.2em] uppercase text-[#E8B84B]
                     font-inter mb-3 text-center"
        >
          About
        </motion.p>

        <div className="flex flex-col md:flex-row items-center gap-14 md:gap-20">
          {/* ── Circle avatar (left on desktop) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="flex-shrink-0"
          >
            {/* Gold-bordered circle with avatar placeholder */}
            <div
              className="relative w-52 h-52 md:w-64 md:h-64 rounded-full
                         p-1 bg-gradient-to-br from-[#E8B84B] via-[#C99A30] to-[#E8B84B]
                         shadow-2xl shadow-[#E8B84B]/15"
            >
              {/* Inner circle — photo or initials fallback */}
              <div
                className="w-full h-full rounded-full overflow-hidden
                           bg-[#112233] flex items-center justify-center"
              >
                {/* ── Sisi Gong headshot photo ── */}
                <Image
                  src="/sisi-photo.jpg"
                  alt="Sisi Gong — Program Manager and Ecosystem Builder"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 208px, 256px"
                />
              </div>
            </div>

            {/* ── Small gold tag beneath avatar ── */}
            <div className="mt-5 text-center">
              <span
                className="inline-block px-4 py-1.5 text-xs font-semibold tracking-[0.12em]
                           uppercase rounded-full border border-[#E8B84B]/40 text-[#E8B84B]
                           font-inter bg-[#E8B84B]/6"
              >
                Program Manager
              </span>
            </div>
          </motion.div>

          {/* ── Bio text (right on desktop) ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.12 }}
            className="flex-1"
          >
            {/* ── Heading ── */}
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#F5F0E8]
                           mb-6 leading-tight">
              Connecting Founders to{" "}
              <span className="text-[#E8B84B]">What They Actually Need</span>
            </h2>

            {/* ── Bio paragraph ── */}
            <p className="text-[#DDD8CF] font-inter text-lg leading-relaxed mb-6">
              I design and run programs that connect founders to what they
              actually need — mentorship, funding, community, and real hands-on
              support. I&apos;ve built programs from scratch, grown ecosystems, and
              helped entrepreneurs go from idea to funded venture.
            </p>

            <p className="text-[#DDD8CF]/75 font-inter text-base leading-relaxed">
              My work sits at the intersection of people, process, and purpose.
              Whether I&apos;m managing a government grant portfolio or running a
              pitch workshop with a first-time founder, I bring the same
              energy — intentional, structured, and deeply human.
            </p>

            {/* ── Quick-facts row ── */}
            <div className="mt-8 flex flex-wrap gap-6">
              {[
                { label: "Countries Reached", value: "32" },
                { label: "Years in Ecosystem", value: "8+" },
                { label: "Funds Managed", value: "$50M+" },
              ].map((fact) => (
                <div key={fact.label} className="flex flex-col">
                  <span className="font-playfair text-3xl font-bold text-[#E8B84B]">
                    {fact.value}
                  </span>
                  <span className="text-xs text-[#DDD8CF]/70 font-inter uppercase tracking-wider mt-0.5">
                    {fact.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
