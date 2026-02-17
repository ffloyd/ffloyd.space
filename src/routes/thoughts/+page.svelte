<script lang="ts">
  import ArticleLayout from '$lib/components/ArticleLayout.svelte';
  import Timeline, { type TimelineItem } from '$lib/components/Timeline.svelte';

  const articlePagesMap = import.meta.glob<{ title: string; description: string }>(
    './*/*.svelte.md',
    { eager: true }
  );

  const items: TimelineItem[] = Object.entries(articlePagesMap)
    .map(([key, module]) => {
      const slug = key.split('/')[1];
      // YYYY-MM-DD = 10 chars
      const date = slug.slice(0, 10);

      return { slug, date, ...module };
    })
    .filter(({ slug }) => slug[0] !== '_')
    .map(({ slug, date, title, description }) => {
      return {
        href: `/thoughts/${slug}`,
        date,
        title,
        description
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
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
