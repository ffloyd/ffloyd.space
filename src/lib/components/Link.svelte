<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements';

  type Props = HTMLAnchorAttributes & {
    main?: boolean;
  };

  const { class: className, main = false, children, ...rest }: Props = $props();
</script>

<a
  {...rest}
  class={[
    'transition-all duration-200',
    main ? 'text-white/90' : 'text-white/80',
    'hover:text-white hover:text-glow',
    'active:text-white active:text-glow',
    className
  ]}
>
  {@render children?.()}
</a>
