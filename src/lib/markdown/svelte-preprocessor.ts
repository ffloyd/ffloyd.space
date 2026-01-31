import type { PreprocessorGroup } from 'svelte/compiler';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkDirective from 'remark-directive';
import remarkFrontmatter from 'remark-frontmatter';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

import remarkEmotionalHighlighting from './emotional-highlighting.ts';
import { remarkParseFrontmatterContent, rehypeApplyLayout } from './frontmatter.ts';

async function md2svelte(markdown: string): Promise<string> {
  const parsed = await unified()
    .use(remarkParse)
    .use(remarkDirective)
    .use(remarkFrontmatter)
    .use(remarkParseFrontmatterContent)
    .use(remarkEmotionalHighlighting)
    .use(remarkRehype)
    .use(rehypeApplyLayout)
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
