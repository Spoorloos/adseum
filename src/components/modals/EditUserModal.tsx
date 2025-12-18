"use client";

import { SquarePen } from "lucide-react";
import { useState } from "react";
import Modal from "@/components/modals/Modal";

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

            <Modal
                open={open}
                setOpen={setOpen}
                header="Edit user"
                body={(
                    <form>

                    </form>
                )}
            />
        </>
    )
}
