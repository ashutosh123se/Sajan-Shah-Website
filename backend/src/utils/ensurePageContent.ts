import { execSync } from 'child_process';
import path from 'path';
import { db } from './database';
import { seedInitiatives, seedTestimonials, seedLegalPages } from './seedExtras';
import { alignCmsToFrontendDefaults } from './alignCmsToFrontendDefaults';
import { normalizeJsonContent } from './jsonContent';

const PAGE_SEED_SCRIPTS = [
  'seedHomePage.js',
  'seedAboutPage.js',
  'seedSpeakingPage.js',
  'seedEventsPage.js',
  'seedContributionsPage.js',
];

const CMS_MODELS = [
  'homePageSection',
  'aboutPageSection',
  'speakingPageSection',
  'eventsPageSection',
  'contributionsPageSection',
] as const;

function runScript(scriptName: string) {
  const scriptPath = path.join(__dirname, '../scripts', scriptName);
  execSync(`node "${scriptPath}"`, {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, SEED_CREATE_ONLY: '1' },
  });
}

function looksCorrupted(content: unknown): boolean {
  if (typeof content === 'string') return true;
  if (!content || typeof content !== 'object' || Array.isArray(content)) return false;
  const keys = Object.keys(content as object);
  if (keys.length < 8) return false;
  return keys.every((k) => /^\d+$/.test(k));
}

/** Fix stringified / character-index CMS JSON in place (safe; only touches corrupted rows). */
export async function repairCorruptedCmsJson(): Promise<number> {
  let fixed = 0;
  for (const model of CMS_MODELS) {
    const rows = await (db as any)[model].findMany();
    for (const row of rows) {
      if (!looksCorrupted(row.content)) continue;
      const value = normalizeJsonContent(row.content);
      await (db as any)[model].update({
        where: { id: row.id },
        data: { content: value },
      });
      fixed += 1;
      console.log(`  🔧 repaired ${model}.${row.key || row.id}`);
    }
  }
  if (fixed > 0) console.log(`✅ Repaired ${fixed} corrupted CMS section(s)`);
  return fixed;
}

/** Seed CMS only when empty — never overwrites admin/user content. */
export async function ensurePageContentSeeded(): Promise<{ seeded: boolean; message: string }> {
  // Always attempt cheap corruption repair (no-op when data is healthy)
  await repairCorruptedCmsJson();

  const speakingCount = await db.speakingPageSection.count();
  if (speakingCount > 0) {
    return { seeded: false, message: 'Page content already exists' };
  }

  console.log('📦 CMS tables empty — seeding default page content (create-only)...');

  for (const script of PAGE_SEED_SCRIPTS) {
    console.log(`  → Running ${script}`);
    runScript(script);
  }

  await seedInitiatives();
  await seedTestimonials();
  await seedLegalPages();

  console.log('✅ Default CMS content seeded');
  return { seeded: true, message: 'Default page content seeded successfully' };
}

/**
 * Fill missing CMS sections, then align designer images/links to frontend defaults.
 */
export async function forceSeedPageContent(): Promise<{ message: string; created: string[] }> {
  process.env.SEED_CREATE_ONLY = '1';
  const created: string[] = [];

  await repairCorruptedCmsJson();

  for (const script of PAGE_SEED_SCRIPTS) {
    console.log(`  → Fill-missing only: ${script}`);
    runScript(script);
    created.push(script);
  }

  await seedInitiatives();
  await seedTestimonials();
  await seedLegalPages();

  const aligned = await alignCmsToFrontendDefaults();

  return {
    message: `Filled missing CMS rows, then aligned designer images/links (${aligned.updated.join(', ') || 'none'})`,
    created: [...created, ...aligned.updated.map((k) => `align:${k}`)],
  };
}
