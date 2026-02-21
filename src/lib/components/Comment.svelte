<script lang="ts">
  import type { Comment } from '$lib/mastodon';
  import { formatTimestamp } from '$lib/timestamps';
  import Self from './Comment.svelte';

  let { comment }: { comment: Comment } = $props();
</script>

<div>
  <div>
    <i class="nf nf-md-comment_text_outline"></i>

    <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
    <a href={comment.authorURL}>
      <b>{comment.author}</b>
    </a>

    <span class="text-content-dim">{comment.username}</span>
  </div>

  <div class="pl-1 pr-4">
    <div class="pl-3 border-l border-line-border">
      <div class="prose-sm my-1">
        <!-- it's safe because we santized it after fetching from Mastodon API -->
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html comment.content}
      </div>

      <div class="prose-sm">
        <time class="text-content-dim" datetime={comment.createdAt.toISOString()}
          >{formatTimestamp(comment.createdAt)}</time
        >
        <span>·</span>
        <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
        <a href={comment.url}>reply</a>
      </div>

      {#if comment.replies.length > 0}
        <div class="mt-4 space-y-4">
          {#each comment.replies as reply (reply.url)}
            <Self comment={reply} />
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>
