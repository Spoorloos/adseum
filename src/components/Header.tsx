import Link from "next/link";

export default async function Header() {
    return (
        <header className="bg-black text-white flex justify-between items-center p-4">
            <Link href="/">
                <p className="text-xl font-bold">Adseum</p>
            </Link>
            <nav>
            </nav>
        </header>
    )
}
