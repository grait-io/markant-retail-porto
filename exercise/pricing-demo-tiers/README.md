# pricing-demo-tiers

Starting state for Module 6: `pricing-demo` with tier pricing already implemented (10 units 5 %, 100 units 12 %, both included).
For worktrees it must be a git repository: `git init && git add -A && git commit -m base`.

Fictional workshop project for the AI Coding Masterclass. Not Markant code or data.
No dependencies. Needs Node 20 or newer.

```sh
npm test                 # node --test
npm start -- A-1001 12   # article, quantity
```

- `src/articles.js`: three fictional articles, base price in integer cents
- `src/pricing.js`: `unitPriceCents()`, `totalCents()` (tiers hard-coded)
- `src/editView.js`, `src/displayView.js`: two text views of an article
- `test/`: unit tests
