"use client";

import Image from "next/image";
import logoImg from "@/assets/logo.svg";
import { useEffect, useRef } from "react";

export default function HeroLogo() {
    const sectionImage = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (!sectionImage.current) return;
        const headerImage = document.getElementById("header-logo-image");
        if (!headerImage) return;

        const observer = new IntersectionObserver((entries) => {
            for (const { isIntersecting } of entries) {
                headerImage.animate({
                    opacity: isIntersecting ? "0%" : "100%",
                }, {
                    duration: 100,
                    fill: "both",
                })
            }
        });

        observer.observe(sectionImage.current);
        return () => observer.disconnect();
    }, []);

    return (
        <Image
            className="h-32 w-auto"
            src={logoImg}
            alt="Logo"
            ref={sectionImage}
        />
    )
}
