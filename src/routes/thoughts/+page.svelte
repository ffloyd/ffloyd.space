<script lang="ts">
  import { resolve } from '$app/paths';
  import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
  import Container from '$lib/components/Container.svelte';
  import Timeline, { type TimelineItem } from '$lib/components/Timeline.svelte';
  import thoughts from './thoughts';

  const items: TimelineItem[] = thoughts.map((thought) => ({
    href: `/thoughts/${thought.slug}`,
    date: thought.date,
    title: thought.title,
    description: thought.description
  }));
</script>

<svelte:head>
  <title>Thoughts ⋄ ffloyd.space</title>
  <meta
    name="description"
    content="I think a lot. Here are my thoughts. About technology, life, philosophy."
  />
  <link
    rel="alternate"
    type="application/rss+xml"
    title="Thoughts — ffloyd.space"
    href="/thoughts/rss.xml"
  />
</svelte:head>

<Container class="flex flex-col place-items-center">
  <Breadcrumbs items={[{ href: '/', label: 'ffloyd.space' }]} />

  <div class="article">
    <h1>Thoughts</h1>

    <p class="text-center">
      Follow via
      <span class="icon-[simple-icons--rss]"></span>
      <a href={resolve('/thoughts/rss.xml')}>RSS</a>
    </p>
  </div>

  <Timeline {items} />
</Container>
