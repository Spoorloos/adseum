import { getTranslations } from "@/lib/localization"

export default async function Page() {
    const translations = await getTranslations();

    return (
        <main className="p-4">
            <p>{translations.admin.page.text}</p>
        </main>
    )
}
