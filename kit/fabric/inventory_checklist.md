# Inventory fabric checklist (Day 2 · Module 7)

**Outcome:** a map you would open before changing unfamiliar code in *this* tree
(not a longer chat, not a herdr install).

- [ ] Copied `kit/fabric/` stubs into the repo (or opened fallback `work/pricing-demo-worktrees/`)
- [ ] Chose **one subsystem** (and ideally one ticket/flow across its boundary)
- [ ] Filled `context/<module>/context.md`: purpose, entry points, **callers/consumers**, data owned, **Verify** command, 3 conventions + exemplar paths that **exist in this tree**, `related:`, traps (legacy/exceptions)
- [ ] Thin `AGENTS.md` points at `context/` first (≤15 lines; progressive disclosure; no secrets in maps)
- [ ] **New Agent chat** → `goldfish-map` on the context file(s) (fallback: Prompt 5)
- [ ] Every finding accepted or rejected (0 findings OK)
- [ ] Optional: skim `LESSONS.md` — promote only findings seen **twice**
