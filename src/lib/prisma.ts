import "server-only";

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/../generated/prisma/client";

const createPrisma = () => new PrismaClient({
    adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL
    }),
});

declare global {
    var _prisma: ReturnType<typeof createPrisma>;
}

export const prisma = globalThis._prisma ??= createPrisma();
