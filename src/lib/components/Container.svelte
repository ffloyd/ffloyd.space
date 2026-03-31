<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ClassValue } from 'svelte/elements';

  interface Props {
    children: Snippet;
    class?: ClassValue;
  }

  const { children, class: additionalClasses }: Props = $props();
</script>

<div class={['max-w-[96rem] mx-auto p-4', additionalClasses]}>
  {@render children()}
</div>
