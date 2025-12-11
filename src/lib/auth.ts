import "server-only";
import { prisma } from "@/lib/prisma";
import { headers, cookies } from "next/headers";
import { randomUUID } from "crypto";
import { getPrismaErrorFields, sha256 } from "@/lib/utils";
import { Prisma } from "@/../generated/prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export type JwtPayload = { userId: string };

export const ACCESS_TOKEN_EXPIRE = 1 * 60 * 15; // 15 minutes
export const REFRESH_TOKEN_EXPIRE = 1 * 60 * 60 * 24 * 7; // 7 days

export function decodeAccessToken(accessToken: string | undefined) {
    if (accessToken === undefined) return null;

    try {
        return jwt.verify(accessToken, process.env.JWT_KEY!) as JwtPayload;
    } catch {
        return null;
    }
}

export async function isLoggedIn() {
    const cookie = await cookies();
    const accessToken = cookie.get("accessToken")?.value;

    return decodeAccessToken(accessToken) !== null;
}

export async function getUser() {
    const cookie = await cookies();
    const accessToken = cookie.get("accessToken")?.value;
    const jwtPayload = decodeAccessToken(accessToken);

    if (jwtPayload === null) return null;

    return await prisma.user.findUnique({
        where: {
            id: jwtPayload.userId,
        },
        omit: {
            password: true,
        },
    });
}

export function createAccessToken(userId: string) {
    return jwt.sign({ userId } satisfies JwtPayload, process.env.JWT_KEY!, {
        expiresIn: "15 minutes",
    });
}

export async function findUser(email: string, password: string) {
    const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true, password: true }
    });

    if (user === null) {
        throw new Error("User does not exist");
    }

    if (!(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid credentials");
    }

    return user.id;
}

export async function createUser(email: string, password: string) {
    const currentUser = await getUser();
    if (currentUser === null) {
        throw new Error("Not logged in");
    }

    try {
        const user = await prisma.user.create({
            data: {
                email,
                password: await bcrypt.hash(password, 12),
            },
            select: {
                id: true,
            },
        });

        return user.id;
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2002" && getPrismaErrorFields(err)?.includes("email")) {
                throw new Error("Email is already in use!");
            }
        }

        throw new Error("Couldn't create user because something went wrong");
    }
}

export async function createSession(userId: string) {
    const accessToken = createAccessToken(userId);
    const refreshToken = randomUUID();

    await prisma.session.create({
        data: {
            userId,
            userAgent: (await headers()).get("User-Agent"),
            token: sha256(refreshToken),
        }
    });

    return { accessToken, refreshToken };
}

export async function deleteUser(userId: string) {
    const currentUser = await getUser();
    if (currentUser === null) {
        throw new Error("Not logged in");
    }

    await prisma.session.deleteMany({
        where: { userId },
    });

    await prisma.user.delete({
        where: {
            id: userId,
        },
    });
}
