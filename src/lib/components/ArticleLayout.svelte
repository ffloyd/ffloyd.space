<script lang="ts">
  import Breadcrumbs, { type BreadcrumbItems } from './Breadcrumbs.svelte';
  import Comment from './Comment.svelte';
  import { onMount, type Snippet } from 'svelte';
  import { loadComments, type Comment as CommentType } from '$lib/mastodon';

  let { children, breadcrumbs, mastodonPostId } = $props<{
    children: Snippet;
    breadcrumbs: BreadcrumbItems;
    mastodonPostId?: string;
  }>();

  let comments: Promise<CommentType[]> | null = $state(null);

  onMount(() => {
    if (mastodonPostId) {
      comments = loadComments(mastodonPostId);
    }
  });
</script>

<div class="flex flex-col place-items-center">
  <div class="flex-none my-4">
    <Breadcrumbs items={breadcrumbs} />
  </div>

  <div class="flex-auto article px-4">
    <article>
      {@render children()}
    </article>

    {#if mastodonPostId}
      <h2>Comments</h2>

      <p>
        To leave a comment, visit
        <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
        <a href="https://mastodon.social/@ffloyd/{mastodonPostId}">the post on Mastodon</a>.
        Comments to the post will be displayed here.
      </p>

      {#if comments}
        {#await comments}
          <p class="text-content-dim">Loading comments...</p>
        {:then data}
          <div class="space-y-4 pb-8">
            {#each data as comment (comment.url)}
              <Comment {comment} />
            {/each}
          </div>
        {/await}
      {/if}
    {/if}
  </div>
</div>
