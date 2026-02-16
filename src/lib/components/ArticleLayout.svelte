<script lang="ts">
  import Breadcrumbs, { type BreadcrumbItems } from './Breadcrumbs.svelte';
  import type { Snippet } from 'svelte';

  let { children, breadcrumbs } = $props<{
    children: Snippet;
    breadcrumbs: BreadcrumbItems;
  }>();
</script>

<div class="flex flex-col">
  <div class="flex-none mx-auto my-4">
    <Breadcrumbs items={breadcrumbs} />
  </div>

  <article class="flex-1 article mx-auto px-4">
    {@render children()}
  </article>
</div>
