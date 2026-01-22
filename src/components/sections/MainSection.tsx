import AnimatedHeart from "@/components/AnimatedHeart";
import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import HeaderLink from "@/components/HeaderLink";
import HeroLogo from "../HeroLogo";
import { getTranslations } from "@/lib/localization";

export default async function MainSection() {
    const translations = await getTranslations();

    return (
        <section className="p-8 md:p-12 lg:p-16 min-h-full flex flex-col snap-start" id="hero-section">
            <div className="flex-1 relative flex gap-8 flex-col md:flex-row">
                <div className="flex-1 space-y-4">
                    <HeroLogo/>
                    <p className="tracking-widest">{translations["home.heroText"]}</p>
                    <Link className="leading-none hover:underline flex items-center gap-1 tracking-widest text-blue-600" href="#">
                        {translations["home.getInContact"]}
                        <ArrowRight className="size-4"/>
                    </Link>
                </div>
                <div className="flex-1 flex">
                    <AnimatedHeart className="w-full m-auto max-w-[60vh] gap-2"/>
                </div>
                <HeaderLink
                    className="p-0 absolute left-full top-0 -translate-x-full translate-y-0 md:left-1/2 md:top-full md:-translate-y-full md:-translate-x-1/2 bg-pink-600 hover:bg-pink-700 shadow rounded-full motion-safe:animate-bounce"
                    variant="primary"
                    href="#other-section"
                    aria-label="Scroll down"
                >
                    <ArrowDown className="size-8" />
                </HeaderLink>
            </div>
        </section>
    )
}
