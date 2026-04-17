import type { Node as MdastNode, Root } from 'mdast';
import type { TextDirective, LeafDirective, ContainerDirective } from 'mdast-util-directive';
import { visit } from 'unist-util-visit';

export type DirectiveNode = TextDirective | LeafDirective | ContainerDirective;

export function isDirectiveNode(node: MdastNode): node is DirectiveNode {
  return ['containerDirective', 'leafDirective', 'textDirective'].includes(node.type);
}

export function unwrap(tree: Root, test: (node: MdastNode) => boolean): void {
  visit(tree, (node, index, parent) => {
    if (!test(node)) return;

    const children = 'children' in node ? node.children : [];
    parent!.children.splice(index!, 1, ...children);
    return index;
  });
}
