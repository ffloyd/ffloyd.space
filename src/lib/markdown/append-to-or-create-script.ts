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
  const { imports: importsToAdd, code: codeToAppend, module: svelteModuleScript } = script;
  const existingScript = findScript(tree, !!svelteModuleScript);

  if (existingScript) {
    if (importsToAdd)
      existingScript.children.unshift({
        type: 'text',
        value: `${importsToAdd}\n\n`
      });

    if (codeToAppend)
      existingScript.children.push({
        type: 'text',
        value: `\n\n${codeToAppend}`
      });
  } else {
    const props: Properties = { lang: 'ts' };

    if (svelteModuleScript) props.module = true;

    const content = [importsToAdd, codeToAppend].filter(Boolean).join('\n\n');

    tree.children.unshift(h('script', props, content));
  }
}

function findScript(tree: HRoot, findModuleScript: boolean): Element | undefined {
  return tree.children.find((child) => {
    const isScriptTag =
      child.type === 'element' && child.tagName === 'script' && child.properties.lang === 'ts';

    const isModuleScript = child.type === 'element' && child.properties.module === true;

    return isScriptTag && (!findModuleScript || isModuleScript);
  }) as Element | undefined;
}
