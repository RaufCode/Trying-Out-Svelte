<script lang="ts">
    import Posts from "$lib/components/posts/Posts.svelte";

    export let data;
</script>

<Posts posts={data.posts} />