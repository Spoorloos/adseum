import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function queryLanguage(...codes: (string | undefined)[]) {
    for (const code of codes) {
        if (code === undefined) continue;

        const lang = await prisma.language.findUnique({
            where: { code }
        });

        if (lang) {
            return lang;
        }
    }

    return (await prisma.language.findFirst({
        where: { isDefault: true }
    }))!;
}

export async function getLocaleCode() {
    const localeCode = (await cookies()).get("locale")?.value;
    const language = await queryLanguage(localeCode);

    return language.code;
}

export async function getTranslations(localeCode?: string) {
    localeCode ??= await getLocaleCode();

    const translations = await prisma.translation.findMany({
        where: {
            languageCode: localeCode,
        },
        select: {
            key: true,
            value: true,
        }
    });

    return Object.fromEntries(
        translations.map(translation => [ translation.key, translation.value ])
    );
}

export async function getLocaleCodes() {
    const languages = await prisma.language.findMany({
        select: {
            code: true,
            name: true,
        }
    });

    return Object.fromEntries(
        languages.map(lang => [lang.code, lang.name])
    );
}
