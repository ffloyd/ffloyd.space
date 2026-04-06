import type { Plugin } from 'unified';
import type { Root as HRoot } from 'hast';
import appendToOrCreateScript from './append-to-or-create-script.ts';
import './remark-parse-frontmatter.ts';

/**
 * Rehype plugin that injects module-level exports for frontmatter and extacted title.
 *
 * These exports allow consumers to import metadata from the .svelte.md module.
 */
const rehypeSvelteExports: Plugin<[], HRoot> = () => {
  return (tree, file) => {
    const title = file.data.title;
    const frontmatter = file.data.frontmatter || {};

    // frontmatter title has more priority than extacted
    const valuesForExport = { title, ...frontmatter };

    const exports = Object.entries(valuesForExport)
      .filter(([, value]) => !!value)
      .map(([key, value]) => `export const ${key} = ${JSON.stringify(value ?? null)};`);

    appendToOrCreateScript(tree, {
      code: exports.join('\n'),
      module: true
    });
  };
};

export default rehypeSvelteExports;
