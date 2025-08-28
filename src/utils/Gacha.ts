export type Weighted = { weight?: number };

export function pickWeightedIndex<T extends Weighted>(items: T[]): number {
  const total = items.reduce((s, it) => s + (it.weight ?? 1), 0);
  if (items.length === 0) return 0;
  if (!(total > 0)) return items.length - 1;

  let r = Math.random() * total;
  for (let i = 0; i < items.length; i++) {
    r -= items[i].weight ?? 1;
    if (r <= 0) return i;
  }
  return items.length - 1;
}
