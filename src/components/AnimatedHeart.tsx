import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

const heartShape = [
    [0, 1, 1, 0, 0, 0, 1, 1, 0],
    [1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0],
] as const;

const colors = [
    "#000000",
    "#000000",
    "#000000",
    "#5ad836",
    "#ff7000",
    "#ff0000",
    "#325af1",
    "#50c8ff",
    "#964b00",
    "#ff85aa"
] as const;

const stains = [
    () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36.894531 37.19812">
            <path
                fill="currentColor"
                d="m 0,0 c 0.002,2.825 -0.936,5.43 -2.904,7.656 -3.296,3.728 -8.731,4.554 -13.402,4.969 -2.756,0.245 -4.829,-2.459 -4.939,-4.94 -0.01,-0.215 0.026,-0.438 0.057,-0.66 -0.158,-0.069 -0.323,-0.12 -0.479,-0.197 -5.374,-2.654 -7.682,-10.093 -4.452,-15.212 0.614,-0.973 1.411,-1.8 2.282,-2.536 1.952,-2.539 4.783,-4.12 8.052,-4.319 3.069,-0.187 6.274,1.023 8.858,2.596 2.419,1.473 4.676,3.553 5.844,6.175 C -0.184,-4.45 0.252,-2.182 0,0"
                transform="matrix(1.3333333 0 0 -1.3333333 36.798 16.854)"
            />
        </svg>
    ),
    () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.46582 37.325256">
            <path
                fill="currentColor"
                d="m 0,0 c -0.33,1.321 -0.938,2.542 -1.712,3.662 -0.673,1.539 -1.644,2.95 -2.925,4.101 -2.635,2.367 -5.944,3.463 -9.358,3.342 -5.977,1.238 -12.337,0.035 -16.056,-5.409 -4.179,-6.117 -2.326,-15.447 4.218,-19.101 1.443,-0.806 3.044,-1.294 4.679,-1.553 1.342,-0.705 2.801,-1.183 4.289,-1.383 4.633,-0.622 9.196,1.66 12.664,4.569 C -0.771,-8.894 1.107,-4.437 0,0"
                transform="matrix(1.3333333 0 0 -1.3333333 43 15.5)"
            />
        </svg>
    ),
    () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.46582 37.325256">
            <path
                fill="currentColor"
                d="m 0,0 c -0.021,0.041 -0.052,0.07 -0.075,0.109 0.659,1.822 0.771,3.819 0.142,5.742 -0.369,1.128 -0.932,2.282 -1.601,3.375 -0.671,2.342 -1.936,4.51 -3.749,6.156 -0.285,0.259 -0.596,0.48 -0.9,0.711 -1.529,1.607 -3.417,2.844 -5.661,3.237 -2.907,0.509 -5.817,-0.044 -8.104,-1.878 -1.723,-0.811 -3.306,-1.875 -4.544,-3.365 -0.452,-0.545 -0.85,-1.113 -1.205,-1.697 -1.089,-0.393 -2.061,-1.121 -2.641,-2.12 -2.112,-3.638 -3.131,-7.797 -2.251,-11.964 0.72,-3.412 3.176,-6.761 6.372,-8.224 3.886,-1.778 8.247,-1.196 12.314,-0.395 3.526,0.694 6.914,1.964 10.131,3.555 C 0.701,-5.536 1.178,-2.23 0,0"
                transform="matrix(1.3333333,0,0,-1.3333333,42,24)"
            />
        </svg>
    )
] as const;

type AnimatedHeartProps = {
    className?: string;
};

const heartItems = heartShape.flatMap((row, rowNum) => {
    return row.map((val, columnNum) => {
        return val === 0 ? null : {
            row: rowNum,
            column: columnNum,
            color: colors[Math.floor(Math.random() * colors.length)],
            stain: stains[Math.floor(Math.random() * stains.length)],
        };
    }).filter((row) => row !== null);
});

export default async function AnimatedHeart({ className }: AnimatedHeartProps) {
    return (
        <div className={twMerge("grid aspect-square gap-1 place-items-center", className)} style={{
            gridTemplateRows: `repeat(${heartShape.length}, 1fr)`,
            gridTemplateColumns: `repeat(${Math.max(...heartShape.map(row => row.length))}, 1fr)`,
        }}>
            {heartItems.map(({ row, column, color, stain }) => (
                <div className="size-full animate-heart-grow" key={`${row}+${column}`} style={{
                    gridRow: (row + 1).toString(),
                    gridColumn: (column + 1).toString(),
                    animationDelay: `${(row + column) / 10}s`,
                    color,
                }}>
                    {stain()}
                </div>
            ))}
        </div>
    )
}
