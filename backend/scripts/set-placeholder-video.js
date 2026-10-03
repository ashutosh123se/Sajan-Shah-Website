const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  const section = await p.contributionsPageSection.findFirst({
    where: { key: 'philosophy' }
  });

  if (!section) return;

  const content = typeof section.content === 'string' ? JSON.parse(section.content) : section.content;
  content.videoUrl = '/sajan_intro.mp4';

  await p.contributionsPageSection.update({
    where: { id: section.id },
    data: { content }
  });
  
  console.log('Successfully set placeholder video in DB!');
}

main().catch(console.error).finally(() => p.$disconnect());
