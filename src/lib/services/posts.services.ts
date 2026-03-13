import { api } from "$lib/api/client";

export const getPosts = async () => {
    return api.get("/posts");
};


export const getPost = async (id: string) => {
    return api.get(`/posts/${id}`);
};