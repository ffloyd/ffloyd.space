<script lang="ts">
  import ArticleLayout from '$lib/components/ArticleLayout.svelte';
  import type { BreadcrumbItems } from '$lib/components/Breadcrumbs.svelte';

  const breadcrumbs: BreadcrumbItems = [
    { href: '/', label: 'ffloyd.space' },
    { href: '/thoughts', label: 'thoughts' }
  ];

  let { children } = $props();
</script>

<ArticleLayout {breadcrumbs}>
  {@render children()}
</ArticleLayout>
