import { formatCents, totalCents, unitPriceCents } from "./pricing.js";

// Text rendering of the article display view.
export function renderDisplayView(article, quantity) {
  return [
    `${article.name} (${article.id})`,
    `Price: ${formatCents(article.basePriceCents)}`,
    `Tier price: ${formatCents(unitPriceCents(article, quantity))}`,
    `Total for ${quantity}: ${formatCents(totalCents(article, quantity))}`
  ].join("\n");
}
