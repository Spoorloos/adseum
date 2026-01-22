"use client";

import { createContext, useContext, useState } from "react";

type MobileNavContext = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const mobileNavContext = createContext<MobileNavContext | undefined>(undefined);

export function useMobileNav() {
    return useContext(mobileNavContext)!;
}

export function MobileNavProvider({ children }: React.PropsWithChildren) {
    const [open, setOpen] = useState(false);

    return (
        <mobileNavContext.Provider value={{ open, setOpen }}>
            {children}
        </mobileNavContext.Provider>
    )
}
