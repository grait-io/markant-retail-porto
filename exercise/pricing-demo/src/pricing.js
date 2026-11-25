// Price calculation. All amounts are integer cents.

export function unitPriceCents(article, quantity) {
  assertQuantity(quantity);
  return article.basePriceCents;
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
