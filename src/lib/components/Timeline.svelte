<script module lang="ts">
  export type TimelineItem = {
    date: string;
    title: string;
    href: string;
    description: string;
  };
</script>

<script lang="ts">
  let { items }: { items: TimelineItem[] } = $props();
</script>

{#snippet timelineDate(date: string, showBorder: boolean = true)}
  <div
    class={[
      'border-l flex flex-row items-center',
      showBorder ? 'border-line-border' : 'border-transparent'
    ]}
  >
    <div class="w-0">
      <div class="size-[9px] -translate-x-[5px] rounded-full bg-content-dim"></div>
    </div>
    <time class="text-content-dim px-4">{date}</time>
  </div>
{/snippet}

<div class="flex flex-col pb-8">
  {#each items as item, i (item.href)}
    {@const isFirst = i === 0}

    {@render timelineDate(item.date, !isFirst)}

    <div class="px-4 sm:pt-4 pb-8 sm:pb-12 border-l border-line-border">
      <h2 class="mt-0">
        <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
        <a class="no-underline" href={item.href}>{item.title}</a>
      </h2>
      <p class="text-content-reading">{item.description}</p>
    </div>
  {/each}

  {@render timelineDate('Big Bang', false)}
</div>
