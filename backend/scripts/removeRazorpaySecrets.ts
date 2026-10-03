import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();

async function main() {
  const deleted = await p.setting.deleteMany({
    where: {
      group: 'payment',
      key: {
        in: ['apiKey', 'apiSecret']
      }
    }
  });
  console.log(`Removed ${deleted.count} payment secrets from database.`);
}

main().catch(console.error).finally(() => p.$disconnect());
