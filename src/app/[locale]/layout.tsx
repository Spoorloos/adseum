import "./globals.css";
import { type Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TranslationProvider } from "@/components/contexts/TranslationContext";
import { MobileNavProvider } from "@/components/contexts/MobileNavContext";
import { getLocaleCodes, getLocaleCode, getTranslations } from "@/lib/localization";
import MobileNavWrapper from "@/components/MobileNavWrapper";
import HeaderLink from "@/components/HeaderLink";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { getUser } from "@/lib/auth";

export const metadata: Metadata = {
    title: "Adseum",
    description: "Hello world", // @TODO
};

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export default async function RootLayout({ children }: React.PropsWithChildren) {
    const localeCode = await getLocaleCode();
    const localeCodes = await getLocaleCodes();
    const translations = await getTranslations(localeCode);
    const user = await getUser();

    return (
        <html lang={localeCode}>
            <TranslationProvider localeCode={localeCode} translations={translations}>
                <MobileNavProvider>
                    <body className={`h-screen flex flex-col font-inter ${inter.variable}`}>
                        <Header />
                        <MobileNavWrapper navOptions={
                            <>
                                <HeaderLink href="#">Artwork</HeaderLink>
                                {user !== null && <HeaderLink href="/admin">Admin</HeaderLink>}
                                <LocaleSwitcher locales={localeCodes} />
                                <HeaderLink variant="secondary" href="/">Shop</HeaderLink>
                                <HeaderLink variant="primary" href="/">Contact</HeaderLink>
                            </>
                        }>
                            {children}
                            <Footer/>
                        </MobileNavWrapper>
                    </body>
                </MobileNavProvider>
            </TranslationProvider>
        </html>
    );
}
