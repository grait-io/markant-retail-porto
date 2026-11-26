# context/

One short Markdown map per module: `context/<module>/context.md` (max one page).
Purpose: **navigation** — so an agent or teammate can find entry points,
callers, conventions, and a verify command without the chat that wrote them.

Run `/fabric-map <module>`, or copy `_TEMPLATE_module.md` to `context/<module>/context.md` and fill it in. Prefer **one subsystem** you are
about to change; optionally note the ticket/flow you traced across its boundary.

Required:

- **Purpose**, **entry points**, **callers / consumers** (or `n/a` leaf), **data owned**
- **Verify** — one command (or test path) that exercises this module’s boundary
- **Conventions (max 3)** each with an **exemplar** path that exists in the tree
  (put legacy / exceptions under **traps**, not as silent “always” rules)
- **`related:`** — second repository path/URL, or `n/a mono`

**Progressive disclosure:** load only the conventions that match files in the
current plan — do not dump every house rule into always-on `AGENTS.md`.

Review the map in a **new Agent chat**: `/goldfish map context/<module>/context.md <source folder>`
(no subagents: Prompt 5 in `.cursor/goldfish_manual_prompt.md`).
