<script lang="ts">
  let { children } = $props();
</script>

<div class="flex flex-col items-center justify-center w-dvw h-dvh">
  {@render children()}
</div>
