import "@/app/globals.css";
import { type Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
    title: "Adseum",
    description: "",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
    return (
        <html lang="en">
            <body className="h-screen flex flex-col">
                <Header/>
                <div className="grow overflow-y-auto">
                    {children}
                </div>
            </body>
        </html>
    );
}
