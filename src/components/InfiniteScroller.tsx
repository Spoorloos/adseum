import { Children } from "react";

type InfiniteScrollerProps = React.PropsWithChildren & {
    speed?: string;
    direction?: "normal" | "reverse" | "alternate" | "alternate-reverse";
}

export default function InfiniteScroller({ children, speed, direction }: InfiniteScrollerProps) {
    const items = Children.map(children, (item) => (
        <li className="flex-none">{item}</li>
    ))

    return (
        <div className="overflow-hidden max-w-full">
            <ul className="relative inline-flex gap-4 whitespace-nowrap w-max animate-[infinite-scroll_linear_infinite]" style={{
                animationDuration: speed ?? "7s",
                animationDirection: direction ?? "normal",
            }}>
                {items}
                <ul className="absolute left-[calc(100%+var(--spacing)*4)] inline-flex gap-4 whitespace-nowrap w-max">{items}</ul>
            </ul>
        </div>
    );
}
