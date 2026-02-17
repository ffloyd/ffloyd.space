// Due to reasons I'm lazy to investigate,
// I cannot put this in ./svelte-preprocessor.ts
// because having an error.

declare module '*.svelte.md' {
  import type { Component } from 'svelte';

  export const title: string | null;
  export const description: string | null;

  const component: Component;
  export default component;
}
