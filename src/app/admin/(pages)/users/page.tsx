import CreateUserModal from "@/components/CreateUserModal";
import EditUserModal from "@/components/EditUserModal";
import CustomTable from "@/components/CustomTable";
import { createUser, deleteUser, getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Trash } from "lucide-react";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { redirect } from "next/navigation";

const registerSchema = z.object({
    email: z.email({ error: "Invalid email format" })
        .trim()
        .toLowerCase(),

    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .max(128, "Password must be at most 128 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});

async function createUserAction(_: string | undefined, formData: FormData) {
    "use server";

    const { data, success, error } = registerSchema.safeParse(
        Object.fromEntries(formData)
    );

    if (success) {
        try {
            await createUser(data.email, data.password);

            revalidatePath("/admin/users");
        } catch (err) {
            if (err instanceof Error) {
                return err.message;
            }
        }
    } else {
        return error.issues.map(x => x.message).join(", ");
    }
}

async function deleteUserAction(userId: string) {
    "use server";

    await deleteUser(userId);

    revalidatePath("/admin/users");
}

export default async function UsersPage() {
    const users = await prisma.user.findMany();
    const currentUser = await getUser();

    return (
        <main className="p-4 space-y-4">
            <h1 className="text-3xl font-bold">Users</h1>
            <div className="space-x-4">
                <CreateUserModal action={createUserAction}/>
            </div>
            <CustomTable
                columns={[
                    { key: "id", name: "ID" },
                    { key: "email", name: "Email" },
                    { key: "createdAt", name: "Created at" },
                    { key: "controls", name: "" },
                ]}
                rows={
                    users.map((user) => ({
                        id: user.id,
                        email: user.email,
                        createdAt: user.createdAt.toLocaleString(),
                        controls: (
                            <div className="flex gap-2">
                                <button
                                    className="block cursor-pointer text-red-500 hover:text-red-500/50"
                                    aria-label="Delete user"
                                    onClick={deleteUserAction.bind(undefined, user.id)}
                                >
                                    <Trash className="size-6"/>
                                </button>

                                <EditUserModal email={currentUser?.email ?? ""}/>
                            </div>
                        )
                    }))
                }
            />
        </main>
    );
}
