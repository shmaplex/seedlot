// app/[lang]/dictionaries.ts
import "server-only";
import fs from "node:fs/promises";
import path from "node:path";

export const locales = ["en", "ko"] as const;
export type Locale = (typeof locales)[number];

export function hasLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/**
 * Loads and merges all JSON dictionaries for a locale.
 *
 * Folder structure:
 * app/dictionaries/{locale}/*.json
 */
export async function getDictionary(locale: Locale) {
  const dir = path.join(process.cwd(), "app", "dictionaries", locale);
  const files = await fs.readdir(dir);

  const entries = await Promise.all(
    files
      .filter((file) => file.endsWith(".json"))
      .map(async (file) => {
        const filePath = path.join(dir, file);
        const contents = await fs.readFile(filePath, "utf8");

        if (!contents.trim()) return {};

        const namespace = file.replace(".json", "");

        try {
          return {
            [namespace]: JSON.parse(contents),
          };
        } catch {
          throw new Error(`Invalid JSON in ${filePath}`);
        }
      }),
  );

  return Object.assign({}, ...entries);
}
