/* ─────────────────────────────────────────────────────────────────────────────
   src/app/admin/actions.ts — Server Actions پنل ادمین
   همه عملیات مهم (لاگین، لاگ‌اوت، آپدیت شماره، آپلود رزومه) اینجاست.
   این فایل فقط روی سرور اجرا می‌شه — هیچ‌وقت به client نمی‌رسه.
   ───────────────────────────────────────────────────────────────────────────── */

"use server";

import { cookies }    from "next/headers";
import { redirect }   from "next/navigation";
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
   ۱. لاگین — پسورد رو بررسی می‌کنه و کوکی session می‌ذاره
   ══════════════════════════════════════════════════════════ */
export async function loginAction(
  _prevState: { error: string } | null,
  formData: FormData
): Promise<{ error: string } | null> {
  const password = String(formData.get("password") ?? "");

  /* هش پسورد وارد‌شده با هش پسورد درست مقایسه می‌شه */
  const inputHash    = hashPassword(password);
  const expectedHash = getExpectedHash();

  if (inputHash !== expectedHash) {
    /* پسورد اشتباه */
    return { error: "پسورد اشتباه است. دوباره تلاش کنید." };
  }

  /* لاگین موفق — کوکی httpOnly ست می‌کنیم */
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, expectedHash, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge:   60 * 60 * 8, /* 8 ساعت */
    path:     "/",
  });

  /* ریدایرکت به داشبورد */
  redirect("/admin/dashboard");
}

/* ══════════════════════════════════════════════════════════
   ۲. لاگ‌اوت — کوکی session رو پاک می‌کنه
   ══════════════════════════════════════════════════════════ */
export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin");
}

/* ══════════════════════════════════════════════════════════
   ۳. آپدیت شماره تلفن
   ══════════════════════════════════════════════════════════ */
export async function updatePhoneAction(
  _prevState: { error?: string; success?: string } | null,
  formData: FormData
): Promise<{ error?: string; success?: string }> {
  /* بررسی احراز هویت */
  if (!(await isAuthenticated())) {
    return { error: "دسترسی غیرمجاز. لطفاً دوباره لاگین کنید." };
  }

  const phone = String(formData.get("phone") ?? "").trim();

  /* اعتبارسنجی ساده شماره */
  if (!phone || phone.length < 7) {
    return { error: "شماره تلفن معتبر وارد کنید." };
  }

  /* ذخیره در config */
  const config = getConfig();
  config.phone  = phone;
  saveConfig(config);

  return { success: `شماره با موفقیت به "${phone}" تغییر کرد.` };
}

/* ══════════════════════════════════════════════════════════
   ۴. آپلود رزومه (فایل PDF)
   ══════════════════════════════════════════════════════════ */
export async function uploadResumeAction(
  _prevState: { error?: string; success?: string } | null,
  formData: FormData
): Promise<{ error?: string; success?: string }> {
  /* بررسی احراز هویت */
  if (!(await isAuthenticated())) {
    return { error: "دسترسی غیرمجاز. لطفاً دوباره لاگین کنید." };
  }

  const file = formData.get("resume") as File | null;

  /* بررسی وجود فایل */
  if (!file || file.size === 0) {
    return { error: "هیچ فایلی انتخاب نشده." };
  }

  /* فقط PDF قبول می‌کنیم */
  if (file.type !== "application/pdf") {
    return { error: "فقط فایل PDF مجاز است." };
  }

  /* حداکثر حجم: 10MB */
  const MAX_SIZE = 10 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    return { error: "حجم فایل نباید بیشتر از 10MB باشد." };
  }

  /* خواندن و ذخیره فایل در public/ */
  const buffer = Buffer.from(await file.arrayBuffer());
  writeFileSync(RESUME_PATH, buffer);

  /* آپدیت config */
  const config              = getConfig();
  config.resumeAvailable    = true;
  config.resumeFileName     = file.name;
  saveConfig(config);

  return {
    success: `رزومه "${file.name}" با موفقیت آپلود شد.`,
  };
}

/* ══════════════════════════════════════════════════════════
   ۵. حذف رزومه
   ══════════════════════════════════════════════════════════ */
export async function deleteResumeAction(): Promise<{
  error?: string;
  success?: string;
}> {
  if (!(await isAuthenticated())) {
    return { error: "دسترسی غیرمجاز." };
  }

  const { unlinkSync, existsSync } = await import("fs");

  if (existsSync(RESUME_PATH)) {
    unlinkSync(RESUME_PATH);
  }

  const config           = getConfig();
  config.resumeAvailable = false;
  config.resumeFileName  = "";
  saveConfig(config);

  return { success: "رزومه با موفقیت حذف شد." };
}
