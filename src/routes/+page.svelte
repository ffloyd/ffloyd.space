<script lang="ts">
  import { resolve } from '$app/paths';
  import ScreenCenter from '$lib/components/ScreenCenter.svelte';
  import { settled, tick } from 'svelte';

  let topText = $state('');
  let highlightedLinkIndex = $state<number | null>(null);

  function setTopText(text: string) {
    topText = text;
  }

  function clearTopText() {
    topText = '';
  }

  async function animateLinks() {
    for (let i = 0; i < 4; i++) {
      await tick();
      highlightedLinkIndex = i;
      await settled();
      await new Promise((done) => setTimeout(done, 500));
    }

    highlightedLinkIndex = null;
  }
</script>

{#snippet link(title: string, to: string, index: number, topText: string)}
  <a
    href={resolve(to as '/')}
    class={['link text-lg', highlightedLinkIndex === index && 'text-content-active! text-glow!']}
    onfocus={() => setTopText(topText)}
    onblur={() => clearTopText()}
    onmouseenter={() => setTopText(topText)}
    onmouseleave={() => clearTopText()}
  >
    {title}
  </a>
{/snippet}

{#snippet delimiter()}
  <span class="text-content-primary">-</span>
{/snippet}

<ScreenCenter>
  <span class="pointer-coarse:hidden">&nbsp;{topText}&nbsp;</span>

  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <h1
    class="central-title"
    onclick={() => {
      if (highlightedLinkIndex === null) animateLinks();
    }}
  >
    ffloyd.space
  </h1>

  <div class="mt-6 mx-2">
    {@render link('about', '/about', 0, "I'm Roman Kolesnev. My personal page is")}
    {@render delimiter()}
    {@render link('things', '/things', 1, "What I've done. Good things at")}
    {@render delimiter()}
    {@render link('thoughts', '/thoughts', 2, 'I think a lot. I share at')}
    {@render delimiter()}
    {@render link('vision', '/vision', 3, 'My path to future. Hard opinions at')}
  </div>
</ScreenCenter>
