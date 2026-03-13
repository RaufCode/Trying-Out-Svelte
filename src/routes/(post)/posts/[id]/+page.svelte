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

    const getPreview = (text: string, max = 160) =>
        text.length > max ? `${text.slice(0, max)}...` : text;
</script>

{#if data.post}
<main class="relative min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-10">
    <article class="max-w-4xl mx-auto rounded-2xl bg-slate-900/70 p-8 shadow-xl shadow-slate-950/40 backdrop-blur">
        <h1 class="text-3xl font-bold text-white mb-4">{data.post.title}</h1>
        <div class="flex flex-wrap gap-2 mb-6">
            {#each data.post.tags as tag}
                <span class="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-cyan-200">{tag}</span>
            {/each}
        </div>
        <p class="text-slate-300 leading-relaxed mb-6">{data.post.body}</p>
        <div class="flex justify-between text-sm text-slate-400 border-t border-white/10 pt-4">
            <span>{formatNumber(data.post.reactions.likes)} Likes • {formatNumber(data.post.reactions.dislikes)} Dislikes</span>
            <span>{formatNumber(data.post.views)} Views</span>
        </div>
    </article>
</main>
{:else}
<p class="text-center mt-20 text-slate-400">Post not found.</p>
{/if}