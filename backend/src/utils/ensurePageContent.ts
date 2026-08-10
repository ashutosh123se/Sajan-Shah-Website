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

async function ensureDigitalEmpireSection() {
  const existing = await db.homePageSection.findUnique({ where: { key: 'digital_empire' } });
  if (existing) return;
  await db.homePageSection.create({
    data: {
      key: 'digital_empire',
      title: 'Digital Empire / Social Counts',
      order: 8,
      isActive: true,
      content: {
        sectionLabel: 'Follow The Journey',
        heading: 'Our Global',
        headingHighlight: 'Digital Empire',
        backgroundImage: '/Autographs sir.jpeg',
        platforms: [
          { platform: 'Instagram', handle: '@sajanshahofficial', stat: '166K', label: 'Followers', url: 'https://www.instagram.com/sajan_shahh/' },
          { platform: 'Twitter', handle: '@sajanshah', stat: '1.3K', label: 'Followers', url: 'https://x.com/sajanofficial' },
          { platform: 'Facebook', handle: 'Sajan Shah', stat: '21k', label: 'Followers', url: 'https://www.facebook.com/SajanShahPage' },
          { platform: 'LinkedIn', handle: 'Sajan Shah', stat: '5K', label: 'Followers', url: 'https://www.linkedin.com/in/sajan-shah-7840244a/' },
          { platform: 'YouTube', handle: 'Sajan Shah', stat: '98.9K', label: 'Subscribers', url: 'https://www.youtube.com/@SajanShah' },
        ],
      },
    },
  });
  console.log('  ✅ Created missing home:digital_empire');
}

/**
 * Boot-safe: repair corruption, fill missing initiative links, create missing digital_empire.
 * Full page seeds only when CMS is empty.
 */
export async function ensurePageContentSeeded(): Promise<{ seeded: boolean; message: string }> {
  await repairCorruptedCmsJson();
  await seedInitiatives();
  await seedLegalPages();
  await ensureDigitalEmpireSection();

  const speakingCount = await db.speakingPageSection.count();
  if (speakingCount > 0) {
    return { seeded: false, message: 'CMS repair + fill-missing completed' };
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
  await ensureDigitalEmpireSection();

  const aligned = await alignCmsToFrontendDefaults();

  return {
    message: `Filled missing CMS rows, then aligned designer images/links (${aligned.updated.join(', ') || 'none'})`,
    created: [...created, ...aligned.updated.map((k) => `align:${k}`)],
  };
}
