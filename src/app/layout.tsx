import "@/app/globals.css";
import { type Metadata } from "next";
import Header from "@/components/Header";
import TranslationProvider from "@/components/TranslationProvider";
import { getLocaleCode, getTranslations } from "@/lib/localization";

export const metadata: Metadata = {
    title: "Adseum",
    description: "",
};

export default async function RootLayout({ children }: React.PropsWithChildren) {
    const localeCode = await getLocaleCode();
    const translations = await getTranslations(localeCode);

    return (
        <html lang={localeCode}>
            <TranslationProvider localeCode={localeCode} translations={translations}>
                <body className="h-screen flex flex-col">
                    <Header/>
                    <div className="grow overflow-y-auto">
                        {children}
                    </div>
                </body>
            </TranslationProvider>
        </html>
    );
}
