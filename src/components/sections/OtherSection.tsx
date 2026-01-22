import { getTranslations } from "@/lib/localization";
import placeholderImg from "@/assets/placeholder.png";
import Image from "next/image";
import InfiniteScroller from "../InfiniteScroller";

export default async function OtherSection() {
    const translations = await getTranslations();

    return (
        <div className="p-16 min-h-full snap-start flex flex-col gap-32" id="other-section">
            <section className="grid grid-cols-2 gap-8">
                <Image className="w-full aspect-video"src={placeholderImg} alt="Placeholder"/>
                <div className="flex flex-col justify-between">
                    <h2 className="text-5xl font-semibold tracking-widest uppercase">{translations["home.aboutUs.heading"]}</h2>
                    <p className="tracking-widest">{translations["home.aboutUs.text"]}</p>
                </div>
            </section>
            <section className="text-center flex flex-col gap-8 items-center">
                <h2 className="text-5xl font-semibold tracking-widest uppercase">{translations["home.artwork.heading"]}</h2>
                <InfiniteScroller>
                    <Image className="size-64 object-cover"src={placeholderImg} alt="Placeholder"/>
                    <Image className="size-64 object-cover"src={placeholderImg} alt="Placeholder"/>
                    <Image className="size-64 object-cover"src={placeholderImg} alt="Placeholder"/>
                </InfiniteScroller>
            </section>
        </div>
    )
}
