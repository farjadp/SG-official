/* ─────────────────────────────────────────────────────────────────────────────
   src/app/admin/dashboard/page.tsx — Admin dashboard (Server Component)
   Redirects to /admin if the user is not authenticated.
   Reads the current config and passes it as props to the client UI component.
   ───────────────────────────────────────────────────────────────────────────── */

import { redirect }        from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getConfig }       from "@/lib/config";
import DashboardClient     from "./DashboardClient";
import type { Metadata }   from "next";

/* ── Never cache this page — config may change between requests ── */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title:  "Dashboard — Admin",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  /* If not logged in, redirect to the login page */
  if (!(await isAuthenticated())) {
    redirect("/admin");
  }

  /* Read the current site settings */
  const config = getConfig();

  return (
    <main className="min-h-screen bg-[#0D1B2A]">
      {/* ── Dashboard header ── */}
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

          {/* View site link */}
          <a
            href="/"
            target="_blank"
            className="text-xs text-[#DDD8CF]/45 hover:text-[#E8B84B]
                       transition-colors duration-200 font-inter flex items-center gap-1.5"
          >
            View Site ↗
          </a>
        </div>
      </header>

      {/* ── Dashboard body (client component handles all interactions) ── */}
      <DashboardClient
        currentPhone={config.phone}
        resumeAvailable={config.resumeAvailable}
        resumeFileName={config.resumeFileName}
      />
    </main>
  );
}
