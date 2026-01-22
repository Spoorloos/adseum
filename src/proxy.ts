import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sha256 } from "@/lib/utils";
import {
    ACCESS_TOKEN_EXPIRE,
    REFRESH_TOKEN_EXPIRE,
    createAccessToken,
    decodeAccessToken
} from "@/lib/auth";
import { queryLanguage } from "./lib/localization";

const localeRegex = /^\/([^\/]+)(\/.*)?$/;

async function localizationProxy(request: NextRequest) {
    const pathName = request.nextUrl.pathname;
    const [, localeCode] = pathName.match(localeRegex) ?? [];

    const language = await queryLanguage(
        localeCode,
        request.cookies.get("locale")?.value
    );

    if (localeCode !== language.code) {
        return NextResponse.redirect(
            new URL(`/${language.code}${pathName ?? ""}`, request.url)
        );
    }

    const response = NextResponse.next();
    response.cookies.set("locale", language.code);
    return response;
}

async function authProxy(response: NextResponse, request: NextRequest) {
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    if (!refreshToken || decodeAccessToken(accessToken)) {
        return; // No refresh token or access token still valid
    }

    const session = await prisma.session.findUnique({
        where: {
            token: sha256(refreshToken),
        },
        select: {
            userId: true,
            createdAt: true,
        }
    });

    if (session === null) {
        return; // Session does not exist
    }

    const timePassed = Date.now() - session.createdAt.getTime();
    if (timePassed > REFRESH_TOKEN_EXPIRE * 1000) {
        return; // Session is expired
    }

    const newAccessToken = createAccessToken(session.userId);

    response.cookies.set("accessToken", newAccessToken, {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: ACCESS_TOKEN_EXPIRE,
        sameSite: "strict",
    });
}

export async function proxy(request: NextRequest) {
    const response = await localizationProxy(request);

    await authProxy(response, request);

    return response;
}

export const config = {
    matcher: "/((?!api|_next/static|_next/image|.*\\.png|favicon.ico).*)",
};
