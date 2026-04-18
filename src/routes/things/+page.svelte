<script lang="ts">
  import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
  import Container from '$lib/components/Container.svelte';
  import favicon from '$lib/assets/favicon.svg';
  import type { Component } from 'svelte';

  const customIcons: Record<string, string> = {
    '$ffloyd-space': favicon
  };

  const rawThings = import.meta.glob<{
    title: string;
    icon: string;
    year: string;
    link: string;
    default: Component;
  }>('./*.svelte.md', { eager: true });

  const things = Object.entries(rawThings)
    .map(([, { title, icon, year, link, default: description }]) => {
      return { title, icon, year, link, description };
    })
    .sort((a, b) => {
      // year value can be something like "since 1990"
      // so we need to focus on the last 4 chars
      const yearA = parseInt(a.year.slice(-4));
      const yearB = parseInt(b.year.slice(-4));
      return yearB - yearA;
    });
</script>

<svelte:head>
  <title>Things ⋄ ffloyd.space</title>
  <meta name="description" content="What have I done" />
</svelte:head>

<Container class="flex flex-col items-center">
  <Breadcrumbs items={[{ href: '/', label: 'ffloyd.space' }]} />

  <div class="article">
    <h1>Things</h1>

    <p class="text-center">
      A showcase of things I've done: the projects I see as <i>mine</i> and that I did <i>my</i> way.
      Only serious stuff - no vibe-coded apps, throwaway experiments, or things I did just for money.
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
    {#each things as thing, i (i)}
      {@const Description = thing.description}

      <div class="border border-line-border rounded-lg p-4">
        <div class="flex flex-row items-center text-2xl gap-2 w-full text-content-primary">
          {#if thing.icon.startsWith('$')}
            <img src={customIcons[thing.icon]} alt={thing.title} class="h-6 w-6" />
          {:else}
            <span class={thing.icon}></span>
          {/if}
          <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
          <a href={thing.link} target="_blank" class="link">{thing.title}</a>
          <span class="grow"></span>
          <span class="text-lg place-self-start text-content-dim">{thing.year}</span>
        </div>

        <div class="article">
          <Description />
        </div>
      </div>
    {/each}
  </div>
</Container>
