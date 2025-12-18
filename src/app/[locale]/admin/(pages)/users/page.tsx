import CreateUserModal from "@/components/modals/CreateUserModal";
import DeleteUserModal from "@/components/modals/DeleteUserModal";
import EditUserModal from "@/components/modals/EditUserModal";
import CustomTable from "@/components/CustomTable";
import { createUser, deleteUser, getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getTranslations } from "@/lib/localization";

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
    const translations = await getTranslations();

    return (
        <main className="p-4 space-y-4">
            <h1 className="text-3xl font-bold">{translations.admin.users.title}</h1>
            <div className="space-x-4">
                <CreateUserModal action={createUserAction}/>
            </div>
            <CustomTable
                columns={[
                    { key: "id", name: translations.admin.users.table.id },
                    { key: "email", name: translations.admin.users.table.email },
                    { key: "createdAt", name: translations.admin.users.table.createdAt },
                    { key: "controls", name: "" },
                ]}
                rows={
                    users.map((user) => ({
                        id: user.id,
                        email: user.email,
                        createdAt: user.createdAt.toLocaleString(),
                        controls: (
                            <div className="flex gap-2">
                                <DeleteUserModal action={deleteUserAction.bind(undefined, user.id)} />
                                {/*<EditUserModal email={currentUser?.email ?? ""} />*/}
                            </div>
                        )
                    }))
                }
            />
        </main>
    );
}
