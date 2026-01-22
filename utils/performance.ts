const renderCounts: Map<string, number> = new Map();

export function countRender(componentName: string): number {
  const count = (renderCounts.get(componentName) || 0) + 1;
  renderCounts.set(componentName, count);
  return count;
}
