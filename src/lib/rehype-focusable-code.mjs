/**
 * Spec §3.3 / correction C6: a horizontally overflowing <pre> is a scroll
 * container, so it must be reachable by keyboard and carry an accessible
 * name. Hand-rolled walk rather than pulling in unist-util-visit.
 */
export function rehypeFocusableCode() {
  return (tree) => {
    walk(tree);
  };
}

function walk(node) {
  if (node.type === 'element' && node.tagName === 'pre') {
    node.properties ??= {};
    node.properties.tabindex = 0;
    node.properties.role = 'region';
    node.properties['aria-label'] ??= 'Code block, scrollable';
  }
  for (const child of node.children ?? []) walk(child);
}
