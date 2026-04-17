import { remove } from 'unist-util-remove';

import type { Node as MdastNode, Root } from 'mdast';
import type { Plugin } from 'unified';
import type { Test } from 'unist-util-is';

import { unwrap as unwrapInTree, isDirectiveNode } from './mdast-utils.ts';

/**
 * Remark plugin that processes visibility directives (:::human, :::llm, :human[], :llm[], ::human[], etc.)
 * to control which content appears in the rendered page.
 *
 * Directives whose names are in `hide` are removed entirely (with cascade — empty parents are also removed).
 * Directives whose names are in `unwrap` are unwrapped (children kept as normal content).
 * Directives whose names are NOT in either set are left untouched for other plugins to handle.
 *
 * Expects remark-directive to be loaded before this plugin.
 */
const remarkVisibility: Plugin<[{ unwrap: string[]; hide: string[] }], Root> = ({
  unwrap,
  hide
}) => {
  return (tree: Root) => {
    remove(
      tree,
      ((node: MdastNode) => isDirectiveNode(node) && hide.includes(node.name)) as Test
    );

    unwrapInTree(tree, (node) => isDirectiveNode(node) && unwrap.includes(node.name));
  };
};

export default remarkVisibility;
