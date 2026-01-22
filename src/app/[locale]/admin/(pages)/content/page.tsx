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

export default async function Page() {
    const translations = await getTranslations(await getLocaleCode());
    const languageCodes = await getLocaleCodes();
    const translationKeys = await prisma.translationKey.findMany({
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

    return (
        <main className="p-4 space-y-4">
            <h1 className="text-3xl font-bold">{translations["admin.content.text"]}</h1>
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
                        default: key.translations.find((v) => v.language.isDefault)?.value,
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
