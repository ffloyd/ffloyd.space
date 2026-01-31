import type { Plugin } from 'unified';
import type { Root as MDRoot } from 'mdast';
import type { Root as HRoot } from 'hast';
import { h } from 'hastscript';
import YAML from 'yaml';

declare module 'vfile' {
  interface DataMap {
    frontmatter: {
      layout?: string;
    };
  }
}

/**
 * Remark plugin that parses YAML frontmatter and stores it in vfile data.
 *
 * Responsible for extracting layout information from frontmatter.
 * Expects remarkFrontmatter plugin to be used before this one.
 */
export const remarkParseFrontmatterContent: Plugin<[], MDRoot> = () => {
  return (tree, file) => {
    if (tree.children[0]?.type !== 'yaml') return;

    const rawFrontmatter = tree.children[0].value;
    const frontmatter = YAML.parse(rawFrontmatter);

    const layout = frontmatter.layout as string | undefined;
    file.data.frontmatter = { layout };
  };
};

/**
 * Rehype plugin that wraps content in a layout component based on frontmatter.
 *
 * Responsible for applying layout wrapper to the content.
 * Expects frontmatter data to be present in vfile (from remarkParseFrontmatterContent).
 */
export const rehypeApplyLayout: Plugin<[], HRoot> = () => {
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
