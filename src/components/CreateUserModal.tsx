"use client";

import { useState, useActionState, type FormEvent } from "react";
import { X, LoaderCircle } from "lucide-react";

type CreateUserModalProps = {
    action: (state: string | undefined, formData: FormData) => Promise<string | undefined>;
}

export default function CreateUserModal({ action }: CreateUserModalProps) {
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
                Create user
            </button>

            {open && (
                <section className="fixed top-1/2 left-1/2 -translate-1/2 border border-zinc-200 p-4 bg-white shadow-xs flex flex-col gap-2 w-full max-w-sm">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Create new user</h2>
                        <button className="cursor-pointer" onClick={() => setOpen(false)}>
                            <X className="size-8"/>
                        </button>
                    </div>
                    <form className="contents" onSubmit={onFormSubmit}>
                        <div>
                            <label htmlFor="email-field">Email</label>
                            <input className="outline-none border border-zinc-200 block w-full" type="email" id="email-field" name="email" onChange={(x) => setEmail(x.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="confirm-email-field">Confirm email</label>
                            <input className={`outline-none block w-full ${emailEqual ? "border border-zinc-200 " : "border-2 border-red-500"}`} type="email" id="confirm-email-field" onChange={(x) => setConfirmEmail(x.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password-field">Password</label>
                            <input className="outline-none border border-zinc-200 block w-full" type="password" id="password-field" name="password" onChange={(x) => setPassword(x.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="confirm-password-field">Confirm password</label>
                            <input className={`outline-none block w-full ${passwordEqual ? "border border-zinc-200" : "border-2 border-red-500"}`} type="password" id="confirm-password-field" onChange={(x) => setConfirmPassword(x.target.value)} />
                        </div>
                        <button
                            className="self-end p-1 inline-flex gap-1 items-center border border-zinc-200 hover:bg-zinc-100 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={!emailEqual || !passwordEqual}
                            type="submit"
                        >
                            {isPending && <LoaderCircle className="animate-spin size-4"/>}
                            Log in
                        </button>
                        {error !== undefined && (
                            <strong className="text-red-500 font-bold">{error}</strong>
                        )}
                    </form>
                </section>
            )}
        </>
    )
}
