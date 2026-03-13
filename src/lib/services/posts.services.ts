import { api } from "$lib/api/client";

export const getPosts = async () => {
    return api.get("/posts");
};
