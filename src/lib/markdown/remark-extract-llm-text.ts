import { remove } from 'unist-util-remove';
import { toMarkdown } from 'mdast-util-to-markdown';
import { gfmToMarkdown } from 'mdast-util-gfm';

import type { Node as MdastNode, Root } from 'mdast';
import type { Plugin } from 'unified';
import type { Test } from 'unist-util-is';

import { unwrap, isDirectiveNode } from './mdast-utils.ts';

/**
 * Remark plugin that serializes the MDAST tree into clean LLM-friendly markdown (llms.txt).
 *
 * Produces a plain-text version of the article suitable for LLM context windows.
 * Removes YAML frontmatter and :::human / :human[] directives (page-only content).
 * Unwraps all remaining directives (:::llm, :stoic[], etc.) to their text content.
 *
 * Does NOT mutate the original tree — clones it before processing.
 *
 * Expects remarkGFM, remarkDirective, and remarkFrontmatter to have already run.
 *
 * Stores the result in `file.data.llmText`.
 */
const remarkExtractLLMText: Plugin<[], Root> = () => {
  return (tree, file) => {
    const result = structuredClone(tree);

    remove(
      result,
      ((node: MdastNode) =>
        (isDirectiveNode(node) && node.name === 'human') || node.type === 'yaml') as Test
    );

    unwrap(result, isDirectiveNode);

    file.data.llmText = toMarkdown(result, {
      extensions: [gfmToMarkdown()]
    }).trim();
  };
};

export default remarkExtractLLMText;
