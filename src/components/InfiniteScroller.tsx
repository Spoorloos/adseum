import { Children } from "react";

type InfiniteScrollerProps = React.PropsWithChildren & {
    speed?: string;
    direction?: "normal" | "reverse" | "alternate" | "alternate-reverse";
}

export default function InfiniteScroller({ children, speed, direction }: InfiniteScrollerProps) {
    const items = Children.map(children, (item) => (
        <li>{item}</li>
    ))

    return (
        <div className="overflow-hidden">
            <div className="relative animate-[infinite-scroll_linear_infinite]" style={{
                animationDuration: speed ?? "7s",
                animationDirection: direction ?? "normal",
            }}>
                <ul className="inline-flex gap-4 pr-4">{items}</ul>
                <ul className="absolute inline-flex gap-4 w-full">{items}</ul>
            </div>
        </div>
    );
}
