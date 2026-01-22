import Link from "next/link";
import { twMerge } from "tailwind-merge";

type LinkProps = Parameters<typeof Link>[0];

type HeaderLinkProps = LinkProps & {
    variant?: "primary" | "secondary";
}

export default function HeaderLink({ variant, className, children, ...rest }: HeaderLinkProps) {
    return (
        <Link
            className={twMerge(
                "transition-colors duration-100 hover:decoration-current decoration-transparent underline cursor-pointer",
                variant === "primary" && "bg-pink-600 border-pink-700 hover:bg-pink-700 hover:border-pink-800 text-white rounded-full border-2 border-b-3 shadow font-semibold px-3 py-2",
                variant === "secondary" && "bg-white border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300 rounded-full border-2 border-b-3 shadow font-semibold px-3 py-2",
                variant === undefined && "px-2",
                className
            )}
            {...rest}
        >
            {children}
        </Link>
    )
}
