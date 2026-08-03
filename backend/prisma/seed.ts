import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { books, courses, merchandise } from './productsData';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'ashutoshshekhar37@gmail.com' }, update: {},
    create: { name: 'Super Admin', email: 'ashutoshshekhar37@gmail.com', passwordHash: await bcrypt.hash('ashutosh@1234sa', 12), role: 'ADMIN' }
  });

  await prisma.user.upsert({
    where: { email: 'bhavik142490@gmail.com' }, update: {},
    create: { name: 'Bhavik Admin', email: 'bhavik142490@gmail.com', passwordHash: await bcrypt.hash('bhavik@123', 12), role: 'ADMIN' }
  });

  // Seed Products
  const allProducts = [...books, ...courses, ...merchandise];
  for (const product of allProducts) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        ...product,
        slug: product.slug || product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      } as any
    });
  }

  process.stdout.write('✅ Database seeded successfully\\n');
}
main().catch((err) => { process.stderr.write(err.toString()); }).finally(() => prisma.$disconnect());
