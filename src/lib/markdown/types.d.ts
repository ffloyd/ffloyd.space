declare module '*.svelte.md' {
  import type { Component } from 'svelte';
  const component: Component;
  export default component;
}

// TODO: for some reason TSLS does not consider this when placed in this file
// it was working when placed in rehype-svelte-head.ts
declare module 'vfile' {
  import type { Frontmatter } from './remark-parse-frontmatter.ts';

  interface DataMap {
    frontmatter: Frontmatter;
    title?: string;
  }
}
