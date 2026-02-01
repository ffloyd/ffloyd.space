import type { Plugin } from 'unified';
import type { Root as HRoot } from 'hast';
import { h } from 'hastscript';
import './remark-parse-frontmatter.ts';

/**
 * Rehype plugin that wraps content in a layout component based on frontmatter.
 *
 * Responsible for applying layout wrapper to the content.
 * Expects frontmatter data to be present in vfile (from remarkParseFrontmatter).
 */
const rehypeApplyLayout: Plugin<[], HRoot> = () => {
  return (tree, file) => {
    const layout = file.data.frontmatter?.layout;
    if (!layout) return;

    const layoutComponent = `${layout}Layout`;

    const scriptWithImports = h('script', { lang: 'ts' }, [
      `import ${layoutComponent} from "$lib/markdown/layouts/${layout}.svelte";`
    ]);

    const wrappedInLayout = h(layoutComponent, tree.children);
    // `h` is convinient, but downcases tagName which breaks Svelte components
    wrappedInLayout.tagName = layoutComponent;

    tree.children = [scriptWithImports, wrappedInLayout];
  };
};

export default rehypeApplyLayout;
