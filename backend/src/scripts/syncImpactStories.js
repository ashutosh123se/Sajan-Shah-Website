/**
 * Sync Impact Stories (+ optional gallery) to frontend defaults when incomplete.
 * - Creates stories section if missing
 * - Replaces stories that lack bodyHtml (old seed stubs)
 * - Never overwrites stories that already have bodyHtml (admin-edited)
 *
 * Run: node backend/scratch/syncImpactStories.js
 *  or: node src/scripts/syncImpactStories.js (from backend/)
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const { PrismaClient } = require('@prisma/client');
const { DEFAULT_IMPACT_STORIES, DEFAULT_GALLERY_PHOTOS } = require('../utils/impactStoryDefaults');

const prisma = new PrismaClient();

function needsStoryUpgrade(content) {
  const stories = content?.stories;
  if (!Array.isArray(stories) || stories.length === 0) return true;
  return stories.some((s) => !s?.bodyHtml || String(s.bodyHtml).trim().length < 40);
}

async function main() {
  console.log('🔄 Syncing Impact Stories CMS to frontend defaults...');

  const existing = await prisma.contributionsPageSection.findUnique({ where: { key: 'stories' } });

  if (!existing) {
    await prisma.contributionsPageSection.create({
      data: {
        key: 'stories',
        title: '📚 Impact Case Stories',
        order: 4,
        isActive: true,
        content: DEFAULT_IMPACT_STORIES,
      },
    });
    console.log('  ✅ Created stories section with defaults');
  } else if (needsStoryUpgrade(existing.content)) {
    await prisma.contributionsPageSection.update({
      where: { key: 'stories' },
      data: {
        content: DEFAULT_IMPACT_STORIES,
        title: existing.title || '📚 Impact Case Stories',
        isActive: true,
      },
    });
    console.log('  ✅ Upgraded stories section (missing bodyHtml → frontend defaults)');
  } else {
    console.log('  ⏭️ Stories already have full bodyHtml — left untouched');
  }

  const gallery = await prisma.contributionsPageSection.findUnique({ where: { key: 'gallery' } });
  const photos = gallery?.content?.photos;
  const hasExternal =
    Array.isArray(photos) &&
    photos.some((p) => String(p.imageUrl || p.img || '').includes('unsplash'));
  const tooFew = !Array.isArray(photos) || photos.length < 12;

  if (!gallery) {
    await prisma.contributionsPageSection.create({
      data: {
        key: 'gallery',
        title: '🖼️ Visual Proof Marquee Gallery',
        order: 10,
        isActive: true,
        content: {
          heading: 'Impact in Action',
          subHeading: 'Gallery Archive',
          paragraph: 'Capturing the raw essence of transformation on the field.',
          photos: DEFAULT_GALLERY_PHOTOS,
        },
      },
    });
    console.log('  ✅ Created gallery section with defaults');
  } else if (hasExternal || tooFew) {
    const content = typeof gallery.content === 'object' && gallery.content ? { ...gallery.content } : {};
    await prisma.contributionsPageSection.update({
      where: { key: 'gallery' },
      data: {
        content: {
          heading: content.heading || 'Impact in Action',
          subHeading: content.subHeading || 'Gallery Archive',
          paragraph: content.paragraph || 'Capturing the raw essence of transformation on the field.',
          photos: DEFAULT_GALLERY_PHOTOS,
        },
      },
    });
    console.log('  ✅ Gallery photos synced to local Social Work defaults');
  } else {
    console.log('  ⏭️ Gallery already looks good — left untouched');
  }

  console.log('✨ Done');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
