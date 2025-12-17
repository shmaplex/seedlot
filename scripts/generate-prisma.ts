/**
 * @deprecated This isn't working so well. Maybe someone can fix it?
 * Prisma Schema Generator (Zod → Prisma)
 * ======================================
 *
 * ⚠️ IMPORTANT
 * ------------
 * This script generates a *DRAFT* Prisma schema.
 * Humans MUST review the output before running migrations.
 *
 * Unsupported or ambiguous Zod types are safely mapped to `Json`
 * with warnings to preserve data integrity.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { diffLines } from "diff";
import {
  ZodArray,
  ZodBoolean,
  ZodDate,
  ZodEnum,
  ZodNumber,
  ZodObject,
  ZodString,
} from "zod";

/* ------------------------------------------------------------------ */
/* CONFIG                                                               */
/* ------------------------------------------------------------------ */
const REQUIRE_PERSISTED_MARKER = false;
const SCHEMA_NAME = /^[A-Z][A-Za-z0-9]*Schema$/;
const EXCLUDE = /(Create|Update|Input|Raw|Evidence)(Schema)?$/;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SCHEMA_DIR = path.join(__dirname, "../schemas");
const OUTPUT_PATH = path.join(__dirname, "../prisma/generated.prisma");

const PRIMITIVE_MAP: Record<string, string> = {
  SafeIdentifier: "String @db.VarChar(128)",
  SafeCode: "String @db.VarChar(128)",
  LongText: "String @db.Text",
  PositiveInt: "Int",
  BooleanFlag: "Boolean",
  ScientificName: "String @db.VarChar(255)",
  CountryCode: "String @db.Char(2)",
  Email: "String @db.VarChar(255)",
  CertificateNumber: "String @db.VarChar(128)",
  LotCode: "String @db.VarChar(64)",
  DateTime: "DateTime",
  DateTimeDefault: "DateTime",
  JSONDateTime: "DateTime",
  CreatedAt: "DateTime",
  UpdatedAt: "DateTime",
  Id: "String @id",
  UUID: "String @db.VarChar(128)",
};

/* ------------------------------------------------------------------ */
/* STATE                                                               */
/* ------------------------------------------------------------------ */
const enums = new Map<string, string[]>();
const warnings = {
  jsonFallbacks: 0,
  unsupportedTypes: 0,
  skippedSchemas: 0,
  relationHints: 0,
};

/* ------------------------------------------------------------------ */
/* UTILITIES                                                           */
/* ------------------------------------------------------------------ */
function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function isPersistedSchema(schema: any): boolean {
  if (!REQUIRE_PERSISTED_MARKER) return true;
  return schema?.description === "persisted";
}

/* ------------------------------------------------------------------ */
/* ZOD UNWRAPPING                                                      */
/* ------------------------------------------------------------------ */
function unwrap(type: any): any {
  let current = type;
  const seen = new Set<any>();
  while (current && typeof current === "object" && !seen.has(current)) {
    seen.add(current);
    const def = current._def;
    if (!def) break;

    if (def.typeName === "ZodEffects") current = def.schema;
    else if (
      ["ZodOptional", "ZodNullable", "ZodDefault"].includes(def.typeName)
    )
      current = def.innerType;
    else if (def.typeName === "ZodBranded") current = def.type;
    else break;
  }
  return current;
}

function unwrapDeep(type: any): { inner: any; description?: string } {
  let current = type;
  let description: string | undefined;
  const seen = new Set<any>();
  while (current && typeof current === "object" && !seen.has(current)) {
    seen.add(current);
    const def = current._def;
    if (!def) break;

    if (def.typeName === "ZodEffects") {
      if (def.description) description = def.description;
      current = def.schema;
      continue;
    }

    if (["ZodOptional", "ZodNullable", "ZodDefault"].includes(def.typeName)) {
      current = def.innerType;
      continue;
    }

    if (def.typeName === "ZodBranded") {
      if (def.description) description = def.description;
      current = def.type;
      continue;
    }

    if (def.description) description = def.description;
    break;
  }
  return { inner: current, description };
}

/* ------------------------------------------------------------------ */
/* TYPE MAPPING                                                        */
/* ------------------------------------------------------------------ */
function mapZodToPrisma(type: any, context: string): string {
  // Fully recursive handling for arrays of arrays/branded primitives
  const recurse = (t: any, ctx: string): string => {
    const { inner, description } = unwrapDeep(t);

    if (description && PRIMITIVE_MAP[description])
      return PRIMITIVE_MAP[description];
    if (!inner?._def?.typeName) {
      warnings.jsonFallbacks++;
      console.warn(`⚠️  [${ctx}] Unresolvable Zod type → Json`);
      return "Json";
    }

    switch (inner._def.typeName) {
      case "ZodString":
        return "String";
      case "ZodNumber": {
        const checks = inner._def.checks ?? [];
        return checks.some((c: any) => c.kind === "int") ? "Int" : "Float";
      }
      case "ZodBoolean":
        return "Boolean";
      case "ZodDate":
        return "DateTime";
      case "ZodEnum": {
        const name = `${ctx.replace(/\./g, "_")}Enum`;
        enums.set(name, inner._def.values);
        return name;
      }
      case "ZodArray": {
        const innerType = recurse(inner._def.type, ctx + "[]");
        return `${innerType}[]`;
      }
      case "ZodObject":
      case "ZodUnion":
      case "ZodRecord":
      case "ZodTuple":
      case "ZodAny":
      case "ZodUnknown":
      case "ZodDiscriminatedUnion":
        warnings.jsonFallbacks++;
        return "Json";
      default:
        warnings.unsupportedTypes++;
        console.warn(
          `⚠️  [${ctx}] Unsupported Zod type (${inner._def.typeName}) → Json`,
        );
        return "Json";
    }
  };

  return recurse(type, context);
}

