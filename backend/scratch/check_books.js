const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const books = await prisma.product.findMany({
    where: { category: 'book' }
  });
  console.log('Books in DB:', JSON.stringify(books, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
