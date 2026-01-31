<script lang="ts">
  import ArticleLayout from '$lib/components/ArticleLayout.svelte';
  import type { BreadcrumbItems } from '$lib/types';

  const breadcrumbs: BreadcrumbItems = [
    { href: '/', label: 'ffloyd.space' },
    { href: '/vision', label: 'vision' }
  ];

  let { children } = $props();
</script>

<ArticleLayout {breadcrumbs}>
  {@render children()}
</ArticleLayout>
