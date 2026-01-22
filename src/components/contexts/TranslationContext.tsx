"use client";

import { createContext, useContext } from "react";

type TranslationContext = {
    localeCode: string;
    translations: Record<string, string>;
};

const translationContext = createContext<TranslationContext | undefined>(undefined);

export function useTranslations() {
    return useContext(translationContext)!;
}

type TranslationProviderProps = React.PropsWithChildren & {
    localeCode: string;
    translations: Record<string, string>;
};

export function TranslationProvider({ localeCode, translations, children }: TranslationProviderProps) {
    return (
        <translationContext.Provider value={{ localeCode, translations }}>
            {children}
        </translationContext.Provider>
    )
}
