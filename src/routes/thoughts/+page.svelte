<script lang="ts">
  import ArticleLayout from '$lib/components/ArticleLayout.svelte';
  import { type PathString } from '$lib/types';
</script>

{#snippet timelineDate(date: string, beginOrEnd: boolean = false)}
  <div
    class={[
      'border-l flex flex-row items-center',
      beginOrEnd ? 'border-transparent' : 'border-line-border'
    ]}
  >
    <div class="w-0">
      <div class="size-[9px] -translate-x-[5px] rounded-full bg-content-dim"></div>
    </div>
    <time class="text-content-dim px-4">{date}</time>
  </div>
{/snippet}

{#snippet timelineContent(href: PathString, title: string, description: string)}
  <div class="px-4 sm:pt-4 pb-8 sm:pb-12 border-l border-line-border">
    <h2 class="mt-0">
      <!-- We apply resolve checks via proper type here. -->
      <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
      <a class="no-underline" {href}>{title}</a>
    </h2>
    <p class="text-content-reading">{description}</p>
  </div>
{/snippet}

<svelte:head>
  <title>Thoughts ⋄ ffloyd.space</title>
  <meta
    name="description"
    content="I think a lot. Here are my thoughts. About technology, life, philosophy."
  />
</svelte:head>

<ArticleLayout breadcrumbs={[{ href: '/', label: 'ffloyd.space' }]}>
  <h1>Thoughts</h1>

  <div class="flex flex-col pb-8">
    {@render timelineDate('2026-02-15', true)}
    {@render timelineContent(
      '/vision/why-comments',
      'Why "why-comments" matter',
      "Comments should explain why code exists, not what it does. Here's my approach to writing meaningful documentation."
    )}
    {@render timelineDate('2026-01-20')}
    {@render timelineContent(
      '/vision/cognitive-complexity',
      'Cognitive complexity in code',
      'Understanding how complexity affects our ability to maintain and modify codebases.'
    )}
    {@render timelineDate('2025-12-05')}
    {@render timelineContent(
      '/vision/context-switching',
      'Context switching costs',
      'Why task switching drains productivity and how to minimize it.'
    )}
    {@render timelineDate('2025-11-18')}
    {@render timelineContent(
      '/vision/ai-rules',
      'AI-assisted programming rules',
      'Guidelines I follow when working with AI coding assistants.'
    )}
    {@render timelineDate('2025-10-30')}
    {@render timelineContent(
      '/vision/design-systems-not-solutions',
      'Design systems over solutions',
      'Why building reusable patterns beats solving the same problem twice.'
    )}
    {@render timelineDate('2025-10-01')}
    {@render timelineContent(
      '/vision/broken-windows-theory',
      'Broken windows in codebases',
      'How small problems compound into technical debt.'
    )}
    {@render timelineDate('Big Bang', true)}
  </div>
</ArticleLayout>
