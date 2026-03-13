// src/routes/(post)/posts/[id]/+page.ts
import { api } from "$lib/api/client";
import type { PageLoad } from "./$types";
import { getPost } from "$lib/services/posts.services";

export const load: PageLoad = async ({ params }) => {
    const id = params.id;

    try {
        const post = await getPost(id); // getPost returns the post object
        return { post };               // pass it as prop
    } catch (error) {
        console.error("Failed to fetch post:", error);
        return { post: null };
    }
};