/* ─────────────────────────────────────────────────────────────────────────────
   Footer.tsx
   Minimal site footer: name + current year on the left,
   LinkedIn icon link on the right. No copyright clutter.
   ───────────────────────────────────────────────────────────────────────────── */

/* ── Inline LinkedIn SVG (lucide-react v1 dropped brand icons) ── */
function LinkedinIcon({ size = 19 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Footer() {
  /* Current year is resolved server-side (no client hydration mismatch) */
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-[#E8B84B]/10 bg-[#090f18] py-7"
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row
                      items-center justify-between gap-4">

        {/* ── Name + year ── */}
        <p className="text-sm text-[#DDD8CF]/45 font-inter">
          <span className="font-playfair font-semibold text-[#DDD8CF]/70">Sisi Gong</span>
          {" "}&copy; {year}
        </p>

        {/* ── LinkedIn icon link ── */}
        <a
          href="https://www.linkedin.com/in/sisi-gong"
          id="footer-linkedin-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Sisi Gong on LinkedIn (opens in new tab)"
          className="text-[#DDD8CF]/40 hover:text-[#E8B84B] transition-colors duration-200
                     hover:scale-110 transform inline-flex"
        >
          <LinkedinIcon size={19} />
        </a>
      </div>
    </footer>
  );
}
