import { describe, it, expect } from 'vitest';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGFM from 'remark-gfm';
import remarkDirective from 'remark-directive';
import remarkVisibility from './remark-visibility.ts';
import remarkStringify from 'remark-stringify';

const OPTS = { unwrap: ['human'], hide: ['llm'] };

function transformMarkdown(markdown: string, opts = OPTS): string {
  const result = unified()
    .use(remarkParse)
    .use(remarkGFM)
    .use(remarkDirective)
    .use(remarkVisibility, opts)
    .use(remarkStringify)
    .processSync(markdown);

  return result.toString();
}

describe('remarkVisibility', () => {
  it('removes :::llm container directives', () => {
    const result = transformMarkdown(`
Before

:::llm
Removed
:::

After`);
    expect(result).toBe(`Before

After
`);
  });

  it('removes :llm[] text directives', () => {
    const result = transformMarkdown('Hello :llm[removed] world');
    expect(result).toBe('Hello  world\n');
  });

  it('removes ::llm leaf directives', () => {
    const result = transformMarkdown(`
Hello

::llm[removed]{id=test}`);
    expect(result).toBe(`Hello
`);
  });

  it('unwraps :::human container directives', () => {
    const result = transformMarkdown(`
:::human
Visible content
:::`);
    expect(result).toBe(`Visible content
`);
  });

  it('unwraps :human[] text directives', () => {
    const result = transformMarkdown('Hello :human[visible] world');
    expect(result).toBe('Hello visible world\n');
  });

  it('leaves unknown directives untouched in the tree', () => {
    const result = transformMarkdown(`:::unknown
Should stay
:::

:unknown[also stays]`);
    expect(result).toBe(`:::unknown
Should stay
:::

:unknown[also stays]
`);
  });

  it('handles mixed content with both visibility types', () => {
    const result = transformMarkdown(`
# Article

Public text :llm[hidden].

:::human
Human-only section.
:::

:::llm
LLM-only content.
:::

End.`);
    expect(result).toBe(`# Article

Public text .

Human-only section.

End.
`);
  });

  it('is configurable with custom directive names', () => {
    const result = transformMarkdown(
      `
:::internal
Secret
:::

Visible`,
      { unwrap: [], hide: ['internal'] }
    );
    expect(result).toBe(`Visible
`);
  });
});
