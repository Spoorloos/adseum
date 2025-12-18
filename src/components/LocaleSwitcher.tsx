"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "@/components/TranslationProvider";
import { usePathname } from "next/navigation";
import Link from "next/link";

type LocaleSwitcherProps = {
    locales: Record<string, string>;
}

export default function LocaleSwitcher({ locales }: LocaleSwitcherProps) {
    const { localeCode, translations } = useTranslations();
    const pathName = usePathname().replace(`/${localeCode}`, "");

    return (
        <div className="relative group">
            <button className="bg-red-500 p-2 flex gap-1 items-center cursor-pointer">
                {translations.name}
                <ChevronDown/>
            </button>

            <ul className="scale-y-0 group-hover:scale-y-100 transition-transform origin-top absolute top-full right-0 min-w-full max-h-32 overflow-y-auto">
                {Object.entries(locales).map(([ code, name ]) => (
                    <li key={code}>
                        <Link className="block p-1 bg-blue-500 hover:bg-blue-600" href={`/${code}${pathName}`}>
                            {name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
