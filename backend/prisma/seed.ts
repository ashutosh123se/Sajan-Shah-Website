import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'ashutoshshekhar37@gmail.com' }, update: {},
    create: { name: 'Super Admin', email: 'ashutoshshekhar37@gmail.com', passwordHash: await bcrypt.hash('ashutosh@1234sa', 12), role: 'ADMIN' }
  });

}
main().finally(() => prisma.$disconnect());
