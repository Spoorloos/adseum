import CustomTable from "@/components/CustomTable";
import EditTranslationModal from "@/components/modals/EditTranslationModal";
import { getLocaleCode, getLocaleCodes, getTranslations } from "@/lib/localization"
import { prisma } from "@/lib/prisma";
import { TriangleAlert } from "lucide-react";

async function UpdateTranslationAction(_: string | undefined, formData: FormData) {
    "use server";

    const translationKey = formData.get("translationKey")?.toString();
    const language = formData.get("language")?.toString();
    const value = formData.get("value")?.toString();

    if (!translationKey || !language || !value) {
        return "Language or value missing";
    }

    await prisma.translation.upsert({
        where: {
            key_languageCode: {
                key: translationKey,
                languageCode: language
            }
        },
        create: {
            key: translationKey,
            languageCode: language,
            value: value,
        },
        update: {
            value
        }
    })

    return undefined;
}

type PageProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ searchParams }: PageProps) {
    const translations = await getTranslations(await getLocaleCode());
    const languageCodes = await getLocaleCodes();
    let translationKeys = await prisma.translationKey.findMany({
        select: {
            key: true,
            description: true,
            translations: {
                select: {
                    value: true,
                    language: {
                        select: {
                            code: true,
                            isDefault: true,
                        }
                    }
                }
            }
        }
    });
    const defaultLanguage = (await prisma.language.findFirst({
        where: {
            isDefault: true,
        },
        select: {
            code: true,
        }
    }))?.code;

    const query = (await searchParams).query?.toString().toLowerCase();
    if (query) {
        translationKeys = translationKeys.filter((key) => key.key.toLowerCase().includes(query));
    }

    return (
        <main className="p-4 space-y-4">
            <h1 className="text-3xl font-bold">{translations["admin.content.text"]}</h1>
            <form className="flex gap-2">
                <input
                    className="outline-none p-1 border border-zinc-200 hover:bg-zinc-100"
                    type="text"
                    name="query"
                    defaultValue={query ?? ""}
                    placeholder={translations["admin.content.searchPlaceholder"]}
                />
                <button
                    className="outline-none p-1 border border-zinc-200 hover:bg-zinc-100 cursor-pointer"
                    type="submit"
                >{translations["admin.content.searchButton"]}</button>
            </form>
            <CustomTable
                columns={[
                    { key: "key", name: translations["admin.content.key"] },
                    { key: "description", name: translations["admin.content.description"] },
                    { key: "default", name: translations["admin.content.default"] },
                    { key: "controls", name: "" },
                ]}
                rows={
                    translationKeys.map((key) => ({
                        key: (
                            <div className="flex items-center gap-2">
                                <span>{key.key}</span>
                                {!Object.keys(languageCodes).every((v) => key.translations.some((x) => x.language.code === v)) && (
                                    <TriangleAlert className="text-red-500 size-4"/>
                                )}
                            </div>
                        ),
                        description: key.description,
                        default: (
                            <p className="line-clamp-3 max-w-sm">{key.translations.find((v) => v.language.isDefault)?.value}</p>
                        ),
                        controls: (
                            <div className="flex gap-2">
                                <EditTranslationModal
                                    translationKey={key.key}
                                    defaultLanguage={defaultLanguage ?? "en"}
                                    languageCodes={languageCodes}
                                    translations={
                                        Object.fromEntries(
                                            key.translations.map((v) => [ v.language.code, v.value ])
                                        )
                                    }
                                    action={UpdateTranslationAction}
                                />
                            </div>
                        )
                    }))
                }
            />
        </main>
    )
}
