import type { Plugin } from 'unified';
import type { Root as HRoot } from 'hast';
import appendToOrCreateScript from './append-to-or-create-script.ts';

/**
 * Rehype plugin that injects onMount callback to activate mermaid diagrams on the client side.
 */
const rehypeSvelteMermaidClientSide: Plugin<[], HRoot> = () => {
  return (tree) => {
    appendToOrCreateScript(tree, {
      imports: `import { onMount } from 'svelte';
                import mermaid from 'mermaid';`,
      code: `onMount(async () => {
               console.log('Initializing mermaid diagrams on the client side');
               mermaid.initialize({ theme: 'dark' }); // TODO: don't forget to sync with theme switching logic when add it
               await mermaid.run();
             });`
    });
  };
};

export default rehypeSvelteMermaidClientSide;
