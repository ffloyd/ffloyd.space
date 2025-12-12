<script lang="ts">
  import { resolve } from '$app/paths';
  import { settled, tick } from 'svelte';

  type Link = Parameters<typeof resolve>[0];

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

{#snippet link(title: string, to: Link, index: number, topText: string)}
  <a
    href={resolve(to)}
    class="text-lg transition-all duration-200 {highlightedLinkIndex === index
      ? 'text-white text-glow'
      : 'text-white/90 hover:text-white hover:text-glow active:text-white active:text-glow'}"
    onfocus={() => setTopText(topText)}
    onblur={() => clearTopText()}
    onmouseenter={() => setTopText(topText)}
    onmouseleave={() => clearTopText()}
  >
    {title}
  </a>
{/snippet}

{#snippet delimiter()}
  <span class="text-white/80">-</span>
{/snippet}

<div class="flex flex-col items-center justify-center w-dvw h-dvh">
  <span class="text-white/50 pointer-coarse:hidden">&nbsp;{topText}&nbsp;</span>

  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <h1
    class="text-white/80 hover:text-white transition-color duration-200 text-[12vw] md:text-8xl cursor-default"
    onclick={() => {
      if (highlightedLinkIndex === null) animateLinks();
    }}
  >
    ffloyd.space
  </h1>

  <div class="mt-6 mx-2">
    {@render link('about', '/', 0, "I'm Roman Kolesnev. My personal page is")}
    {@render delimiter()}
    {@render link('things', '/', 1, "What I've done. Good things at")}
    {@render delimiter()}
    {@render link('thoughts', '/', 2, 'I think a lot. I share at')}
    {@render delimiter()}
    {@render link('vision', '/', 3, 'My path to future. Hard opinions at')}
  </div>
</div>
