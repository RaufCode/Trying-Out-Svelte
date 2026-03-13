// src/routes/(post)/posts/+page.ts
import { getPosts } from "$lib/services/posts.services";

export const load = async () => {
    try {
        const res = await getPosts();
        return {
            posts: res.posts // <-- this will be available in +page.svelte
        };
    } catch (error) {
        return 
    }
   
};