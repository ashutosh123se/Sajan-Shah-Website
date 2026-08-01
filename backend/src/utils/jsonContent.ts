/**
 * Prisma Json columns must receive objects/arrays, not stringified JSON.
 * Older saves double-encoded content as a JSON string, or spread a string into
 * a character-index object ({ "0": "{", "1": "h", ... }). Unwrap both on read/write.
 */

function isCharacterIndexObject(value: unknown): value is Record<string, string> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const keys = Object.keys(value as object);
  if (keys.length < 2) return false;
  if (!keys.every((k) => /^\d+$/.test(k))) return false;
  const vals = Object.values(value as Record<string, unknown>);
  return vals.every((v) => typeof v === 'string' && v.length <= 2);
}

function fromCharacterIndexObject(value: Record<string, string>): string {
  return Object.keys(value)
    .sort((a, b) => Number(a) - Number(b))
    .map((k) => value[k])
    .join('');
}

function tryParseJson(raw: string): unknown | undefined {
  const trimmed = raw.trim();
  if (!(trimmed.startsWith('{') || trimmed.startsWith('['))) return undefined;
  try {
    return JSON.parse(trimmed);
  } catch {
    return undefined;
  }
}

export function normalizeJsonContent(content: unknown): any {
  if (content == null) return {};

  let value: any = content;

  // Character-index object from `{...string}` spread / bad admin save
  if (isCharacterIndexObject(value)) {
    const rebuilt = fromCharacterIndexObject(value);
    const parsed = tryParseJson(rebuilt);
    value = parsed !== undefined ? parsed : {};
  }

  // Unwrap accidental double/triple stringification from older admin saves
  for (let i = 0; i < 4; i++) {
    if (typeof value !== 'string') break;
    const parsed = tryParseJson(value);
    if (parsed === undefined) break;
    value = parsed;
  }

  if (isCharacterIndexObject(value)) {
    const rebuilt = fromCharacterIndexObject(value);
    const parsed = tryParseJson(rebuilt);
    value = parsed !== undefined ? parsed : {};
  }

  if (typeof value === 'string') {
    const parsed = tryParseJson(value);
    return parsed !== undefined && typeof parsed === 'object' ? parsed : {};
  }

  return value && typeof value === 'object' ? value : {};
}

/** Value to write into a Prisma Json column — always a real object/array. */
export function toPrismaJson(content: unknown): any {
  return normalizeJsonContent(content);
}
