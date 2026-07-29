import { execSync } from 'child_process';
import path from 'path';
import { db } from './database';
import { seedInitiatives, seedTestimonials, seedLegalPages } from './seedExtras';

const PAGE_SEED_SCRIPTS = [
  'seedHomePage.js',
  'seedAboutPage.js',
  'seedSpeakingPage.js',
  'seedEventsPage.js',
  'seedContributionsPage.js',
];

function runScript(scriptName: string) {
  const scriptPath = path.join(__dirname, '../scripts', scriptName);
  execSync(`node "${scriptPath}"`, { stdio: 'inherit', cwd: path.join(__dirname, '..') });
}

export async function ensurePageContentSeeded(): Promise<{ seeded: boolean; message: string }> {
  const speakingCount = await db.speakingPageSection.count();
  if (speakingCount > 0) {
    return { seeded: false, message: 'Page content already exists' };
  }

  console.log('📦 CMS tables empty — seeding default page content...');

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

export async function forceSeedPageContent(): Promise<{ message: string }> {
  for (const script of PAGE_SEED_SCRIPTS) {
    runScript(script);
  }
  await seedInitiatives();
  await seedTestimonials();
  await seedLegalPages();
  return { message: 'Page content re-seeded (existing sections updated via upsert)' };
}
