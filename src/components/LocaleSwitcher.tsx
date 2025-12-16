"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTranslations } from "./TranslationProvider";
import Link from "next/link";

const stripLocaleRegex = /^\/[^\/]+/;

export default function LocaleSwitcher({ localeCodes }: { localeCodes: string[] }) {
    const { localeCode } = useTranslations();
    const [open, setOpen] = useState(false);
    const pathName = usePathname().replace(stripLocaleRegex, "");

    return (
        <div className="relative">
            <button
                className="bg-red-500 p-2 flex gap-1 items-center cursor-pointer uppercase"
                onClick={() => setOpen(x => !x)}
            >
                {localeCode}
                <ChevronDown/>
            </button>
            {open && (
                <ul className="absolute top-full left-0 w-full max-h-32 overflow-y-auto">
                    {localeCodes.map((code) => (
                        <li key={code}>
                            <Link className="block p-1 uppercase bg-blue-500 hover:bg-blue-600" href={`/${code}${pathName}`}>
                                {code}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
