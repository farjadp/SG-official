/* ─────────────────────────────────────────────────────────────────────────────
   src/lib/config.ts
   توابع خواندن و نوشتن فایل data/site-config.json.
   این فایل اطلاعات سایت (شماره تلفن، وضعیت رزومه) رو نگه می‌داره.
   ───────────────────────────────────────────────────────────────────────────── */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

/* ── آدرس فایل config ── */
const CONFIG_PATH = join(process.cwd(), "data", "site-config.json");
const DATA_DIR    = join(process.cwd(), "data");

/* ── نوع داده‌های تنظیمات سایت ── */
export interface SiteConfig {
  phone:           string;
  resumeAvailable: boolean;
  resumeFileName:  string;
}

/* ── مقادیر پیش‌فرض ── */
const DEFAULT_CONFIG: SiteConfig = {
  phone:           "647-983-2668",
  resumeAvailable: false,
  resumeFileName:  "",
};

/* ── خواندن config از فایل JSON ── */
export function getConfig(): SiteConfig {
  try {
    if (!existsSync(CONFIG_PATH)) return DEFAULT_CONFIG;
    const raw = readFileSync(CONFIG_PATH, "utf-8");
    return { ...DEFAULT_CONFIG, ...JSON.parse(raw) } as SiteConfig;
  } catch {
    /* اگر فایل خراب بود، مقدار پیش‌فرض برمی‌گردونه */
    return DEFAULT_CONFIG;
  }
}

/* ── ذخیره config در فایل JSON ── */
export function saveConfig(config: SiteConfig): void {
  /* اگر پوشه data وجود نداشت، بسازش */
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
  writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), "utf-8");
}

/* ── آدرس فایل رزومه در public ── */
export const RESUME_PATH     = join(process.cwd(), "public", "sisi-resume.pdf");
export const RESUME_PUBLIC   = "/sisi-resume.pdf";
