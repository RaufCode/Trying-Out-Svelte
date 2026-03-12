import type { Handle } from "@sveltejs/kit";
import { PUBLIC_BASE_URL } from "$env/static/public";

export const handle: Handle = async ({ event, resolve }) => {
    const accessToken = event.cookies.get("access_token");

    event.locals.user = null;

    if (!accessToken) {
        return resolve(event);
    }

    try {
        const res = await event.fetch(`${PUBLIC_BASE_URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if (res.ok) {
            const user = await res.json();
            event.locals.user = user;
        }
    } catch {
        event.locals.user = null;
    }

    return resolve(event);
};
