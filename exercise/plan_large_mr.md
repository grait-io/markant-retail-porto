# Plan: PRC-214 tier pricing (the plan the merge request claims to implement)

*Fictional. Use with `pricing-demo-large-mr.patch` in Module 8.*

**Goal:** show the tier unit price and the total in the edit view and the display view.

**Constraints**
- All amounts stay integer cents. No floats.
- Both views use the same function `unitPriceCents()`.
- Existing tests are not changed.

**Acceptance criteria**
- Quantity 1–9: base price. Quantity 10–99: 5 % off. Quantity 100 and more: 12 % off. 10 and 100 are included.
- Unit price is rounded half-up to the cent, then multiplied by the quantity.
- `formatCents()` output is unchanged (`1.29`).

**Non-goals:** no configuration per article, no caching, no events, no currency or locale formatting.

**First test:** `unitPriceCents(oat, 10)` equals `123`.

## How to apply the patch

Take a **fresh copy** of `exercise/pricing-demo/`:

```sh
cd exercise
cp -R pricing-demo pricing-demo-review && cd pricing-demo-review
git init -q && git add -A && git commit -qm base
git checkout -b large-mr
git apply ../pricing-demo-large-mr.patch
git add -A && git commit -qm "PRC-214 tier pricing"
npm test                              # 11 tests, green
git diff base...large-mr > ../mr.diff
```

Then review `mr.diff` against this plan using your Cursor-native subagents (`goldfish-diff`
and the `goldfish-simplify` subagent you built in Module 8), or fallback Prompts 2 and 3
in `kit/goldfish_manual_prompt.md` in a **new** chat.
