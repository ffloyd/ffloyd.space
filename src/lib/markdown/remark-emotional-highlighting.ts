import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';
import type { Plugin } from 'unified';

/**
 * Remark plugin that transforms emotional highlighting directives into styled spans.
 *
 * Responsible for converting `:happy[text]` syntax into HTML spans with appropriate
 * CSS classes for emotional emphasis in reading contexts.
 *
 * Expects remark-directive to be loaded before this plugin.
 *
 * Usage in Markdown:
 * - `:happy[text]` → <span class="text-content-reading-happy">text</span>
 */
const remarkEmotionalHighlighting: Plugin<[], Root> = () => {
  return (tree: Root) => {
    visit(tree, (node) => {
      // Text directives has :directive[content] syntax.
      if (node.type !== 'textDirective') return;

      let klass: string;

      switch (node.name) {
        case 'happy':
          klass = 'text-content-reading-happy';
          break;
        case 'stoic':
          klass = 'text-content-reading-stoic';
          break;
        default:
          return; // Skip unrecognized directives
      }

      // Handle :happy[text] directive
      if (klass) {
        const data = node.data || (node.data = {});

        data.hName = 'span';
        data.hProperties = {
          class: klass
        };
      }
    });
  };
};

export default remarkEmotionalHighlighting;
