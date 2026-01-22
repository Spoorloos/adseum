"use client";

import { LoaderCircle, SquarePen, TriangleAlert } from "lucide-react";
import { useActionState, useState } from "react";
import Modal from "@/components/modals/Modal";
import { useTranslations } from "../contexts/TranslationContext";

type EditTranslationModalProps = {
    translationKey: string;
    languageCodes: Record<string, string>;
    translations: Record<string, string>;
    defaultLanguage: string;
    action: (state: string | undefined, formData: FormData) => Promise<string | undefined>;
}

export default function EditTranslationModal({ translationKey, languageCodes, translations, defaultLanguage, action }: EditTranslationModalProps) {
    const [open, setOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState(defaultLanguage);
    const [currentValue, setCurrentValue] = useState(translations[selectedLang] ?? "");
    const [error, formAction, isPending] = useActionState(action, undefined);
    const { translations: pageTranslations } = useTranslations();

    return (
        <>
            <button
                className="block cursor-pointer text-black hover:text-black/50"
                aria-label="Edit translation"
                onClick={() => setOpen(x => !x)}
            >
                <SquarePen className="size-6"/>
            </button>

            <Modal
                open={open}
                setOpen={setOpen}
                header={pageTranslations["admin.content.editTranslation.heading"]}
                body={(
                    <form className="contents" action={formAction}>
                        <input name="translationKey" type="hidden" value={translationKey}/>
                        <div>
                            <label htmlFor="language-field">{pageTranslations["admin.content.editTranslation.language"]}</label>
                            <select
                                className="outline-none border border-zinc-200 block w-full"
                                name="language"
                                id="language-field"
                                onChange={(e) => {
                                    setSelectedLang(e.target.value);
                                    setCurrentValue(translations[e.target.value] ?? "");
                                }}
                                defaultValue={selectedLang}
                            >
                                {Object.entries(languageCodes).map(([code, name]) => (
                                    <option value={code} key={code}>
                                        {name}
                                        {!translations[code] && " (Missing)"}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="value-field">{pageTranslations["admin.content.editTranslation.value"]}</label>
                            <textarea
                                name="value"
                                id="value-field"
                                className="outline-none border border-zinc-200 block w-full"
                                value={currentValue}
                                onChange={(e) => setCurrentValue(e.target.value)}
                            ></textarea>
                        </div>
                        <button
                            className="self-end p-1 inline-flex gap-1 items-center border border-zinc-200 hover:bg-zinc-100 cursor-pointer"
                            type="submit"
                        >
                            {isPending && <LoaderCircle className="animate-spin size-4"/>}
                            {pageTranslations["admin.content.editTranslation.update"]}
                        </button>
                        {error !== undefined && (
                            <strong className="text-red-500 font-bold">{error}</strong>
                        )}
                    </form>
                )}
            />
        </>
    )
}
