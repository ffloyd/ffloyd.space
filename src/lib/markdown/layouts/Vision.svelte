<script lang="ts">
  import ArticleLayout from '$lib/components/ArticleLayout.svelte';
  import type { BreadcrumbItems } from '$lib/components/Breadcrumbs.svelte';

  const breadcrumbs: BreadcrumbItems = [
    { href: '/', label: 'ffloyd.space' },
    { href: '/vision', label: 'vision' }
  ];

  let { children, mastodonPostId } = $props();
</script>

<ArticleLayout {breadcrumbs} {mastodonPostId}>
  {@render children()}
</ArticleLayout>
