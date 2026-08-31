const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function main() {
  const section = await db.speakingPageSection.findUnique({
    where: { key: 'hero' }
  });
  
  if (section) {
    const updatedContent = {
      ...section.content,
      videoUrl: section.content.videoUrl || ''
    };
    
    await db.speakingPageSection.update({
      where: { key: 'hero' },
      data: { content: updatedContent }
    });
    
    console.log("Successfully added videoUrl to Speaking hero section!");
  }
}

main().catch(console.error).finally(() => db.$disconnect());
