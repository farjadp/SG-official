/* ─────────────────────────────────────────────────────────────────────────────
   src/lib/auth.ts
   Authentication helpers for the admin panel.
   Uses Node.js built-in crypto to hash the admin password.
   ───────────────────────────────────────────────────────────────────────────── */

import { createHash } from "crypto";
import { cookies }    from "next/headers";

/* ── Session cookie name ── */
export const SESSION_COOKIE = "admin_token";

/* ── Produce a SHA-256 hash of password + secret ── */
export function hashPassword(password: string): string {
  const secret = process.env.ADMIN_SECRET ?? "fallback-secret";
  return createHash("sha256")
    .update(password + secret)
    .digest("hex");
}

/* ── Compute the expected hash from env so we can compare against it ── */
export function getExpectedHash(): string {
  const password = process.env.ADMIN_PASSWORD ?? "admin123";
  return hashPassword(password);
}

/* ── Returns true if the current request carries a valid session cookie ── */
export async function isAuthenticated(): Promise<boolean> {
  /* In Next.js 15+ cookies() must be awaited */
  const cookieStore = await cookies();
  const token       = cookieStore.get(SESSION_COOKIE)?.value;

  /* Compare the cookie value against the expected hash */
  return token === getExpectedHash();
}
