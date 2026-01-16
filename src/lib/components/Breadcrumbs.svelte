<script lang="ts">
  import { resolve } from '$app/paths';
  import type { BreadcrumbItems } from '$lib/types';

  let { items } = $props<{ items: BreadcrumbItems }>();
</script>

<nav class="flex gap-2 items-baseline">
  {#each items as item, index (item.href)}
    <a href={resolve(item.href)} class="link-back text-2xl">{item.label}</a>

    {#if index < items.length - 1}
      <span>/</span>
    {/if}
  {/each}
</nav>
