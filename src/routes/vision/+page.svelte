<script lang="ts">
  import { resolve } from '$app/paths';
  import PageWithSidebar from '$lib/components/PageWithSidebar.svelte';
  import type { PathString } from '$lib/types';

  // No need to use runes here because it's a compile-time thing
  const articlePagesMap = import.meta.glob<{ title: string; description: string }>('./*/*.md', {
    eager: true
  });

  const articleList = Object.entries(articlePagesMap)
    .map(([key, module]) => ({
      path: `/vision/${key.split('/')[1]}` as PathString,
      title: module.title,
      description: module.description
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
</script>

<PageWithSidebar>
  {#snippet sidebar()}
    <a href={resolve('/')} class="link-back text-2xl">ffloyd.space</a>

    <p class="text-lg text-left">
      <b class="text-content-primary">Great</b> things are rarely built coincidentally. Your
      <b class="text-content-primary">vision</b>
      shapes what you will get in the <b class="text-content-primary">future</b>. Here you can find
      my <b class="text-content-primary">hard opinions about software development</b>.
    </p>

    <p class="text-lg text-left">World is changing. We're changing. This page is also changing.</p>

    <p class="text-lg text-left">
      Want to discuss or share something? Write to <a
        href="mailto:actually@ffloyd.space"
        class="link">actually@ffloyd.space</a
      >
    </p>
  {/snippet}

  {#snippet content()}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {#snippet card(title: string, catchPhrase: string, link: PathString)}
        <div
          class="flex flex-col py-20 items-center justify-center border border-line-border rounded-lg p-4"
        >
          <a href={resolve(link)} class="link text-center text-2xl">{title}</a>

          {#if catchPhrase}
            <p class="text-center text-content-dim mt-2">{catchPhrase}</p>
          {/if}
        </div>
      {/snippet}

      {#each articleList as article (article.path)}
        {@render card(article.title, article.description, article.path)}
      {/each}
    </div>
  {/snippet}
</PageWithSidebar>
