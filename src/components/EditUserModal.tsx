"use client";

import { SquarePen, X } from "lucide-react";
import { useState } from "react";

type EditUserModalProps = {
    email: string;
}

export default function EditUserModal({ email }: EditUserModalProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                className="block cursor-pointer text-black hover:text-black/50"
                aria-label="Edit user"
                onClick={() => setOpen(x => !x)}
            >
                <SquarePen className="size-6"/>
            </button>

            {open && (
                <section className="fixed top-1/2 left-1/2 -translate-1/2 border border-zinc-200 p-4 bg-white shadow-xs flex flex-col gap-2 w-full max-w-sm">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Edit user</h2>
                        <button className="cursor-pointer" onClick={() => setOpen(false)}>
                            <X className="size-8"/>
                        </button>
                    </div>
                </section>
            )}
        </>
    )
}
