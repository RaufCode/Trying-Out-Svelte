
import { PUBLIC_BASE_URL } from "$env/static/public";


export const api = {

    get: async (url: string) => {
        const response = await fetch(`${PUBLIC_BASE_URL}${url}`, {
            credentials: "include"
        });

        return response.json();
    },

    post: async (url: string, body: object) => {
        const response = await fetch(`${PUBLIC_BASE_URL}${url}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        return response.json();
    }
};