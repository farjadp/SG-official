/* ─────────────────────────────────────────────────────────────────────────────
   src/lib/auth.ts
   توابع کمکی authentication برای پنل ادمین.
   از crypto داخلی Node.js برای هش کردن پسورد استفاده می‌کنه.
   ───────────────────────────────────────────────────────────────────────────── */

import { createHash } from "crypto";
import { cookies } from "next/headers";

/* ── نام کوکی session ── */
export const SESSION_COOKIE = "admin_token";

/* ── ساخت هش SHA-256 از پسورد + secret ── */
export function hashPassword(password: string): string {
  const secret = process.env.ADMIN_SECRET ?? "fallback-secret";
  return createHash("sha256")
    .update(password + secret)
    .digest("hex");
}

/* ── هش پسورد درست رو محاسبه می‌کنه تا باهاش مقایسه بشه ── */
export function getExpectedHash(): string {
  const password = process.env.ADMIN_PASSWORD ?? "admin123";
  return hashPassword(password);
}

/* ── بررسی می‌کنه آیا کاربر لاگین‌شده یا نه ── */
export async function isAuthenticated(): Promise<boolean> {
  /* در Next.js 15+ باید cookies() رو await کنیم */
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  /* کوکی رو با هش پسورد مقایسه می‌کنه */
  return token === getExpectedHash();
}
