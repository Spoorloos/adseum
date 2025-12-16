import "server-only";
import { cookies } from "next/headers";
import { Translation } from "@/translations/translation";

export const localeCodes = ["en", "nl"] as const;
export const defaultLocale: Locale = "en";

type Locale = (typeof localeCodes)[number];

export function isValidLocale(data: string): data is Locale {
    return localeCodes.includes(data as any);
}

export async function getLocaleCode() {
    const locale = (await cookies()).get("locale")?.value;

    if (locale === undefined || !isValidLocale(locale)) {
        return defaultLocale;
    }

    return locale;
}

export async function getTranslations(locale?: Locale) {
    locale ??= await getLocaleCode();

    return (await import(`@/translations/${locale}.ts`)).default as Translation;
}
