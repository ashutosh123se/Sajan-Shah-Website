/**
 * One-time migration: Add videoUrl and imageUrl fields to the existing
 * 'philosophy' contributions page section so they appear in the CMS admin.
 *
 * Run with:  npx ts-node --transpile-only scripts/addPhilosophyVideoField.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const section = await prisma.contributionsPageSection.findFirst({
    where: { key: 'philosophy' },
  });

  if (!section) {
    console.log('⚠️  No "philosophy" section found — nothing to patch.');
    return;
  }

  const content: any =
    typeof section.content === 'string'
      ? JSON.parse(section.content)
      : section.content ?? {};

  // Only add fields if they don't already exist
  let changed = false;
  if (!('videoUrl' in content)) {
    content.videoUrl = '';
    changed = true;
  }
  if (!('imageUrl' in content)) {
    content.imageUrl = '/CONTRIBUTIONS SIR.jpeg';
    changed = true;
  }

  if (!changed) {
    console.log('✅  Fields already present — no update needed.');
    return;
  }

  await prisma.contributionsPageSection.update({
    where: { id: section.id },
    data: { content },
  });

  console.log('✅  Added videoUrl and imageUrl fields to philosophy section.');
}

main()
  .catch((e) => {
    console.error('❌  Migration failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
