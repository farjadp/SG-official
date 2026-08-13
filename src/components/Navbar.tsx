/* ─────────────────────────────────────────────────────────────────────────────
   Navbar.tsx
   Sticky header with backdrop blur. Name on the left; anchor links on the
   right. Collapses to a hamburger menu on mobile.
   ───────────────────────────────────────────────────────────────────────────── */

"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Navigation links that map to section IDs ── */
const NAV_LINKS = [
  { label: "About",      href: "#about"      },
  { label: "Experience", href: "#experience" },
  { label: "Expertise",  href: "#expertise"  },
  { label: "Contact",    href: "#contact"    },
];

export default function Navbar() {
  /* Track whether user has scrolled past the hero (adds background) */
  const [scrolled,    setScrolled]    = useState(false);
  /* Mobile menu open/closed state */
  const [menuOpen,    setMenuOpen]    = useState(false);

  /* ── Listen to scroll events to toggle navbar background ── */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Close mobile menu on resize to desktop ── */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? "bg-[#0D1B2A]/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-[#E8B84B]/10"
          : "bg-transparent"
        }
      `}
    >
      <nav
        className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* ── Brand name (left) ── */}
        <a
          href="#"
          className="font-playfair text-xl font-bold text-[#F5F0E8] tracking-tight
                     hover:text-[#E8B84B] transition-colors duration-200"
          aria-label="Sisi Gong — back to top"
        >
          Sisi Gong
        </a>

        {/* ── Desktop anchor links (right) ── */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-[#DDD8CF] hover:text-[#E8B84B]
                           transition-colors duration-200 relative
                           after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px
                           after:bg-[#E8B84B] after:transition-all after:duration-300
                           hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}

          {/* ── CTA button in nav ── */}
          <li>
            <a
              href="#contact"
              id="nav-cta-button"
              className="px-4 py-2 text-sm font-semibold rounded-sm
                         border border-[#E8B84B] text-[#E8B84B]
                         hover:bg-[#E8B84B] hover:text-[#0D1B2A]
                         transition-all duration-200"
            >
              Let&apos;s Connect
            </a>
          </li>
        </ul>

        {/* ── Mobile hamburger toggle ── */}
        <button
          id="mobile-menu-toggle"
          className="md:hidden text-[#F5F0E8] hover:text-[#E8B84B] transition-colors duration-200"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* ── Mobile dropdown menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#0D1B2A]/98 backdrop-blur-md border-b border-[#E8B84B]/10"
          >
            <ul className="flex flex-col px-6 py-4 gap-4" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block text-base font-medium text-[#DDD8CF]
                               hover:text-[#E8B84B] transition-colors duration-200 py-1"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="inline-block mt-2 px-4 py-2 text-sm font-semibold rounded-sm
                             border border-[#E8B84B] text-[#E8B84B]
                             hover:bg-[#E8B84B] hover:text-[#0D1B2A]
                             transition-all duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Let&apos;s Connect
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
