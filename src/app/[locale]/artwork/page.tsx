import { getLocaleCode, getTranslations } from "@/lib/localization"

export default async function ArtworkPage() {
    const translations = await getTranslations(await getLocaleCode());

    return (
        <main className="h-full p-8">
            <h1 className="text-5xl font-semibold tracking-widest uppercase">{translations["artwork.heading"]}</h1>
        </main>
    )
}
