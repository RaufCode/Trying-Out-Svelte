import { writable } from "svelte/store";

export interface User {
	id: string;
	username: string;
	email?: string;
	// Add more fields from your backend User response as needed
}

export const user = writable<User | null>(null);
