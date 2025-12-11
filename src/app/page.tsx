import { getLocaleCode, getTranslations } from "@/lib/localization";

export default async function HomePage() {
    const localeCode = await getLocaleCode();
    const translations = await getTranslations();

    return (
        <main className="p-4">
            <p>Home page</p>
            <p>Locale code: {localeCode}</p>
            <p>Language name: {translations.name}</p>
        </main>
    );
}
