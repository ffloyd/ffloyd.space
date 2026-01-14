<script lang="ts">
  import { resolve } from '$app/paths';

  let { children } = $props();
</script>

<div class="flex flex-col">
  <div class="flex-none mx-auto my-4">
    <a href={resolve('/')} class="link-back text-2xl">ffloyd.space</a>
    <span>/</span>
    <a href={resolve('/vision')} class="link-back text-2xl">vision</a>
  </div>

  <article class="flex-1 article mx-auto max-sm:px-4">
    {@render children()}
  </article>
</div>
