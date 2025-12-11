"use client";

import { Translation } from "@/translations/translation";
import { createContext, useContext } from "react";

type TranslationContext = {
    localeCode: string;
    translations: Translation;
};

const translationContext = createContext<TranslationContext | undefined>(undefined);

export function useTranslations() {
    return useContext(translationContext)!;
}

type TranslationProviderProps = React.PropsWithChildren & {
    localeCode: string;
    translations: Translation;
};

export default function TranslationProvider({ localeCode, translations, children }: TranslationProviderProps) {
    return (
        <translationContext.Provider value={{ localeCode, translations }}>
            {children}
        </translationContext.Provider>
    )
}
