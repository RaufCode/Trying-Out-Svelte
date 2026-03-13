<script lang="ts">
    import { goto } from "$app/navigation";
    import { user } from "$lib/stores/user.store";
    import { logout } from "$lib/services/user.services";

    type Post = {
        id: number;
        title: string;
        body: string;
        tags: string[];
        reactions: {
            likes: number;
            dislikes: number;
        };
        views: number;
        userId: number;
    };

    export let posts: Post[] = []; // <-- receive posts as a prop
    export let loading = false;

    const skeletons = Array.from({ length: 6 }, (_, index) => index);

    const formatNumber = (value: number) =>
        new Intl.NumberFormat("en-US", { notation: "compact" }).format(value);

    const getPreview = (text: string, max = 160) =>
        text.length > max ? `${text.slice(0, max)}...` : text;

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            user.set(null);
            goto("/sign-in");
        }
    };
</script>

<style>
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .line-clamp-4 {
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>

<main class="relative min-h-screen w-full overflow-y-auto overflow-x-hidden bg-slate-950 text-slate-100">
	<div class="pointer-events-none absolute inset-0">
		<div
			class="absolute -left-24 top-10 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl sm:h-80 sm:w-80"
		></div>
		<div
			class="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl sm:h-96 sm:w-96"
		></div>
	</div>

	<div class="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-8">
		<header class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
			<div class="space-y-3">
				<p class="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">Editorial Feed</p>
				<h1 class="text-3xl font-semibold text-white sm:text-4xl">Posts</h1>
				<p class="max-w-2xl text-sm leading-relaxed text-slate-300">
					Discover curated insights across product, culture, and technology. Each card is structured
					for fast scanning with a clean hierarchy and quiet emphasis on metadata.
				</p>
			</div>

			<div class="flex flex-wrap items-center gap-3">
				<button
					type="button"
					on:click={handleLogout}
					class="inline-flex items-center justify-center rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-100 transition hover:border-rose-300/60 hover:bg-rose-500/20"
				>
					Log out
				</button>
				<div
					class="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-xs text-slate-300 backdrop-blur"
				>
					<span class="font-semibold text-white">{loading ? "..." : posts.length}</span>
					<span class="uppercase tracking-[0.2em]">Total posts</span>
				</div>
			</div>
		</header>

		<section class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
			{#if loading}
				{#each skeletons as index}
					<div
						class="relative flex h-full flex-col rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/40 backdrop-blur"
					>
						<div class="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80">
							<div class="aspect-[16/10] w-full animate-pulse bg-slate-800/60"></div>
						</div>

						<div class="flex items-start justify-between gap-3 pt-5">
							<div class="h-4 w-3/4 animate-pulse rounded-full bg-slate-800/60"></div>
							<div class="h-5 w-12 animate-pulse rounded-full bg-slate-800/50"></div>
						</div>

						<div class="mt-3 space-y-2">
							<div class="h-3 w-full animate-pulse rounded-full bg-slate-800/60"></div>
							<div class="h-3 w-11/12 animate-pulse rounded-full bg-slate-800/60"></div>
							<div class="h-3 w-9/12 animate-pulse rounded-full bg-slate-800/60"></div>
						</div>

						<div class="mt-4 flex flex-wrap gap-2">
							<div class="h-6 w-16 animate-pulse rounded-full bg-cyan-500/10"></div>
							<div class="h-6 w-20 animate-pulse rounded-full bg-cyan-500/10"></div>
							<div class="h-6 w-12 animate-pulse rounded-full bg-cyan-500/10"></div>
						</div>

						<div class="mt-auto pt-6">
							<div class="h-3 w-24 animate-pulse rounded-full bg-slate-800/60"></div>
						</div>
					</div>
				{/each}
			{:else}
				{#each posts as post (post.id)}
					<a
						href={`/posts/${post.id}`}
						class="group relative flex h-full flex-col rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/40 backdrop-blur transition hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-cyan-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400/60"
					>
						<div class="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80">
							<div class="aspect-[16/10] w-full">
								<div class="h-full w-full bg-gradient-to-br from-slate-800/70 via-slate-900/60 to-slate-950/80"></div>
							</div>
							<div class="pointer-events-none absolute inset-0">
								<div class="absolute -left-6 top-4 h-16 w-16 rounded-full bg-cyan-500/20 blur-2xl"></div>
								<div class="absolute -right-6 bottom-4 h-20 w-20 rounded-full bg-indigo-500/20 blur-2xl"></div>
							</div>
							<div class="absolute inset-0 flex items-center justify-center">
								<div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-slate-400">
									<svg
										viewBox="0 0 24 24"
										fill="none"
										class="h-7 w-7"
										stroke="currentColor"
										stroke-width="1.6"
									>
										<path
											d="M4 6.5C4 5.12 5.12 4 6.5 4h11C18.88 4 20 5.12 20 6.5v11c0 1.38-1.12 2.5-2.5 2.5h-11C5.12 20 4 18.88 4 17.5v-11Z"
										/>
										<path d="M8 14.5l2.5-3 3 3.5 2-2.5 2.5 3.5" />
										<circle cx="9" cy="9" r="1.4" />
									</svg>
								</div>
							</div>
						</div>

						<div class="flex items-start justify-between gap-3 pt-5">
							<h2 class="line-clamp-2 text-lg font-semibold leading-snug text-white">
								{post.title}
							</h2>
							<span
								class="rounded-full border border-white/10 bg-slate-900/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400"
								>#{post.id}</span
							>
						</div>

						<p class="line-clamp-4 mt-3 text-sm leading-relaxed text-slate-300">
							{getPreview(post.body, 240)}
						</p>

						<div class="mt-4 flex flex-wrap gap-2">
							{#each post.tags as tag}
								<span
									class="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-200"
								>
									{tag}
								</span>
							{/each}
						</div>

						<div class="mt-auto pt-6 text-xs text-slate-400">
							<span class="inline-flex items-center gap-2">
								<span class="h-2 w-2 rounded-full bg-emerald-400/80"></span>
								{formatNumber(post.reactions.likes)} Likes
							</span>
						</div>

						<div class="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
							Read more
						</div>
					</a>
				{/each}
			{/if}
		</section>
	</div>
</main>
