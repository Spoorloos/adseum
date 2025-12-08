import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/../generated/prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient({
    adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL
    }),
});

async function main() {
    const user = await prisma.user.upsert({
        where: {
            email: "mick.negenman@icloud.com",
        },
        update: {},
        create: {
            email: "mick.negenman@icloud.com",
            password: await bcrypt.hash("Mick0100", 12),
        },
    })
}

main()
    .catch((err) => {
        console.log(err)
    })
    .finally(async () => {
        await prisma.$disconnect();
    })
