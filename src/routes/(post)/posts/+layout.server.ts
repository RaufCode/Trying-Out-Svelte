import type { LayoutServerLoad } from "./$types";
import { requireAuth } from "$lib/server/auth";

export const load: LayoutServerLoad = async ({ cookies }) => {
    // This will throw a redirect to /login if no token
    const token = requireAuth(cookies);

    // optionally pass the token to pages if needed
    return { token };
};