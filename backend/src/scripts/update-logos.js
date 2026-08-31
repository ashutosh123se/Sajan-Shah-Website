const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function main() {
  const section = await db.speakingPageSection.findUnique({
    where: { key: 'logos' }
  });
  
  if (section) {
    const updatedContent = {
      ...section.content,
      logos: [
        { name: "TATA CHEMICALS LIMITED" },
        { name: "TEDx" },
        { name: "Parliament of the World's Religions" },
        { name: "Khushi Ambient Media Solutions" },
        { name: "Zydus Hospitals" }
      ]
    };
    
    await db.speakingPageSection.update({
      where: { key: 'logos' },
      data: { content: updatedContent }
    });
    
    console.log("Successfully updated logos in DB!");
  } else {
    console.log("Section 'logos' not found.");
  }
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
