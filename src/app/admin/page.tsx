/* ─────────────────────────────────────────────────────────────────────────────
   src/app/admin/page.tsx — صفحه لاگین پنل ادمین
   اگر کاربر قبلاً لاگین کرده باشه، مستقیم به داشبورد هدایت می‌شه.
   ───────────────────────────────────────────────────────────────────────────── */

import { redirect }    from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import AdminLoginForm  from "./LoginForm";
import type { Metadata } from "next";

/* ── SEO: این صفحه نباید توسط موتورهای جستجو ایندکس بشه ── */
export const metadata: Metadata = {
  title:  "Admin — Sisi Gong",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  /* اگر لاگین‌شده، برو داشبورد */
  if (await isAuthenticated()) {
    redirect("/admin/dashboard");
  }

  return (
    <main
      className="min-h-screen bg-[#0D1B2A] flex items-center justify-center px-4"
    >
      {/* ── کارت لاگین ── */}
      <div className="w-full max-w-md">
        {/* هدر */}
        <div className="text-center mb-8">
          <p className="text-[#E8B84B] text-sm font-semibold tracking-[0.2em] uppercase font-inter mb-2">
            Admin Panel
          </p>
          <h1 className="font-playfair text-3xl font-bold text-[#F5F0E8]">
            Sisi Gong
          </h1>
          <p className="text-[#DDD8CF]/50 text-sm font-inter mt-2">
            برای ورود پسورد را وارد کنید
          </p>
        </div>

        {/* فرم لاگین (client component) */}
        <AdminLoginForm />

        {/* لینک برگشت به سایت */}
        <p className="text-center mt-6 text-xs text-[#DDD8CF]/35 font-inter">
          <a href="/" className="hover:text-[#E8B84B] transition-colors duration-200">
            ← بازگشت به سایت
          </a>
        </p>
      </div>
    </main>
  );
}
