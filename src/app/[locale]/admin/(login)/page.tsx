import LoginForm from "@/components/LoginForm";
import { z } from "zod";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
    ACCESS_TOKEN_EXPIRE,
    REFRESH_TOKEN_EXPIRE,
    createSession,
    findUser,
    isLoggedIn
} from "@/lib/auth";

const loginSchema = z.object({
    email: z.email().toLowerCase(),
    password: z.string(),
});

async function loginAction(_: string | undefined, formData: FormData) {
    "use server";

    const { success, data, error } = loginSchema.safeParse(
        Object.fromEntries(formData)
    );

    if (success) {
        try {
            const cookie = await cookies();
            const userId = await findUser(data.email, data.password);
            const session = await createSession(userId);

            cookie.set("accessToken", session.accessToken, {
                secure: process.env.NODE_ENV === "production",
                httpOnly: true,
                maxAge: ACCESS_TOKEN_EXPIRE,
                sameSite: "strict",
            });

            cookie.set("refreshToken", session.refreshToken, {
                secure: process.env.NODE_ENV === "production",
                httpOnly: true,
                maxAge: REFRESH_TOKEN_EXPIRE,
                sameSite: "strict",
            });

            redirect("/admin/page");
        } catch (err) {
            if (err instanceof Error) {
                return err.message;
            }
        }
    } else {
        return error.issues.map(err => err.message).join(", ");
    }
}

export default async function AdminLogin() {
    if (await isLoggedIn()) {
        redirect("/admin/page");
    }

    return (
        <main className="h-full flex flex-col justify-center items-center">
            <LoginForm action={loginAction}/>
        </main>
    )
}
