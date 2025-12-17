import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import type { Locale } from "@/i18n-config";

export const locales = ["en", "ko"] as const;

export function hasLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/**
 * Recursively loads JSON dictionaries and builds a nested object tree.
 *
 * Example:
 * dictionaries/en/legal/privacy.json
 * → dict.legal.privacy
 */
async function loadDir(dir: string): Promise<Record<string, any>> {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  const result: Record<string, any> = {};

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      result[entry.name] = await loadDir(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(".json")) {
      const contents = await fs.readFile(fullPath, "utf8");

      if (!contents.trim()) continue;

      const key = entry.name.replace(".json", "");

      try {
        result[key] = JSON.parse(contents);
      } catch {
        throw new Error(`Invalid JSON in ${fullPath}`);
      }
    }
  }

  return result;
}

/**
 * Loads all dictionaries for a locale.
 */
export async function getDictionary(locale: Locale) {
  const dir = path.join(process.cwd(), "dictionaries", locale);
  return loadDir(dir);
}
