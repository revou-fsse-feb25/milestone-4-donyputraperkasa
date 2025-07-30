import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed untuk admin
    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
        email: 'admin@example.com',
        name: 'Admin',
        role: Role.ADMIN,
        password: 'admin123', // ini nanti di hash
        },
    });

    // Seed untuk user
    const account = await prisma.account.upsert({
        where: { id: 1 },
        update: {},
        create: {
        name: 'Main Admin Account',
        balance: 1000000,
        userId: admin.id,
        },
    });

    // Seed untuk transaksi awal
    await prisma.transaction.create({
        data: {
        accountsId: account.id,
        Type: 'DEPOSIT',
        description: 'Initial deposit of 1,000,000',
        },
    });

    console.log('✅ Seeding done!');
    }

    main()
    .catch((e) => {
        console.error('❌ Seeding error:', e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());