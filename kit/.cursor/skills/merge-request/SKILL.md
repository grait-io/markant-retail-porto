---
name: merge-request
description: Prepare and open a merge request for the current branch. Use when the user asks to create, open or prepare a merge request (MR) or pull request.
---
<!-- Workshop-local. Same steps as the example in the kit (kit/examples/). Adapt it to your team. -->
# Merge request

1. Find the plan for this branch in `specs/<feature>/plan.md`. If there is none, stop and ask.
2. Run the tests and the linter (the **Verify** command in `context/<module>/context.md` when a map exists). If anything fails, stop and report. Never edit a test to make it pass.
3. `git diff <default branch>...HEAD --stat`: if more than 15 files changed, stop and propose how to split it into slices.
4. Compare the diff with the plan. List under **Outside the plan** everything the plan does not ask for.
5. Write the description: **What changed**, **How it was tested** (commands, result), **Plan** (link), **Outside the plan**.
6. Show me the description. Open the merge request only after I say yes.
