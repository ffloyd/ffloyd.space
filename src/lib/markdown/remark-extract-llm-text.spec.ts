import { describe, it, expect } from 'vitest';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGFM from 'remark-gfm';
import remarkDirective from 'remark-directive';
import remarkFrontmatter from 'remark-frontmatter';
import remarkStringify from 'remark-stringify';
import { VFile } from 'vfile';

import remarkExtractLLMText from './remark-extract-llm-text.ts';

function extractLlmText(markdown: string): string {
  const result = unified()
    .use(remarkParse)
    .use(remarkGFM)
    .use(remarkDirective)
    .use(remarkFrontmatter)
    .use(remarkExtractLLMText)
    .use(remarkStringify)
    .processSync(new VFile({ value: markdown }));

  return result.data.llmText!;
}

describe('remarkExtractLLMText', () => {
  it('strips YAML frontmatter', () => {
    const result = extractLlmText(`---
layout: Vision
---

# Title`);
    expect(result).toBe('# Title');
  });

  it('hides :human[] text directives', () => {
    const result = extractLlmText('Hello :human[page-only] world');
    expect(result).toBe('Hello  world');
  });

  it('unwraps :llm[] text directives to plain text', () => {
    const result = extractLlmText('Hello :llm[llm-only] world');
    expect(result).toBe('Hello llm-only world');
  });

  it('hides :::human container directives entirely', () => {
    const result = extractLlmText(`
Before

:::human
Hidden
:::

After`);
    expect(result).toBe(`Before

After`);
  });

  it('unwraps :::llm container directives to plain content', () => {
    const result = extractLlmText(`
:::llm
Visible to LLM
:::`);
    expect(result).toBe('Visible to LLM');
  });

  it('unwraps other directives like :stoic[] to plain text', () => {
    const result = extractLlmText(':stoic[pragmatic]');
    expect(result).toBe('pragmatic');
  });

  it('handles mixed visibility directives', () => {
    const result = extractLlmText(`
# Article

Intro :human[skip this].

:::llm
Context for LLMs.
:::

End :stoic[key point].`);
    expect(result).toBe(`# Article

Intro .

Context for LLMs.

End key point.`);
  });
});
