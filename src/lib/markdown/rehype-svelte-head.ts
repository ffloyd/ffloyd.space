import type { Plugin } from 'unified';
import type { Root as HRoot, Element } from 'hast';
import { visit, EXIT } from 'unist-util-visit';
import { toString } from 'hast-util-to-string';
import { h } from 'hastscript';
import './remark-parse-frontmatter.ts';

/**
 * Rehype plugin that injects page title and meta description into <svelte:head>.
 *
 * Responsible for:
 * - Extracting the first h1 heading and using it as the page title. If no h1 is found, the plugin does nothing.
 * - Adding meta description from frontmatter if present
 */
const rehypeSvelteHead: Plugin<[], HRoot> = () => {
  return (tree, file) => {
    const headChildren = [];

    let titleText: string | null = null;
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'h1') {
        titleText = toString(node);
        return EXIT; // stop traversing, found what we need
      }
    });
    if (titleText) {
      headChildren.push(h('title', `${titleText} ⋄ ffloyd.space`));
    }

    const description = file.data.frontmatter?.description;
    if (description) {
      headChildren.push(h('meta', { name: 'description', content: description }));
    }

    const svelteHead = h('svelte:head', headChildren);
    tree.children.unshift(svelteHead);
  };
};

export default rehypeSvelteHead;
