# Codebase inventory fabric (plain-file MVP)

**Room line:** Herdr is how I run many agents; fabric is how any agent — and your
teammate — still knows the codebase after the chat is gone.

This folder is the **portable core** of the Day 1 herdr demo. The workshop ships
**fabric only** — not herdr (no fleet, worktrees-as-harness, gates, or m2herd CLI).
Copy these files into a repository root so coding agents (and teammates) get
**navigable memory** — not a chat dump and not a vector index alone.

**Day 2 · Module 7 outcome:** one module map + a thin `AGENTS.md` that helps you
navigate *your* codebase, checked by `goldfish-map` (or Prompt 5). Later you can
put a structural graph (GitNexus, CodeGraph, SCIP, …) *under* the same shape;
the workshop does not install those.

## What to copy

| Path | Role |
|------|------|
| `context/<module>/context.md` | One-page module map: purpose, entry points, **callers/consumers**, data, **Verify** command, **3 conventions + exemplar paths**, traps, `related:` (second repo or `n/a mono`) |
| `AGENTS.md` | ≤15 lines: read `context/` first; do not paste all conventions into always-on rules |
| `specs/<feature>/` | `spec.md`, `plan.md`, `tasks.md`, `findings.md` |
| `LESSONS.md` | Findings seen **twice** → then promote into scoped `.cursor/rules/` |
| `inventory_checklist.md` | Day 2 Mod 7 worksheet (optional) |

Template: `context/_TEMPLATE_module.md` → copy to `context/<your-module>/context.md`.

## Rules

- **Progressive disclosure:** load only conventions that match files in the current plan.
- **No secrets** in `context/` (tokens, passwords, connection strings).
- Verify every new or changed map with **`goldfish-map`** (or Prompt 5 in a **new** chat).

Adapted from herdr-factory-loop (MIT) for this workshop kit — fabric shape only.
