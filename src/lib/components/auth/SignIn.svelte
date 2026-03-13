<script lang="ts">
	import { goto } from "$app/navigation";
	import { login } from "$lib/services/user.services";
	import  { user } from "$lib/stores/user.store";
	interface  userCredentials {
    username: string,
    password: string
	}

	const user_credentials: userCredentials = {
		username: "",
		password: ""
	}

	const demoCredentials: userCredentials[] = [
		{ username: "emilys", password: "emilyspass" },
		{ username: "sophiab", password: "sophiabpass" }
	];

	const applyCredentials = (credentials: userCredentials) => {
		user_credentials.username = credentials.username;
		user_credentials.password = credentials.password;
	};
	
	async function  userLogin () {
	try {
		const result = await login(user_credentials);
		console.log("Login successful:", result);
		// redirect or update state here
		user.set(result?.user ?? null);
		goto("/posts")

		return result ;

		
	} catch (err) {
		console.error("Login failed:", err);
		return false;
	}
	};



</script>


<main class="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
	<div class="pointer-events-none absolute inset-0">
		<div
			class="absolute -left-24 top-12 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl sm:h-80 sm:w-80"
		></div>
		<div
			class="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl sm:h-96 sm:w-96"
		></div>
	</div>

	<div class="relative mx-auto grid min-h-screen max-w-6xl items-center px-4 py-8 sm:px-8 lg:grid-cols-2 lg:gap-10">
		<section class="hidden lg:block">
			<div class="space-y-6">
				<p class="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">Secure Workspace</p>
				<h1 class="max-w-md text-4xl font-semibold leading-tight text-white">
					Welcome back. Sign in and continue building.
				</h1>
				<p class="max-w-md text-sm leading-relaxed text-slate-300">
					A premium authentication surface with strong contrast, balanced spacing, and focused
					interaction states for production-grade interfaces.
				</p>
			</div>
		</section>

		<section class="mx-auto w-full max-w-md">
			<div
				class="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl sm:p-8"
			>
				<div class="space-y-2">
					<p class="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">Account Access</p>
					<h2 class="text-2xl font-semibold text-white sm:text-3xl">Sign In</h2>
					<p class="text-sm text-slate-400">Use your credentials to access your dashboard.</p>
				</div>

				<form on:submit|preventDefault={userLogin} class="mt-8 space-y-5">
					<div class="space-y-2">
						<label for="username" class="text-xs font-medium uppercase tracking-wide text-slate-300"
							>Username</label
						>
						<input
							bind:value={user_credentials.username}
							id="username"
							name="username"
							type="text"
							placeholder="your.username"
							class="block w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
						/>
					</div>

					<div class="space-y-2">
						<label for="password" class="text-xs font-medium uppercase tracking-wide text-slate-300"
							>Password</label
						>
						<input
							bind:value={user_credentials.password}
							id="password"
							name="password"
							type="password"
							placeholder="Enter your password"
							class="block w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
						/>
					</div>

					<div class="space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
						<p class="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
							Demo credentials
						</p>
						<div class="space-y-3">
							{#each demoCredentials as credentials}
								<div class="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
									<div class="flex flex-col gap-1">
										<span class="text-slate-400">Username</span>
										<span class="font-medium text-white">{credentials.username}</span>
									</div>
									<div class="flex flex-col gap-1">
										<span class="text-slate-400">Password</span>
										<span class="font-medium text-white">{credentials.password}</span>
									</div>
									<button
										type="button"
										on:click={() => applyCredentials(credentials)}
										class="rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200 transition hover:border-cyan-400/60 hover:text-white"
									>
										Use
									</button>
								</div>
							{/each}
						</div>
					</div>

					<button
						type="submit"
						class="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 py-3 text-sm font-semibold text-white transition hover:from-cyan-400 hover:to-indigo-400 focus:outline-none focus:ring-2 focus:ring-cyan-300/50"
					>
						Sign In
					</button>
				</form>
			</div>
		</section>
	</div>
</main>
