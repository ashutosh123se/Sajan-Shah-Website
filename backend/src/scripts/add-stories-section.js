const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.homePageSection.findUnique({
    where: { key: 'transformation_stories' }
  });

  if (!existing) {
    await prisma.homePageSection.create({
      data: {
        key: 'transformation_stories',
        title: 'Blessed by Global Leaders Section',
        order: 9, // Put it at the end or appropriate order
        content: {
          heading: 'Blessed by Global Leaders',
          images: [
            '/Stories of Transformation/1.jpeg',
            '/Stories of Transformation/2.jpeg',
            '/Stories of Transformation/3.jpeg',
            '/Stories of Transformation/4.jpeg',
            '/Stories of Transformation/5.jpeg',
            '/Stories of Transformation/6.jpeg',
            '/Stories of Transformation/7.jpeg',
            '/Stories of Transformation/8.jpeg',
            '/Stories of Transformation/9.jpeg',
            '/Stories of Transformation/10.jpeg',
            '/Stories of Transformation/11.jpeg',
            '/Stories of Transformation/12.jpeg',
            '/Stories of Transformation/13.jpeg',
            '/Stories of Transformation/14.jpeg',
            '/Stories of Transformation/15.jpeg',
            '/Stories of Transformation/16.jpeg',
            '/Stories of Transformation/17.jpeg',
            '/Stories of Transformation/19.jpeg',
            '/Stories of Transformation/20.jpeg',
            '/Stories of Transformation/21.jpeg',
            '/Stories of Transformation/22.jpeg',
            '/Stories of Transformation/23.jpeg',
            '/Stories of Transformation/24.jpeg',
            '/Stories of Transformation/25.jpeg'
          ]
        }
      }
    });
    console.log("Successfully added transformation_stories to DB!");
  } else {
    console.log("transformation_stories already exists in DB.");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
