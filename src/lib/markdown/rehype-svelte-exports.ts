import type { Plugin } from 'unified';
import type { Root as HRoot } from 'hast';
import { h } from 'hastscript';
import './remark-parse-frontmatter.ts';

/**
 * Rehype plugin that injects module-level exports for title and description.
 *
 * Responsible for prepending a <script module lang="ts"> block with:
 * - export const title = "..." or undefined
 * - export const description = "..." or undefined
 *
 * These exports allow consumers to import metadata from the .svelte.md module.
 * Expects `file.data.title` and `file.data.frontmatter.description` to be set.
 */
const rehypeSvelteExports: Plugin<[], HRoot> = () => {
  return (tree, file) => {
    const title = file.data.title;
    const description = file.data.frontmatter?.description;

    const titleExport = `export const title = ${JSON.stringify(title ?? null)};`;
    const descriptionExport = `export const description = ${JSON.stringify(description ?? null)};`;

    const moduleScript = h('script', { module: true, lang: 'ts' }, [
      titleExport,
      descriptionExport
    ]);

    tree.children.unshift(moduleScript);
  };
};

export default rehypeSvelteExports;
