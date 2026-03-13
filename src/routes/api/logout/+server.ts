import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { dev } from "$app/environment";

export const POST: RequestHandler = async ({ cookies }) => {
    cookies.set("access_token", "", {
        path: "/",
        httpOnly: true,
        secure: !dev,
        sameSite: "lax",
        maxAge: 0
    });

    cookies.set("refresh_token", "", {
        path: "/",
        httpOnly: true,
        secure: !dev,
        sameSite: "lax",
        maxAge: 0
    });

    return json({ ok: true });
};
