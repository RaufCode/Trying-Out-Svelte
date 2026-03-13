// src/lib/server/auth.ts
import { redirect } from "@sveltejs/kit";
import type { Cookies } from "@sveltejs/kit";

export function requireAuth(cookies: Cookies) {
    const token = cookies.get("access_token"); // ✅ use get() directly
    if (!token) throw redirect(303, "/sign-in");
    return token;
}