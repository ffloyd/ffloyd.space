import type { Plugin } from 'unified';
import type { Root as HRoot } from 'hast';
import { h } from 'hastscript';
import './remark-parse-frontmatter.ts';

/**
 * Rehype plugin that injects page title and meta description into <svelte:head>.
 *
 * Responsible for:
 * - Using `file.data.title` for the page title if present.
 * - Adding meta description from `file.data.frontmatter.description` if present.
 *
 * Expects `file.data.title` to be set by rehypeExtractFirstH1 or another plugin.
 */
const rehypeSvelteHead: Plugin<[], HRoot> = () => {
  return (tree, file) => {
    const headChildren = [];

    const titleText = file.data.title;
    if (titleText) {
      headChildren.push(h('title', `${titleText} ⋄ ffloyd.space`));
    }

    const description = file.data.frontmatter?.description;
    if (description) {
      headChildren.push(h('meta', { name: 'description', content: description }));
    }

    if (headChildren.length === 0) return;

    const svelteHead = h('svelte:head', headChildren);
    tree.children.unshift(svelteHead);
  };
};

export default rehypeSvelteHead;
