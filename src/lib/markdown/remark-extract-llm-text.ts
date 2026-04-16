import type { Plugin } from 'unified';
import type { Root } from 'mdast';
import { toMarkdown } from 'mdast-util-to-markdown';
import { gfmToMarkdown } from 'mdast-util-gfm';

/**
 * Remark plugin that serializes the MDAST tree into clean LLM-friendly markdown (llms.txt).
 *
 * Responsible for producing a plain-text version of the article suitable for
 * injection into LLM context windows. Strips YAML frontmatter
 * and unwrap directive nodes (like `:stoic[text]`) to their text content.
 *
 * Expects remarkGFM, remarkDirective, and remarkParseFrontmatter to have already run.
 *
 * Stores the result in `file.data.llmText`.
 */
const remarkExtractLLMText: Plugin<[], Root> = () => {
  return (tree, file) => {
    file.data.llmText = toMarkdown(tree, {
      // toMarkdown throws on unknown node types (e.g. GFM strikethrough),
      // so gfmToMarkdown is required because remarkGFM runs upstream and produces
      // GFM-specific nodes that core handlers don't cover, but we want to preserve
      // GFM-specific nodes in llms.txt.
      extensions: [gfmToMarkdown()],
      handlers: {
        // Directives like :stoic[text] have no meaning in LLM context,
        // unwrap them to just their text content.
        textDirective(node, _parent, state, info) {
          return state.containerPhrasing(node, info);
        },
        // llms.txt should not include YAML frontmatter.
        yaml() { return ''; }
      }
    }).trim();
  };
};

export default remarkExtractLLMText;
