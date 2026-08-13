/* ─────────────────────────────────────────────────────────────────────────────
   src/app/api/resume-status/route.ts — API عمومی وضعیت رزومه
   بررسی می‌کنه آیا رزومه آپلود شده یا نه.
   این endpoint عمومیه و نیاز به احراز هویت ندارد.
   ───────────────────────────────────────────────────────────────────────────── */

import { NextResponse }           from "next/server";
import { getConfig, RESUME_PATH } from "@/lib/config";
import { existsSync }             from "fs";

/* ── GET /api/resume-status ── */
export async function GET() {
  /* config رو بخون */
  const config = getConfig();

  /* بررسی وجود فیزیکی فایل رزومه */
  const fileExists = existsSync(RESUME_PATH);

  return NextResponse.json({
    available:    config.resumeAvailable && fileExists,
    fileName:     config.resumeFileName ?? "",
    downloadUrl:  config.resumeAvailable && fileExists ? "/sisi-resume.pdf" : null,
  });
}
