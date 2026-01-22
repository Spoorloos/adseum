"use client";

import { twMerge } from "tailwind-merge";
import { useMobileNav } from "@/components/contexts/MobileNavContext";

type MobileNavButtonProps = {
    className?: string;
};

export default function MobileNavButton({ className }: MobileNavButtonProps) {
    const { open, setOpen } = useMobileNav();

    return (
        <button
            onClick={() => setOpen(x => !x)}
            className={twMerge("w-7 h-6 relative cursor-pointer", className)}
        >
            <span className={`absolute left-0 w-full h-0.75 rounded-full bg-black transition-[top,translate,rotate] ${open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0 translate-y-0"}`}></span>
            <span className={`absolute left-0 w-full h-0.75 rounded-full bg-black top-1/2 -translate-y-1/2 transition-opacity ${open ? "opacity-0" : ""}`}></span>
            <span className={`absolute left-0 w-full h-0.75 rounded-full bg-black transition-[top,translate,rotate] ${open ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-full -translate-y-full"}`}></span>
        </button>
    )
}
