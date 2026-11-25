import { formatCents } from "./pricing.js";

// Text rendering of the article edit view.
export function renderEditView(article, quantity) {
  return [
    `EDIT ${article.id}`,
    `Name:       [${article.name}]`,
    `Base price: [${formatCents(article.basePriceCents)}]`,
    `Quantity:   [${quantity}]`
  ].join("\n");
}
