import MainSection from "@/components/sections/MainSection";
import OtherSection from "@/components/sections/OtherSection";
import { getLocaleCodes } from "@/lib/localization";

export async function generateStaticParams() {
    return Object.keys(await getLocaleCodes()).map(id => ({
        locale: id
    }))
}

export default async function HomePage() {
    return (
        <main className="contents">
            <MainSection/>
            <OtherSection/>
        </main>
    );
}
