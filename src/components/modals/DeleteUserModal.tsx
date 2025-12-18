"use client";

import { Trash } from "lucide-react";
import { useState } from "react";
import Modal from "@/components/modals/Modal";

type DeleteUserModalProps = {
    action: () => void;
}

export default function DeleteUserModal({ action }: DeleteUserModalProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                className="block cursor-pointer text-red-500 hover:text-red-500/50"
                aria-label="Delete user"
                onClick={() => setOpen(x => !x)}
            >
                <Trash className="size-6"/>
            </button>

            <Modal
                open={open}
                setOpen={setOpen}
                header="Are you sure?"
                body={(
                    <form className="flex justify-end gap-2" action={action} onSubmit={() => setOpen(false)}>
                        <button
                            type="button"
                            className="p-1 border border-zinc-200 hover:bg-zinc-100 cursor-pointer"
                            onClick={() => setOpen(false)}
                        >No</button>

                        <button
                            type="submit"
                            className="p-1 border border-zinc-200 hover:bg-zinc-100 cursor-pointer text-red-500 font-bold"
                        >Yes</button>
                    </form>
                )}
            />
        </>
    )
}
