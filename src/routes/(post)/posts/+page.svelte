<script lang="ts">
    import Posts from "$lib/components/posts/Posts.svelte";
    import { navigating } from "$app/stores";

    export let data;
</script>

<Posts posts={data.posts} loading={Boolean($navigating)} />
