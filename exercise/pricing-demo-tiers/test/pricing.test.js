import test from "node:test";
import assert from "node:assert/strict";
import { getArticle } from "../src/articles.js";
import { unitPriceCents, totalCents, formatCents } from "../src/pricing.js";
import { renderDisplayView } from "../src/displayView.js";
import { renderEditView } from "../src/editView.js";

const oat = getArticle("A-1001");

test("unit price is the base price for one unit", () => {
  assert.equal(unitPriceCents(oat, 1), 129);
});

test("total is unit price times quantity", () => {
  assert.equal(totalCents(oat, 3), 387);
});

test("quantity must be a positive integer", () => {
  assert.throws(() => unitPriceCents(oat, 0));
  assert.throws(() => unitPriceCents(oat, 1.5));
});

test("formatCents shows two decimals", () => {
  assert.equal(formatCents(129), "1.29");
});

test("display view shows price and total", () => {
  const out = renderDisplayView(oat, 3);
  assert.match(out, /Price: 1\.29/);
  assert.match(out, /Total for 3: 3\.87/);
});

test("edit view shows the quantity field", () => {
  assert.match(renderEditView(oat, 3), /Quantity:\s+\[3\]/);
});

test("unknown article throws", () => {
  assert.throws(() => getArticle("nope"));
});

test("tier boundaries: 10 and 100 units are included", () => {
  assert.equal(unitPriceCents(oat, 9), 129);
  assert.equal(unitPriceCents(oat, 10), 123);
  assert.equal(unitPriceCents(oat, 99), 123);
  assert.equal(unitPriceCents(oat, 100), 114);
});

test("both views show the same tier price", () => {
  assert.match(renderEditView(oat, 10), /Tier price: 1\.23/);
  assert.match(renderDisplayView(oat, 10), /Tier price: 1\.23/);
});
