<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    sidebar: Snippet;
    content: Snippet;
  };

  const { sidebar, content }: Props = $props();
</script>

<!-- 2 column layout on sm+ screens -->
<div class="flex flex-col md:flex-row p-4 gap-4 min-h-dvh">
  <aside
    class="flex flex-1 flex-col items-center md:max-w-sm pr-4 pb-4 max-md:border-b md:border-r border-line-separator"
  >
    {@render sidebar()}
  </aside>

  <main class="flex-1 w-full">
    {@render content()}
  </main>
</div>
