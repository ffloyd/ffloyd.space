import type { Element, Root as HRoot, Properties } from 'hast';
import { h } from 'hastscript';

/**
 * Finds or creates a regular `<script lang="ts">` or `<script lang="ts" module>` element and updates its content.
 *
 * Imports are prepended to existing imports, code is appended after existing code.
 * This allows multiple rehype plugins to share the same script element.
 */
export default function appendToOrCreateScript(
  tree: HRoot,
  script: {
    imports?: string;
    code?: string;
    module?: boolean;
  }
): void {
  const existingScript = tree.children.find((child) => {
    const isScriptTag =
      child.type === 'element' && child.tagName === 'script' && child.properties.lang === 'ts';

    const isModuleScript = child.type === 'element' && child.properties.module === true;

    return isScriptTag && (!script.module || isModuleScript);
  }) as Element;

  if (existingScript) {
    if (script.imports) {
      existingScript.children.unshift({
        type: 'text',
        value: `${script.imports}\n\n`
      });
    }

    if (script.code) {
      existingScript.children.push({
        type: 'text',
        value: `\n\n${script.code}`
      });
    }
  } else {
    const props: Properties = { lang: 'ts' };
    if (script.module) {
      props.module = true;
    }

    const content = [script.imports, script.code].filter(Boolean).join('\n\n');

    tree.children.unshift(h('script', props, content));
  }
}
