/* ─────────────────────────────────────────────────────────────────────────────
   page.tsx — Main single-page composition
   Assembles every section in scroll order and wraps them in the page shell.
   ───────────────────────────────────────────────────────────────────────────── */

import Navbar          from "@/components/Navbar";
import Hero             from "@/components/Hero";
import Impact           from "@/components/Impact";
import About            from "@/components/About";
import Experience       from "@/components/Experience";
import Expertise        from "@/components/Expertise";
import ResumeDownload   from "@/components/ResumeDownload";
import Contact          from "@/components/Contact";
import Footer           from "@/components/Footer";

/* ── Root page — single scroll layout ── */
export default function Home() {
  return (
    <main className="min-h-screen bg-[#0D1B2A]">
      {/* ── Sticky navigation bar ── */}
      <Navbar />

      {/* ── Hero section (full viewport) ── */}
      <Hero />

      {/* ── Animated impact statistics ── */}
      <Impact />

      {/* ── Bio + avatar ── */}
      <About />

      {/* ── Career timeline ── */}
      <Experience />

      {/* ── Skill / expertise pills ── */}
      <Expertise />

      {/* ── Resume download card ── */}
      <ResumeDownload />

      {/* ── Contact form + links ── */}
      <Contact />

      {/* ── Site footer ── */}
      <Footer />
    </main>
  );
}
