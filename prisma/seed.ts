import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/../generated/prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient({
    adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL
    }),
});

async function main() {
    await prisma.user.upsert({
        where: {
            email: "mick.negenman@icloud.com",
        },
        update: {},
        create: {
            email: "mick.negenman@icloud.com",
            password: await bcrypt.hash("Mick0100", 12),
        },
    })

    await prisma.language.createMany({
        data: [
            { code: "en", name: "English", isDefault: true },
            { code: "nl", name: "Nederlands" },
        ],
        skipDuplicates: true,
    });

    await prisma.translationKey.createMany({
        data: [
            { key: "admin.logIn.heading", description: "" },
            { key: "admin.logIn.email", description: "" },
            { key: "admin.logIn.password", description: "" },
            { key: "admin.logIn.action", description: "" },
            { key: "admin.sidebar.title", description: "" },
            { key: "admin.sidebar.page", description: "" },
            { key: "admin.sidebar.users", description: "" },
            { key: "admin.sidebar.logOut", description: "" },
            { key: "admin.page.text", description: "" },
            { key: "admin.users.title", description: "" },
            { key: "admin.users.createUser.button", description: "" },
            { key: "admin.users.createUser.title", description: "" },
            { key: "admin.users.createUser.email", description: "" },
            { key: "admin.users.createUser.confirmEmail", description: "" },
            { key: "admin.users.createUser.password", description: "" },
            { key: "admin.users.createUser.confirmPassword", description: "" },
            { key: "admin.users.createUser.action", description: "" },
            { key: "admin.users.table.id", description: "" },
            { key: "admin.users.table.email", description: "" },
            { key: "admin.users.table.createdAt", description: "" },
        ],
        skipDuplicates: true,
    });

    await prisma.translation.createMany({
        data: [
            // EN
            { key: "admin.logIn.heading", languageCode: "en", value: "Log in" },
            { key: "admin.logIn.email", languageCode: "en", value: "Email" },
            { key: "admin.logIn.password", languageCode: "en", value: "Password" },
            { key: "admin.logIn.action", languageCode: "en", value: "Log in" },
            { key: "admin.sidebar.title", languageCode: "en", value: "Admin Dashboard" },
            { key: "admin.sidebar.page", languageCode: "en", value: "Page" },
            { key: "admin.sidebar.users", languageCode: "en", value: "Users" },
            { key: "admin.sidebar.logOut", languageCode: "en", value: "Log out" },
            { key: "admin.page.text", languageCode: "en", value: "Admin page" },
            { key: "admin.users.title", languageCode: "en", value: "Users" },
            { key: "admin.users.createUser.button", languageCode: "en", value: "Create user" },
            { key: "admin.users.createUser.title", languageCode: "en", value: "Create new user" },
            { key: "admin.users.createUser.email", languageCode: "en", value: "Email" },
            { key: "admin.users.createUser.confirmEmail", languageCode: "en", value: "Confirm email" },
            { key: "admin.users.createUser.password", languageCode: "en", value: "Password" },
            { key: "admin.users.createUser.confirmPassword", languageCode: "en", value: "Confirm password" },
            { key: "admin.users.createUser.action", languageCode: "en", value: "Create" },
            { key: "admin.users.table.id", languageCode: "en", value: "ID" },
            { key: "admin.users.table.email", languageCode: "en", value: "Email" },
            { key: "admin.users.table.createdAt", languageCode: "en", value: "Created at" },

            // NL
            { key: "admin.logIn.heading", languageCode: "nl", value: "Inloggen" },
            { key: "admin.logIn.email", languageCode: "nl", value: "E-mail" },
            { key: "admin.logIn.password", languageCode: "nl", value: "Wachtwoord" },
            { key: "admin.logIn.action", languageCode: "nl", value: "Log in" },
            { key: "admin.sidebar.title", languageCode: "nl", value: "Admin Dashboard" },
            { key: "admin.sidebar.page", languageCode: "nl", value: "Pagina" },
            { key: "admin.sidebar.users", languageCode: "nl", value: "Gebruikers" },
            { key: "admin.sidebar.logOut", languageCode: "nl", value: "Log uit" },
            { key: "admin.page.text", languageCode: "nl", value: "Admin pagina" },
            { key: "admin.users.title", languageCode: "nl", value: "Gebruikers" },
            { key: "admin.users.createUser.button", languageCode: "nl", value: "Gebruiker aanmaken" },
            { key: "admin.users.createUser.title", languageCode: "nl", value: "Gebruiker aanmaken" },
            { key: "admin.users.createUser.email", languageCode: "nl", value: "E-mail" },
            { key: "admin.users.createUser.confirmEmail", languageCode: "nl", value: "E-mail bevestigen" },
            { key: "admin.users.createUser.password", languageCode: "nl", value: "Wachtwoord" },
            { key: "admin.users.createUser.confirmPassword", languageCode: "nl", value: "Wachtwoord bevestigen" },
            { key: "admin.users.createUser.action", languageCode: "nl", value: "Aanmaken" },
            { key: "admin.users.table.id", languageCode: "nl", value: "ID" },
            { key: "admin.users.table.email", languageCode: "nl", value: "E-mail" },
            { key: "admin.users.table.createdAt", languageCode: "nl", value: "Datum van aanmaak" },
        ],
        skipDuplicates: true,
    });
}

main()
    .catch((err) => {
        console.log(err)
    })
    .finally(async () => {
        await prisma.$disconnect();
    })
