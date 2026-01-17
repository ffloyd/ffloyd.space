<script lang="ts">
  import { resolve } from '$app/paths';
  import PageWithSidebar from '$lib/components/PageWithSidebar.svelte';
  import type { PathString } from '$lib/types';
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

      {@render card(
        'Broken windows theory works',
        'What you did today will repeat itself multiple times in the future. Ugly code acts like infection. Introduce tech-debt in the cleanest way possible.',
        '/vision/broken-windows-theory'
      )}
      {@render card(
        'Why-comments are good',
        '"Good code does not need comments" is the second "billion dollar mistake" after invetion of `nil`. We used to put explanations in all possible places except the related code line.',
        '/vision/why-comments'
      )}
      {@render card(
        'Design systems, not solutions',
        "It's easier to deal with 5 combined concepts that provide solution for 50 problems, than with 50 solutions for 50 problems.",
        '/vision/design-systems-not-solutions'
      )}
      {@render card(
        'Always reduce cognitive complexity',
        'Design code for the process of understanding. Humans can deal only with ~4 ideas simultaneously. Reduce amount of involved ideas to a minimum.',
        '/vision/cognitive-complexity'
      )}
      {@render card(
        "AI rules' files must be useless for humans",
        "Why we should care about LLMs' convenience more than about ours? Add more READMEs and comments for humans, and you find your AGENTS.md containing only AI-specific adjustments.",
        '/vision/ai-rules'
      )}
      {@render card(
        'Context-switching is a plague',
        "It's totally insane that we used to it.",
        '/vision/context-switching'
      )}
    </div>
  {/snippet}
</PageWithSidebar>
