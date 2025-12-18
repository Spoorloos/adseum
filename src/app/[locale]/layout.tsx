import "./globals.css";
import { type Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import TranslationProvider from "@/components/TranslationProvider";
import { getLocaleCode, getTranslations } from "@/lib/localization";

export const metadata: Metadata = {
    title: "Adseum",
    description: "",
};

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export default async function RootLayout({ children }: React.PropsWithChildren) {
    const localeCode = await getLocaleCode();
    const translations = await getTranslations(localeCode);

    return (
        <html lang={localeCode}>
            <TranslationProvider localeCode={localeCode} translations={translations}>
                <body className={`h-screen flex flex-col font-inter ${inter.variable}`}>
                    <Header/>
                    <div className="grow overflow-y-auto">
                        {children}
                    </div>
                </body>
            </TranslationProvider>
        </html>
    );
}
