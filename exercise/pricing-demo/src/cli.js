import { getArticle } from "./articles.js";
import { renderEditView } from "./editView.js";
import { renderDisplayView } from "./displayView.js";

const [id = "A-1001", qty = "1"] = process.argv.slice(2);
const article = getArticle(id);
const quantity = Number(qty);
console.log(renderEditView(article, quantity));
console.log("---");
console.log(renderDisplayView(article, quantity));
