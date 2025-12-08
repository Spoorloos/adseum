import { type NextRequest, NextResponse } from "next/server";
import { createAccessToken, decodeAccessToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sha256 } from "@/lib/utils";

export async function proxy(request: NextRequest) {
    const response = NextResponse.next();
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    if (refreshToken && decodeAccessToken(accessToken)) {
        const session = await prisma.session.findUnique({
            where: {
                token: sha256(refreshToken),
            },
            select: {
                userId: true,
                createdAt: true,
            }
        });

        if (session !== null && Date.now() - session.createdAt.getTime() < 1 * 1000 * 60 * 60 * 24 * 7) {
            const newAccessToken = createAccessToken(session.userId);

            response.cookies.set("accessToken", newAccessToken, {
                secure: process.env.NODE_ENV === "production",
                httpOnly: true,
                maxAge: 1 * 60 * 15,
                sameSite: "strict",
            });
        }
    }

    return response;
}

export const config = {
    matcher: ["/admin/:path*"],
};
