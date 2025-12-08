import { createHash } from "crypto";
import { Prisma } from "@/../generated/prisma/client";

export function sha256(data: string) {
    return createHash("sha256").update(data).digest("hex");
}

export function getPrismaErrorFields(error: Prisma.PrismaClientKnownRequestError) {
    return (error?.meta?.driverAdapterError as any)?.cause?.constraint?.fields as string[] | undefined;
}
