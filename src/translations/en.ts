import type { Translation } from "./translation";

export default {
    name: "English",
    admin: {
        logIn: {
            heading: "Log in",
            email: "Email",
            password: "Password",
            action: "Log in",
        },
        sidebar: {
            title: "Admin Dashboard",
            page: "Page",
            users: "Users",
            logOut: "Log out",
        },
        page: {
            text: "Admin page"
        },
        users: {
            title: "Users",
            createUser: {
                button: "Create user",
                title: "Create new user",
                email: "Email",
                confirmEmail: "Confirm email",
                password: "Password",
                confirmPassword: "Confirm password",
                action: "Create",
            },
            table: {
                id: "ID",
                email: "Email",
                createdAt: "Created at",
            },
        },
    },
} satisfies Translation;
