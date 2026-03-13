<script lang="ts">
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

    const formatNumber = (value: number) =>
        new Intl.NumberFormat("en-US", { notation: "compact" }).format(value);

    const getPreview = (text: string, max = 160) =>
        text.length > max ? `${text.slice(0, max)}...` : text;
</script>

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

			<div
				class="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-xs text-slate-300 backdrop-blur"
			>
				<span class="font-semibold text-white">{posts.length}</span>
				<span class="uppercase tracking-[0.2em]">Total posts</span>
			</div>
		</header>

		<section class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each posts as post (post.id)}
				<article
					class="group relative flex h-full flex-col rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/40 backdrop-blur transition hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-cyan-500/10"
				>
					<div class="flex items-start justify-between gap-3">
						<h2 class="text-lg font-semibold leading-snug text-white">{post.title}</h2>
						<span
							class="rounded-full border border-white/10 bg-slate-900/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400"
							>#{post.id}</span
						>
					</div>

					<p class="mt-3 text-sm leading-relaxed text-slate-300">
						{getPreview(post.body)}
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

					<div class="mt-6 flex items-center justify-between text-xs text-slate-400">
						<div class="flex items-center gap-4">
							<span class="inline-flex items-center gap-2">
								<span class="h-2 w-2 rounded-full bg-emerald-400/80"></span>
								{formatNumber(post.reactions.likes)} Likes
							</span>
							<span class="inline-flex items-center gap-2">
								<span class="h-2 w-2 rounded-full bg-rose-400/80"></span>
								{formatNumber(post.reactions.dislikes)} Dislikes
							</span>
						</div>
						<span class="font-medium text-slate-300">{formatNumber(post.views)} Views</span>
					</div>

					<div
						class="mt-5 flex items-center justify-between border-t border-white/5 pt-4 text-[11px] uppercase tracking-[0.18em] text-slate-500"
					>
						<span>User #{post.userId}</span>
						<span class="text-cyan-300/80">Read More</span>
					</div>
				</article>
			{/each}
		</section>
	</div>
</main>
