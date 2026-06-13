import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
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

  console.log('✅ Database seeded successfully');
}
main().catch(console.error).finally(() => prisma.$disconnect());
