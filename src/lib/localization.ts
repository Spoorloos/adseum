import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { unstable_cache } from "next/cache";

export const queryLanguage = unstable_cache(async (...codes: (string | undefined)[]) => {
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
}, [], {
    revalidate: 1 * 60 * 60,
});

export async function getLocaleCode() {
    const localeCode = (await cookies()).get("locale")?.value;
    const language = await queryLanguage(localeCode);

    return language.code;
}

export const getTranslations = unstable_cache(async (localeCode: string) => {
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
        translations.map(translation => [translation.key, translation.value])
    );
}, [], {
    revalidate: 1 * 60 * 60,
});

export const getLocaleCodes = unstable_cache(async () => {
    const languages = await prisma.language.findMany({
        select: {
            code: true,
            name: true,
        }
    });

    return Object.fromEntries(
        languages.map(lang => [lang.code, lang.name])
    );
}, [], {
    revalidate: 1 * 60 * 60,
});
