<script lang="ts">
  import { resolve } from '$app/paths';
  import PageWithSidebar from '$lib/components/PageWithSidebar.svelte';

  import Intro from './Intro.svelte.md';

  // No need to use runes here because it's a compile-time thing
  const articlePagesMap = import.meta.glob<{ title: string; description: string }>('./*/*.md', {
    eager: true
  });

  const articleList = Object.entries(articlePagesMap)
    .map(([key, module]) => ({
      slug: key.split('/')[1],
      title: module.title,
      description: module.description
    }))
    .filter(({ slug }) => slug[0] !== '_')
    .sort((a, b) => a.title.localeCompare(b.title));
</script>

<svelte:head>
  <title>Vision ⋄ ffloyd.space</title>
  <meta
    name="description"
    content="Great things are rarely built coincidentally. Your vision shapes what you will get in the future. Here you can find my hard opinions about software development."
  />
</svelte:head>

<PageWithSidebar>
  {#snippet sidebar()}
    <a href={resolve('/')} class="link-back text-2xl">ffloyd.space</a>

    <div class="article">
      <Intro />
    </div>
  {/snippet}

  {#snippet content()}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {#snippet card(title: string, catchPhrase: string, link: string)}
        <div
          class="flex flex-col py-20 items-center justify-start border border-line-border rounded-lg p-4"
        >
          <a href={resolve(link as '/')} class="link text-center text-2xl">{title}</a>

          {#if catchPhrase}
            <p class="text-center text-content-dim mt-2">{catchPhrase}</p>
          {/if}
        </div>
      {/snippet}

      {#each articleList as article (article.slug)}
        {@render card(article.title, article.description, `/vision/${article.slug}`)}
      {/each}
    </div>
  {/snippet}
</PageWithSidebar>
