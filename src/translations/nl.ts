import type { Translation } from "./translation";

export default {
    name: "Nederlands",
    admin: {
        logIn: {
            heading: "Inloggen",
            email: "E-mail",
            password: "Wachtwoord",
            action: "Log in",
        },
        sidebar: {
            title: "Admin Dashboard",
            page: "Pagina",
            users: "Gebruikers",
            logOut: "Log uit",
        },
        page: {
            text: "Admin pagina"
        },
        users: {
            title: "Gebruikers",
            createUser: {
                button: "Gebruiker aanmaken",
                title: "Gebruiker aanmaken",
                email: "E-mail",
                confirmEmail: "E-mail bevestigen",
                password: "Wachtwoord",
                confirmPassword: "Wachtwoord bevestigen",
                action: "Aanmaken",
            },
            table: {
                id: "ID",
                email: "E-mail",
                createdAt: "Datum van aanmaak",
            },
        },
    },
} satisfies Translation;
