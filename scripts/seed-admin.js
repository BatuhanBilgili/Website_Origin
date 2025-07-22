const { PrismaClient } = require('../app/generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Admin kullanıcısı oluştur
  const hashedPassword = await bcrypt.hash('HjsUY89', 10);
  
  const admin = await prisma.admin.upsert({
    where: { username: 'batu' },
    update: {},
    create: {
      username: 'batu',
      password: hashedPassword,
    },
  });

  console.log('Admin kullanıcısı oluşturuldu:', admin.username);
  console.log('Kullanıcı adı: batu');
  console.log('Şifre: HjsUY89');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 