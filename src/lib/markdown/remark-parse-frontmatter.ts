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
    if (tree.children[0]?.type !== 'yaml') return;

    const rawFrontmatter = tree.children[0].value;
    const frontmatter = YAML.parse(rawFrontmatter);

    file.data.frontmatter = frontmatter;
  };
};

export default remarkParseFrontmatter;
