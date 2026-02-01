import type { PreprocessorGroup } from 'svelte/compiler';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkDirective from 'remark-directive';
import remarkFrontmatter from 'remark-frontmatter';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

import remarkEmotionalHighlighting from './emotional-highlighting.ts';
import remarkParseFrontmatter from './remark-parse-frontmatter.ts';
import rehypeApplyLayout from './rehype-apply-layout.ts';
import rehypeSvelteHead from './rehype-svelte-head.ts';

async function md2svelte(markdown: string): Promise<string> {
  const parsed = await unified()
    .use(remarkParse)
    .use(remarkDirective)
    .use(remarkFrontmatter)
    .use(remarkParseFrontmatter)
    .use(remarkEmotionalHighlighting)
    .use(remarkRehype)
    .use(rehypeApplyLayout)
    .use(rehypeSvelteHead)
    .use(rehypeStringify)
    .process(markdown);

  return parsed.value.toString();
}

function sveltePreprocessor(): PreprocessorGroup {
  return {
    name: 'markdown-svelte-preprocessor',
    markup: async ({ content, filename }) => {
      if (!filename?.endsWith('.svelte.md')) return;

      const svelteMarkup = await md2svelte(content);

      return { code: svelteMarkup };
    }
  };
}

export default sveltePreprocessor;