function inferAttributes(field: string, type: any): string[] {
  const attrs: string[] = [];
  if (type?.description === "id") attrs.push("@id");
  if (/email/i.test(field)) attrs.push("@unique");
  if (/certificateNumber|registrationNumber/i.test(field))
    attrs.push("@unique");
  return attrs;
}

function relationHint(field: string): string | null {
  if (!field.endsWith("Id")) return null;
  warnings.relationHints++;
  return `// TODO: relation to ${capitalize(field.replace(/Id$/, ""))}`;
}

function isOptional(type: any): boolean {
  return ["ZodOptional", "ZodNullable", "ZodDefault"].includes(
    type?._def?.typeName,
  );
}

/* ------------------------------------------------------------------ */
/* MODEL GENERATION                                                    */
/* ------------------------------------------------------------------ */
function generateModel(modelName: string, schema: ZodObject<any>): string {
  const fields = Object.entries(schema.shape).flatMap(([name, type]: any) => {
    const prismaType = mapZodToPrisma(type, `${modelName}.${name}`);
    const optional = isOptional(type) ? "?" : "";
    const attrs = inferAttributes(name, type);
    const hint = relationHint(name);

    return [
      hint ? `  ${hint}` : null,
      `  ${name} ${prismaType}${optional} ${attrs.join(" ")}`.trim(),
    ].filter(Boolean);
  });

  return `
model ${modelName} {
${fields.join("\n")}
}
`;
}

/* ------------------------------------------------------------------ */
/* SCHEMA LOADING                                                      */
/* ------------------------------------------------------------------ */
async function loadSchemas(): Promise<string[]> {
  const files = fs.readdirSync(SCHEMA_DIR).filter((f) => f.endsWith(".ts"));
  const models: string[] = [];

  for (const file of files) {
    const mod = await import(pathToFileURL(path.join(SCHEMA_DIR, file)).href);

    for (const [exportName, value] of Object.entries(mod)) {
      if (
        value instanceof ZodObject &&
        SCHEMA_NAME.test(exportName) &&
        !EXCLUDE.test(exportName)
      ) {
        if (!isPersistedSchema(value)) {
          warnings.skippedSchemas++;
          continue;
        }
        models.push(generateModel(exportName.replace(/Schema$/, ""), value));
      }
    }
  }
  return models;
}

/* ------------------------------------------------------------------ */
/* EMISSION                                                            */
/* ------------------------------------------------------------------ */
function emitEnums(): string {
  return Array.from(enums.entries())
    .map(
      ([name, values]) => `
enum ${name} {
${values.map((v) => `  ${v}`).join("\n")}
}
`,
    )
    .join("\n");
}

function printSummary() {
  console.log("\n⚠️  Generation Summary");
  console.log("─────────────────────");
  console.log(`Json fallbacks:      ${warnings.jsonFallbacks}`);
  console.log(`Unsupported types:   ${warnings.unsupportedTypes}`);
  console.log(`Skipped schemas:     ${warnings.skippedSchemas}`);
  console.log(`Relation hints:      ${warnings.relationHints}`);
}

/* ------------------------------------------------------------------ */
/* MAIN                                                               */
/* ------------------------------------------------------------------ */
async function main() {
  const models = await loadSchemas();
  const prismaVersion = process.env.PRISMA_VERSION ?? "6";

  const datasource =
    prismaVersion === "7"
      ? `datasource db { provider = "postgresql" }`
      : `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}`;

  const output = `
/// ⚠️ AUTO-GENERATED — DO NOT EDIT
/// REVIEW BEFORE MIGRATION
/// generator-version: 0.4.0

generator client {
  provider = "prisma-client-js"
}

${datasource}

${emitEnums()}

${models.join("\n")}
`;

  if (fs.existsSync(OUTPUT_PATH)) {
    diffLines(fs.readFileSync(OUTPUT_PATH, "utf8"), output).forEach((p) => {
      if (p.added) console.log(`+ ${p.value}`);
      if (p.removed) console.log(`- ${p.value}`);
    });
  }

  fs.writeFileSync(OUTPUT_PATH, `${output.trim()}\n`);
  console.log(`\n✅ Prisma draft schema written to ${OUTPUT_PATH}`);
  printSummary();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
