"use client";

import { useMobileNav } from "@/components/contexts/MobileNavContext"

type MobileNavWrapperType = React.PropsWithChildren & {
    navOptions?: React.ReactNode;
}

export default function MobileNavWrapper({ children, navOptions }: MobileNavWrapperType) {
    const { open } = useMobileNav();

    return (
        <div className="flex-1 relative min-h-0">
            {open && (
                <div className="absolute inset-0 bg-black/25 backdrop-blur-sm z-10">
                    <nav className="bg-white shadow-[0_4px_6px_-1px_#00000022] flex flex-col gap-2 p-8 pt-0">
                        {navOptions}
                    </nav>
                </div>
            )}
            <div className={`h-full ${open ? "overflow-y-hidden" : "overflow-y-auto"}`}>
                {children}
            </div>
        </div>
    )
}
