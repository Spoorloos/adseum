import { type NextRequest, NextResponse } from "next/server";
import { localeCodes, defaultLocale } from "@/lib/localization";
import { prisma } from "@/lib/prisma";
import { sha256 } from "@/lib/utils";
import {
    ACCESS_TOKEN_EXPIRE,
    REFRESH_TOKEN_EXPIRE,
    createAccessToken,
    decodeAccessToken
} from "@/lib/auth";

const localeRegex = new RegExp(`^\/(${localeCodes.join("|")})(\/.*)?$`);
const authRegex = new RegExp(`^\/(${localeCodes.join("|")})\/admin(\/.*)?$`);

async function localizationProxy(request: NextRequest) {
    const pathName = request.nextUrl.pathname;
    const matchResult = pathName.match(localeRegex);

    if (!matchResult) {
        // If the url does not match /[locale], redirect to /[locale]
        const localeCode = request.cookies.get("locale")?.value ?? defaultLocale;

        return NextResponse.redirect(
            new URL(`/${localeCode}${pathName}`, request.url)
        );
    }

    // Rewrite the url to strip the locale away
    const [, localeCode, path] = matchResult;
    const response = NextResponse.rewrite(
        new URL(path ?? "/", request.url)
    );

    // And save the locale in a cookie
    response.cookies.set("locale", localeCode);
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
    const pathName = request.nextUrl.pathname;

    if (authRegex.test(pathName)) {
        await authProxy(response, request);
    }

    return response;
}

export const config = {
    matcher: "/((?!api|_next/static|_next/image|.*\\.png|favicon.ico$).*)",
};
