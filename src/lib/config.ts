/* ─────────────────────────────────────────────────────────────────────────────
   src/lib/config.ts
   Helpers for reading and writing data/site-config.json.
   This file stores site-wide settings: phone number and resume availability.
   ───────────────────────────────────────────────────────────────────────────── */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

/* ── Path to the config file ── */
const CONFIG_PATH = join(process.cwd(), "data", "site-config.json");
const DATA_DIR    = join(process.cwd(), "data");

/* ── Shape of the site config object ── */
export interface SiteConfig {
  phone:           string;
  resumeAvailable: boolean;
  resumeFileName:  string;
}

/* ── Default values used when the config file doesn't exist yet ── */
const DEFAULT_CONFIG: SiteConfig = {
  phone:           "647-983-2668",
  resumeAvailable: false,
  resumeFileName:  "",
};

/* ── Read config from the JSON file ── */
export function getConfig(): SiteConfig {
  try {
    if (!existsSync(CONFIG_PATH)) return DEFAULT_CONFIG;
    const raw = readFileSync(CONFIG_PATH, "utf-8");
    return { ...DEFAULT_CONFIG, ...JSON.parse(raw) } as SiteConfig;
  } catch {
    /* Return defaults if the file is missing or malformed */
    return DEFAULT_CONFIG;
  }
}

/* ── Persist config to the JSON file ── */
export function saveConfig(config: SiteConfig): void {
  /* Create the data directory if it doesn't exist */
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
  writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), "utf-8");
}

/* ── Absolute path and public URL for the resume PDF ── */
export const RESUME_PATH   = join(process.cwd(), "public", "sisi-resume.pdf");
export const RESUME_PUBLIC = "/sisi-resume.pdf";
