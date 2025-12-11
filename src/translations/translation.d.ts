export type Translation = {
    name: string;
    admin: {
        logIn: {
            heading: string;
            email: string;
            password: string;
            action: string;
        },
        sidebar: {
            title: string;
            page: string;
            users: string;
            logOut: string;
        },
        page: {
            text: string;
        },
        users: {
            title: string;
            createUser: {
                button: string;
                title: string;
                email: string;
                confirmEmail: string;
                password: string;
                confirmPassword: string;
                action: string;
            };
            table: {
                id: string;
                email: string;
                createdAt: string;
            }
        }
    }
};
