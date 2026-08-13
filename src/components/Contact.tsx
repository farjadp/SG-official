/* ─────────────────────────────────────────────────────────────────────────────
   Contact.tsx
   Contact section with email + LinkedIn quick-links and a simple form
   (Name, Email, Message, Send). Form is intentionally UI-only for now —
   easy to wire to Resend / Nodemailer later.
   ───────────────────────────────────────────────────────────────────────────── */

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle, Phone } from "lucide-react";

/* ── Inline LinkedIn SVG (lucide-react v1 dropped brand icons) ── */
function LinkedinIcon({ size = 18 }: { size?: number }) {
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

/* ── Form field state shape ── */
interface FormState {
  name:    string;
  email:   string;
  message: string;
}

/* ── Initial / reset value ── */
const INITIAL_FORM: FormState = { name: "", email: "", message: "" };

export default function Contact() {
  /* Form field values */
  const [form, setForm]       = useState<FormState>(INITIAL_FORM);
  /* Loading state while "submitting" */
  const [loading, setLoading] = useState(false);
  /* Success state after send */
  const [sent, setSent]       = useState(false);

  /* ── Update a single field in the form state ── */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /* ── Simulate form submission (UI only — wire to API route later) ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    /* TODO: Replace this timeout with a real fetch to /api/contact */
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setLoading(false);
    setSent(true);
    setForm(INITIAL_FORM);

    /* Reset success state after 5 seconds */
    setTimeout(() => setSent(false), 5000);
  };

  /* ── Shared input base classes ── */
  const inputClasses = `
    w-full px-4 py-3 rounded-sm bg-[#112233] border border-[#E8B84B]/15 text-[#F5F0E8]
    font-inter text-sm placeholder:text-[#DDD8CF]/40
    focus:outline-none focus:border-[#E8B84B]/60 focus:ring-1 focus:ring-[#E8B84B]/25
    hover:border-[#E8B84B]/30 transition-all duration-200
  `;

  return (
    <section
      id="contact"
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
            Get in Touch
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#F5F0E8] mb-4">
            Let&apos;s Build Something Together
          </h2>
          <p className="text-[#DDD8CF]/70 font-inter max-w-lg mx-auto text-base leading-relaxed">
            Whether you&apos;re building a program, running an accelerator, or looking
            for a thought partner — I&apos;d love to connect.
          </p>
        </motion.div>

        {/* ── Two-column layout: quick links + form ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">

          {/* ── Left: direct contact links ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <h3 className="font-playfair text-2xl font-bold text-[#F5F0E8]">
              Reach me directly
            </h3>

            {/* Email link */}
            <a
              href="mailto:sisigongs@gmail.com"
              id="contact-email-link"
              className="flex items-center gap-4 group
                         px-5 py-4 rounded-lg border border-[#E8B84B]/15 bg-[#112233]
                         hover:border-[#E8B84B]/50 hover:bg-[#0f1e30]
                         transition-all duration-200"
              aria-label="Send email to Sisi Gong"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                           bg-[#E8B84B]/10 group-hover:bg-[#E8B84B]/20 transition-colors duration-200"
              >
                <Mail size={18} className="text-[#E8B84B]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs text-[#DDD8CF]/50 font-inter uppercase tracking-wider mb-0.5">
                  Email
                </p>
                <p className="text-[#F5F0E8] font-inter text-sm font-medium
                              group-hover:text-[#E8B84B] transition-colors duration-200">
                  sisigongs@gmail.com
                </p>
              </div>
            </a>

            {/* LinkedIn link */}
            <a
              href="https://www.linkedin.com/in/sisi-gong"
              id="contact-linkedin-link"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group
                         px-5 py-4 rounded-lg border border-[#E8B84B]/15 bg-[#112233]
                         hover:border-[#E8B84B]/50 hover:bg-[#0f1e30]
                         transition-all duration-200"
              aria-label="View Sisi Gong on LinkedIn (opens in new tab)"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                           bg-[#E8B84B]/10 group-hover:bg-[#E8B84B]/20 transition-colors duration-200"
              >
                <LinkedinIcon size={18} />
              </div>
              <div>
                <p className="text-xs text-[#DDD8CF]/50 font-inter uppercase tracking-wider mb-0.5">
                  LinkedIn
                </p>
                <p className="text-[#F5F0E8] font-inter text-sm font-medium
                              group-hover:text-[#E8B84B] transition-colors duration-200">
                  linkedin.com/in/sisi-gong
                </p>
              </div>
            </a>

            {/* ── Phone number link ── */}
            <a
              href="tel:+16479832668"
              id="contact-phone-link"
              className="flex items-center gap-4 group
                         px-5 py-4 rounded-lg border border-[#E8B84B]/15 bg-[#112233]
                         hover:border-[#E8B84B]/50 hover:bg-[#0f1e30]
                         transition-all duration-200"
              aria-label="Call Sisi Gong"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                           bg-[#E8B84B]/10 group-hover:bg-[#E8B84B]/20 transition-colors duration-200"
              >
                <Phone size={18} className="text-[#E8B84B]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs text-[#DDD8CF]/50 font-inter uppercase tracking-wider mb-0.5">
                  Phone
                </p>
                <p className="text-[#F5F0E8] font-inter text-sm font-medium
                              group-hover:text-[#E8B84B] transition-colors duration-200">
                  647-983-2668
                </p>
              </div>
            </a>

            {/* Availability note */}
            <p className="text-xs text-[#DDD8CF]/45 font-inter leading-relaxed pl-1">
              Based in Toronto, Canada. Open to consulting, advisory, and
              full-time ecosystem roles.
            </p>
          </motion.div>

          {/* ── Right: contact form ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            {/* Success banner */}
            {sent && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-6 px-4 py-3 rounded-lg
                           bg-emerald-900/30 border border-emerald-500/30 text-emerald-400"
              >
                <CheckCircle size={18} />
                <p className="text-sm font-inter font-medium">
                  Message sent — I&apos;ll be in touch soon.
                </p>
              </motion.div>
            )}

            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label="Contact form"
              className="space-y-4"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-medium text-[#DDD8CF]/60
                             font-inter uppercase tracking-wider mb-1.5"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-medium text-[#DDD8CF]/60
                             font-inter uppercase tracking-wider mb-1.5"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-medium text-[#DDD8CF]/60
                             font-inter uppercase tracking-wider mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  value={form.message}
                  onChange={handleChange}
                  className={`${inputClasses} resize-none`}
                />
              </div>

              {/* Submit button */}
              <button
                id="contact-submit-button"
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2
                           px-6 py-3.5 rounded-sm font-semibold text-sm font-inter
                           bg-[#E8B84B] text-[#0D1B2A]
                           hover:bg-[#C99A30] active:scale-[0.98]
                           disabled:opacity-60 disabled:cursor-not-allowed
                           transition-all duration-200 shadow-lg shadow-[#E8B84B]/15"
              >
                {loading ? (
                  /* Loading spinner */
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12" cy="12" r="10"
                      stroke="currentColor" strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                ) : (
                  <Send size={15} strokeWidth={2} />
                )}
                {loading ? "Sending…" : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
