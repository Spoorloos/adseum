import { X } from "lucide-react";

type Modal = {
    open?: boolean;
    setOpen?: (open: boolean) => void;
    header?: React.ReactNode;
    body?: React.ReactNode;
}

export default function Modal({ open, setOpen, header, body }: Modal) {
    return open !== false && (
        <div className="fixed top-1/2 left-1/2 -translate-1/2 border border-zinc-200 p-4 bg-white shadow-xs flex flex-col gap-2 w-full max-w-sm">
            {header !== undefined && (
                <div className="flex items-center">
                    <h2 className="text-2xl font-bold">
                        {header}
                    </h2>
                    {setOpen !== undefined && (
                        <button className="ml-auto cursor-pointer" onClick={() => setOpen(false)}>
                            <X className="size-8"/>
                        </button>
                    )}
                </div>
            )}
            {body}
        </div>
    );
}
