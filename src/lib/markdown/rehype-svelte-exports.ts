import type { Plugin } from 'unified';
import type { Root as HRoot } from 'hast';
import appendToOrCreateScript from './append-to-or-create-script.ts';
import './remark-parse-frontmatter.ts';

/**
 * Rehype plugin that injects module-level exports.
 *
 * It handles exporting the title, llmText, and all frontmatter properties as named exports from the .svelte.md module.
 */
const rehypeSvelteExports: Plugin<[], HRoot> = () => {
  return (tree, file) => {
    const title = file.data.title;
    const frontmatter = file.data.frontmatter || {};
    const llmText = file.data.llmText || null;

    const valuesForExport = { title, llmText, ...frontmatter };

    const exports = Object.entries(valuesForExport)
      .filter(([, value]) => !!value)
      .map(([key, value]) => `export const ${key} = ${JSON.stringify(value!)};`);

    appendToOrCreateScript(tree, {
      code: exports.join('\n'),
      module: true
    });
  };
};

export default rehypeSvelteExports;
