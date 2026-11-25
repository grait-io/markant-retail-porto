# Tasks for Modules 3 & 4: parallel agents in worktrees

## Start (clean git baseline — required for Cursor Worktrees)

Run the one-command setup script from the workshop kit root (or copy manually):

```sh
# macOS / Linux / Git Bash
bash exercise/setup_day1.sh
# Windows PowerShell
powershell -ExecutionPolicy Bypass -File exercise/setup_day1.ps1
```

Then open **`work/pricing-demo-worktrees/`** in Cursor. It is a clean copy of
`exercise/pricing-demo-tiers/` (9/9 passing tests) with `.cursor/` installed and a
clean git `base` branch so Cursor's **Worktree** mode works immediately.

Always start Part A and Part B from the clean `base` commit (`git checkout base`) so
exercises do not collide.

---

## Part A (Module 3 · 11:40): split one task across two parallel agents

**Why parallel agents fail in practice:** two agents edit the same source file *or*
append to the same test file (`test/pricing.test.js`), causing merge conflicts.
`npm test` runs `node --test`, which automatically discovers **every** `test/*.test.js`
file — so giving each agent its own module **and its own test file** guarantees a clean merge.

### Step 1 — Agree on the file-disjoint split (5 min)

Either run `/speckit.tasks` on your validated Module 2 spec, **or** use this ready-made
two-slice split on `work/pricing-demo-worktrees/`:

| Slice | Worktree / branch | Files owned (write scope) | Must NOT touch | Verification |
|---|---|---|---|---|
| **T1 · Valid-from price schedule** | `agent-a` | `src/validity.js`, `test/validity.test.js` | `src/pricing.js`, `src/displayView.js`, `src/editView.js`, `test/pricing.test.js` | `node --test test/validity.test.js` |
| **T2 · Next-tier savings hint** | `agent-b` | `src/displayView.js`, `test/displayView.test.js` | `src/pricing.js`, `src/validity.js`, `src/editView.js`, `test/pricing.test.js` | `node --test test/displayView.test.js` |

### Step 2 — Run both agents in parallel worktrees (15 min)

Open **two Agent tabs** in Cursor, switch both from `Local` → **`Worktree`**, and send one prompt to each:

**Prompt for Agent A (`T1 · Valid-from price schedule`):**

```text
Work ONLY inside src/validity.js and test/validity.test.js.
Do NOT modify src/pricing.js, src/displayView.js, src/editView.js, or test/pricing.test.js.

Implement two pure functions (all prices are integer cents, ISO dates "YYYY-MM-DD"):
1. activePriceCents(schedule, onDate): returns the basePriceCents of the latest entry
   with validFrom <= onDate. Throw an Error if no entry is valid on onDate.
2. nextScheduledPrice(schedule, onDate): returns the earliest entry with validFrom > onDate,
   or null if none exists.

Write failing tests in test/validity.test.js first, run `npm test`, then implement until all tests pass.
```

**Prompt for Agent B (`T2 · Next-tier savings hint`):**

```text
Work ONLY inside src/displayView.js and test/displayView.test.js.
Do NOT modify src/pricing.js, src/validity.js, src/editView.js, or test/pricing.test.js.

In renderDisplayView(article, quantity), keep all existing output lines unchanged so existing tests pass,
and append one hint line when a higher discount tier exists:
- If quantity < 10:  "Next tier: 10+ units at <price>" (using unitPriceCents(article, 10))
- If 10 <= quantity < 100:  "Next tier: 100+ units at <price>" (using unitPriceCents(article, 100))
- If quantity >= 100: omit the hint line.

Write failing tests in test/displayView.test.js first, run `npm test`, then implement until all tests pass.
```

*Fallback if Cursor Worktrees UI is unavailable:*

```sh
git worktree add ../pricing-wt-a -b agent-a base
git worktree add ../pricing-wt-b -b agent-b base
# Open each folder in its own Cursor window
```

### Step 3 — Integrate yourself and check (10 min)

1. Apply/merge both worktree branches back onto `base` (in Cursor UI or `git merge agent-a && git merge agent-b`).
2. Run `npm test` — confirm all 9 baseline tests plus both new test files pass with **zero merge conflicts**.
3. Check against **"Signs that delegation is failing"**:
   - Did both sub-tasks have a verifiable goal?
   - Did either agent violate its file ownership?
   - Was reading the two diffs faster than doing it serially?

---

## Part B (Module 4 · 13:30): Best of N

Reset to clean `base` (`git checkout base`), then run this prompt across **two or three
models/agents in parallel worktrees** (Cursor's *Use Multiple Models* / *Best of N*
toggle, or manual `git worktree add` branches). Do not edit by hand.

```text
In pricing-demo-tiers, tier definitions are hard-coded in src/pricing.js.
Make tiers configurable per article without changing the public behaviour
of unitPriceCents() and totalCents() for existing callers.
Write the tests first (in a new file test/customTiers.test.js), confirm they fail,
then implement. Do not change existing tests.
```

Compare the branches:
- Which diff is smallest (`git diff --stat`)?
- Did any model change a public signature or add unrequested classes/abstractions?
- Do the added tests check **behaviour** or internal implementation?

Apply/merge the winning branch and state **why in one concrete sentence**.
