# Plan: PRC-214 tier pricing (the plan the merge request claims to implement)

*Fictional. Optional practice for after the workshop, with `pricing-demo-large-mr.patch`. In the room, Module 8 reviews a real diff from your own repository.*

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
git init -q -b base && git add -A && git commit -qm base
git checkout -b large-mr
git apply ../pricing-demo-large-mr.patch
git add -A && git commit -qm "PRC-214 tier pricing"
npm test                              # 11 tests, green
git diff base...large-mr --output=mr.diff
cp ../plan_large_mr.md .
bash ../../kit/install_kit.sh .       # gives this folder /goldfish
```

Then open `exercise/pricing-demo-review/` in Cursor. In a **new Agent chat** type
`/goldfish diff mr.diff plan_large_mr.md`. Without subagents: Prompts 2 and 3 in
`.cursor/goldfish_manual_prompt.md`, each in a new chat.
