import Link from "next/link";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { getUser } from "@/lib/auth";
import { getTranslations, localeCodes } from "@/lib/localization";

export default async function Header() {
    const user = await getUser();

    const locales = Object.fromEntries(
        await Promise.all(localeCodes.map(
            async (code) => [ code, (await getTranslations(code)).name ]
        ))
    );

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
                <LocaleSwitcher locales={locales} />
            </div>
        </header>
    )
}
