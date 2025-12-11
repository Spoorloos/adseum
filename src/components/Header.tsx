import Link from "next/link";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { localeCodes } from "@/lib/localization";
import { getUser } from "@/lib/auth";

export default async function Header() {
    const user = await getUser();

    return (
        <header className="bg-black text-white flex justify-between items-center p-4">
            <Link href="/">
                <p className="text-xl font-bold">Adseum</p>
            </Link>
            <div className="flex items-stretch gap-2">
                <nav>
                    {user !== null && (
                        <Link className="block p-2 bg-yellow-500" href="/admin">Admin</Link>
                    )}
                </nav>
                <LocaleSwitcher localeCodes={localeCodes as unknown as string[]} />
            </div>
        </header>
    )
}
