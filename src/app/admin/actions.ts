/* ─────────────────────────────────────────────────────────────────────────────
   src/app/admin/actions.ts — Admin panel Server Actions
   All mutations (login, logout, phone update, resume upload/delete) live here.
   This file runs server-side only — never sent to the client.
   ───────────────────────────────────────────────────────────────────────────── */

"use server";

import { cookies }       from "next/headers";
import { redirect }      from "next/navigation";
import { writeFileSync } from "fs";

import {
  hashPassword,
  getExpectedHash,
  SESSION_COOKIE,
  isAuthenticated,
} from "@/lib/auth";

import {
  getConfig,
  saveConfig,
  RESUME_PATH,
} from "@/lib/config";

/* ══════════════════════════════════════════════════════════
   1. Login — validates password and sets session cookie
   ══════════════════════════════════════════════════════════ */
export async function loginAction(
  _prevState: { error: string } | null,
  formData: FormData
): Promise<{ error: string } | null> {
  const password = String(formData.get("password") ?? "");

  /* Hash the submitted password and compare to the expected hash */
  const inputHash    = hashPassword(password);
  const expectedHash = getExpectedHash();

  if (inputHash !== expectedHash) {
    return { error: "Incorrect password. Please try again." };
  }

  /* Login successful — set an httpOnly session cookie */
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, expectedHash, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge:   60 * 60 * 8, /* 8 hours */
    path:     "/",
  });

  /* Redirect to the dashboard */
  redirect("/admin/dashboard");
}

/* ══════════════════════════════════════════════════════════
   2. Logout — clears the session cookie
   ══════════════════════════════════════════════════════════ */
export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin");
}

/* ══════════════════════════════════════════════════════════
   3. Update phone number
   ══════════════════════════════════════════════════════════ */
export async function updatePhoneAction(
  _prevState: { error?: string; success?: string } | null,
  formData: FormData
): Promise<{ error?: string; success?: string }> {
  /* Guard: require authentication */
  if (!(await isAuthenticated())) {
    return { error: "Unauthorized. Please log in again." };
  }

  const phone = String(formData.get("phone") ?? "").trim();

  /* Basic validation */
  if (!phone || phone.length < 7) {
    return { error: "Please enter a valid phone number." };
  }

  /* Persist to config */
  const config = getConfig();
  config.phone  = phone;
  saveConfig(config);

  return { success: `Phone number updated to "${phone}".` };
}

/* ══════════════════════════════════════════════════════════
   4. Upload resume (PDF file)
   ══════════════════════════════════════════════════════════ */
export async function uploadResumeAction(
  _prevState: { error?: string; success?: string } | null,
  formData: FormData
): Promise<{ error?: string; success?: string }> {
  /* Guard: require authentication */
  if (!(await isAuthenticated())) {
    return { error: "Unauthorized. Please log in again." };
  }

  const file = formData.get("resume") as File | null;

  /* Validate file presence */
  if (!file || file.size === 0) {
    return { error: "No file selected." };
  }

  /* Only PDF files accepted */
  if (file.type !== "application/pdf") {
    return { error: "Only PDF files are accepted." };
  }

  /* Maximum size: 10 MB */
  const MAX_SIZE = 10 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    return { error: "File size must not exceed 10 MB." };
  }

  /* Read the file buffer and write to public/ */
  const buffer = Buffer.from(await file.arrayBuffer());
  writeFileSync(RESUME_PATH, buffer);

  /* Update config */
  const config           = getConfig();
  config.resumeAvailable = true;
  config.resumeFileName  = file.name;
  saveConfig(config);

  return { success: `Resume "${file.name}" uploaded successfully.` };
}

/* ══════════════════════════════════════════════════════════
   5. Delete resume
   ══════════════════════════════════════════════════════════ */
export async function deleteResumeAction(): Promise<{
  error?: string;
  success?: string;
}> {
  if (!(await isAuthenticated())) {
    return { error: "Unauthorized." };
  }

  const { unlinkSync, existsSync } = await import("fs");

  if (existsSync(RESUME_PATH)) {
    unlinkSync(RESUME_PATH);
  }

  const config           = getConfig();
  config.resumeAvailable = false;
  config.resumeFileName  = "";
  saveConfig(config);

  return { success: "Resume deleted successfully." };
}
