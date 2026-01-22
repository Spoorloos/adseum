import { getLocaleCode, getTranslations } from "@/lib/localization";
import placeholderImg from "@/assets/placeholder.png";
import Image from "next/image";
import InfiniteScroller from "../InfiniteScroller";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function OtherSection() {
    const translations = await getTranslations(await getLocaleCode());

    return (
        <div className="p-16 min-h-full snap-start flex flex-col gap-32" id="other-section">
            <section className="grid grid-cols-2 gap-8">
                <Image className="w-full aspect-video object-cover" src={placeholderImg} alt="Placeholder"/>
                <div className="flex flex-col justify-between">
                    <h2 className="text-5xl font-semibold tracking-widest uppercase">{translations["home.aboutUs.heading"]}</h2>
                    <p className="tracking-widest">{translations["home.aboutUs.text"]}</p>
                </div>
            </section>
            <section className="text-center flex flex-col gap-8 items-center">
                <Link href="/artwork" className="group">
                    <h2 className="text-5xl font-semibold tracking-widest uppercase flex items-center gap-2">
                        {translations["home.artwork.heading"]}
                        <ArrowRight className="text-pink-600 transition-transform group-hover:translate-x-2"/>
                    </h2>
                </Link>
                <InfiniteScroller speed="10s">
                    <Link href="/artwork"><Image className="size-64 object-cover"src={placeholderImg} alt="Placeholder"/></Link>
                    <Link href="/artwork"><Image className="size-64 object-cover"src={placeholderImg} alt="Placeholder"/></Link>
                    <Link href="/artwork"><Image className="size-64 object-cover"src={placeholderImg} alt="Placeholder"/></Link>
                </InfiniteScroller>
            </section>
        </div>
    )
}
