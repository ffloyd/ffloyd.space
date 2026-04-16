import type { PreprocessorGroup } from 'svelte/compiler';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGFM from 'remark-gfm';
import remarkDirective from 'remark-directive';
import remarkFrontmatter from 'remark-frontmatter';
import remarkRehype from 'remark-rehype';
import rehypeShiki from '@shikijs/rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeMermaid from 'rehype-mermaid';

import remarkEmotionalHighlighting from './emotional-highlighting.ts';
import remarkParseFrontmatter from './remark-parse-frontmatter.ts';
import remarkExtractLLMText from './remark-extract-llm-text.ts';
import rehypeExtractFirstH1 from './rehype-extract-first-h1.ts';
import rehypeApplyLayout from './rehype-apply-layout.ts';
import rehypeSvelteHead from './rehype-svelte-head.ts';
import rehypeSvelteExports from './rehype-svelte-exports.ts';
import rehypeSvelteMermaidClientSide from './rehype-svelte-mermaid-client-side.ts';

// Type override so I have files metadata properly typed.
//
// Due to some reasons I'm lazy to investigate,
// if I put it in ./types.d.ts it stops workoing.
declare module 'vfile' {
  interface DataMap {
    frontmatter: {
      layout?: string;
      description?: string;
      post_id?: string;
    };
    title?: string;
    llmText?: string;
  }
}

async function md2svelte(markdown: string): Promise<string> {
  const parsed = await unified()
    .use(remarkParse)
    .use(remarkGFM)
    .use(remarkDirective)
    .use(remarkFrontmatter)
    .use(remarkParseFrontmatter)
    .use(remarkExtractLLMText)
    .use(remarkEmotionalHighlighting)
    .use(remarkRehype)
    .use(rehypeMermaid, {
      strategy: 'pre-mermaid'
    })
    // I do not want external links in markdown to replace my page on navigation 
    .use(rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] })
    .use(rehypeShiki, {
      langs: ['elixir'],
      theme: 'kanagawa-dragon'
    })
    .use(rehypeExtractFirstH1)
    .use(rehypeApplyLayout)
    .use(rehypeSvelteMermaidClientSide)
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
