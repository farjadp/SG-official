/* ─────────────────────────────────────────────────────────────────────────────
   src/app/api/resume-status/route.ts — Public resume status API
   Checks whether a resume has been uploaded.
   This endpoint is public — no authentication required.
   ───────────────────────────────────────────────────────────────────────────── */

import { NextResponse }           from "next/server";
import { getConfig, RESUME_PATH } from "@/lib/config";
import { existsSync }             from "fs";

/* ── GET /api/resume-status ── */
export async function GET() {
  /* Read the current site config */
  const config = getConfig();

  /* Also verify the file physically exists on disk */
  const fileExists = existsSync(RESUME_PATH);

  return NextResponse.json({
    available:   config.resumeAvailable && fileExists,
    fileName:    config.resumeFileName ?? "",
    downloadUrl: config.resumeAvailable && fileExists ? "/sisi-resume.pdf" : null,
  });
}
