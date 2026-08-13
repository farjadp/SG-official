/* ─────────────────────────────────────────────────────────────────────────────
   src/components/ResumeDownload.tsx
   سکشن دانلود رزومه روی صفحه اصلی سایت.
   اگر رزومه آپلود نشده باشه، یه نوشته placeholder نشون می‌ده.
   ───────────────────────────────────────────────────────────────────────────── */

"use client";

import { useEffect, useState } from "react";
import { motion }              from "framer-motion";
import { FileText, Download, ArrowRight } from "lucide-react";

/* ── نوع پاسخ API ── */
interface ResumeStatus {
  available:   boolean;
  fileName:    string;
  downloadUrl: string | null;
}

export default function ResumeDownload() {
  /* وضعیت رزومه دریافتی از API */
  const [status, setStatus]   = useState<ResumeStatus | null>(null);
  const [loading, setLoading] = useState(true);

  /* ── دریافت وضعیت رزومه از API ── */
  useEffect(() => {
    fetch("/api/resume-status")
      .then((r) => r.json())
      .then((data: ResumeStatus) => {
        setStatus(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section
      id="resume"
      className="py-20 md:py-28 bg-[#0D1B2A] border-t border-[#E8B84B]/8"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          /* ── کارت اصلی ── */
          className="relative overflow-hidden rounded-xl
                     bg-gradient-to-br from-[#112233] to-[#0f1e2e]
                     border border-[#E8B84B]/15
                     p-8 md:p-12
                     shadow-2xl shadow-black/30"
        >
          {/* ── المان تزئینی: دایره طلایی کمرنگ در گوشه ── */}
          <div
            className="absolute -top-16 -right-16 w-64 h-64 rounded-full
                       opacity-[0.06] pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, #E8B84B 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center
                          gap-8 md:gap-12">
            {/* ── آیکون PDF ── */}
            <div
              className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl
                         bg-[#E8B84B]/10 border border-[#E8B84B]/20
                         flex items-center justify-center"
            >
              <FileText
                size={32}
                className="text-[#E8B84B]"
                strokeWidth={1.5}
              />
            </div>

            {/* ── متن ── */}
            <div className="flex-1">
              <p className="text-[#E8B84B] text-xs font-semibold tracking-[0.2em] uppercase
                            font-inter mb-2">
                Resume / CV
              </p>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#F5F0E8] mb-3">
                View My Full Background
              </h2>
              <p className="text-[#DDD8CF]/65 font-inter text-base leading-relaxed max-w-xl">
                A detailed look at my experience building accelerator programs,
                managing ecosystems, and supporting founders across the globe.
              </p>
            </div>

            {/* ── دکمه دانلود یا placeholder ── */}
            <div className="flex-shrink-0 w-full md:w-auto">
              {loading ? (
                /* spinner در حال بارگذاری */
                <div className="flex items-center justify-center w-full md:w-48 h-14
                                rounded-sm bg-[#E8B84B]/10 border border-[#E8B84B]/15
                                animate-pulse">
                  <span className="text-[#E8B84B]/40 text-sm font-inter">
                    در حال بارگذاری...
                  </span>
                </div>
              ) : status?.available && status.downloadUrl ? (
                /* ── دکمه دانلود (وقتی رزومه آپلود شده) ── */
                <a
                  href={status.downloadUrl}
                  id="resume-download-button"
                  download
                  className="flex items-center justify-center gap-2.5
                             w-full md:w-auto px-8 py-4 rounded-sm
                             bg-[#E8B84B] text-[#0D1B2A]
                             font-semibold text-sm font-inter tracking-wide
                             hover:bg-[#C99A30] active:scale-[0.98]
                             transition-all duration-200
                             shadow-lg shadow-[#E8B84B]/20 hover:shadow-[#E8B84B]/30"
                >
                  <Download size={17} strokeWidth={2} />
                  Download Resume
                </a>
              ) : (
                /* ── لینک Contact وقتی رزومه هنوز آپلود نشده ── */
                <a
                  href="#contact"
                  id="resume-contact-cta"
                  className="flex items-center justify-center gap-2.5
                             w-full md:w-auto px-8 py-4 rounded-sm
                             border border-[#E8B84B]/30 text-[#E8B84B]
                             font-semibold text-sm font-inter tracking-wide
                             hover:bg-[#E8B84B]/8 active:scale-[0.98]
                             transition-all duration-200"
                >
                  Request CV
                  <ArrowRight size={15} strokeWidth={2} />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
