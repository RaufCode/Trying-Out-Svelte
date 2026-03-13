<script lang="ts">
    export let data: { post: Post | null };

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

    const formatNumber = (value: number) =>
        new Intl.NumberFormat("en-US", { notation: "compact" }).format(value);
</script>

{#if data.post}
<main class="relative min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-10">
    <div class="max-w-5xl mx-auto">
        <a
            href="/posts"
            class="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 transition hover:border-cyan-400/40 hover:text-white"
        >
            Back to posts
        </a>
    </div>

    <div class="mx-auto mt-6 grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <article class="rounded-2xl bg-slate-900/70 p-8 shadow-xl shadow-slate-950/40 backdrop-blur">
            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">Post</p>
            <h1 class="mt-3 text-3xl font-bold text-white">{data.post.title}</h1>
            <div class="mt-5 flex flex-wrap gap-2">
                {#each data.post.tags as tag}
                    <span class="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-cyan-200">{tag}</span>
                {/each}
            </div>
            <p class="mt-6 text-slate-300 leading-relaxed">{data.post.body}</p>
        </article>

        <aside class="space-y-4">
            <div class="rounded-2xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur">
                <p class="text-[11px] uppercase tracking-[0.2em] text-slate-400">Engagement</p>
                <div class="mt-4 space-y-3 text-sm text-slate-300">
                    <div class="flex items-center justify-between">
                        <span class="text-slate-400">Likes</span>
                        <span class="font-semibold text-white">{formatNumber(data.post.reactions.likes)}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-slate-400">Dislikes</span>
                        <span class="font-semibold text-white">{formatNumber(data.post.reactions.dislikes)}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-slate-400">Views</span>
                        <span class="font-semibold text-white">{formatNumber(data.post.views)}</span>
                    </div>
                </div>
            </div>

            <div class="rounded-2xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur">
                <p class="text-[11px] uppercase tracking-[0.2em] text-slate-400">Author</p>
                <p class="mt-3 text-sm font-semibold text-white">User #{data.post.userId}</p>
                <p class="mt-2 text-xs text-slate-400">Contributor profile and follow actions can live here.</p>
            </div>
        </aside>
    </div>
</main>
{:else}
<p class="text-center mt-20 text-slate-400">Post not found.</p>
{/if}
