---
name: advanced-elicitation
description: >-
  Collaborative BMAD-style Advanced Elicitation for Cursor. Diagnoses weak spots
  in a draft, spec, plan, or decision, proposes 3 complementary elicitation
  methods from the 48-method BMAD catalog across 6 directions so the user can
  decide or swap methods, runs each chosen method in a cold read-only subagent,
  and merges findings into one numbered revision the user accepts or rejects.
  Use when the user asks for "advanced elicitation", "/elicit", or wants to
  stress-test a spec, plan, architecture choice, or draft with structured
  critique methods.
---
<!-- Adapted for Cursor from bmad-code-org/BMAD-METHOD (commit e435a225, MIT License). -->
# Advanced Elicitation (BMAD Method for Cursor)

A first draft is the most likely draft: centered, agreeable with its own prompt,
and biased toward adding rather than questioning. This skill works **with the
user** to diagnose where a draft is probably weak, pick structured critique
methods from the 48-method catalog, run each method through a **cold, read-only
reader** (no author reasoning, no chat history), and merge what they find into
one numbered revision. **Nothing in the target changes until the user accepts.**

## Catalog Helper (zero dependencies, Node 20+)

Do **not** dump all 48 methods into chat unless the user asks. Query
`assets/methods.csv` on demand using `scripts/pick_methods.mjs` (relative to
this skill folder `.cursor/skills/advanced-elicitation/`):

```sh
# 1. Cheap map of the 6 directions (wrong, missing, premise, simplify, future, other-side)
node .cursor/skills/advanced-elicitation/scripts/pick_methods.mjs directions

# 2. Core index (22 recommended methods across all 6 directions)
node .cursor/skills/advanced-elicitation/scripts/pick_methods.mjs list --tier core

# 3. Full details (including exact `form` line) for chosen methods by number or name
node .cursor/skills/advanced-elicitation/scripts/pick_methods.mjs show 2 15 20

# 4. Random surprise spread (at most one per direction)
node .cursor/skills/advanced-elicitation/scripts/pick_methods.mjs random -n 3 --tier core --spread

# 5. Full 48-method catalog (only when the user explicitly asks to see everything)
node .cursor/skills/advanced-elicitation/scripts/pick_methods.mjs list --all
```

If terminal commands are unavailable, read `assets/methods.csv` directly.

## Step 1 — Identify the Target & Diagnose Weak Spots

1. **Target:** whatever file, section, or recent decision the user pointed at
   (e.g. `specs/<feature>/spec.md`, `specs/<feature>/plan.md`, or the last
   architectural choice in chat). Stop and ask only if there is no clear target.
2. **Read `list --tier core`** (and `list --direction <d>` if needed) to pick
   methods without guessing names.
3. **Diagnose in 1–2 lines** where this specific draft is probably weak across
   the 6 directions:
   - `wrong` (errors, boundaries, contradictions, failure modes)
   - `missing` (stakeholders, assumptions, second-order effects)
   - `premise` (first principles, reframing the problem, altitude)
   - `simplify` (subtraction, Feynman clarity, decomposition)
   - `future` (pre-mortem, cascading failure, what-if scenarios)
   - `other-side` (steelmanning, red team, Socratic questioning)

## Step 2 — Propose & Decide Methods With the User

- **If the user already named methods** (e.g. *"/elicit with Pre-mortem and Red Team"*):
  fetch their `show` rows, note in one line if any is an odd fit, and proceed
  straight to Step 3.
- **If the user asked for a surprise:** run `random -n 3 --tier core --spread`,
  show the 3 drawn methods, and proceed to Step 3.
- **Otherwise (default — interactive proposal):** propose **3 methods from 3
  different directions**:
  1. **Primary fit** — targets the draft's biggest likely weak spot.
  2. **Secondary fit** — targets a second, different weak spot (or an open push
     for a tiny 1–5 line decision).
  3. **Wildcard** — a method from a third direction whose critique is hardest to
     predict for this draft.

Present them cleanly in one short message:

- **Target:** `<path or topic>`
- **Likely weak spots:** 1–2 crisp lines
- **Proposed methods (3 directions):**
  1. `#<num> <Method Name>` (`<direction>`) — *why this fits here*
  2. `#<num> <Method Name>` (`<direction>`) — *why this fits here*
  3. `#<num> <Method Name>` (`<direction>`, wildcard) — *why this pushes off center*
- **Your call:** reply `go` (run all 3), swap any slot (e.g. `swap 3 for Red Team`
  or `list missing` / `list all`), or `random` for a fresh spread.

Wait for the user's pick before launching the round.

## Step 3 — Run the Cold-Reader Round (Parallel, Fresh Context)

Fetch the exact `show` row (including `form:`) for each chosen method. Launch
**all chosen methods at once in parallel**, each in its own **fresh, read-only
subagent** against the exact same version of the target.

Give each subagent **ONLY** this 5-part brief — **never** pass conversation
history, author justifications, or hints about what you think is wrong:

1. **Target:** exact file path (and section if partial), or the quoted passage
   if it exists only in chat. Note that document headings/template slots are a
   constraint, not content to rewrite.
2. **Purpose & consumer:** 1–2 lines on who reads/uses this and why.
3. **Settled decisions (do not reopen):** 1 bullet per constraint already fixed
   or alternative already rejected.
4. **Method:** quote exact `method_name`, `description`, and `form` from `show`.
5. **Output format:** apply the method's `form` concisely (sized to the target),
   then a `## Findings` list with at most **5 concrete findings**, each with:
   `Location | What is wrong or missing | Proposed change`. Specific to this
   draft only; no generic boilerplate.
   End the brief with: *"Return only text. Do not edit files, run write commands,
   or spawn subagents. Read only the named target file(s)."*

*Multi-voice methods* (`Stakeholder Lens`, `Expert Panel`, `Debate`, `Delphi
Method`, `Cross-Functional War Room`, `Security Audit Personas`): launch one
isolated subagent per voice so voices cannot see or anchor each other.

*Fallback if subagents are unavailable:* tell the user in one line and either
offer the self-contained brief to paste into a **new Cursor chat**, or run at
most 2 pushes sequentially reading strictly from the target file.

## Step 4 — Merge Into One Proposed Revision & Let the User Decide

Combine all cold-reader returns without silently changing the target:

1. **Headlines:** one line per method, in that method's voice.
2. **Proposed revision (numbered list):** each change shows `N. Location · Before → After · Driven by <method>`.
3. **Human decisions required:** any finding that challenges the premise or
   requires a product/policy call — never fold these silently into the revision.
4. **Set-aside findings:** one line per finding you did not include, with the
   reason, so the user can rescue any of them.
5. **Your choice:** `apply all` · `apply 1, 3` · `reject` · `rerun #N with <direction>` · `another round` · `done`.

## Step 5 — Apply Accepted Changes & Log the Round

- Only edit the target file **after** the user chooses which numbered items to
  apply. Show the updated passages.
- Append a compact round log (`specs/<feature>/elicitation.md` if inside a
  feature folder, else `elicitation-<topic>.md`) recording methods run, applied
  changes, and rejected alternatives.
- **Between rounds:** applied changes become *settled*; rejected items become
  *rejected alternatives*; raw prior findings stay **out** of the next round's
  briefs so new readers remain cold.
- Offer either **one more round** (suggesting an unexplored direction) or
  **done** (handing off cleanly to `/speckit.specify`, `/speckit.plan`, or
  Goldfish validation).
