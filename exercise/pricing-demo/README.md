# pricing-demo

Fictional workshop project for the AI Coding Masterclass. Not Markant code or data.
No dependencies. Needs Node 20 or newer.

```sh
npm test                 # node --test
npm start -- A-1001 12   # article, quantity
```

- `src/articles.js`: three fictional articles, base price in integer cents
- `src/pricing.js`: `unitPriceCents()`, `totalCents()` (no tiers yet)
- `src/editView.js`, `src/displayView.js`: two text views of an article
- `test/`: unit tests
