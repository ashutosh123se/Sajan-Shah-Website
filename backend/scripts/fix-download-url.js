const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  const section = await p.contributionsPageSection.findFirst({
    where: { key: 'download' }
  });

  if (!section) return;

  const content = typeof section.content === 'string' ? JSON.parse(section.content) : section.content;
  if (content.reports && content.reports.length > 0) {
    if (content.reports[0].url === '#' || !content.reports[0].fileUrl) {
      content.reports[0].fileUrl = '/Live to Inspire.pdf';
      delete content.reports[0].url; // migrate to standard key
    }
  }

  await p.contributionsPageSection.update({
    where: { id: section.id },
    data: { content }
  });
  
  console.log('Successfully fixed download URL in DB!');
}

main().catch(console.error).finally(() => p.$disconnect());
