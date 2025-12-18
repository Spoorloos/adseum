"use client";

import { useActionState } from "react";
import { LoaderCircle } from "lucide-react";
import { useTranslations } from "@/components/TranslationProvider";

type LoginForm = {
    action: (state: string | undefined, formData: FormData) => Promise<string | undefined>,
}

export default function LoginForm({ action }: LoginForm) {
    const [ error, formAction, isPending ] = useActionState(action, undefined);
    const { translations } = useTranslations();

    return (
        <>
            <h1 className="text-3xl font-bold mb-4">{translations.admin.logIn.heading}</h1>
            <form className="space-y-4" action={formAction}>
                <div>
                    <label className="text-xl" htmlFor="email-field">{translations.admin.logIn.email}</label>
                    <input className="block border border-zinc-200 w-full" type="email" id="email-field" name="email" required/>
                </div>
                <div>
                    <label className="text-xl" htmlFor="password-field">{translations.admin.logIn.password}</label>
                    <input className="block border border-zinc-200 w-full" type="password" id="password-field" name="password" required/>
                </div>
                <div className="text-end">
                    <button className="p-1 inline-flex gap-1 items-center bg-zinc-300 hover:bg-zinc-400 cursor-pointer" type="submit">
                        {isPending && <LoaderCircle className="animate-spin size-4"/>}
                        {translations.admin.logIn.action}
                    </button>
                </div>
                {error !== undefined && (
                    <strong className="text-red-500 font-bold">{error}</strong>
                )}
            </form>
        </>
    )
}
