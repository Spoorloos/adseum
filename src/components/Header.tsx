import Link from "next/link";
import Image from "next/image";
import logoImg from "@/assets/logo.svg";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { getUser } from "@/lib/auth";
import { getLocaleCodes } from "@/lib/localization";
import HeaderLink from "@/components/HeaderLink";
import MobileNavButton from "@/components/MobileNavButton";

export default async function Header() {
    const user = await getUser();
    const locales = await getLocaleCodes();

    return (
        <header className="flex justify-between items-center p-4 bg-white">
            <Link href="/">
                <Image
                    className="h-12 w-auto transition-opacity"
                    src={logoImg}
                    alt="Logo"
                    id="header-logo-image"
                />
            </Link>
            <nav className="flex items-center gap-2 not-md:hidden">
                <HeaderLink href="/artwork">Artwork</HeaderLink>
                {user !== null && <HeaderLink href="/admin">Admin</HeaderLink>}
                <LocaleSwitcher locales={locales} />
                <HeaderLink variant="secondary" href="/">Shop</HeaderLink>
                <HeaderLink variant="primary" href="/">Contact</HeaderLink>
            </nav>
            <MobileNavButton className="md:hidden"/>
        </header>
    )
}
