"use client";

import Image from "next/image";
import logoImg from "@/assets/logo.svg";
import { useEffect, useRef } from "react";

export default function HeroLogo() {
    const sectionImage = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (!sectionImage.current) return;

        const observer = new IntersectionObserver((entries) => {
            for (const { isIntersecting } of entries) {
                sectionImage.current?.classList.toggle("visible", isIntersecting);
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
            id="hero-logo"
            ref={sectionImage}
        />
    )
}
