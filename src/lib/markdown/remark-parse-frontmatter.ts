import type { Plugin } from 'unified';
import type { Root as MDRoot } from 'mdast';
import YAML from 'yaml';

/**
 * Remark plugin that parses YAML frontmatter and stores it in vfile data.
 *
 * Responsible for extracting frontmatter data and making it available to other plugins.
 * Expects remarkFrontmatter plugin to be used before this one.
 */
const remarkParseFrontmatter: Plugin<[], MDRoot> = () => {
  return (tree, file) => {
    const firstNode = tree.children[0];

    if (firstNode?.type !== 'yaml') return;

    const rawFrontmatter = firstNode.value;
    const frontmatter = YAML.parse(rawFrontmatter);

    file.data.frontmatter = frontmatter;
  };
};

export default remarkParseFrontmatter;
