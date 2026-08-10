/**
 * Unwrap CMS Json that was accidentally stored as a string, or as a
 * character-index object ({ "0": "{", "1": "h", ... }) from spreading a string.
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

export function normalizeCmsContent(content: unknown): Record<string, any> {
  if (content == null) return {};

  let value: any = content;

  if (isCharacterIndexObject(value)) {
    const rebuilt = fromCharacterIndexObject(value);
    const parsed = tryParseJson(rebuilt);
    value = parsed !== undefined ? parsed : {};
  }

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
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? (parsed as Record<string, any>) : {};
  }

  if (Array.isArray(value)) {
    // Unexpected root array — wrap so admin Object.entries still works safely
    return { items: value };
  }

  return value && typeof value === 'object' ? value : {};
}

/** Safe entries for admin editors — never iterate a string as character fields. */
export function cmsContentEntries(content: unknown): [string, any][] {
  const normalized = normalizeCmsContent(content);
  return Object.entries(normalized).filter(([key]) => !/^\d+$/.test(key));
}
