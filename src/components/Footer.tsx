import logoImg from "@/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Twitter, Youtube, Linkedin } from "lucide-react";
import { getLocaleCode, getTranslations } from "@/lib/localization";

export default async function Footer() {
    const translations = await getTranslations(await getLocaleCode());

    return (
        <footer className="flex-wrap gap-16 items-center bg-linear-to-br from-pink-600 to-pink-500 text-white p-8 flex justify-around">
            <Link href="/">
                <Image
                    className="h-18 w-auto"
                    src={logoImg}
                    alt="Logo"
                />
            </Link>
            <div className="space-y-4">
                <p className="text-xl uppercase tracking-widest font-semibold"> {translations["footer.getInContact"]}</p>
                <div className="flex gap-4 justify-center">
                    <Link href="#">
                        <Instagram className="cursor-pointer hover:scale-105 size-8 text-white/80 hover:text-white transition-all duration-100" />
                    </Link>
                    <Link href="#">
                        <Twitter className="cursor-pointer hover:scale-105 size-8 text-white/80 hover:text-white transition-all duration-100"/>
                    </Link>
                    <Link href="#">
                        <Youtube className="cursor-pointer hover:scale-105 size-8 text-white/80 hover:text-white transition-all duration-100" />
                    </Link>
                    <Link href="#">
                        <Linkedin className="cursor-pointer hover:scale-105 size-8 text-white/80 hover:text-white transition-all duration-100" />
                    </Link>
                </div>
            </div>
            <address className="tracking-widest">
                {translations["footer.visitUsAt"]}<br/>
                Box 564, Disneyland<br/>
                USA
           </address>
        </footer>
    );
}
