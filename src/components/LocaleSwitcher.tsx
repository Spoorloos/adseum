"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "@/components/contexts/TranslationContext";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

type LocaleSwitcherProps = {
    locales: Record<string, string>;
}

export default function LocaleSwitcher({ locales }: LocaleSwitcherProps) {
    const { localeCode } = useTranslations();
    const pathName = usePathname().replace(`/${localeCode}`, "");
    const [visible, setVisible] = useState(false);

    return (
        <div className="relative">
            <button
                className="peer px-2 flex items-center cursor-pointer uppercase duration-100 hover:decoration-current decoration-transparent underline transition-colors"
                onClick={() => setVisible(x => !x)}
            >
                {localeCode}
                <ChevronDown className={`transition-transform ${visible ? "rotate-180" : ""}`}/>
            </button>

            <ul className={`bg-white p-2 border border-stone-200 shadow rounded-lg min-w-full absolute right-0 top-full transition-all origin-top z-20 ${visible ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}`}>
                {Object.entries(locales).map(([ code, name ]) => (
                    <li key={code}>
                        <Link
                            className="block p-1 bg-white hover:bg-stone-100 transition-colors rounded-sm"
                            href={`/${code}${pathName}`}
                            onClick={() => setVisible(false)}
                            scroll={false}
                        >
                            {name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
