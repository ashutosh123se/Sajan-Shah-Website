import { execSync } from 'child_process';
import path from 'path';
import { db } from './database';
import { seedInitiatives, seedTestimonials, seedLegalPages } from './seedExtras';
import { alignCmsToFrontendDefaults } from './alignCmsToFrontendDefaults';

const PAGE_SEED_SCRIPTS = [
  'seedHomePage.js',
  'seedAboutPage.js',
  'seedSpeakingPage.js',
  'seedEventsPage.js',
  'seedContributionsPage.js',
];

function runScript(scriptName: string) {
  const scriptPath = path.join(__dirname, '../scripts', scriptName);
  execSync(`node "${scriptPath}"`, {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, SEED_CREATE_ONLY: '1' },
  });
}

/** Seed CMS only when empty — never overwrites admin/user content. */
export async function ensurePageContentSeeded(): Promise<{ seeded: boolean; message: string }> {
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
