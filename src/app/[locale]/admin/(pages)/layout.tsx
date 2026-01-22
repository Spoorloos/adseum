import { isLoggedIn } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getLocaleCode, getTranslations } from "@/lib/localization";
import HeaderLink from "@/components/HeaderLink";

async function logOutAction() {
    "use server";

    const cookie = await cookies();

    cookie.delete("accessToken");
    cookie.delete("refreshToken");

    revalidatePath("/admin", "layout");
}

export default async function AdminLayout({ children }: React.PropsWithChildren) {
    if (!(await isLoggedIn())) {
        redirect("/admin");
    }

    const translations = await getTranslations(await getLocaleCode());

    return (
        <div className="h-full flex">
            <aside className="p-4 bg-white flex flex-col justify-between">
                <div>
                    <p className="text-2xl font-bold mb-2">{translations["admin.sidebar.title"]}</p>
                    <nav className="flex flex-col gap-1">
                        <Link className="block not-hover:text-black/75" href="/admin/content">
                            {translations["admin.sidebar.content"]}
                        </Link>
                        <Link className="block not-hover:text-black/75" href="/admin/users">
                            {translations["admin.sidebar.users"]}
                        </Link>
                    </nav>
                </div>
                <HeaderLink className="text-center" variant="secondary" href="/" onClick={logOutAction}>
                    {translations["admin.sidebar.logOut"]}
                </HeaderLink>
            </aside>
            <div className="grow overflow-y-auto bg-zinc-100">
                {children}
            </div>
        </div>
    )
}
