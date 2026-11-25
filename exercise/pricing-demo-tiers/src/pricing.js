// Price calculation. All amounts are integer cents.

// Tier definitions: hard-coded for all articles (Module 6 makes them configurable).
const TIERS = [
  { minQuantity: 100, discountPercent: 12 },
  { minQuantity: 10, discountPercent: 5 }
];

export function unitPriceCents(article, quantity) {
  assertQuantity(quantity);
  const tier = TIERS.find((t) => quantity >= t.minQuantity);
  if (!tier) return article.basePriceCents;
  return Math.round((article.basePriceCents * (100 - tier.discountPercent)) / 100);
}

export function totalCents(article, quantity) {
  return unitPriceCents(article, quantity) * quantity;
}

export function formatCents(cents) {
  return (cents / 100).toFixed(2);
}

function assertQuantity(quantity) {
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new Error(`Quantity must be a positive integer, got: ${quantity}`);
  }
}
