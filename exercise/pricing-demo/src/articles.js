// Fictional data. Base prices are integer cents.
export const articles = {
  "A-1001": { id: "A-1001", name: "Oat drink 1 l", basePriceCents: 129 },
  "A-1002": { id: "A-1002", name: "Espresso beans 500 g", basePriceCents: 799 },
  "A-1003": { id: "A-1003", name: "Dish soap 750 ml", basePriceCents: 199 }
};

export function getArticle(id) {
  const article = articles[id];
  if (!article) throw new Error(`Unknown article: ${id}`);
  return article;
}
