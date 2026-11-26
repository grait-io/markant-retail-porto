---
name: goldfish-review
description: >-
  Cursor-native Elephant–Goldfish Model (EGM) fresh-context validation gate.
  Dispatches Goldfish subagents in parallel with ONLY explicit file paths
  (zero parent chat history or hints). Each Goldfish is read-only on the files
  under review (does not edit them); findings return as a chat table. Merges
  severity-tagged findings, enforces a human decision gate (accept / reject /
  cannot decide), logs decisions to review.md, and stops after at most 2 rounds.
  Use when the user asks for "/goldfish", "Goldfish review", "fresh-context
  review", or wants to validate a spec + plan, diff, architecture, or codebase map.
---
<!-- Adapted for Cursor from google/elephant-goldfish-model (commit 8f16812, Apache-2.0). See .cursor/agents/NOTICE. -->
# Goldfish Review (Elephant–Goldfish Model for Cursor)

The **Elephant** (this author chat) holds deep context — and therefore blind
spots: it silently fills gaps in a spec or plan from chat memory. A **Goldfish**
is a fresh subagent that sees **only** the written files on disk and is
**read-only on those files** (returns a findings table; does not rewrite the
spec/plan/diff — you save what you accept). If a Goldfish cannot tell what to
build without guessing, the document is not ready.

## Presets (pick based on target)

| Preset | Default reviewers (run IN PARALLEL) | Files passed to each Goldfish (ONLY these) |
|---|---|---|
| `plan` *(default)* | `goldfish-structure`, `goldfish-readiness`, `goldfish-zoom-out` *(+ `goldfish-architecture` if `AGENTS.md` / `.cursor/rules/` exist)* | `specs/<feature>/spec.md`, `specs/<feature>/plan.md` *(+ rules files ONLY for `goldfish-architecture`)* |
| `diff` | `goldfish-diff`, `goldfish-zoom-out` | `<diff-file>` (e.g. `mr.diff`) and `specs/<feature>/plan.md` |
| `map` | `goldfish-map` | `context/<module>/context.md` and read-only path to that module's source folder |
| `arch` | `goldfish-architecture` | `specs/<feature>/plan.md`, `AGENTS.md`, `.cursor/rules/*`, `context/*/context.md` |

## Step 1 — Confirm Target & Isolation Boundary

1. Identify the target file(s) and preset (`plan`, `diff`, `map`, or `arch`). If
   no files exist on disk yet, stop and ask the user to save them first —
   Goldfish never review chat memory.
2. **Strict Goldfish Isolation Contract (non-negotiable):**
   - Spawn a **fresh** subagent task for **each** reviewer in parallel. Never
     reuse or resume a reviewer.
   - Pass **ONLY** the explicit file paths and the reviewer's role.
   - **NEVER** pass parent conversation history, a summary of what you discussed,
     earlier round findings, or hints about what you think might be wrong.
   - Wait for **all** parallel reviewers to finish before synthesizing.
3. **Host isolation check:** If the host cannot spawn separate read-only
   subagent tasks, or if any reviewer references details that exist only in
   this chat (and not in the files), **stop and report that isolation is
   unverified**. Direct the user to open a **new chat**, attach only the files,
   and paste the matching prompt from `.cursor/goldfish_manual_prompt.md`
   (in the kit folder: `kit/goldfish_manual_prompt.md`). Do **not**
   simulate a Goldfish reviewer in the parent chat.

## Step 2 — Synthesize ONE Deduplicated Findings Table

Combine all reviewer returns into **one** concise table ordered by severity
(`Blocker` → `Major` → `Nit`). Merge duplicates (credit all reviewers who found
the same defect, e.g. `structure, readiness`) and preserve exact evidence.

```markdown
| # | Severity | Finding | Reviewer | Why it matters | Question to the author |
|---:|---|---|---|---|---|
```

*(For `diff` preset use `| # | Severity | Finding | File | In plan? | Suggestion |`;
for `map` preset use `| # | Severity | Claim in map | Verified against file | Issue | Suggested fix |`.)*

Do **not** edit any files yet.

## Step 3 — Human Decision Gate

Ask the user to decide on each numbered finding using one of three dispositions:
- **accept** — revise the target file (`spec.md` / `plan.md` / `context.md`)
- **reject** — keep as-is with a 1-line reason (reviewers can over-engineer too)
- **cannot decide** — name who can decide and mark `[OPEN]` in the spec/plan

Never patch decisions only in chat: every accepted change must be written to
the document on disk.

## Step 4 — Apply Accepted Revisions, Log & Stopping Rule

1. Apply **only** the user's accepted items to the target files (`spec.md`,
   `plan.md`, or `context.md`). Never touch source code or tests.
2. Append a short round log to `specs/<feature>/review.md` (if reviewing a
   feature under `specs/<feature>/`):
   - Round number & preset (`plan` / `diff` / `arch`)
   - Reviewers run & isolation status (`parallel read-only subagents`)
   - Decisions: `#1 accept — ...`, `#2 reject — ...`, `#3 cannot decide — ...`
3. **Stopping rule (maximum 2 rounds):**
   - After Round 1 revisions, offer **one** fresh verification round (Round 2)
     with fresh Goldfish subagents to verify blockers are closed.
   - Stop when **zero `Blocker` findings** remain OR after **2 rounds** (never
     polish forever). Hand off to `/speckit.tasks` (for `plan`) or human MR
     review (for `diff`).
