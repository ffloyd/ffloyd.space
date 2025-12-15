<script lang="ts">
  import { resolve } from '$app/paths';
  import Link from '$lib/components/Link.svelte';
</script>

<!-- 2 column layout on sm+ screens -->
<div class="flex flex-col sm:flex-row p-4 gap-4 min-h-dvh">
  <div
    class="flex flex-1 flex-col gap-4 items-center sm:max-w-sm pr-4 pb-4 max-sm:border-b sm:border-r border-white/80"
  >
    <a href={resolve('/')} class="text-white/80 text-2xl hover:text-white">ffloyd.space</a>

    <p class="text-lg text-left">
      Path to a better future requires a clear <span class="text-white/80">vision</span>. Clarity
      requires confidence. Here you can find my
      <span class="text-white/80">hard opinions about software development</span>.
    </p>

    <p class="text-lg text-left">World is changing. We're changing. This page is also changing.</p>

    <p class="text-lg text-left">
      Want to discuss or share something? Write to <Link href="mailto:actually@ffloyd.space"
        >actually@ffloyd.space</Link
      >
    </p>
  </div>

  <div class="flex-1 w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
    {#snippet card(title: string, catchPhrase?: string)}
      <div class="flex flex-col items-center justify-center border border-white/10 rounded-lg p-4">
        <Link main href={resolve('/vision')} class="text-center text-2xl">{title}</Link>

        {#if catchPhrase}
          <p class="text-center mt-2">{catchPhrase}</p>
        {/if}
      </div>
    {/snippet}

    {@render card(
      'Broken windows theory works',
      'What you did today will repeat itself multiple times in the future. Ugly code acts like infection. Introduce tech-debt in the cleanest way possible.'
    )}
    {@render card(
      'Why-comments are good',
      '"Good code does not need comments" is the second "billion dollar mistake" after invetion of `nil`. We used to put explanations in all possible places except the related code line.'
    )}
    {@render card(
      'Design systems, not solutions',
      "It's easier to deal with 5 combined concepts that provide solution for 50 problems, than with 50 solutions for 50 problems."
    )}
    {@render card(
      'Always reduce cognitive complexity',
      'Design code for the process of understanding. Humans can deal only with ~4 ideas simultaneously. Reduce amount of involved ideas to a minimum.'
    )}
    {@render card(
      "AI rules' files must be useless for humans",
      "Why we should care about LLMs' convenience more than about ours? Add more READMEs and comments for humans, and you find your AGENTS.md containing only AI-specific adjustments."
    )}
    {@render card('Context-switching is a plague', "It's totally insane that we used to it.")}
  </div>
</div>
