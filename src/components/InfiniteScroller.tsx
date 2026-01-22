import { Children } from "react";

type InfiniteScrollerProps = React.PropsWithChildren & {

}

export default function InfiniteScroller({ children }: InfiniteScrollerProps) {
    const items = Children.map(children, (item) => (
        <li>{item}</li>
    ))

    return (
        <div className="overflow-hidden">
            <div className="relative animate-infinite-scroll">
                <ul className="inline-flex gap-4 pr-4">{items}</ul>
                <ul className="absolute inline-flex gap-4 w-full">{items}</ul>
            </div>
        </div>
    );
}
