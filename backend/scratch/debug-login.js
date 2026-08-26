require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

async function main() {
  try {
    const email = 'bhavik142490@gmail.com';
    const password = 'bhavik@123';
    const user = await prisma.user.findUnique({ where: { email } });
    console.log('step=find', !!user);
    const valid = await bcrypt.compare(password, user.passwordHash);
    console.log('step=bcrypt', valid);
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );
    console.log('step=jwt', !!accessToken, 'len=' + accessToken.length);
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );
    console.log('step=refresh', !!refreshToken);
    console.log('OK');
  } catch (e) {
    console.error('FAIL', e && e.message ? e.message : e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
