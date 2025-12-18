"use client";

import { useState, useActionState, type FormEvent } from "react";
import { LoaderCircle } from "lucide-react";
import { useTranslations } from "../TranslationProvider";
import Modal from "@/components/modals/Modal";

type CreateUserModalProps = {
    action: (state: string | undefined, formData: FormData) => Promise<string | undefined>;
}

export default function CreateUserModal({ action }: CreateUserModalProps) {
    const { translations } = useTranslations();

    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState<string>();
    const [confirmEmail, setConfirmEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();

    const emailEqual = !confirmEmail || confirmEmail === email;
    const passwordEqual = !confirmPassword || confirmPassword === password;

    const [error, formAction, isPending] = useActionState(action, undefined);

    const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        formAction(formData);
    }

    return (
        <>
            <button
                className="p-1 border border-zinc-200 hover:bg-zinc-100 cursor-pointer"
                onClick={() => setOpen(x => !x)}
            >
                {translations.admin.users.createUser.button}
            </button>

            <Modal
                open={open}
                setOpen={setOpen}
                header={translations.admin.users.createUser.title}
                body={(
                    <form className="contents" onSubmit={onFormSubmit}>
                        <div>
                            <label htmlFor="email-field">{translations.admin.users.createUser.email}</label>
                            <input className="outline-none border border-zinc-200 block w-full" type="email" id="email-field" name="email" onChange={(x) => setEmail(x.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="confirm-email-field">{translations.admin.users.createUser.confirmEmail}</label>
                            <input className={`outline-none block w-full ${emailEqual ? "border border-zinc-200 " : "border-2 border-red-500"}`} type="email" id="confirm-email-field" onChange={(x) => setConfirmEmail(x.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password-field">{translations.admin.users.createUser.password}</label>
                            <input className="outline-none border border-zinc-200 block w-full" type="password" id="password-field" name="password" onChange={(x) => setPassword(x.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="confirm-password-field">{translations.admin.users.createUser.confirmPassword}</label>
                            <input className={`outline-none block w-full ${passwordEqual ? "border border-zinc-200" : "border-2 border-red-500"}`} type="password" id="confirm-password-field" onChange={(x) => setConfirmPassword(x.target.value)} />
                        </div>
                        <button
                            className="self-end p-1 inline-flex gap-1 items-center border border-zinc-200 hover:bg-zinc-100 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={!emailEqual || !passwordEqual}
                            type="submit"
                        >
                            {isPending && <LoaderCircle className="animate-spin size-4"/>}
                            {translations.admin.users.createUser.action}
                        </button>
                        {error !== undefined && (
                            <strong className="text-red-500 font-bold">{error}</strong>
                        )}
                    </form>
                )}
            />
        </>
    )
}
