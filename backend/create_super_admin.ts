import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'Sajan@sajan.com';
  const plainPassword = 'Sajan@1234sa';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    const user = await prisma.user.update({
      where: { email },
      data: {
        passwordHash: hashedPassword,
        role: 'ADMIN',
        isActive: true
      }
    });
    console.log('Updated existing user to Super Admin:', user.email);
  } else {
    const user = await prisma.user.create({
      data: {
        name: 'Sajan',
        email,
        passwordHash: hashedPassword,
        role: 'ADMIN',
        isActive: true
      }
    });
    console.log('Created new Super Admin user:', user.email);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
