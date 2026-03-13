import { api } from "$lib/api/client";

interface user_credentials {
    username: string;
    password: string;
}

export const login = async (user_credentials: user_credentials) => {
    return api.post("/api/login", user_credentials);
};
