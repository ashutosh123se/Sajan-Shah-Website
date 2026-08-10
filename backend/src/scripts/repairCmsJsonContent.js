/**
 * Repair double-stringified / character-index CMS JSON across page sections.
 * Run on server: node src/scripts/repairCmsJsonContent.js
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function isCharacterIndexObject(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const keys = Object.keys(value);
  if (keys.length < 2) return false;
  if (!keys.every((k) => /^\d+$/.test(k))) return false;
  return Object.values(value).every((v) => typeof v === 'string' && v.length <= 2);
}

function fromCharacterIndexObject(value) {
  return Object.keys(value)
    .sort((a, b) => Number(a) - Number(b))
    .map((k) => value[k])
    .join('');
}

function tryParseJson(raw) {
  const trimmed = String(raw).trim();
  if (!(trimmed.startsWith('{') || trimmed.startsWith('['))) return undefined;
  try {
    return JSON.parse(trimmed);
  } catch {
    return undefined;
  }
}

function normalizeJsonContent(content) {
  if (content == null) return { value: {}, changed: content != null };

  let value = content;
  let changed = false;

  if (isCharacterIndexObject(value)) {
    const rebuilt = fromCharacterIndexObject(value);
    const parsed = tryParseJson(rebuilt);
    value = parsed !== undefined ? parsed : {};
    changed = true;
  }

  for (let i = 0; i < 4; i++) {
    if (typeof value !== 'string') break;
    const parsed = tryParseJson(value);
    if (parsed === undefined) break;
    value = parsed;
    changed = true;
  }

  if (isCharacterIndexObject(value)) {
    const rebuilt = fromCharacterIndexObject(value);
    const parsed = tryParseJson(rebuilt);
    value = parsed !== undefined ? parsed : {};
    changed = true;
  }

  if (typeof value === 'string') {
    const parsed = tryParseJson(value);
    value = parsed !== undefined && typeof parsed === 'object' ? parsed : {};
    changed = true;
  }

  if (!value || typeof value !== 'object') {
    value = {};
    changed = true;
  }

  return { value, changed };
}

const TABLES = [
  { name: 'homePageSection', model: 'homePageSection' },
  { name: 'aboutPageSection', model: 'aboutPageSection' },
  { name: 'speakingPageSection', model: 'speakingPageSection' },
  { name: 'eventsPageSection', model: 'eventsPageSection' },
  { name: 'contributionsPageSection', model: 'contributionsPageSection' },
];

async function repairModel(modelName) {
  const rows = await prisma[modelName].findMany();
  let fixed = 0;
  for (const row of rows) {
    const { value, changed } = normalizeJsonContent(row.content);
    if (!changed) continue;
    await prisma[modelName].update({
      where: { id: row.id },
      data: { content: value },
    });
    fixed += 1;
    console.log(`  ✅ ${modelName} ${row.key || row.id}`);
  }
  return fixed;
}

async function main() {
  console.log('🔧 Repairing CMS JSON content (string / character-index → object)...');
  let total = 0;
  for (const t of TABLES) {
    if (!prisma[t.model]) {
      console.log(`  ⏭️ skip missing model ${t.model}`);
      continue;
    }
    const n = await repairModel(t.model);
    console.log(`  ${t.name}: ${n} fixed`);
    total += n;
  }
  console.log(`✨ Done. Fixed ${total} section(s).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
