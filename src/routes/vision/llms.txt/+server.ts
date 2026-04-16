import type { RequestHandler } from '@sveltejs/kit';
import { text } from '@sveltejs/kit';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGFM from 'remark-gfm';
import remarkStringify from 'remark-stringify';
import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Root } from 'mdast';

import articles from '../articles.ts';

export const prerender = true;

export const GET: RequestHandler = async () => {
  const articleSections =
    Object.values(articles).map(({ llmText }) => shiftHeadings(llmText));

  const parts: string[] = [
    '# Vision - ffloyd.space',
    '',
    '> Hard opinions about software development from ffloyd.space',
    '',
    articleSections.join('\n\n')
  ];

  return text(parts.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
};

const shiftHeadings = (markdown: string): string => (
  unified()
    .use(remarkParse)
    .use(remarkGFM)
    .use(remarkShiftHeadings, { depth: 1 })
    .use(remarkStringify)
    .processSync(markdown)
    .value
    .toString()
);

const remarkShiftHeadings: Plugin<[{ depth: number }], Root> = ({ depth }) => {
  return (tree) => {
    visit(tree, 'heading', (node) => {
      node.depth = Math.min(node.depth + depth, 6) as 1 | 2 | 3 | 4 | 5 | 6;
    });
  };
};

