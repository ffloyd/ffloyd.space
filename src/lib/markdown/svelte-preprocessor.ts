import type { PreprocessorGroup } from 'svelte/compiler';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkDirective from 'remark-directive';
import remarkFrontmatter from 'remark-frontmatter';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

import remarkEmotionalHighlighting from './emotional-highlighting.ts';
import remarkParseFrontmatter from './remark-parse-frontmatter.ts';
import rehypeExtractFirstH1 from './rehype-extract-first-h1.ts';
import rehypeApplyLayout from './rehype-apply-layout.ts';
import rehypeSvelteHead from './rehype-svelte-head.ts';
import rehypeSvelteExports from './rehype-svelte-exports.ts';

// Type override so I have files metadata properly typed.
//
// Due to some reasons I'm lazy to investigate,
// if I put it in ./types.d.ts it stops workoing.
declare module 'vfile' {
  interface DataMap {
    frontmatter: {
      layout?: string;
      description?: string;
    };
    title?: string;
  }
}

async function md2svelte(markdown: string): Promise<string> {
  const parsed = await unified()
    .use(remarkParse)
    .use(remarkDirective)
    .use(remarkFrontmatter)
    .use(remarkParseFrontmatter)
    .use(remarkEmotionalHighlighting)
    .use(remarkRehype)
    .use(rehypeExtractFirstH1)
    .use(rehypeApplyLayout)
    .use(rehypeSvelteHead)
    .use(rehypeSvelteExports)
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
