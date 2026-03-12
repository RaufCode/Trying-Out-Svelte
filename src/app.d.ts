// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Error {}
		interface Locals {
			user: any;
		}
		interface PageData {
			user: any;
		}
		interface PageState {}
		interface Platform {}
	}
}

export {};
