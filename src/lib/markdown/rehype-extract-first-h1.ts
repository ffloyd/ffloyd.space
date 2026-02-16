import type { Plugin } from 'unified';
import type { Root as HRoot } from 'hast';
import { visit, EXIT } from 'unist-util-visit';
import { toString } from 'hast-util-to-string';

import './remark-parse-frontmatter.ts';

/**
 * Rehype plugin that extracts the first h1 heading and stores it in vfile data.
 */
const rehypeExtractFirstH1: Plugin<[], HRoot> = () => {
  return (tree, file) => {
    let titleText: string | null = null;

    visit(tree, 'element', (node) => {
      if (node.tagName === 'h1') {
        titleText = toString(node).trim();
        return EXIT;
      }
    });

    if (titleText) {
      file.data.title = titleText;
    }
  };
};

export default rehypeExtractFirstH1;
