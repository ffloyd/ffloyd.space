<script lang="ts">
  import ArticleLayout from '$lib/components/ArticleLayout.svelte';
  import Timeline, { type TimelineItem } from '$lib/components/Timeline.svelte';

  const items: TimelineItem[] = [
    {
      date: '2026-02-15',
      title: 'Why "why-comments" matter',
      href: '/vision/why-comments',
      description:
        "Comments should explain why code exists, not what it does. Here's my approach to writing meaningful documentation."
    },
    {
      date: '2026-01-20',
      title: 'Cognitive complexity in code',
      href: '/vision/cognitive-complexity',
      description:
        'Understanding how complexity affects our ability to maintain and modify codebases.'
    },
    {
      date: '2025-12-05',
      title: 'Context switching costs',
      href: '/vision/context-switching',
      description: 'Why task switching drains productivity and how to minimize it.'
    },
    {
      date: '2025-11-18',
      title: 'AI-assisted programming rules',
      href: '/vision/ai-rules',
      description: 'Guidelines I follow when working with AI coding assistants.'
    },
    {
      date: '2025-10-30',
      title: 'Design systems over solutions',
      href: '/vision/design-systems-not-solutions',
      description: 'Why building reusable patterns beats solving the same problem twice.'
    },
    {
      date: '2025-10-01',
      title: 'Broken windows in codebases',
      href: '/vision/broken-windows-theory',
      description: 'How small problems compound into technical debt.'
    }
  ];
</script>

<svelte:head>
  <title>Thoughts ⋄ ffloyd.space</title>
  <meta
    name="description"
    content="I think a lot. Here are my thoughts. About technology, life, philosophy."
  />
</svelte:head>

<ArticleLayout breadcrumbs={[{ href: '/', label: 'ffloyd.space' }]}>
  <h1>Thoughts</h1>

  <Timeline {items} />
</ArticleLayout>
