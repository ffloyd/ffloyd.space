import type { Plugin } from 'unified';
import type { Root as HRoot } from 'hast';
import { h } from 'hastscript';
import appendToOrCreateScript from './append-to-or-create-script.ts';

/**
 * Rehype plugin that wraps content in a layout component based on frontmatter.
 *
 * Responsible for applying layout wrapper to the content.
 * Expects frontmatter data to be present in vfile (from remarkParseFrontmatter).
 */
const rehypeApplyLayout: Plugin<[], HRoot> = () => {
  return (tree, file) => {
    const layout = file.data.frontmatter?.layout;
    const mastodonPostId = file.data.frontmatter?.post_id;
    if (!layout) return;

    const layoutComponent = `${layout}Layout`;
    const wrappedInLayout = h(layoutComponent, { mastodonPostId }, tree.children);
    // `h` is convinient, but downcases tagName which breaks Svelte components
    wrappedInLayout.tagName = layoutComponent;

    tree.children = [wrappedInLayout];

    appendToOrCreateScript(tree, {
      imports: `import ${layoutComponent} from "$lib/markdown/layouts/${layout}.svelte";`
    });
  };
};

export default rehypeApplyLayout;
