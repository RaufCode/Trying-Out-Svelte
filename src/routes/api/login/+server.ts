import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { PUBLIC_BASE_URL } from "$env/static/public";
import { dev } from "$app/environment";

export const POST: RequestHandler = async ({ request, fetch, cookies }) => {

    const credentials = await request.json();

    const res = await fetch(`${PUBLIC_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    });

    if (!res.ok) {
        const error = await res.text();
        return json({ error }, { status: res.status });
    }

    const data = await res.json();

    cookies.set("access_token", data.accessToken, {
        path: "/",
        httpOnly: true,
        secure: !dev,
        sameSite: "lax",
        maxAge: 60 * 60
    });

    cookies.set("refresh_token", data.refreshToken, {
        path: "/",
        httpOnly: true,
        secure: !dev,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7
    });

    return json({
        user: data.user
    });
};