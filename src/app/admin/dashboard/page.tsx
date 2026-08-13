/* ─────────────────────────────────────────────────────────────────────────────
   src/app/admin/dashboard/page.tsx — داشبورد ادمین (Server Component)
   اگر لاگین نشده باشه، ریدایرکت به /admin می‌شه.
   اطلاعات config رو از فایل می‌خونه و به کامپوننت‌های client پاس می‌ده.
   ───────────────────────────────────────────────────────────────────────────── */

import { redirect }        from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getConfig }       from "@/lib/config";
import DashboardClient     from "./DashboardClient";
import type { Metadata }   from "next";

/* ── این صفحه نباید کش بشه چون config ممکنه تغییر کرده باشه ── */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title:  "Dashboard — Admin",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  /* اگر لاگین نشده، برگرد به صفحه لاگین */
  if (!(await isAuthenticated())) {
    redirect("/admin");
  }

  /* خواندن تنظیمات فعلی سایت */
  const config = getConfig();

  return (
    <main className="min-h-screen bg-[#0D1B2A]">
      {/* ── هدر داشبورد ── */}
      <header className="border-b border-[#E8B84B]/10 bg-[#090f18]">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-[#E8B84B] text-xs font-semibold tracking-[0.2em] uppercase font-inter">
              Admin Panel
            </p>
            <h1 className="font-playfair text-xl font-bold text-[#F5F0E8] mt-0.5">
              Sisi Gong — Dashboard
            </h1>
          </div>

          {/* لینک بازگشت به سایت */}
          <a
            href="/"
            target="_blank"
            className="text-xs text-[#DDD8CF]/45 hover:text-[#E8B84B]
                       transition-colors duration-200 font-inter flex items-center gap-1.5"
          >
            مشاهده سایت ↗
          </a>
        </div>
      </header>

      {/* ── محتوای داشبورد (client component) ── */}
      <DashboardClient
        currentPhone={config.phone}
        resumeAvailable={config.resumeAvailable}
        resumeFileName={config.resumeFileName}
      />
    </main>
  );
}
