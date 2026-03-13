
import { PUBLIC_BASE_URL } from "$env/static/public";


const buildUrl = (url: string) => {
    if (url.startsWith("/api")) {
        return url;
    }


    if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
    }

    return `${PUBLIC_BASE_URL ?? ""}${url}`;
};

export const api = {
    get: async (url: string) => {
        const response = await fetch(buildUrl(url)
           // { credentials: "include" }
        );

        if (!response.ok) {
            throw new Error(`Request failed (${response.status})`);
        }

        return response.json();
    },

    post: async (url: string, body: object) => {
        const response = await fetch(buildUrl(url), {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`Request failed (${response.status})`);
        }

        return response.json();
    }
};
