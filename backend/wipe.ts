import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function clean() {
  await prisma.program.deleteMany();
  await prisma.initiative.deleteMany();
  await prisma.event.deleteMany();
  await prisma.product.deleteMany();
  await (prisma as any).popupBanner.deleteMany();
  console.log('Database wiped');
}

clean().catch(console.error).finally(() => prisma.$disconnect());
