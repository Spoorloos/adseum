import { isLoggedIn } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

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

    return (
        <div className="h-full flex">
            <aside className="p-4 bg-zinc-600 text-white flex flex-col justify-between">
                <div>
                    <p className="text-2xl font-bold mb-2">Admin Dashboard</p>
                    <nav className="flex flex-col gap-1">
                        <Link className="block text-white/75 hover:text-white" href="/admin/page">Page</Link>
                        <Link className="block text-white/75 hover:text-white" href="/admin/users">Users</Link>
                    </nav>
                </div>
                <button className="p-1 border border-zinc-400 w-full hover:bg-zinc-500 cursor-pointer" onClick={logOutAction}>Log out</button>
            </aside>
            <div className="grow overflow-y-auto">
                {children}
            </div>
        </div>
    )
}
