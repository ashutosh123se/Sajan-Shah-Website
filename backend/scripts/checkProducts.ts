const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  const products = await p.product.findMany({ select: { id: true, name: true, slug: true } });
  console.log('Products in database:');
  console.log(JSON.stringify(products, null, 2));
  console.log(`Total: ${products.length}`);
}

main().catch(console.error).finally(() => p.$disconnect());
